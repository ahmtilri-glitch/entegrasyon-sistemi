import { buildAuthHeaders } from './auth.js';
import { TgoApiError, TgoNetworkError, type TgoErrorPayload } from './errors.js';
import { Logger, logger as defaultLogger, maskSensitive } from './logger.js';
import { SlidingWindowRateLimiter } from './rateLimiter.js';
import type { TgoConfig, TgoDomain } from '../config/index.js';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type QueryValue = string | number | boolean | null | undefined | Array<string | number>;

export interface RequestOptions {
  method: HttpMethod;
  path: string;
  operation: string;
  domain?: TgoDomain | 'COMMON';
  query?: Record<string, QueryValue>;
  body?: unknown;
  headers?: Record<string, string>;
  baseUrlOverride?: string;
  /** Bu istek icin retry tamamen kapatilir (orn. idempotent olmayan kritik cagrilar). */
  disableRetry?: boolean;
}

export interface TgoResponse<T> {
  status: number;
  data: T;
  rawBody: string;
  headers: Record<string, string>;
  durationMs: number;
}

export interface ApiLogRecord {
  domain: TgoDomain | 'COMMON';
  operation: string;
  method: string;
  url: string;
  requestHeaders: Record<string, unknown>;
  requestBody: unknown;
  statusCode: number | null;
  responseBody: string | null;
  errorMessage: string | null;
  attempt: number;
  durationMs: number;
  success: boolean;
  correlationId: string;
}

export type ApiLogSink = (record: ApiLogRecord) => void | Promise<void>;

export type FetchLike = (
  input: string,
  init: {
    method: string;
    headers: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
  },
) => Promise<{
  status: number;
  headers: { forEach: (cb: (value: string, key: string) => void) => void };
  text: () => Promise<string>;
}>;

export interface HttpClientDeps {
  config: TgoConfig;
  logger?: Logger;
  fetchImpl?: FetchLike;
  logSink?: ApiLogSink;
  rateLimiter?: SlidingWindowRateLimiter;
  sleep?: (ms: number) => Promise<void>;
}

const RETRYABLE_STATUS = new Set([408, 409, 425, 429, 500, 502, 503, 504]);

export function buildQueryString(query: Record<string, QueryValue> | undefined): string {
  if (!query) return '';
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, String(item));
    } else {
      params.append(key, String(value));
    }
  }
  const serialized = params.toString();
  return serialized.length > 0 ? `?${serialized}` : '';
}

/** Path parametrelerini guvenli sekilde encode eder. */
export function encodePath(...segments: Array<string | number>): string {
  return segments.map((segment) => encodeURIComponent(String(segment))).join('/');
}

function randomId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export class TgoHttpClient {
  private readonly config: TgoConfig;
  private readonly logger: Logger;
  private readonly fetchImpl: FetchLike;
  private readonly logSink: ApiLogSink | undefined;
  private readonly rateLimiter: SlidingWindowRateLimiter;
  private readonly sleep: (ms: number) => Promise<void>;

  constructor(deps: HttpClientDeps) {
    this.config = deps.config;
    this.logger = deps.logger ?? defaultLogger;
    this.fetchImpl = deps.fetchImpl ?? (globalThis.fetch as unknown as FetchLike);
    this.logSink = deps.logSink;
    this.rateLimiter =
      deps.rateLimiter ?? new SlidingWindowRateLimiter(this.config.rateLimitPer10s, 10_000);
    this.sleep = deps.sleep ?? ((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)));
  }

  async request<T>(options: RequestOptions): Promise<TgoResponse<T>> {
    const baseUrl = options.baseUrlOverride ?? this.config.baseUrl;
    const url = `${baseUrl}${options.path}${buildQueryString(options.query)}`;
    const headers: Record<string, string> = {
      ...buildAuthHeaders(this.config),
      ...(options.headers ?? {}),
    };
    if (options.body !== undefined) headers['Content-Type'] = 'application/json';

    const correlationId = randomId();
    const maxAttempts = options.disableRetry ? 1 : Math.max(1, this.config.maxRetries + 1);
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      await this.rateLimiter.acquire(`${options.method} ${baseUrl}${options.path}`);
      const startedAt = Date.now();
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.config.timeoutMs);

      try {
        const response = await this.fetchImpl(url, {
          method: options.method,
          headers,
          ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
          signal: controller.signal,
        });
        clearTimeout(timer);

        const rawBody = await response.text();
        const durationMs = Date.now() - startedAt;
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });

        const success = response.status >= 200 && response.status < 300;
        await this.writeLog({
          domain: options.domain ?? 'COMMON',
          operation: options.operation,
          method: options.method,
          url,
          requestHeaders: maskSensitive(headers) as Record<string, unknown>,
          requestBody: options.body ?? null,
          statusCode: response.status,
          responseBody: rawBody.slice(0, 60_000),
          errorMessage: success ? null : rawBody.slice(0, 2_000),
          attempt,
          durationMs,
          success,
          correlationId,
        });

        if (success) {
          return {
            status: response.status,
            data: parseJson<T>(rawBody),
            rawBody,
            headers: responseHeaders,
            durationMs,
          };
        }

        const apiError = new TgoApiError({
          message: `TGO ${options.operation} basarisiz (HTTP ${response.status})`,
          statusCode: response.status,
          operation: options.operation,
          method: options.method,
          url,
          responseBody: rawBody,
          parsedBody: parseJsonOrNull<TgoErrorPayload>(rawBody),
          attempt,
        });

        if (!RETRYABLE_STATUS.has(response.status) || attempt === maxAttempts) throw apiError;

        lastError = apiError;
        await this.sleep(this.backoffDelay(attempt, responseHeaders['retry-after']));
        continue;
      } catch (error) {
        clearTimeout(timer);
        if (error instanceof TgoApiError) throw error;

        const durationMs = Date.now() - startedAt;
        const networkError = new TgoNetworkError({
          message:
            error instanceof Error
              ? `TGO ${options.operation} baglanti hatasi: ${error.message}`
              : `TGO ${options.operation} baglanti hatasi`,
          operation: options.operation,
          method: options.method,
          url,
          attempt,
          cause: error,
        });

        await this.writeLog({
          domain: options.domain ?? 'COMMON',
          operation: options.operation,
          method: options.method,
          url,
          requestHeaders: maskSensitive(headers) as Record<string, unknown>,
          requestBody: options.body ?? null,
          statusCode: null,
          responseBody: null,
          errorMessage: networkError.message,
          attempt,
          durationMs,
          success: false,
          correlationId,
        });

        if (attempt === maxAttempts) throw networkError;
        lastError = networkError;
        await this.sleep(this.backoffDelay(attempt));
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error(`TGO ${options.operation} beklenmeyen hata`);
  }

  get<T>(options: Omit<RequestOptions, 'method' | 'body'>): Promise<TgoResponse<T>> {
    return this.request<T>({ ...options, method: 'GET' });
  }

  post<T>(options: Omit<RequestOptions, 'method'>): Promise<TgoResponse<T>> {
    return this.request<T>({ ...options, method: 'POST' });
  }

  put<T>(options: Omit<RequestOptions, 'method'>): Promise<TgoResponse<T>> {
    return this.request<T>({ ...options, method: 'PUT' });
  }

  delete<T>(options: Omit<RequestOptions, 'method'>): Promise<TgoResponse<T>> {
    return this.request<T>({ ...options, method: 'DELETE' });
  }

  /** Exponential backoff + jitter; Retry-After basligi varsa oncelik kazanir. */
  private backoffDelay(attempt: number, retryAfterHeader?: string): number {
    if (retryAfterHeader) {
      const seconds = Number(retryAfterHeader);
      if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, 60_000);
    }
    const exponential = this.config.retryBaseDelayMs * 2 ** (attempt - 1);
    const jitter = Math.random() * this.config.retryBaseDelayMs;
    return Math.min(exponential + jitter, 30_000);
  }

  private async writeLog(record: ApiLogRecord): Promise<void> {
    this.logger.debug('tgo_api_call', {
      operation: record.operation,
      method: record.method,
      url: record.url,
      status: record.statusCode,
      attempt: record.attempt,
      durationMs: record.durationMs,
      success: record.success,
    });
    if (!this.logSink) return;
    try {
      await this.logSink(record);
    } catch (error) {
      this.logger.warn('api_log_yazilamadi', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

function parseJson<T>(raw: string): T {
  if (raw.trim().length === 0) return undefined as unknown as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as unknown as T;
  }
}

function parseJsonOrNull<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
