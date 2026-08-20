import type { TgoDomain } from '../config/index.js';
import { logger } from '../core/logger.js';
import { BatchRequestRepository } from '../db/repositories/batchRequestRepository.js';
import { CategoryRepository } from '../db/repositories/categoryRepository.js';
import { ProductRepository } from '../db/repositories/productRepository.js';
import { StoreRepository } from '../db/repositories/storeRepository.js';
import type { BatchRequestResult } from '../types/common.js';
import { getTgoClients, type TgoClients } from './tgoClientFactory.js';

/** Menu/katalog senkronizasyonu ve toplu islem takibi. */
export class CatalogService {
  private readonly clients: TgoClients;
  private readonly products: ProductRepository;
  private readonly categories: CategoryRepository;
  private readonly stores: StoreRepository;
  private readonly batches: BatchRequestRepository;

  constructor(
    clients: TgoClients = getTgoClients(),
    products: ProductRepository = new ProductRepository(),
    categories: CategoryRepository = new CategoryRepository(),
    stores: StoreRepository = new StoreRepository(),
    batches: BatchRequestRepository = new BatchRequestRepository(),
  ) {
    this.clients = clients;
    this.products = products;
    this.categories = categories;
    this.stores = stores;
    this.batches = batches;
  }

  /** Yemek menusunu ceker; section ve urunleri veritabanina yazar. */
  async syncMealMenu(tgoStoreId: string): Promise<{ sections: number; products: number }> {
    const supplierId = this.clients.config.tgo.supplierId;
    const storeRowId = await this.stores.upsert({
      domain: 'MEAL',
      supplierId,
      tgoStoreId,
    });
    const menu = await this.clients.meal.menu.getMenu(tgoStoreId);
    const sections = menu.sections ?? [];
    let productCount = 0;

    for (const section of sections) {
      const tgoCategoryId = String(section.sectionId ?? section.id ?? '');
      if (tgoCategoryId === '') continue;
      const categoryRowId = await this.categories.upsert({
        domain: 'MEAL',
        supplierId,
        storeId: storeRowId,
        tgoCategoryId,
        name: section.name ?? tgoCategoryId,
        status: section.status ?? 'ACTIVE',
        rawPayload: section,
      });

      for (const product of section.products ?? []) {
        await this.products.upsert({
          domain: 'MEAL',
          supplierId,
          storeId: storeRowId,
          categoryId: categoryRowId,
          tgoProductId: String(product.productId ?? product.id ?? ''),
          name: product.name ?? 'Isimsiz urun',
          sellingPrice: product.sellingPrice ?? null,
          originalPrice: product.originalPrice ?? null,
          status: product.status ?? 'ACTIVE',
          rawPayload: product,
        });
        productCount += 1;
      }
    }

    for (const product of menu.products ?? []) {
      await this.products.upsert({
        domain: 'MEAL',
        supplierId,
        storeId: storeRowId,
        tgoProductId: String(product.productId ?? product.id ?? ''),
        name: product.name ?? 'Isimsiz urun',
        sellingPrice: product.sellingPrice ?? null,
        status: product.status ?? 'ACTIVE',
        rawPayload: product,
      });
      productCount += 1;
    }

    return { sections: sections.length, products: productCount };
  }

  /** Market urunlerini sayfalayarak ceker ve veritabanina yazar. */
  async syncGroceryProducts(
    tgoStoreId: string,
    listType: 'ALL_PRODUCT' | 'ON_SALE' | 'NOT_ON_SALE' | 'OUT_OF_STOCK' = 'ALL_PRODUCT',
  ): Promise<{ products: number }> {
    const supplierId = this.clients.config.tgo.supplierId;
    const storeRowId = await this.stores.upsert({
      domain: 'GROCERY',
      supplierId,
      tgoStoreId,
    });

    let page = 0;
    let totalPages = 1;
    let count = 0;

    while (page < totalPages) {
      const response = await this.clients.grocery.products.filterProducts(tgoStoreId, {
        listType,
        page,
        size: 100,
      });
      totalPages = Math.max(response.totalPages ?? 1, 1);
      const content = response.content ?? [];

      for (const product of content) {
        await this.products.upsert({
          domain: 'GROCERY',
          supplierId,
          storeId: storeRowId,
          tgoProductId: product.id ? String(product.id) : null,
          barcode: product.barcode ?? null,
          stockCode: product.stockCode ?? null,
          name: product.title ?? product.barcode ?? 'Isimsiz urun',
          description: product.description ?? null,
          brandId: product.brand?.id ?? null,
          brandName: product.brand?.name ?? null,
          sellingPrice: product.sellingPrice ?? null,
          originalPrice: product.originalPrice ?? null,
          quantity: product.quantity ?? null,
          status: product.onSale === false ? 'PASSIVE' : 'ACTIVE',
          onSale: product.onSale !== false,
          images: product.images ?? null,
          attributes: product.attributes ?? null,
          rawPayload: product,
        });
        count += 1;
      }

      page += 1;
      if (content.length === 0) break;
    }

    return { products: count };
  }

  /** Market kategori agacini kaydeder. */
  async syncGroceryCategories(): Promise<number> {
    const categories = await this.clients.grocery.products.getCategories({
      withSellerAttributes: true,
    });
    for (const category of categories) {
      await this.categories.upsert({
        domain: 'GROCERY',
        tgoCategoryId: String(category.id),
        parentTgoId: category.parentId === null ? null : String(category.parentId),
        name: category.name,
        status: category.isActive === false ? 'PASSIVE' : 'ACTIVE',
        isLeaf: category.leaf === true,
        hierarchyPath: category.hierarchyPath ?? null,
        sellerAttributes: category.sellerAttributes ?? null,
        rawPayload: category,
      });
    }
    return categories.length;
  }

  /** Toplu islem sonucunu TGO'dan sorgular ve kaydeder (sonuclar ~4 saat saklanir). */
  async trackBatchRequest(
    domain: TgoDomain,
    batchRequestId: string,
    operation: string,
  ): Promise<BatchRequestResult> {
    await this.batches.record({
      domain,
      batchRequestId,
      supplierId: this.clients.config.tgo.supplierId,
      operation,
    });
    const result =
      domain === 'MEAL'
        ? await this.clients.meal.menu.getBatchRequestResult(batchRequestId)
        : await this.clients.grocery.products.getBatchRequestResult(batchRequestId);
    await this.batches.saveResult(domain, batchRequestId, result);
    logger.info('Toplu islem sonucu guncellendi', {
      domain,
      batchRequestId,
      status: result.status,
      failedItemCount: result.failedItemCount,
    });
    return result;
  }
}
