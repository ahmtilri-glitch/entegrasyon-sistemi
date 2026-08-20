import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';
import { ValidationError } from '../../core/errors.js';
import type { BatchRequestResponse, BatchRequestResult, ProductStatus } from '../../types/common.js';

export interface MealMenuProduct {
  id?: number | string;
  productId?: number | string;
  name?: string;
  sellingPrice?: number;
  originalPrice?: number;
  status?: ProductStatus;
  sectionId?: number | string;
  sectionName?: string;
  imageUrl?: string;
  description?: string;
  modifierGroups?: unknown;
  [key: string]: unknown;
}

export interface MealMenuSection {
  id?: number | string;
  sectionId?: number | string;
  name?: string;
  status?: ProductStatus;
  products?: MealMenuProduct[];
  [key: string]: unknown;
}

export interface MealMenuResponse {
  sections?: MealMenuSection[];
  products?: MealMenuProduct[];
  [key: string]: unknown;
}

export interface MealPriceUpdateItem {
  /** Gonderilmezse fiyat tum restoranlar icin guncellenir. */
  restaurantId?: number;
  productId: number | string;
  sellingPrice: number;
}

/** Yemek menu/urun servisleri. */
export class MealMenuClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** GET /integrator/product/meal/suppliers/{supplierId}/stores/{storeId}/products */
  async getMenu(storeId: string | number): Promise<MealMenuResponse> {
    const response = await this.http.get<MealMenuResponse>({
      operation: 'meal.getRestaurantProducts',
      domain: 'MEAL',
      path: `/integrator/product/meal/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/products`,
    });
    return response.data;
  }

  /**
   * POST /integrator/product/meal/suppliers/{supplierId}/products/price
   * Tek istekte en fazla 1000 item gonderilebilir.
   */
  async updatePrices(items: MealPriceUpdateItem[]): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    const response = await this.http.post<BatchRequestResponse>({
      operation: 'meal.updatePrice',
      domain: 'MEAL',
      path: `/integrator/product/meal/suppliers/${encodePath(this.supplierId)}/products/price`,
      body: { items },
    });
    return response.data;
  }

  /** 1000'lik parcalara bolerek fiyat gunceller. */
  async updatePricesChunked(items: MealPriceUpdateItem[]): Promise<BatchRequestResponse[]> {
    const results: BatchRequestResponse[] = [];
    for (const chunk of chunkArray(items, 1000)) {
      results.push(await this.updatePrices(chunk));
    }
    return results;
  }

  /** PUT .../stores/{storeId}/products/{productId}/status */
  async setProductStatus(params: {
    storeId: string | number;
    productId: string | number;
    status: ProductStatus;
  }): Promise<void> {
    await this.http.put({
      operation: 'meal.updateRestaurantProductStatus',
      domain: 'MEAL',
      path: `/integrator/product/meal/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(params.storeId)}/products/${encodePath(params.productId)}/status`,
      body: { status: params.status },
    });
  }

  /** PUT .../stores/{storeId}/sections/{sectionId}/status */
  async setSectionStatus(params: {
    storeId: string | number;
    sectionId: string | number;
    status: ProductStatus;
  }): Promise<void> {
    await this.http.put({
      operation: 'meal.updateRestaurantSectionStatus',
      domain: 'MEAL',
      path: `/integrator/product/meal/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(params.storeId)}/sections/${encodePath(params.sectionId)}/status`,
      body: { status: params.status },
    });
  }

  /** GET .../batch-requests/{batchRequestId} - sonuclara 4 saat boyunca erisilebilir. */
  async getBatchRequestResult(batchRequestId: string): Promise<BatchRequestResult> {
    const response = await this.http.get<BatchRequestResult>({
      operation: 'meal.getBatchRequestResult',
      domain: 'MEAL',
      path: `/integrator/product/meal/suppliers/${encodePath(this.supplierId)}/batch-requests/${encodePath(batchRequestId)}`,
    });
    return response.data;
  }
}

export function assertBatchSize(length: number, max = 1000): void {
  if (length < 1 || length > max) {
    throw new ValidationError(
      `Gonderdiginiz istekte liste eleman sayisi minimum 1, maximum ${max} olmalidir.`,
    );
  }
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
