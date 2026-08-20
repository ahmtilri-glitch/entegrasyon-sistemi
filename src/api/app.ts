import express, { type Express } from 'express';
import { logger } from '../core/logger.js';
import { panelApiKeyAuth } from './middleware/auth.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { createLogRouter } from './routes/logRoutes.js';
import { createOrderRouter } from './routes/orderRoutes.js';
import { createProductRouter } from './routes/productRoutes.js';
import { createStoreRouter } from './routes/storeRoutes.js';
import { createWebhookRouter } from './routes/webhookRoutes.js';

/** Yonetim paneli REST API'si ve TGO webhook dinleyicisi. */
export function createApp(): Express {
  const app = express();
  app.use(express.json({ limit: '2mb' }));
  app.set('trust proxy', true);

  app.use((req, _res, next) => {
    logger.debug('HTTP istegi', { method: req.method, path: req.path });
    next();
  });

  app.get('/health', (_req, res) => {
    res.json({ status: 'UP', timestamp: new Date().toISOString() });
  });

  app.use('/webhooks/tgo', createWebhookRouter());
  app.use('/api/orders', panelApiKeyAuth, createOrderRouter());
  app.use('/api/products', panelApiKeyAuth, createProductRouter());
  app.use('/api/stores', panelApiKeyAuth, createStoreRouter());
  app.use('/api/logs', panelApiKeyAuth, createLogRouter());

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
