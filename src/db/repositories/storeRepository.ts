import type { RowDataPacket } from 'mysql2';
import type { TgoDomain } from '../../config/index.js';
import { getPool, type Executor } from '../pool.js';

export interface StoreUpsertInput {
  domain: TgoDomain;
  supplierId: number;
  tgoStoreId: string;
  name?: string | null;
  workingStatus?: 'OPEN' | 'CLOSED' | 'UNKNOWN';
  deliveryType?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  minDeliveryMinutes?: number | null;
  maxDeliveryMinutes?: number | null;
  workingHours?: unknown;
  rawPayload?: unknown;
}

export class StoreRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  async upsert(input: StoreUpsertInput): Promise<number> {
    const [result] = await this.db.execute(
      `INSERT INTO stores
        (domain, supplier_id, tgo_store_id, name, working_status, delivery_type, latitude, longitude,
         min_delivery_minutes, max_delivery_minutes, working_hours, raw_payload, last_synced_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))
       ON DUPLICATE KEY UPDATE
         name = COALESCE(VALUES(name), name),
         working_status = VALUES(working_status),
         delivery_type = COALESCE(VALUES(delivery_type), delivery_type),
         latitude = COALESCE(VALUES(latitude), latitude),
         longitude = COALESCE(VALUES(longitude), longitude),
         min_delivery_minutes = COALESCE(VALUES(min_delivery_minutes), min_delivery_minutes),
         max_delivery_minutes = COALESCE(VALUES(max_delivery_minutes), max_delivery_minutes),
         working_hours = COALESCE(VALUES(working_hours), working_hours),
         raw_payload = COALESCE(VALUES(raw_payload), raw_payload),
         last_synced_at = NOW(3),
         id = LAST_INSERT_ID(id)`,
      [
        input.domain,
        input.supplierId,
        input.tgoStoreId,
        input.name ?? null,
        input.workingStatus ?? 'UNKNOWN',
        input.deliveryType ?? null,
        input.latitude ?? null,
        input.longitude ?? null,
        input.minDeliveryMinutes ?? null,
        input.maxDeliveryMinutes ?? null,
        input.workingHours === undefined ? null : JSON.stringify(input.workingHours),
        input.rawPayload === undefined ? null : JSON.stringify(input.rawPayload),
      ],
    );
    return Number((result as { insertId: number }).insertId);
  }

  async findId(domain: TgoDomain, supplierId: number, tgoStoreId: string): Promise<number | null> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT id FROM stores WHERE domain = ? AND supplier_id = ? AND tgo_store_id = ? LIMIT 1',
      [domain, supplierId, tgoStoreId],
    );
    const row = rows[0];
    return row ? Number(row.id) : null;
  }

  async list(domain?: TgoDomain): Promise<unknown[]> {
    const [rows] = await this.db.query(
      `SELECT * FROM stores ${domain ? 'WHERE domain = ?' : ''} ORDER BY id DESC`,
      domain ? [domain] : [],
    );
    return rows as unknown[];
  }

  async updateWorkingStatus(id: number, status: 'OPEN' | 'CLOSED'): Promise<void> {
    await this.db.execute('UPDATE stores SET working_status = ? WHERE id = ?', [status, id]);
  }
}
