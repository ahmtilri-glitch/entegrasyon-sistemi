import { Router } from 'express';
import type { TgoDomain } from '../../config/index.js';
import { ValidationError } from '../../core/errors.js';
import { StoreRepository } from '../../db/repositories/storeRepository.js';
import { StoreService } from '../../services/storeService.js';
import { getTgoClients, type TgoClients } from '../../services/tgoClientFactory.js';
import type { WorkingHour } from '../../types/common.js';
import { asyncHandler } from '../middleware/errorHandler.js';

function readDomain(value: unknown): TgoDomain {
  const domain = String(value ?? '').toUpperCase();
  if (domain !== 'MEAL' && domain !== 'GROCERY') {
    throw new ValidationError('domain yalnizca MEAL veya GROCERY olabilir');
  }
  return domain;
}

export function createStoreRouter(
  clients: TgoClients = getTgoClients(),
  service: StoreService = new StoreService(clients),
  repository: StoreRepository = new StoreRepository(),
): Router {
  const router = Router();

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const rows = await repository.list(
        req.query.domain ? readDomain(req.query.domain) : undefined,
      );
      res.json({ content: rows });
    }),
  );

  router.post(
    '/sync',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.body?.domain);
      res.json({ synced: await service.syncStores(domain) });
    }),
  );

  router.put(
    '/:domain/:storeId/status',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const status = String(req.body?.status ?? '').toUpperCase();
      if (status !== 'OPEN' && status !== 'CLOSED') {
        throw new ValidationError('status OPEN veya CLOSED olmalidir');
      }
      await service.setWorkingStatus(domain, String(req.params.storeId), status);
      res.json({ status });
    }),
  );

  /** Gecici kapatma: sure sonunda magaza otomatik tekrar acilir. */
  router.post(
    '/:domain/:storeId/temporary-close',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const minutes = Number(req.body?.durationMinutes);
      if (!Number.isFinite(minutes) || minutes <= 0) {
        throw new ValidationError('durationMinutes pozitif bir sayi olmalidir');
      }
      res.json(await service.temporaryClose(domain, String(req.params.storeId), minutes));
    }),
  );

  router.put(
    '/:domain/:storeId/working-hours',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const workingHours = req.body?.workingHours as WorkingHour[] | undefined;
      if (!Array.isArray(workingHours)) {
        throw new ValidationError('workingHours dizisi zorunludur');
      }
      await service.updateWorkingHours(domain, String(req.params.storeId), workingHours);
      res.json({ updated: workingHours.length });
    }),
  );

  router.put(
    '/:domain/:storeId/eta',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      await service.updateEta(
        domain,
        String(req.params.storeId),
        Number(req.body?.min),
        Number(req.body?.max),
      );
      res.json({ min: Number(req.body?.min), max: Number(req.body?.max) });
    }),
  );

  router.get(
    '/:domain/:storeId/delivery-areas',
    asyncHandler(async (req, res) => {
      const domain = readDomain(req.params.domain);
      const storeId = String(req.params.storeId);
      const data =
        domain === 'MEAL'
          ? await clients.meal.stores.getDeliveryAreas(storeId)
          : await clients.grocery.stores.getDeliveryAreas(storeId);
      res.json({ data });
    }),
  );

  /** Market: randevulu teslimat slotlari. */
  router.put(
    '/grocery/:storeId/slots',
    asyncHandler(async (req, res) => {
      const slots = req.body?.slots;
      if (!Array.isArray(slots)) throw new ValidationError('slots dizisi zorunludur');
      await clients.grocery.stores.upsertSlots(String(req.params.storeId), slots);
      res.json({ updated: slots.length });
    }),
  );

  return router;
}
