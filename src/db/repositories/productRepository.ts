import type { RowDataPacket } from 'mysql2';
import type { TgoDomain } from '../../config/index.js';
import { getPool, type Executor } from '../pool.js';

export interface ProductUpsertInput {
  domain: TgoDomain;
  supplierId: number;
  storeId?: number | null;
  categoryId?: number | null;
  tgoProductId?: string | null;
  barcode?: string | null;
  stockCode?: string | null;
  name: string;
  description?: string | null;
  brandId?: number | null;
  brandName?: string | null;
  vatRate?: number | null;
  sellingPrice?: number | null;
  originalPrice?: number | null;
  quantity?: number | null;
  status?: 'ACTIVE' | 'PASSIVE';
  onSale?: boolean;
  saleOffReason?: string | null;
  images?: unknown;
  attributes?: unknown;
  rawPayload?: unknown;
}

export class ProductRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  async upsert(input: ProductUpsertInput): Promise<number> {
    const [result] = await this.db.execute(
      `INSERT INTO products
        (domain, supplier_id, store_id, category_id, tgo_product_id, barcode, stock_code, name,
         description, brand_id, brand_name, vat_rate, selling_price, original_price, quantity,
         status, on_sale, sale_off_reason, images, attributes, raw_payload, last_synced_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))
       ON DUPLICATE KEY UPDATE
         category_id = COALESCE(VALUES(category_id), category_id),
         stock_code = COALESCE(VALUES(stock_code), stock_code),
         name = VALUES(name),
         description = COALESCE(VALUES(description), description),
         brand_id = COALESCE(VALUES(brand_id), brand_id),
         brand_name = COALESCE(VALUES(brand_name), brand_name),
         vat_rate = COALESCE(VALUES(vat_rate), vat_rate),
         selling_price = COALESCE(VALUES(selling_price), selling_price),
         original_price = COALESCE(VALUES(original_price), original_price),
         quantity = COALESCE(VALUES(quantity), quantity),
         status = VALUES(status),
         on_sale = VALUES(on_sale),
         sale_off_reason = VALUES(sale_off_reason),
         images = COALESCE(VALUES(images), images),
         attributes = COALESCE(VALUES(attributes), attributes),
         raw_payload = COALESCE(VALUES(raw_payload), raw_payload),
         last_synced_at = NOW(3),
         id = LAST_INSERT_ID(id)`,
      [
        input.domain,
        input.supplierId,
        input.storeId ?? null,
        input.categoryId ?? null,
        input.tgoProductId ?? null,
        input.barcode ?? null,
        input.stockCode ?? null,
        input.name,
        input.description ?? null,
        input.brandId ?? null,
        input.brandName ?? null,
        input.vatRate ?? null,
        input.sellingPrice ?? null,
        input.originalPrice ?? null,
        input.quantity ?? null,
        input.status ?? 'ACTIVE',
        input.onSale === false ? 0 : 1,
        input.saleOffReason ?? null,
        input.images === undefined ? null : JSON.stringify(input.images),
        input.attributes === undefined ? null : JSON.stringify(input.attributes),
        input.rawPayload === undefined ? null : JSON.stringify(input.rawPayload),
      ],
    );
    return Number((result as { insertId: number }).insertId);
  }

  async findIdByBarcode(
    domain: TgoDomain,
    storeId: number | null,
    barcode: string,
  ): Promise<number | null> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      `SELECT id FROM products
        WHERE domain = ? AND barcode = ? AND (store_id <=> ?)
        LIMIT 1`,
      [domain, barcode, storeId],
    );
    const row = rows[0];
    return row ? Number(row.id) : null;
  }

  async list(params: {
    domain?: TgoDomain;
    storeId?: number;
    status?: 'ACTIVE' | 'PASSIVE';
    limit?: number;
    offset?: number;
  }): Promise<unknown[]> {
    const where: string[] = [];
    const values: Array<string | number> = [];
    if (params.domain) {
      where.push('domain = ?');
      values.push(params.domain);
    }
    if (params.storeId !== undefined) {
      where.push('store_id = ?');
      values.push(params.storeId);
    }
    if (params.status) {
      where.push('status = ?');
      values.push(params.status);
    }
    const limit = Math.min(Math.max(params.limit ?? 100, 1), 1000);
    const offset = Math.max(params.offset ?? 0, 0);
    const [rows] = await this.db.query(
      `SELECT * FROM products ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
        ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
      values,
    );
    return rows as unknown[];
  }
}
