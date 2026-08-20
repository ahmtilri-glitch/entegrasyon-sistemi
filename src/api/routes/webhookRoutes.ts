import { Router } from 'express';
import type { TgoDomain } from '../../config/index.js';
import { ValidationError } from '../../core/errors.js';
import { WebhookService } from '../../services/webhookService.js';
import type { TgoPackage } from '../../types/order.js';
import { webhookBasicAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * TGO webhook dinleyicisi.
 * TGO 2xx disindaki her cevabi basarisiz sayar ve tekrar dener;
 * bu nedenle kayit basarili oldugunda hemen 200 doneriz.
 */
export function createWebhookRouter(service: WebhookService = new WebhookService()): Router {
  const router = Router();

  const handle = (domain: TgoDomain) =>
    asyncHandler(async (req, res) => {
      const payload = req.body as TgoPackage | undefined;
      if (!payload || typeof payload !== 'object' || payload.id === undefined) {
        throw new ValidationError('Webhook govdesinde paket id bilgisi bulunamadi');
      }
      const result = await service.handle({
        domain,
        payload,
        headers: req.headers as Record<string, unknown>,
        remoteIp: req.ip ?? null,
      });
      res.status(200).json({ received: true, duplicate: result.duplicate });
    });

  router.post('/meal', webhookBasicAuth, handle('MEAL'));
  router.post('/grocery', webhookBasicAuth, handle('GROCERY'));
  /** TGO tanimlarinda opsiyonel path parametreleri kullanilabilir. */
  router.post('/meal/:sellerId/:storeId/:orderId/:status', webhookBasicAuth, handle('MEAL'));
  router.post('/grocery/:sellerId/:storeId/:orderId/:status', webhookBasicAuth, handle('GROCERY'));

  return router;
}
