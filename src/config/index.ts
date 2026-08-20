import { config as loadEnv } from 'dotenv';

loadEnv();

export type TgoEnvironment = 'PROD' | 'STAGE';
export type TgoDomain = 'MEAL' | 'GROCERY';

export const BASE_URLS: Record<TgoEnvironment, string> = {
  PROD: 'https://api.tgoapis.com',
  STAGE: 'https://stageapi.tgoapis.com',
};

export interface TgoConfig {
  environment: TgoEnvironment;
  baseUrl: string;
  supplierId: number;
  apiKey: string;
  apiSecret: string;
  integratorName: string;
  executorUser: string;
  timeoutMs: number;
  maxRetries: number;
  retryBaseDelayMs: number;
  rateLimitPer10s: number;
}

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
}

export interface ServerConfig {
  port: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  webhookBasicUser: string;
  webhookBasicPassword: string;
  panelApiKey: string;
}

export interface PollingConfig {
  enabled: boolean;
  intervalMs: number;
  lookbackMs: number;
  mealStoreIds: string[];
  groceryStoreIds: string[];
}

export interface AppConfig {
  tgo: TgoConfig;
  db: DbConfig;
  server: ServerConfig;
  polling: PollingConfig;
}

function readString(key: string, fallback?: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Eksik zorunlu ortam degiskeni: ${key}`);
  }
  return value;
}

function readNumber(key: string, fallback?: number): number {
  const raw = process.env[key];
  if (raw === undefined || raw === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Eksik zorunlu ortam degiskeni: ${key}`);
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Ortam degiskeni sayisal olmali: ${key}`);
  }
  return parsed;
}

function readBoolean(key: string, fallback: boolean): boolean {
  const raw = process.env[key];
  if (raw === undefined || raw === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase());
}

function readList(key: string): string[] {
  const raw = process.env[key];
  if (!raw) return [];
  return raw
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

/**
 * Entegratör ismi TGO dokumantasyonuna gore alfanumerik ve en fazla 30 karakter olmalidir.
 */
export function validateIntegratorName(name: string): string {
  if (!/^[a-zA-Z0-9]{1,30}$/.test(name)) {
    throw new Error(
      'TGO_INTEGRATOR_NAME alfanumerik olmali ve en fazla 30 karakter icermelidir.',
    );
  }
  return name;
}

let cached: AppConfig | null = null;

export function loadConfig(): AppConfig {
  if (cached) return cached;

  const environment = readString('TGO_ENVIRONMENT', 'STAGE').toUpperCase() as TgoEnvironment;
  if (environment !== 'PROD' && environment !== 'STAGE') {
    throw new Error('TGO_ENVIRONMENT yalnizca PROD veya STAGE olabilir.');
  }

  cached = {
    tgo: {
      environment,
      baseUrl: BASE_URLS[environment],
      supplierId: readNumber('TGO_SUPPLIER_ID'),
      apiKey: readString('TGO_API_KEY'),
      apiSecret: readString('TGO_API_SECRET'),
      integratorName: validateIntegratorName(readString('TGO_INTEGRATOR_NAME', 'SelfIntegration')),
      executorUser: readString('TGO_EXECUTOR_USER'),
      timeoutMs: readNumber('TGO_TIMEOUT_MS', 30000),
      maxRetries: readNumber('TGO_MAX_RETRIES', 3),
      retryBaseDelayMs: readNumber('TGO_RETRY_BASE_DELAY_MS', 500),
      rateLimitPer10s: readNumber('TGO_RATE_LIMIT_PER_10S', 50),
    },
    db: {
      host: readString('DB_HOST', '127.0.0.1'),
      port: readNumber('DB_PORT', 3306),
      user: readString('DB_USER'),
      password: readString('DB_PASSWORD', ''),
      database: readString('DB_NAME'),
      connectionLimit: readNumber('DB_CONNECTION_LIMIT', 10),
    },
    server: {
      port: readNumber('PORT', 3000),
      logLevel: readString('LOG_LEVEL', 'info') as ServerConfig['logLevel'],
      webhookBasicUser: readString('WEBHOOK_BASIC_USER', ''),
      webhookBasicPassword: readString('WEBHOOK_BASIC_PASSWORD', ''),
      panelApiKey: readString('PANEL_API_KEY', ''),
    },
    polling: {
      enabled: readBoolean('POLL_ENABLED', true),
      intervalMs: readNumber('POLL_INTERVAL_MS', 30000),
      lookbackMs: readNumber('POLL_LOOKBACK_MS', 3600000),
      mealStoreIds: readList('POLL_MEAL_STORE_IDS'),
      groceryStoreIds: readList('POLL_GROCERY_STORE_IDS'),
    },
  };

  return cached;
}

export function resetConfigCache(): void {
  cached = null;
}
