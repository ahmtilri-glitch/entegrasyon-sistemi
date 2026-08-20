import type { TgoDomain } from '../config/index.js';
import { NotFoundError } from '../core/errors.js';
import { logger } from '../core/logger.js';
import { OrderRepository, type OrderSource } from '../db/repositories/orderRepository.js';
import { StoreRepository } from '../db/repositories/storeRepository.js';
import type { TgoPackage } from '../types/order.js';
import { normalizePackage, type NormalizedOrder } from './orderNormalizer.js';
import { getTgoClients, type TgoClients } from './tgoClientFactory.js';

export interface PersistResult {
  orderId: number;
  normalized: NormalizedOrder;
}

/** Siparis okuma, kaydetme ve statu gecislerini yoneten servis. */
export class OrderService {
  private readonly clients: TgoClients;
  private readonly orders: OrderRepository;
  private readonly stores: StoreRepository;

  constructor(
    clients: TgoClients = getTgoClients(),
    orders: OrderRepository = new OrderRepository(),
    stores: StoreRepository = new StoreRepository(),
  ) {
    this.clients = clients;
    this.orders = orders;
    this.stores = stores;
  }

  async persistPackage(
    domain: TgoDomain,
    pkg: TgoPackage,
    source: OrderSource = 'POLLING',
  ): Promise<PersistResult> {
    const normalized = normalizePackage(domain, pkg, this.clients.config.tgo.supplierId);
    const storeId = normalized.tgoStoreId
      ? await this.stores.upsert({
          domain,
          supplierId: normalized.supplierId,
          tgoStoreId: normalized.tgoStoreId,
        })
      : null;
    const orderId = await this.orders.upsertOrder(normalized, { storeId, source });
    return { orderId, normalized };
  }

  /** TGO'dan paketi tekrar cekip veritabanini gunceller. */
  async refreshPackage(
    domain: TgoDomain,
    tgoOrderId: string,
    source: OrderSource = 'WEBHOOK',
  ): Promise<PersistResult> {
    const pkg = await this.fetchPackage(domain, tgoOrderId);
    return this.persistPackage(domain, pkg, source);
  }

  async fetchPackage(domain: TgoDomain, tgoOrderId: string): Promise<TgoPackage> {
    if (domain === 'MEAL') {
      return this.clients.meal.orders.getPackage(tgoOrderId);
    }
    const page = await this.clients.grocery.orders.getPackageById(tgoOrderId);
    const pkg = page.content?.[0];
    if (!pkg) {
      throw new NotFoundError(`Market paketi bulunamadi: ${tgoOrderId}`);
    }
    return pkg;
  }

  /** Belirtilen zaman araligindaki paketleri sayfalayarak ceker ve kaydeder. */
  async syncPackages(params: {
    domain: TgoDomain;
    storeId?: string;
    startDate: number;
    endDate: number;
    statuses?: string[];
    pageSize?: number;
  }): Promise<{ fetched: number; persisted: number }> {
    const pageSize = params.pageSize ?? (params.domain === 'MEAL' ? 50 : 200);
    let page = 0;
    let fetched = 0;
    let persisted = 0;
    let totalPages = 1;

    while (page < totalPages) {
      const response =
        params.domain === 'MEAL'
          ? await this.clients.meal.orders.getPackages({
              storeId: params.storeId,
              packageStatuses: params.statuses,
              packageModificationStartDate: params.startDate,
              packageModificationEndDate: params.endDate,
              page,
              size: pageSize,
            })
          : await this.clients.grocery.orders.getPackages({
              storeId: params.storeId,
              status: params.statuses,
              startDate: params.startDate,
              endDate: params.endDate,
              page,
              size: pageSize,
            });

      const content = response.content ?? [];
      fetched += content.length;
      totalPages = Math.max(response.totalPages ?? 1, 1);

      for (const pkg of content) {
        try {
          await this.persistPackage(params.domain, pkg, 'POLLING');
          persisted += 1;
        } catch (error) {
          logger.error('Siparis kaydedilemedi', {
            domain: params.domain,
            packageId: pkg.id,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      page += 1;
      if (content.length === 0) break;
    }

    return { fetched, persisted };
  }

  /** Siparisi kabul eder (Yemek: preparationTime zorunlu). */
  async accept(
    domain: TgoDomain,
    tgoOrderId: string,
    preparationTime?: number,
  ): Promise<void> {
    if (domain === 'MEAL') {
      await this.clients.meal.orders.accept({
        packageId: tgoOrderId,
        preparationTime: preparationTime ?? 30,
      });
    } else {
      await this.clients.grocery.orders.accept(tgoOrderId);
    }
    await this.orders.updateStatus(domain, tgoOrderId, 'Picking');
  }

  /** Hazirlik tamamlandi bildirimi (Yemek: invoiced, Market: invoiced + fatura tutari). */
  async markPrepared(params: {
    domain: TgoDomain;
    tgoOrderId: string;
    invoiceAmount?: number | null;
    bagCount?: number | null;
    receiptLink?: string | null;
    invoiceTaxAmount?: number | null;
    actualDate?: number;
  }): Promise<void> {
    if (params.domain === 'MEAL') {
      await this.clients.meal.orders.markPrepared({
        packageId: params.tgoOrderId,
        actualDate: params.actualDate,
      });
    } else {
      await this.clients.grocery.orders.markPrepared({
        packageId: params.tgoOrderId,
        invoiceAmount: params.invoiceAmount ?? null,
        bagCount: params.bagCount ?? null,
        receiptLink: params.receiptLink ?? null,
        invoiceTaxAmount: params.invoiceTaxAmount ?? null,
      });
    }
    await this.orders.updateStatus(params.domain, params.tgoOrderId, 'Invoiced');
  }

  async markShipped(domain: TgoDomain, tgoOrderId: string): Promise<void> {
    if (domain === 'MEAL') {
      await this.clients.meal.orders.markShippedByRestaurantCourier(tgoOrderId);
    } else {
      await this.clients.grocery.orders.markShippedByOwnCourier(tgoOrderId);
    }
    await this.orders.updateStatus(domain, tgoOrderId, 'Shipped');
  }

  async markDelivered(domain: TgoDomain, tgoOrderId: string): Promise<void> {
    if (domain === 'MEAL') {
      await this.clients.meal.orders.markDeliveredByRestaurantCourier(tgoOrderId);
    } else {
      await this.clients.grocery.orders.markDeliveredByOwnCourier(tgoOrderId);
    }
    await this.orders.updateStatus(domain, tgoOrderId, 'Delivered');
  }

  /** Kismi/tam iptal: itemIdList verilmezse siparisin tum packageItemId'leri kullanilir. */
  async cancel(params: {
    domain: TgoDomain;
    tgoOrderId: string;
    reasonId: number;
    itemIdList?: string[];
    description?: string;
    causedCancelPackageItemIds?: string[];
  }): Promise<void> {
    const itemIdList = params.itemIdList ?? (await this.collectPackageItemIds(params.domain, params.tgoOrderId));
    if (params.domain === 'MEAL') {
      await this.clients.meal.orders.cancel({
        packageId: params.tgoOrderId,
        itemIdList,
        reasonId: params.reasonId,
      });
    } else {
      await this.clients.grocery.orders.markUnsupplied({
        packageId: params.tgoOrderId,
        itemIdList,
        reasonId: params.reasonId,
        description: params.description,
        causedCancelPackageItemIds: params.causedCancelPackageItemIds,
      });
    }
    await this.orders.updateStatus(params.domain, params.tgoOrderId, 'UnSupplied');
  }

  private async collectPackageItemIds(domain: TgoDomain, tgoOrderId: string): Promise<string[]> {
    const order = await this.orders.findByTgoOrderId(domain, tgoOrderId);
    if (!order) {
      throw new NotFoundError(`Siparis veritabaninda bulunamadi: ${tgoOrderId}`);
    }
    const items = await this.orders.findItems(Number(order.id));
    const ids = items
      .map((item) => (item.package_item_id === null ? null : String(item.package_item_id)))
      .filter((value): value is string => value !== null);
    if (ids.length === 0) {
      throw new NotFoundError(`Siparis icin packageItemId bulunamadi: ${tgoOrderId}`);
    }
    return ids;
  }
}
