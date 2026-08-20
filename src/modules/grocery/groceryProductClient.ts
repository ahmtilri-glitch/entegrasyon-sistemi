import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';
import { assertBatchSize, chunkArray } from '../meal/mealMenuClient.js';
import { ValidationError } from '../../core/errors.js';
import type {
  BatchRequestResponse,
  BatchRequestResult,
  PagedResponse,
} from '../../types/common.js';

export type SaleOffReason = 'UNSUPPLIED' | 'SEASONAL_PRODUCT' | 'SELLER_CLOSED' | 'ARCHIVED';

export interface GroceryProductCreateItem {
  barcode: string;
  title: string;
  brandId: number;
  categoryId: number;
  vatRate: number;
  description?: string;
  stockCode?: string;
  images?: Array<{ url: string }>;
}

export interface GroceryProductUpdateItem {
  barcode: string;
  title?: string;
  brandId?: number;
  vatRate?: number;
  description?: string;
  stockCode?: string;
  images?: Array<{ url: string }>;
}

export interface GroceryPriceInventoryItem {
  barcode: string;
  sellingPrice?: number;
  quantity?: number;
  /** Gonderilmezse tum subeler guncellenir. */
  storeId?: number;
}

export interface GroceryProductFilter {
  listType?: 'OUT_OF_STOCK' | 'REJECTED' | 'ON_SALE' | 'ALL_PRODUCT' | 'NOT_ON_SALE' | 'LOCKED';
  barcode?: string;
  startDate?: number;
  endDate?: number;
  stockCode?: string;
  brandIds?: number[];
  categoryIds?: number[];
  title?: string;
  page?: number;
  /** Maksimum 100 */
  size?: number;
  orderBy?: 'CREATED_DATE' | 'LAST_MODIFIED_DATE';
  order?: 'ASC' | 'DESC';
}

export interface GroceryProduct {
  id?: string;
  supplierId?: number;
  storeId?: number;
  barcode?: string;
  title?: string;
  description?: string;
  stockCode?: string;
  images?: Array<{ url: string }>;
  brand?: { id?: number; name?: string };
  category?: { id?: number; name?: string };
  quantity?: number | null;
  originalPrice?: number | null;
  sellingPrice?: number | null;
  onSale?: boolean;
  rejectedReasons?: string[] | null;
  createdDate?: number;
  lastModifiedDate?: number;
  attributes?: unknown;
  [key: string]: unknown;
}

export interface GroceryCategory {
  id: number;
  name: string;
  parentId: number | null;
  isActive?: boolean;
  leaf?: boolean;
  hierarchyPath?: string;
  sellerAttributes?: Array<{ id: number; name: string }>;
}

export interface GroceryBrand {
  id: number;
  name: string;
}

/** Market urun/katalog servisleri. */
export class GroceryProductClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** POST /integrator/product/grocery/suppliers/{supplierId}/products */
  async createProducts(items: GroceryProductCreateItem[]): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    for (const item of items) validateBarcode(item.barcode);
    const response = await this.http.post<BatchRequestResponse>({
      operation: 'grocery.createProducts',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products`,
      body: { items },
    });
    return response.data;
  }

  /** PUT /integrator/product/grocery/suppliers/{supplierId}/products */
  async updateProducts(items: GroceryProductUpdateItem[]): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    const response = await this.http.put<BatchRequestResponse>({
      operation: 'grocery.updateProducts',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products`,
      body: { items },
    });
    return response.data;
  }

  /**
   * POST .../products/price-and-inventory
   * Tek istekte en fazla 1000 item. Stok veya fiyat 0 gonderilirse urun satisa kapatilir.
   */
  async updatePriceAndInventory(
    items: GroceryPriceInventoryItem[],
  ): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    const response = await this.http.post<BatchRequestResponse>({
      operation: 'grocery.storeUpdatePriceAndInventory',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products/price-and-inventory`,
      body: { items },
    });
    return response.data;
  }

  async updatePriceAndInventoryChunked(
    items: GroceryPriceInventoryItem[],
  ): Promise<BatchRequestResponse[]> {
    const results: BatchRequestResponse[] = [];
    for (const chunk of chunkArray(items, 1000)) {
      results.push(await this.updatePriceAndInventory(chunk));
    }
    return results;
  }

  /** PUT .../products/sale-off */
  async saleOff(
    items: Array<{ barcode: string; saleOffReason: SaleOffReason; storeId?: number }>,
  ): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    const response = await this.http.put<BatchRequestResponse>({
      operation: 'grocery.saleOff',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products/sale-off`,
      body: { items },
    });
    return response.data;
  }

  /** PUT .../products/sale-on */
  async saleOn(
    items: Array<{ barcode: string; storeId?: number }>,
  ): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    const response = await this.http.put<BatchRequestResponse>({
      operation: 'grocery.saleOn',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products/sale-on`,
      body: { items },
    });
    return response.data;
  }

  /** POST .../products/seller-attributes - urun denetim bilgileri */
  async createSellerAttributes(
    items: Array<{ barcode: string; attributes: Array<{ id: number; value: string }> }>,
  ): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    const response = await this.http.post<BatchRequestResponse>({
      operation: 'grocery.createSellerAttribute',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products/seller-attributes`,
      body: { items },
    });
    return response.data;
  }

  /** GET .../stores/{storeId}/products - urun filtreleme v2 */
  async filterProducts(
    storeId: string | number,
    filter: GroceryProductFilter = {},
  ): Promise<PagedResponse<GroceryProduct>> {
    if (filter.size !== undefined && (filter.size < 1 || filter.size > 100)) {
      throw new ValidationError('Urun filtrelemede size 1-100 araliginda olmalidir.');
    }
    const response = await this.http.get<PagedResponse<GroceryProduct>>({
      operation: 'grocery.filterProducts',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/products`,
      query: {
        listType: filter.listType,
        barcode: filter.barcode,
        startDate: filter.startDate,
        endDate: filter.endDate,
        stockCode: filter.stockCode,
        brandIds: filter.brandIds,
        categoryIds: filter.categoryIds,
        title: filter.title,
        page: filter.page,
        size: filter.size,
        orderBy: filter.orderBy,
        order: filter.order,
      },
    });
    return response.data;
  }

  /** GET .../products/batch-requests/{batchRequestId} */
  async getBatchRequestResult(batchRequestId: string): Promise<BatchRequestResult> {
    const response = await this.http.get<BatchRequestResult>({
      operation: 'grocery.getBatchRequestResult',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products/batch-requests/${encodePath(batchRequestId)}`,
    });
    return response.data;
  }

  /** GET /integrator/product/grocery/categories */
  async getCategories(params: {
    page?: number;
    size?: number;
    withSellerAttributes?: boolean;
    leaf?: boolean;
  } = {}): Promise<GroceryCategory[]> {
    if (params.leaf && !params.withSellerAttributes) {
      throw new ValidationError('leaf parametresi icin withSellerAttributes=true gonderilmelidir.');
    }
    const response = await this.http.get<GroceryCategory[]>({
      operation: 'grocery.getCategoryTree',
      domain: 'GROCERY',
      path: '/integrator/product/grocery/categories',
      query: {
        page: params.page,
        size: params.size,
        withSellerAttributes: params.withSellerAttributes,
        leaf: params.leaf,
      },
    });
    return response.data;
  }

  /** GET /integrator/product/grocery/brands */
  async getBrands(params: { page?: number; size?: number } = {}): Promise<GroceryBrand[]> {
    const response = await this.http.get<GroceryBrand[]>({
      operation: 'grocery.getBrands',
      domain: 'GROCERY',
      path: '/integrator/product/grocery/brands',
      query: { page: params.page, size: params.size },
    });
    return response.data;
  }

  /** GET /integrator/product/grocery/brands/by-name?name={name} (buyuk/kucuk harfe duyarli) */
  async getBrandsByName(name: string): Promise<GroceryBrand[]> {
    const response = await this.http.get<GroceryBrand[]>({
      operation: 'grocery.getBrandsByName',
      domain: 'GROCERY',
      path: '/integrator/product/grocery/brands/by-name',
      query: { name },
    });
    return response.data;
  }

  /** POST .../products/bundles - Cok Al Az Ode urunleri (bundle) */
  async createBundles(
    items: Array<{
      barcode: string;
      storeId?: number;
      products: Array<{ barcode: string; quantity: number }>;
      promotion?: {
        type: 'PERCENTAGE' | 'AMOUNT';
        amount: number;
        startDate: number;
        endDate: number;
      };
    }>,
  ): Promise<BatchRequestResponse> {
    assertBatchSize(items.length);
    for (const item of items) {
      if (item.products.length < 1 || item.products.length > 2) {
        throw new ValidationError('Bundle icerisinde minimum 1, maksimum 2 urun bulunmalidir.');
      }
    }
    const response = await this.http.post<BatchRequestResponse>({
      operation: 'grocery.createBundles',
      domain: 'GROCERY',
      path: `/integrator/product/grocery/suppliers/${encodePath(this.supplierId)}/products/bundles`,
      body: { items },
    });
    return response.data;
  }
}

const FORBIDDEN_BARCODE_CHARS = /[?/&%+^'*_\s]/;

export function validateBarcode(barcode: string): void {
  if (barcode.length === 0 || barcode.length > 40) {
    throw new ValidationError('Barkod 1-40 karakter araliginda olmalidir.');
  }
  if (FORBIDDEN_BARCODE_CHARS.test(barcode)) {
    throw new ValidationError(
      'Barkod icerisinde "? / & % + ^ \' * _" ve bosluk gibi ozel karakterler kullanilamaz.',
    );
  }
}
