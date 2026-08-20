import type { RowDataPacket } from 'mysql2';
import type { TgoDomain } from '../../config/index.js';
import type { NormalizedOrder } from '../../services/orderNormalizer.js';
import { getPool, withTransaction, type Executor } from '../pool.js';

export type OrderSource = 'POLLING' | 'WEBHOOK' | 'MANUAL';

function json(value: unknown): string | null {
  return value === null || value === undefined ? null : JSON.stringify(value);
}

export class OrderRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  /** Siparisi ve kalemlerini tek transaction icinde upsert eder. */
  async upsertOrder(
    order: NormalizedOrder,
    options: { storeId?: number | null; source?: OrderSource } = {},
  ): Promise<number> {
    return withTransaction(async (connection) => {
      const [result] = await connection.execute(
        `INSERT INTO orders
          (domain, tgo_order_id, tgo_order_number, tgo_order_internal_id, supplier_id, store_id,
           tgo_store_id, status, previous_status, delivery_model, delivery_type, schedule_type,
           time_slot_id, zone_id, is_store_pickup, customer_id, customer_first_name,
           customer_last_name, customer_email, customer_phone, customer_note, shipment_address,
           invoice_address, currency_code, gross_amount, total_discount, total_price, total_cargo,
           seller_invoice_amount, invoice_tax_amount, payment_type, coupons, promotions, cancel_info,
           eta_text, estimated_delivery_start, estimated_delivery_end, order_date,
           last_modified_date, seller_accepted, seller_accepted_at, is_courier_nearby, receipt_link,
           source, raw_payload)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                 ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           tgo_order_number = COALESCE(VALUES(tgo_order_number), tgo_order_number),
           tgo_order_internal_id = COALESCE(VALUES(tgo_order_internal_id), tgo_order_internal_id),
           store_id = COALESCE(VALUES(store_id), store_id),
           tgo_store_id = COALESCE(VALUES(tgo_store_id), tgo_store_id),
           previous_status = orders.status,
           status = VALUES(status),
           delivery_model = COALESCE(VALUES(delivery_model), delivery_model),
           delivery_type = COALESCE(VALUES(delivery_type), delivery_type),
           schedule_type = COALESCE(VALUES(schedule_type), schedule_type),
           time_slot_id = COALESCE(VALUES(time_slot_id), time_slot_id),
           zone_id = COALESCE(VALUES(zone_id), zone_id),
           is_store_pickup = VALUES(is_store_pickup),
           customer_id = COALESCE(VALUES(customer_id), customer_id),
           customer_first_name = COALESCE(VALUES(customer_first_name), customer_first_name),
           customer_last_name = COALESCE(VALUES(customer_last_name), customer_last_name),
           customer_email = COALESCE(VALUES(customer_email), customer_email),
           customer_phone = COALESCE(VALUES(customer_phone), customer_phone),
           customer_note = COALESCE(VALUES(customer_note), customer_note),
           shipment_address = COALESCE(VALUES(shipment_address), shipment_address),
           invoice_address = COALESCE(VALUES(invoice_address), invoice_address),
           gross_amount = COALESCE(VALUES(gross_amount), gross_amount),
           total_discount = COALESCE(VALUES(total_discount), total_discount),
           total_price = COALESCE(VALUES(total_price), total_price),
           total_cargo = COALESCE(VALUES(total_cargo), total_cargo),
           seller_invoice_amount = COALESCE(VALUES(seller_invoice_amount), seller_invoice_amount),
           invoice_tax_amount = COALESCE(VALUES(invoice_tax_amount), invoice_tax_amount),
           payment_type = COALESCE(VALUES(payment_type), payment_type),
           coupons = COALESCE(VALUES(coupons), coupons),
           promotions = COALESCE(VALUES(promotions), promotions),
           cancel_info = COALESCE(VALUES(cancel_info), cancel_info),
           eta_text = COALESCE(VALUES(eta_text), eta_text),
           estimated_delivery_start = COALESCE(VALUES(estimated_delivery_start), estimated_delivery_start),
           estimated_delivery_end = COALESCE(VALUES(estimated_delivery_end), estimated_delivery_end),
           order_date = COALESCE(VALUES(order_date), order_date),
           last_modified_date = COALESCE(VALUES(last_modified_date), last_modified_date),
           seller_accepted = VALUES(seller_accepted),
           seller_accepted_at = COALESCE(VALUES(seller_accepted_at), seller_accepted_at),
           is_courier_nearby = VALUES(is_courier_nearby),
           receipt_link = COALESCE(VALUES(receipt_link), receipt_link),
           source = VALUES(source),
           raw_payload = VALUES(raw_payload),
           id = LAST_INSERT_ID(id)`,
        [
          order.domain,
          order.tgoOrderId,
          order.tgoOrderNumber,
          order.tgoOrderInternalId,
          order.supplierId,
          options.storeId ?? null,
          order.tgoStoreId,
          order.status,
          order.previousStatus,
          order.deliveryModel,
          order.deliveryType,
          order.scheduleType,
          order.timeSlotId,
          order.zoneId,
          order.isStorePickup ? 1 : 0,
          order.customerId,
          order.customerFirstName,
          order.customerLastName,
          order.customerEmail,
          order.customerPhone,
          order.customerNote,
          json(order.shipmentAddress),
          json(order.invoiceAddress),
          order.currencyCode,
          order.grossAmount,
          order.totalDiscount,
          order.totalPrice,
          order.totalCargo,
          order.sellerInvoiceAmount,
          order.invoiceTaxAmount,
          order.paymentType,
          json(order.coupons),
          json(order.promotions),
          json(order.cancelInfo),
          order.etaText,
          order.estimatedDeliveryStart,
          order.estimatedDeliveryEnd,
          order.orderDate,
          order.lastModifiedDate,
          order.sellerAccepted ? 1 : 0,
          order.sellerAcceptedAt,
          order.isCourierNearby ? 1 : 0,
          order.receiptLink,
          options.source ?? 'POLLING',
          json(order.rawPayload),
        ],
      );

      const orderId = Number((result as { insertId: number }).insertId);

      for (const item of order.items) {
        await connection.execute(
          `INSERT INTO order_items
            (order_id, tgo_line_id, tgo_item_id, package_item_id, tgo_product_id, barcode, name,
             product_sale_name, brand_name, quantity, unit_price, amount, discount, vat_base_amount,
             sale_unit_value, sale_unit_type, is_cancelled, is_collected, is_alternative, modifiers,
             removed_ingredients, extra_ingredients, coupons, promotions, note, raw_payload)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             tgo_line_id = VALUES(tgo_line_id),
             tgo_product_id = COALESCE(VALUES(tgo_product_id), tgo_product_id),
             barcode = COALESCE(VALUES(barcode), barcode),
             name = COALESCE(VALUES(name), name),
             product_sale_name = COALESCE(VALUES(product_sale_name), product_sale_name),
             brand_name = COALESCE(VALUES(brand_name), brand_name),
             quantity = VALUES(quantity),
             unit_price = COALESCE(VALUES(unit_price), unit_price),
             amount = COALESCE(VALUES(amount), amount),
             discount = COALESCE(VALUES(discount), discount),
             vat_base_amount = COALESCE(VALUES(vat_base_amount), vat_base_amount),
             sale_unit_value = COALESCE(VALUES(sale_unit_value), sale_unit_value),
             sale_unit_type = COALESCE(VALUES(sale_unit_type), sale_unit_type),
             is_cancelled = VALUES(is_cancelled),
             is_collected = VALUES(is_collected),
             is_alternative = VALUES(is_alternative),
             modifiers = COALESCE(VALUES(modifiers), modifiers),
             removed_ingredients = COALESCE(VALUES(removed_ingredients), removed_ingredients),
             extra_ingredients = COALESCE(VALUES(extra_ingredients), extra_ingredients),
             coupons = COALESCE(VALUES(coupons), coupons),
             promotions = COALESCE(VALUES(promotions), promotions),
             note = COALESCE(VALUES(note), note),
             raw_payload = VALUES(raw_payload)`,
          [
            orderId,
            item.tgoLineId,
            item.tgoItemId,
            item.packageItemId,
            item.tgoProductId,
            item.barcode,
            item.name,
            item.productSaleName,
            item.brandName,
            item.quantity,
            item.unitPrice,
            item.amount,
            item.discount,
            item.vatBaseAmount,
            item.saleUnitValue,
            item.saleUnitType,
            item.isCancelled ? 1 : 0,
            item.isCollected ? 1 : 0,
            item.isAlternative ? 1 : 0,
            json(item.modifiers),
            json(item.removedIngredients),
            json(item.extraIngredients),
            json(item.coupons),
            json(item.promotions),
            item.note,
            json(item.rawPayload),
          ],
        );
      }

      return orderId;
    });
  }

  async updateStatus(domain: TgoDomain, tgoOrderId: string, status: string): Promise<void> {
    await this.db.execute(
      `UPDATE orders
          SET previous_status = status, status = ?
        WHERE domain = ? AND tgo_order_id = ?`,
      [status, domain, tgoOrderId],
    );
  }

  async findByTgoOrderId(domain: TgoDomain, tgoOrderId: string): Promise<RowDataPacket | null> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT * FROM orders WHERE domain = ? AND tgo_order_id = ? LIMIT 1',
      [domain, tgoOrderId],
    );
    return rows[0] ?? null;
  }

  async findItems(orderId: number): Promise<RowDataPacket[]> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT * FROM order_items WHERE order_id = ? ORDER BY id',
      [orderId],
    );
    return rows;
  }

  async list(params: {
    domain?: TgoDomain;
    status?: string;
    storeId?: number;
    from?: Date;
    to?: Date;
    limit?: number;
    offset?: number;
  }): Promise<RowDataPacket[]> {
    const where: string[] = [];
    const values: Array<string | number | Date> = [];
    if (params.domain) {
      where.push('domain = ?');
      values.push(params.domain);
    }
    if (params.status) {
      where.push('status = ?');
      values.push(params.status);
    }
    if (params.storeId !== undefined) {
      where.push('store_id = ?');
      values.push(params.storeId);
    }
    if (params.from) {
      where.push('created_at >= ?');
      values.push(params.from);
    }
    if (params.to) {
      where.push('created_at <= ?');
      values.push(params.to);
    }
    const limit = Math.min(Math.max(params.limit ?? 50, 1), 500);
    const offset = Math.max(params.offset ?? 0, 0);
    const [rows] = await this.db.query<RowDataPacket[]>(
      `SELECT * FROM orders ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
        ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      values,
    );
    return rows;
  }
}
