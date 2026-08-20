/**
 * Ornek: Market urunleri icin fiyat ve stok gunceller, batch sonucunu izler.
 * Kullanim: npx tsx scripts/update-grocery-stock.ts <storeId> <barkod> <fiyat> <stok>
 */
import { closePool } from '../src/db/pool.js';
import { logger } from '../src/core/logger.js';
import { CatalogService } from '../src/services/catalogService.js';
import { createTgoClients } from '../src/services/tgoClientFactory.js';

const [storeIdArg, barcode, priceArg, stockArg] = process.argv.slice(2);

if (!storeIdArg || !barcode || !priceArg || !stockArg) {
  logger.error('Kullanim: npx tsx scripts/update-grocery-stock.ts <storeId> <barkod> <fiyat> <stok>');
  process.exit(1);
}

const clients = createTgoClients();
const catalog = new CatalogService();

try {
  const batch = await clients.grocery.products.updatePriceAndInventory([
    {
      barcode,
      storeId: Number(storeIdArg),
      sellingPrice: Number(priceArg),
      quantity: Number(stockArg),
    },
  ]);
  logger.info('Toplu istek olusturuldu', { batchRequestId: batch.batchRequestId });

  const result = await catalog.trackBatchRequest(
    'GROCERY',
    batch.batchRequestId,
    'grocery.priceInventory',
  );
  logger.info('Toplu istek sonucu', {
    status: result.status,
    itemCount: result.itemCount,
    failedItemCount: result.failedItemCount,
  });
} finally {
  await closePool();
}
