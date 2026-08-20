import type { RowDataPacket } from 'mysql2';
import type { TgoDomain } from '../../config/index.js';
import type { BatchRequestResult } from '../../types/common.js';
import { getPool, type Executor } from '../pool.js';

export class BatchRequestRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  async record(params: {
    domain: TgoDomain;
    batchRequestId: string;
    supplierId: number;
    storeId?: number | null;
    operation: string;
    requestPayload?: unknown;
  }): Promise<void> {
    await this.db.execute(
      `INSERT INTO batch_requests
        (domain, batch_request_id, supplier_id, store_id, operation, status, request_payload)
       VALUES (?, ?, ?, ?, ?, 'PENDING', ?)
       ON DUPLICATE KEY UPDATE operation = VALUES(operation), request_payload = VALUES(request_payload)`,
      [
        params.domain,
        params.batchRequestId,
        params.supplierId,
        params.storeId ?? null,
        params.operation,
        params.requestPayload === undefined ? null : JSON.stringify(params.requestPayload),
      ],
    );
  }

  async saveResult(
    domain: TgoDomain,
    batchRequestId: string,
    result: BatchRequestResult,
  ): Promise<void> {
    await this.db.execute(
      `UPDATE batch_requests
          SET status = ?, batch_request_type = ?, item_count = ?, failed_item_count = ?,
              result_payload = ?, last_checked_at = NOW(3)
        WHERE domain = ? AND batch_request_id = ?`,
      [
        result.status ?? 'UNKNOWN',
        result.batchRequestType ?? null,
        result.itemCount ?? null,
        result.failedItemCount ?? null,
        JSON.stringify(result),
        domain,
        batchRequestId,
      ],
    );
  }

  async listPending(domain?: TgoDomain): Promise<RowDataPacket[]> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      `SELECT * FROM batch_requests
        WHERE status NOT IN ('COMPLETED','FAILED') ${domain ? 'AND domain = ?' : ''}
        ORDER BY id DESC LIMIT 200`,
      domain ? [domain] : [],
    );
    return rows;
  }
}
