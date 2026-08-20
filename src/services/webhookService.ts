import type { TgoDomain } from '../config/index.js';
import { logger } from '../core/logger.js';
import { WebhookRepository } from '../db/repositories/webhookRepository.js';
import type { TgoPackage } from '../types/order.js';
import { OrderService } from './orderService.js';

export interface WebhookHandleInput {
  domain: TgoDomain;
  payload: TgoPackage;
  headers: Record<string, unknown>;
  remoteIp: string | null;
}

export interface WebhookHandleResult {
  webhookId: number;
  duplicate: boolean;
  orderId: number | null;
}

/** TGO id + packageStatus kombinasyonu idempotency anahtaridir. */
export function buildIdempotencyKey(domain: TgoDomain, payload: TgoPackage): string {
  const id = payload.id ?? payload.orderNumber ?? 'unknown';
  const status = payload.packageStatus ?? 'unknown';
  const modified = payload.lastModifiedDate ?? '';
  return `${domain}:${id}:${status}:${modified}`;
}

export class WebhookService {
  private readonly webhooks: WebhookRepository;
  private readonly orders: OrderService;

  constructor(
    webhooks: WebhookRepository = new WebhookRepository(),
    orders: OrderService = new OrderService(),
  ) {
    this.webhooks = webhooks;
    this.orders = orders;
  }

  /**
   * Webhook'u kaydeder ve siparisi gunceller.
   * Ayni bildirim tekrar gelirse (idempotency) islem tekrarlanmaz.
   */
  async handle(input: WebhookHandleInput): Promise<WebhookHandleResult> {
    const payload = input.payload;
    const orderNumber = payload.orderNumber ?? payload.orderCode;
    const inserted = await this.webhooks.insert({
      domain: input.domain,
      eventType: String(payload.packageStatus ?? 'Unknown'),
      tgoOrderId: payload.id ? String(payload.id) : null,
      tgoOrderNumber: orderNumber === undefined || orderNumber === null ? null : String(orderNumber),
      supplierId: Number(payload.supplierId ?? payload.sellerId ?? 0) || null,
      tgoStoreId: payload.storeId === undefined ? null : String(payload.storeId),
      idempotencyKey: buildIdempotencyKey(input.domain, payload),
      headers: input.headers,
      payload,
      remoteIp: input.remoteIp,
    });

    if (inserted.duplicate) {
      logger.info('Tekrarli webhook yok sayildi', {
        webhookId: inserted.id,
        packageId: payload.id,
      });
      return { webhookId: inserted.id, duplicate: true, orderId: null };
    }

    try {
      const result = await this.orders.persistPackage(input.domain, payload, 'WEBHOOK');
      await this.webhooks.markProcessed(inserted.id);
      return { webhookId: inserted.id, duplicate: false, orderId: result.orderId };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.webhooks.markFailed(inserted.id, message);
      throw error;
    }
  }
}
