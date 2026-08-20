/**
 * Ornek: Yemek paketlerini ceker ve veritabanina yazar.
 * Kullanim: npx tsx scripts/fetch-meal-orders.ts <storeId> [saat]
 */
import { closePool } from '../src/db/pool.js';
import { logger } from '../src/core/logger.js';
import { OrderService } from '../src/services/orderService.js';

const storeId = process.argv[2];
const hours = Number(process.argv[3] ?? 1);

if (!storeId) {
  logger.error('Kullanim: npx tsx scripts/fetch-meal-orders.ts <storeId> [saat]');
  process.exit(1);
}

const now = Date.now();
const orders = new OrderService();

try {
  const result = await orders.syncPackages({
    domain: 'MEAL',
    storeId,
    startDate: now - hours * 60 * 60 * 1000,
    endDate: now,
    statuses: ['Created', 'Picking', 'Invoiced', 'Shipped'],
  });
  logger.info('Yemek siparisleri senkronize edildi', result);
} finally {
  await closePool();
}
