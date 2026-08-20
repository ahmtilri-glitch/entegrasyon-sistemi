import type { TgoDomain } from '../../config/index.js';
import { getPool, type Executor } from '../pool.js';

export interface CategoryUpsertInput {
  domain: TgoDomain;
  supplierId?: number | null;
  storeId?: number | null;
  tgoCategoryId: string;
  parentTgoId?: string | null;
  name: string;
  status?: 'ACTIVE' | 'PASSIVE';
  isLeaf?: boolean;
  hierarchyPath?: string | null;
  position?: number | null;
  sellerAttributes?: unknown;
  rawPayload?: unknown;
}

export class CategoryRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  async upsert(input: CategoryUpsertInput): Promise<number> {
    const [result] = await this.db.execute(
      `INSERT INTO categories
        (domain, supplier_id, store_id, tgo_category_id, parent_tgo_id, name, status, is_leaf,
         hierarchy_path, position, seller_attributes, raw_payload)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         parent_tgo_id = VALUES(parent_tgo_id),
         name = VALUES(name),
         status = VALUES(status),
         is_leaf = VALUES(is_leaf),
         hierarchy_path = VALUES(hierarchy_path),
         position = VALUES(position),
         seller_attributes = COALESCE(VALUES(seller_attributes), seller_attributes),
         raw_payload = COALESCE(VALUES(raw_payload), raw_payload),
         id = LAST_INSERT_ID(id)`,
      [
        input.domain,
        input.supplierId ?? null,
        input.storeId ?? null,
        input.tgoCategoryId,
        input.parentTgoId ?? null,
        input.name,
        input.status ?? 'ACTIVE',
        input.isLeaf ? 1 : 0,
        input.hierarchyPath ?? null,
        input.position ?? null,
        input.sellerAttributes === undefined ? null : JSON.stringify(input.sellerAttributes),
        input.rawPayload === undefined ? null : JSON.stringify(input.rawPayload),
      ],
    );
    return Number((result as { insertId: number }).insertId);
  }

  async list(domain?: TgoDomain): Promise<unknown[]> {
    const [rows] = await this.db.query(
      `SELECT * FROM categories ${domain ? 'WHERE domain = ?' : ''} ORDER BY id DESC LIMIT 1000`,
      domain ? [domain] : [],
    );
    return rows as unknown[];
  }
}
