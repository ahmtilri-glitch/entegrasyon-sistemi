export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

const SENSITIVE_KEYS = [
  'authorization',
  'apikey',
  'api_key',
  'apisecret',
  'api_secret',
  'password',
  'secret',
  'token',
  'x-api-key',
];

export function maskSensitive(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => maskSensitive(item));
  if (value && typeof value === 'object') {
    const source = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(source)) {
      output[key] = SENSITIVE_KEYS.includes(key.toLowerCase()) ? '***' : maskSensitive(item);
    }
    return output;
  }
  return value;
}

export class Logger {
  private readonly level: LogLevel;
  private readonly context: Record<string, unknown>;

  constructor(level: LogLevel = 'info', context: Record<string, unknown> = {}) {
    this.level = level;
    this.context = context;
  }

  child(context: Record<string, unknown>): Logger {
    return new Logger(this.level, { ...this.context, ...context });
  }

  debug(message: string, meta: Record<string, unknown> = {}): void {
    this.write('debug', message, meta);
  }

  info(message: string, meta: Record<string, unknown> = {}): void {
    this.write('info', message, meta);
  }

  warn(message: string, meta: Record<string, unknown> = {}): void {
    this.write('warn', message, meta);
  }

  error(message: string, meta: Record<string, unknown> = {}): void {
    this.write('error', message, meta);
  }

  private write(level: LogLevel, message: string, meta: Record<string, unknown>): void {
    if (LEVEL_ORDER[level] < LEVEL_ORDER[this.level]) return;
    const line = {
      ts: new Date().toISOString(),
      level,
      message,
      ...(maskSensitive({ ...this.context, ...meta }) as Record<string, unknown>),
    };
    const serialized = JSON.stringify(line);
    if (level === 'error') process.stderr.write(`${serialized}\n`);
    else process.stdout.write(`${serialized}\n`);
  }
}

export const logger = new Logger(
  (process.env.LOG_LEVEL as LogLevel | undefined) ?? 'info',
);
