import { loadConfig } from '../config/index.js';
import { closePool } from '../db/pool.js';
import { logger } from '../core/logger.js';
import { OrderPollingWorker } from './orderPollingWorker.js';

const config = loadConfig();
const worker = new OrderPollingWorker();

if (!config.polling.enabled) {
  logger.warn('POLL_ENABLED=false, polling worker devre disi baslatildi');
}

worker.start();
logger.info('Siparis polling worker calisiyor', {
  intervalMs: config.polling.intervalMs,
  mealStoreIds: config.polling.mealStoreIds,
  groceryStoreIds: config.polling.groceryStoreIds,
});

const shutdown = (signal: string): void => {
  logger.info('Worker kapatiliyor', { signal });
  worker.stop();
  void closePool().finally(() => process.exit(0));
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
