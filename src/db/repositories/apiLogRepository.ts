import type { ApiLogRecord } from '../../core/httpClient.js';
import { getPool, type Executor } from '../pool.js';

export class ApiLogRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  async insert(record: ApiLogRecord): Promise<void> {
    await this.db.execute(
      `INSERT INTO api_logs
        (domain, operation, method, url, request_headers, request_body, status_code,
         response_body, error_message, attempt, duration_ms, success, correlation_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.domain,
        record.operation,
        record.method,
        record.url.slice(0, 1024),
        JSON.stringify(record.requestHeaders),
        record.requestBody === null || record.requestBody === undefined
          ? null
          : JSON.stringify(record.requestBody),
        record.statusCode,
        record.responseBody,
        record.errorMessage,
        record.attempt,
        record.durationMs,
        record.success ? 1 : 0,
        record.correlationId,
      ],
    );
  }

  async list(params: {
    operation?: string;
    success?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<unknown[]> {
    const where: string[] = [];
    const values: Array<string | number> = [];
    if (params.operation) {
      where.push('operation = ?');
      values.push(params.operation);
    }
    if (params.success !== undefined) {
      where.push('success = ?');
      values.push(params.success ? 1 : 0);
    }
    const limit = Math.min(Math.max(params.limit ?? 50, 1), 500);
    const offset = Math.max(params.offset ?? 0, 0);
    const [rows] = await this.db.query(
      `SELECT id, domain, operation, method, url, status_code, attempt, duration_ms, success,
              error_message, correlation_id, created_at
         FROM api_logs
         ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
        ORDER BY id DESC
        LIMIT ${limit} OFFSET ${offset}`,
      values,
    );
    return rows as unknown[];
  }
}
