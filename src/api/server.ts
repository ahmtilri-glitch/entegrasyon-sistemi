import { loadConfig } from '../config/index.js';
import { logger } from '../core/logger.js';
import { closePool } from '../db/pool.js';
import { createApp } from './app.js';

const config = loadConfig();
const app = createApp();

const server = app.listen(config.server.port, () => {
  logger.info('TGO entegrasyon servisi baslatildi', {
    port: config.server.port,
    environment: config.tgo.environment,
  });
});

async function shutdown(signal: string): Promise<void> {
  logger.info('Kapanis sinyali alindi', { signal });
  server.close(() => {
    void closePool().finally(() => process.exit(0));
  });
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
