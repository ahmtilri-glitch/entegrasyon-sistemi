import { Router } from 'express';
import type { TgoDomain } from '../../config/index.js';
import { ValidationError } from '../../core/errors.js';
import { ProductRepository } from '../../db/repositories/productRepository.js';
import { CatalogService } from '../../services/catalogService.js';
import { getTgoClients, type TgoClients } from '../../services/tgoClientFactory.js';
import { asyncHandler } from '../middleware/errorHandler.js';

function readDomain(value: unknown): TgoDomain {
  const domain = String(value ?? '').toUpperCase();
  if (domain !== 'MEAL' && domain !== 'GROCERY') {
    throw new ValidationError('domain yalnizca MEAL veya GROCERY olabilir');
  }
  return domain;
}

export function createProductRouter(
  clients: TgoClients = getTgoClients(),
  catalog: CatalogService = new CatalogService(clients),
  repository: ProductRepository = new ProductRepository(),
): Router {
  const router = Router();

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const rows = await repository.list({
        domain: req.query.domain ? readDomain(req.query.domain) : undefined,
        storeId: req.query.storeId ? Number(req.query.storeId) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
      });
      res.json({ content: rows });
    }),
  );

  /** Yemek menusu veya Market katalogu senkronizasyonu. */
  router.post(
    '/sync',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.body?.domain);
      const storeId = String(req.body?.storeId ?? '');
      if (storeId === '') throw new ValidationError('storeId zorunludur');
      const result =
        domain === 'MEAL'
          ? await catalog.syncMealMenu(storeId)
          : await catalog.syncGroceryProducts(storeId);
      res.json(result);
    }),
  );

  /** Yemek: toplu fiyat guncelleme (max 1000 item). */
  router.post(
    '/meal/prices',
    asyncHandler(async (req, res) => {
      const items = req.body?.items;
      if (!Array.isArray(items)) throw new ValidationError('items dizisi zorunludur');
      const result = await clients.meal.menu.updatePrices(items);
      res.json(result);
    }),
  );

  /** Yemek: urun satisa acma/kapama. */
  router.put(
    '/meal/:storeId/:productId/status',
    asyncHandler(async (req, res) => {
      const status = String(req.body?.status ?? '').toUpperCase();
      if (status !== 'ACTIVE' && status !== 'PASSIVE') {
        throw new ValidationError('status ACTIVE veya PASSIVE olmalidir');
      }
      await clients.meal.menu.setProductStatus({
        storeId: String(req.params.storeId),
        productId: String(req.params.productId),
        status,
      });
      res.json({ status });
    }),
  );

  /** Yemek: kategori (section) satisa acma/kapama. */
  router.put(
    '/meal/:storeId/sections/:sectionId/status',
    asyncHandler(async (req, res) => {
      const status = String(req.body?.status ?? '').toUpperCase();
      if (status !== 'ACTIVE' && status !== 'PASSIVE') {
        throw new ValidationError('status ACTIVE veya PASSIVE olmalidir');
      }
      await clients.meal.menu.setSectionStatus({
        storeId: String(req.params.storeId),
        sectionId: String(req.params.sectionId),
        status,
      });
      res.json({ status });
    }),
  );

  /** Market: fiyat ve stok guncelleme (max 1000 item). */
  router.post(
    '/grocery/price-inventory',
    asyncHandler(async (req, res) => {
      const items = req.body?.items;
      if (!Array.isArray(items)) throw new ValidationError('items dizisi zorunludur');
      const result = await clients.grocery.products.updatePriceAndInventory(items);
      res.json(result);
    }),
  );

  /** Market: urun satisa acma. */
  router.post(
    '/grocery/sale-on',
    asyncHandler(async (req, res) => {
      const items = req.body?.items;
      if (!Array.isArray(items)) throw new ValidationError('items dizisi zorunludur');
      res.json(await clients.grocery.products.saleOn(items));
    }),
  );

  /** Market: urun satisa kapama. */
  router.post(
    '/grocery/sale-off',
    asyncHandler(async (req, res) => {
      const items = req.body?.items;
      if (!Array.isArray(items)) throw new ValidationError('items dizisi zorunludur');
      res.json(await clients.grocery.products.saleOff(items));
    }),
  );

  /** Toplu islem sonucu sorgulama. */
  router.get(
    '/batch-requests/:domain/:batchRequestId',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const result = await catalog.trackBatchRequest(
        domain,
        String(req.params.batchRequestId),
        'manual-check',
      );
      res.json(result);
    }),
  );

  return router;
}
