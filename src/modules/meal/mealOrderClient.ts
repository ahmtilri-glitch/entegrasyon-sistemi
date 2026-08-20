import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';
import { ValidationError } from '../../core/errors.js';
import type { PagedResponse } from '../../types/common.js';
import type { TgoPackage } from '../../types/order.js';

export interface MealPackageQuery {
  storeId?: string | number;
  /** Ornek: ['Created','Picking'] -> packageStatuses=Created,Picking */
  packageStatuses?: string[];
  packageModificationStartDate?: number;
  packageModificationEndDate?: number;
  page?: number;
  /** Maksimum 50 */
  size?: number;
}

export interface MealPickedRequest {
  packageId: string;
  /** Paketi hazirlama suresi (dakika) */
  preparationTime: number;
}

export interface MealInvoicedRequest {
  packageId: string;
  /** Timestamp (ms); zorunlu degil */
  actualDate?: number;
}

export interface MealUnsuppliedRequest {
  packageId: string;
  /** Full iptal icin tum packageItemId degerleri gonderilmelidir. */
  itemIdList: string[];
  reasonId: number;
}

/** Yemek (meal) siparis servisleri. */
export class MealOrderClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** GET /integrator/order/meal/suppliers/{supplierId}/packages */
  async getPackages(query: MealPackageQuery = {}): Promise<PagedResponse<TgoPackage>> {
    if (query.size !== undefined && (query.size < 1 || query.size > 50)) {
      throw new ValidationError('Yemek paket sorgusunda size 1-50 araliginda olmalidir.');
    }
    const response = await this.http.get<PagedResponse<TgoPackage>>({
      operation: 'meal.getPackages',
      domain: 'MEAL',
      path: `/integrator/order/meal/suppliers/${encodePath(this.supplierId)}/packages`,
      query: {
        storeId: query.storeId,
        packageStatuses: query.packageStatuses?.join(','),
        packageModificationStartDate: query.packageModificationStartDate,
        packageModificationEndDate: query.packageModificationEndDate,
        page: query.page,
        size: query.size,
      },
    });
    return response.data;
  }

  /** GET /integrator/order/meal/suppliers/{supplierId}/packages/{packageId} */
  async getPackage(packageId: string): Promise<TgoPackage> {
    const response = await this.http.get<TgoPackage>({
      operation: 'meal.getPackage',
      domain: 'MEAL',
      path: `/integrator/order/meal/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(packageId)}`,
    });
    return response.data;
  }

  /** PUT .../packages/picked - siparisi kabul etme */
  async accept(request: MealPickedRequest): Promise<void> {
    if (request.preparationTime <= 0) {
      throw new ValidationError('preparationTime pozitif bir dakika degeri olmalidir.');
    }
    await this.http.put({
      operation: 'meal.picked',
      domain: 'MEAL',
      path: `/integrator/order/meal/suppliers/${encodePath(this.supplierId)}/packages/picked`,
      body: request,
    });
  }

  /** PUT .../packages/invoiced - siparis hazirliginin bitmesi */
  async markPrepared(request: MealInvoicedRequest): Promise<void> {
    await this.http.put({
      operation: 'meal.invoiced',
      domain: 'MEAL',
      path: `/integrator/order/meal/suppliers/${encodePath(this.supplierId)}/packages/invoiced`,
      body: { packageId: request.packageId, actualDate: request.actualDate ?? Date.now() },
    });
  }

  /** PUT .../packages/{packageId}/manual-shipped - restoran kuryesi yola cikti */
  async markShippedByRestaurantCourier(packageId: string): Promise<void> {
    await this.http.put({
      operation: 'meal.manualShipped',
      domain: 'MEAL',
      path: `/integrator/order/meal/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(packageId)}/manual-shipped`,
    });
  }

  /** PUT .../packages/{packageId}/manual-delivered - restoran kuryesi teslim etti */
  async markDeliveredByRestaurantCourier(packageId: string): Promise<void> {
    await this.http.put({
      operation: 'meal.manualDelivered',
      domain: 'MEAL',
      path: `/integrator/order/meal/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(packageId)}/manual-delivered`,
    });
  }

  /** PUT .../packages/unsupplied - kismi veya tam iptal */
  async cancel(request: MealUnsuppliedRequest): Promise<void> {
    if (request.itemIdList.length === 0) {
      throw new ValidationError('itemIdList en az bir packageItemId icermelidir.');
    }
    await this.http.put({
      operation: 'meal.unsupplied',
      domain: 'MEAL',
      path: `/integrator/order/meal/suppliers/${encodePath(this.supplierId)}/packages/unsupplied`,
      body: request,
    });
  }

  /** POST /integrator/invoice/meal/.../supplier-invoice-links/{channelId}/{serviceSourceId} */
  async sendInvoiceLink(params: {
    channelId: number;
    serviceSourceId: number | string;
    invoiceLink: string;
  }): Promise<void> {
    await this.http.post({
      operation: 'meal.sendInvoiceLink',
      domain: 'MEAL',
      path: `/integrator/invoice/meal/suppliers/${encodePath(this.supplierId)}/supplier-invoice-links/${encodePath(params.channelId, params.serviceSourceId)}`,
      body: { invoiceLink: params.invoiceLink },
    });
  }

  /** POST /integrator/invoice/meal/.../supplier-invoice-links/delete */
  async deleteInvoiceLink(params: {
    serviceSourceId: number | string;
    channelId: number;
    customerId: number | string;
  }): Promise<void> {
    await this.http.post({
      operation: 'meal.deleteInvoiceLink',
      domain: 'MEAL',
      path: `/integrator/invoice/meal/suppliers/${encodePath(this.supplierId)}/supplier-invoice-links/delete`,
      body: params,
    });
  }
}
