import { Router } from 'express';
import type { TgoDomain } from '../../config/index.js';
import { ValidationError } from '../../core/errors.js';
import { OrderRepository } from '../../db/repositories/orderRepository.js';
import { OrderService } from '../../services/orderService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

function readDomain(value: unknown): TgoDomain {
  const domain = String(value ?? '').toUpperCase();
  if (domain !== 'MEAL' && domain !== 'GROCERY') {
    throw new ValidationError('domain yalnizca MEAL veya GROCERY olabilir');
  }
  return domain;
}

function readNumber(value: unknown, field: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new ValidationError(`${field} sayisal olmalidir`);
  }
  return parsed;
}

export function createOrderRouter(
  service: OrderService = new OrderService(),
  repository: OrderRepository = new OrderRepository(),
): Router {
  const router = Router();

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const rows = await repository.list({
        domain: req.query.domain ? readDomain(req.query.domain) : undefined,
        status: req.query.status ? String(req.query.status) : undefined,
        limit: req.query.limit ? readNumber(req.query.limit, 'limit') : undefined,
        offset: req.query.offset ? readNumber(req.query.offset, 'offset') : undefined,
      });
      res.json({ content: rows });
    }),
  );

  router.get(
    '/:domain/:tgoOrderId',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const order = await repository.findByTgoOrderId(domain, String(req.params.tgoOrderId));
      if (!order) {
        res.status(404).json({ message: 'Siparis bulunamadi' });
        return;
      }
      const items = await repository.findItems(Number(order.id));
      res.json({ order, items });
    }),
  );

  /** TGO'dan tekrar cekip veritabanini gunceller. */
  router.post(
    '/:domain/:tgoOrderId/refresh',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const result = await service.refreshPackage(domain, String(req.params.tgoOrderId), 'MANUAL');
      res.json({ orderId: result.orderId, status: result.normalized.status });
    }),
  );

  router.post(
    '/:domain/:tgoOrderId/accept',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const preparationTime =
        req.body?.preparationTime === undefined
          ? undefined
          : readNumber(req.body.preparationTime, 'preparationTime');
      await service.accept(domain, String(req.params.tgoOrderId), preparationTime);
      res.json({ status: 'Picking' });
    }),
  );

  router.post(
    '/:domain/:tgoOrderId/prepared',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      await service.markPrepared({
        domain,
        tgoOrderId: String(req.params.tgoOrderId),
        invoiceAmount: req.body?.invoiceAmount ?? null,
        bagCount: req.body?.bagCount ?? null,
        receiptLink: req.body?.receiptLink ?? null,
        invoiceTaxAmount: req.body?.invoiceTaxAmount ?? null,
        actualDate: req.body?.actualDate,
      });
      res.json({ status: 'Invoiced' });
    }),
  );

  router.post(
    '/:domain/:tgoOrderId/shipped',
    asyncHandler(async (req, res) => {
      await service.markShipped(readDomain(req.params.domain), String(req.params.tgoOrderId));
      res.json({ status: 'Shipped' });
    }),
  );

  router.post(
    '/:domain/:tgoOrderId/delivered',
    asyncHandler(async (req, res) => {
      await service.markDelivered(readDomain(req.params.domain), String(req.params.tgoOrderId));
      res.json({ status: 'Delivered' });
    }),
  );

  router.post(
    '/:domain/:tgoOrderId/cancel',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      await service.cancel({
        domain,
        tgoOrderId: String(req.params.tgoOrderId),
        reasonId: readNumber(req.body?.reasonId, 'reasonId'),
        itemIdList: Array.isArray(req.body?.itemIdList) ? req.body.itemIdList.map(String) : undefined,
        description: req.body?.description,
        causedCancelPackageItemIds: req.body?.causedCancelPackageItemIds,
      });
      res.json({ status: 'UnSupplied' });
    }),
  );

  /** Manuel senkronizasyon: verilen tarih araligindaki paketleri ceker. */
  router.post(
    '/sync',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.body?.domain);
      const endDate = req.body?.endDate ? readNumber(req.body.endDate, 'endDate') : Date.now();
      const startDate = req.body?.startDate
        ? readNumber(req.body.startDate, 'startDate')
        : endDate - 60 * 60 * 1000;
      const result = await service.syncPackages({
        domain,
        storeId: req.body?.storeId ? String(req.body.storeId) : undefined,
        statuses: Array.isArray(req.body?.statuses) ? req.body.statuses.map(String) : undefined,
        startDate,
        endDate,
      });
      res.json(result);
    }),
  );

  return router;
}
