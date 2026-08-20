import type { TgoDomain } from '../config/index.js';
import { StoreRepository } from '../db/repositories/storeRepository.js';
import type { WorkingHour, WorkingStatus } from '../types/common.js';
import { getTgoClients, type TgoClients } from './tgoClientFactory.js';

/** Magaza/restoran durum ve calisma bilgisi yonetimi. */
export class StoreService {
  private readonly clients: TgoClients;
  private readonly stores: StoreRepository;

  constructor(
    clients: TgoClients = getTgoClients(),
    stores: StoreRepository = new StoreRepository(),
  ) {
    this.clients = clients;
    this.stores = stores;
  }

  async syncStores(domain: TgoDomain): Promise<number> {
    const supplierId = this.clients.config.tgo.supplierId;
    if (domain === 'MEAL') {
      const response = await this.clients.meal.stores.listRestaurants({ page: 0, size: 50 });
      const restaurants = response.stores ?? response.restaurants ?? response.content ?? [];
      for (const restaurant of restaurants) {
        await this.stores.upsert({
          domain,
          supplierId,
          tgoStoreId: String(restaurant.id ?? ''),
          name: restaurant.name ?? null,
          workingStatus: restaurant.workingStatus ?? restaurant.status ?? 'UNKNOWN',
          latitude: restaurant.latitude === undefined ? null : Number(restaurant.latitude),
          longitude: restaurant.longitude === undefined ? null : Number(restaurant.longitude),
          minDeliveryMinutes: restaurant.averageDeliveryTime?.min ?? null,
          maxDeliveryMinutes: restaurant.averageDeliveryTime?.max ?? null,
          workingHours: restaurant.workingHours ?? null,
          rawPayload: restaurant,
        });
      }
      return restaurants.length;
    }

    const response = await this.clients.grocery.stores.listStores({ page: 0, size: 50 });
    for (const store of response.groceries ?? []) {
      await this.stores.upsert({
        domain,
        supplierId,
        tgoStoreId: String(store.id),
        name: store.name ?? null,
        workingStatus: store.workingStatus ?? 'UNKNOWN',
        deliveryType: store.deliveryType ?? null,
        latitude: store.location?.latitude === undefined ? null : Number(store.location.latitude),
        longitude: store.location?.longitude === undefined ? null : Number(store.location.longitude),
        workingHours: store.workingHours ?? null,
        rawPayload: store,
      });
    }
    return (response.groceries ?? []).length;
  }

  async setWorkingStatus(
    domain: TgoDomain,
    tgoStoreId: string,
    status: WorkingStatus,
  ): Promise<void> {
    if (domain === 'MEAL') {
      await this.clients.meal.stores.setWorkingStatus(tgoStoreId, status);
    } else {
      await this.clients.grocery.stores.setWorkingStatus(tgoStoreId, status);
    }
    const storeRowId = await this.stores.upsert({
      domain,
      supplierId: this.clients.config.tgo.supplierId,
      tgoStoreId,
      workingStatus: status,
    });
    await this.stores.updateWorkingStatus(storeRowId, status);
  }

  async updateWorkingHours(
    domain: TgoDomain,
    tgoStoreId: string,
    workingHours: WorkingHour[],
  ): Promise<void> {
    if (domain === 'MEAL') {
      await this.clients.meal.stores.updateWorkingHours(tgoStoreId, workingHours);
    } else {
      await this.clients.grocery.stores.updateWorkingHours(tgoStoreId, workingHours);
    }
    await this.stores.upsert({
      domain,
      supplierId: this.clients.config.tgo.supplierId,
      tgoStoreId,
      workingHours,
    });
  }

  /** Gecici kapatma: magazayi kapatir ve verilen sure sonunda tekrar acar. */
  async temporaryClose(
    domain: TgoDomain,
    tgoStoreId: string,
    durationMinutes: number,
  ): Promise<{ reopenAt: string }> {
    await this.setWorkingStatus(domain, tgoStoreId, 'CLOSED');
    const reopenAt = new Date(Date.now() + durationMinutes * 60_000);
    setTimeout(
      () => {
        void this.setWorkingStatus(domain, tgoStoreId, 'OPEN');
      },
      durationMinutes * 60_000,
    ).unref();
    return { reopenAt: reopenAt.toISOString() };
  }

  async updateEta(
    domain: TgoDomain,
    tgoStoreId: string,
    min: number,
    max: number,
  ): Promise<void> {
    if (domain === 'MEAL') {
      await this.clients.meal.stores.updateAverageDeliveryTime(tgoStoreId, min, max);
    } else {
      await this.clients.grocery.stores.updateEta(tgoStoreId, min, max);
    }
    await this.stores.upsert({
      domain,
      supplierId: this.clients.config.tgo.supplierId,
      tgoStoreId,
      minDeliveryMinutes: min,
      maxDeliveryMinutes: max,
    });
  }
}
