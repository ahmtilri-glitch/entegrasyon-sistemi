import { Router } from 'express';
import { ApiLogRepository } from '../../db/repositories/apiLogRepository.js';
import { WebhookRepository } from '../../db/repositories/webhookRepository.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export function createLogRouter(
  apiLogs: ApiLogRepository = new ApiLogRepository(),
  webhooks: WebhookRepository = new WebhookRepository(),
): Router {
  const router = Router();

  router.get(
    '/api',
    asyncHandler(async (req, res) => {
      const rows = await apiLogs.list({
        operation: req.query.operation ? String(req.query.operation) : undefined,
        success:
          req.query.success === undefined ? undefined : String(req.query.success) === 'true',
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
      });
      res.json({ content: rows });
    }),
  );

  router.get(
    '/webhooks',
    asyncHandler(async (req, res) => {
      const rows = await webhooks.list({
        status: req.query.status ? String(req.query.status) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
      });
      res.json({ content: rows });
    }),
  );

  return router;
}
