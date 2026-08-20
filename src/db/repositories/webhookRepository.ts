import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import type { TgoDomain } from '../../config/index.js';
import { getPool, type Executor } from '../pool.js';

export interface WebhookInsertInput {
  domain: TgoDomain;
  eventType: string;
  tgoOrderId: string | null;
  tgoOrderNumber: string | null;
  supplierId: number | null;
  tgoStoreId: string | null;
  idempotencyKey: string;
  headers: Record<string, unknown>;
  payload: unknown;
  remoteIp: string | null;
}

export interface WebhookInsertResult {
  id: number;
  duplicate: boolean;
}

export class WebhookRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  /** Idempotency anahtari daha once kaydedildiyse duplicate=true doner. */
  async insert(input: WebhookInsertInput): Promise<WebhookInsertResult> {
    const [result] = await this.db.execute<ResultSetHeader>(
      `INSERT INTO webhooks
        (domain, event_type, tgo_order_id, tgo_order_number, supplier_id, tgo_store_id,
         idempotency_key, headers, payload, remote_ip, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'RECEIVED')
       ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), duplicate_count = duplicate_count + 1`,
      [
        input.domain,
        input.eventType,
        input.tgoOrderId,
        input.tgoOrderNumber,
        input.supplierId,
        input.tgoStoreId,
        input.idempotencyKey,
        JSON.stringify(input.headers),
        JSON.stringify(input.payload),
        input.remoteIp,
      ],
    );
    return { id: Number(result.insertId), duplicate: result.affectedRows === 2 };
  }

  async markProcessed(id: number): Promise<void> {
    await this.db.execute(
      "UPDATE webhooks SET status = 'PROCESSED', processed_at = NOW(3), process_error = NULL WHERE id = ?",
      [id],
    );
  }

  async markFailed(id: number, error: string): Promise<void> {
    await this.db.execute(
      "UPDATE webhooks SET status = 'FAILED', process_error = ? WHERE id = ?",
      [error.slice(0, 4000), id],
    );
  }

  async list(params: { status?: string; limit?: number; offset?: number }): Promise<RowDataPacket[]> {
    const limit = Math.min(Math.max(params.limit ?? 50, 1), 500);
    const offset = Math.max(params.offset ?? 0, 0);
    const [rows] = await this.db.query<RowDataPacket[]>(
      `SELECT id, domain, event_type, tgo_order_id, tgo_order_number, status, duplicate_count,
              process_error, created_at
         FROM webhooks ${params.status ? 'WHERE status = ?' : ''}
        ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
      params.status ? [params.status] : [],
    );
    return rows;
  }
}
