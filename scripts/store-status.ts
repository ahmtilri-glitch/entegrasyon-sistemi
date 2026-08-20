/**
 * Ornek: Magaza calisma durumunu degistirir veya gecici olarak kapatir.
 * Kullanim: npx tsx scripts/store-status.ts <MEAL|GROCERY> <storeId> <OPEN|CLOSED|CLOSE_FOR> [dakika]
 */
import { closePool } from '../src/db/pool.js';
import { logger } from '../src/core/logger.js';
import { StoreService } from '../src/services/storeService.js';

const [domainArg, storeId, action, minutesArg] = process.argv.slice(2);

if ((domainArg !== 'MEAL' && domainArg !== 'GROCERY') || !storeId || !action) {
  logger.error(
    'Kullanim: npx tsx scripts/store-status.ts <MEAL|GROCERY> <storeId> <OPEN|CLOSED|CLOSE_FOR> [dakika]',
  );
  process.exit(1);
}

const stores = new StoreService();

try {
  if (action === 'CLOSE_FOR') {
    const result = await stores.temporaryClose(domainArg, storeId, Number(minutesArg ?? 30));
    logger.info('Magaza gecici olarak kapatildi', result);
  } else if (action === 'OPEN' || action === 'CLOSED') {
    await stores.setWorkingStatus(domainArg, storeId, action);
    logger.info('Magaza durumu guncellendi', { storeId, status: action });
  } else {
    logger.error('Gecersiz islem', { action });
    process.exitCode = 1;
  }
} finally {
  await closePool();
}
