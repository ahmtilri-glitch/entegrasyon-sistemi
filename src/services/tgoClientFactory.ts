import { loadConfig, type AppConfig } from '../config/index.js';
import { TgoHttpClient } from '../core/httpClient.js';
import { ApiLogRepository } from '../db/repositories/apiLogRepository.js';
import { MealClaimClient } from '../modules/meal/mealClaimClient.js';
import { MealMenuClient } from '../modules/meal/mealMenuClient.js';
import { MealOrderClient } from '../modules/meal/mealOrderClient.js';
import { MealReviewClient } from '../modules/meal/mealReviewClient.js';
import { MealStoreClient } from '../modules/meal/mealStoreClient.js';
import { GroceryClaimClient } from '../modules/grocery/groceryClaimClient.js';
import { GroceryOrderClient } from '../modules/grocery/groceryOrderClient.js';
import { GroceryProductClient } from '../modules/grocery/groceryProductClient.js';
import { GroceryStoreClient } from '../modules/grocery/groceryStoreClient.js';
import { TestOrderClient } from '../modules/grocery/groceryTestOrderClient.js';

export interface TgoClients {
  config: AppConfig;
  http: TgoHttpClient;
  meal: {
    orders: MealOrderClient;
    menu: MealMenuClient;
    stores: MealStoreClient;
    claims: MealClaimClient;
    reviews: MealReviewClient;
  };
  grocery: {
    orders: GroceryOrderClient;
    products: GroceryProductClient;
    stores: GroceryStoreClient;
    claims: GroceryClaimClient;
  };
  testOrders: TestOrderClient;
}

let cached: TgoClients | null = null;

/** Tum TGO istemcilerini tek noktadan olusturur; api_logs sink'i baglanir. */
export function createTgoClients(options: { persistLogs?: boolean } = {}): TgoClients {
  const config = loadConfig();
  const logRepository = options.persistLogs === false ? null : new ApiLogRepository();
  const http = new TgoHttpClient({
    config: config.tgo,
    logSink: logRepository ? (record) => logRepository.insert(record) : undefined,
  });
  const supplierId = config.tgo.supplierId;

  return {
    config,
    http,
    meal: {
      orders: new MealOrderClient(http, supplierId),
      menu: new MealMenuClient(http, supplierId),
      stores: new MealStoreClient(http, supplierId),
      claims: new MealClaimClient(http, supplierId),
      reviews: new MealReviewClient(http, supplierId),
    },
    grocery: {
      orders: new GroceryOrderClient(http, supplierId),
      products: new GroceryProductClient(http, supplierId),
      stores: new GroceryStoreClient(http, supplierId),
      claims: new GroceryClaimClient(http, supplierId),
    },
    testOrders: new TestOrderClient(http),
  };
}

export function getTgoClients(): TgoClients {
  if (!cached) cached = createTgoClients();
  return cached;
}

export function resetTgoClients(): void {
  cached = null;
}
