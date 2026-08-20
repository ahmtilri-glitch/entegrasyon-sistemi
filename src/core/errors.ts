export interface TgoErrorPayload {
  errors?: Array<{ key?: string; message?: string }>;
  message?: string;
  [key: string]: unknown;
}

export class TgoApiError extends Error {
  public readonly statusCode: number;
  public readonly operation: string;
  public readonly method: string;
  public readonly url: string;
  public readonly responseBody: string;
  public readonly parsedBody: TgoErrorPayload | null;
  public readonly attempt: number;

  constructor(params: {
    message: string;
    statusCode: number;
    operation: string;
    method: string;
    url: string;
    responseBody: string;
    parsedBody: TgoErrorPayload | null;
    attempt: number;
  }) {
    super(params.message);
    this.name = 'TgoApiError';
    this.statusCode = params.statusCode;
    this.operation = params.operation;
    this.method = params.method;
    this.url = params.url;
    this.responseBody = params.responseBody;
    this.parsedBody = params.parsedBody;
    this.attempt = params.attempt;
  }

  /** 401/403: kimlik dogrulama veya yetki hatasi */
  get isAuthError(): boolean {
    return this.statusCode === 401 || this.statusCode === 403;
  }

  /** 409: ayni sube icin es zamanli statu guncellemesi gibi cakisma durumlari */
  get isConflict(): boolean {
    return this.statusCode === 409;
  }

  /** 429: rate limit (ayni endpoint icin 10 saniyede 50 istek) */
  get isRateLimited(): boolean {
    return this.statusCode === 429;
  }

  get isRetryable(): boolean {
    return this.statusCode === 429 || this.statusCode === 409 || this.statusCode >= 500;
  }
}

export class TgoNetworkError extends Error {
  public readonly operation: string;
  public readonly method: string;
  public readonly url: string;
  public readonly attempt: number;
  public override readonly cause?: unknown;

  constructor(params: {
    message: string;
    operation: string;
    method: string;
    url: string;
    attempt: number;
    cause?: unknown;
  }) {
    super(params.message);
    this.name = 'TgoNetworkError';
    this.operation = params.operation;
    this.method = params.method;
    this.url = params.url;
    this.attempt = params.attempt;
    this.cause = params.cause;
  }
}

export class ValidationError extends Error {
  public readonly details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
