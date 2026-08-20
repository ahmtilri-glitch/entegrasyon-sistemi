/**
 * Ornek: STAGE ortaminda market test siparisi olusturur (yalnizca stage destekler).
 * Kullanim: npx tsx scripts/stage-test-order.ts <storeId> <barkod>
 */
import { closePool } from '../src/db/pool.js';
import { loadConfig } from '../src/config/index.js';
import { logger } from '../src/core/logger.js';
import { createTgoClients } from '../src/services/tgoClientFactory.js';

const [storeId, barcode] = process.argv.slice(2);
const config = loadConfig();

if (config.tgo.environment !== 'STAGE') {
  logger.error('Test siparisi yalnizca STAGE ortaminda olusturulabilir.');
  process.exit(1);
}

if (!storeId || !barcode) {
  logger.error('Kullanim: npx tsx scripts/stage-test-order.ts <storeId> <barkod>');
  process.exit(1);
}

const clients = createTgoClients();

try {
  const result = await clients.testOrders.createGroceryTestOrder({
    address: {
      addressText: 'Ornek Mah. Test Sok. No 1',
      city: 'Istanbul',
      district: 'Kadikoy',
      neighborhood: 'Ornek',
      latitude: '40.9900',
      longitude: '29.0300',
      phone: '5550000000',
    },
    customer: {
      customerFirstName: 'Test',
      customerLastName: 'Musteri',
      customerNote: 'Entegrasyon testi',
    },
    lines: [{ barcode, quantity: 1 }],
    store: {
      deliveryModel: 'STORE',
      isProvisionedSeller: false,
      scheduleType: 'INSTANT',
      sellerId: String(config.tgo.supplierId),
      sellerType: 'GROCERY',
      storeId,
    },
    similarProduct: 'CANCEL_NON_EXIST_PRODUCT',
  });
  logger.info('Test siparisi olusturuldu', result);
} finally {
  await closePool();
}
