import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';
import { ValidationError } from '../../core/errors.js';
import type { PagedResponse } from '../../types/common.js';
import type { TgoPackage } from '../../types/order.js';

export interface GroceryPackageQuery {
  storeId?: string | number;
  /** Created, Picking, Invoiced, Shipped, Cancelled, Delivered, Returned, UnPacked, UnSupplied */
  status?: string[];
  startDate?: number;
  endDate?: number;
  page?: number;
  /** Maksimum 200 */
  size?: number;
  sortDirection?: 'ASC' | 'DESC';
}

export interface GroceryInvoicedRequest {
  packageId: string;
  /** Provizyonsuz satis yapan saticilar null gondermelidir. */
  invoiceAmount: number | null;
  /** Maksimum 10 poset */
  bagCount?: number | null;
  receiptLink?: string | null;
  invoiceTaxAmount?: number | null;
}

export interface GroceryUnsuppliedRequest {
  packageId: string;
  /** packageItemId listesi */
  itemIdList: string[];
  reasonId: number;
  causedCancelPackageItemIds?: string[];
  description?: string;
}

export interface GroceryAlternativeRequest {
  packageId: string;
  collectedItemIdList: string[];
  alternativeItemIdList: string[];
  alternativeItems?: Array<{ itemId: string; alternativeBarcode: string }>;
}

/** Market (grocery) tedarik edememe sebepleri. */
export const GROCERY_UNSUPPLIED_REASONS = {
  SUPPLY_PROBLEM: 621,
  STORE_CLOSED: 622,
  STORE_CANNOT_PREPARE: 623,
  HIGH_DENSITY_NO_COURIER: 624,
  CUSTOMER_WRONG_ADDRESS: 626,
  CUSTOMER_NOT_AT_ADDRESS: 627,
  PRODUCT_DESCRIPTION_OR_PRICE_ERROR: 628,
  OTHER: 629,
  ORDER_MIXUP: 631,
} as const;

/** Market siparis servisleri. */
export class GroceryOrderClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** GET /integrator/order/grocery/suppliers/{supplierId}/packages */
  async getPackages(query: GroceryPackageQuery = {}): Promise<PagedResponse<TgoPackage>> {
    if (query.size !== undefined && (query.size < 1 || query.size > 200)) {
      throw new ValidationError('Market paket sorgusunda size 1-200 araliginda olmalidir.');
    }
    const response = await this.http.get<PagedResponse<TgoPackage>>({
      operation: 'grocery.getShipmentPackages',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages`,
      query: {
        storeId: query.storeId,
        status: query.status,
        startDate: query.startDate,
        endDate: query.endDate,
        page: query.page,
        size: query.size,
        sortDirection: query.sortDirection,
      },
    });
    return response.data;
  }

  /** GET .../packages/ids?id={shipmentPackageId} */
  async getPackageById(shipmentPackageId: string | number): Promise<PagedResponse<TgoPackage>> {
    const response = await this.http.get<PagedResponse<TgoPackage>>({
      operation: 'grocery.getShipmentPackageIds',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/ids`,
      query: { id: shipmentPackageId },
    });
    return response.data;
  }

  /** GET .../packages/order-number/{orderNumber} */
  async getPackagesByOrderNumber(orderNumber: string | number): Promise<PagedResponse<TgoPackage>> {
    const response = await this.http.get<PagedResponse<TgoPackage>>({
      operation: 'grocery.getPackagesByOrderNumber',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/order-number/${encodePath(orderNumber)}`,
    });
    return response.data;
  }

  /** PUT .../packages/{packageId}/picked - siparis kabul bildirimi (body gonderilmez) */
  async accept(packageId: string): Promise<void> {
    await this.http.put({
      operation: 'grocery.picked',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(packageId)}/picked`,
    });
  }

  /**
   * GET .../orders/{orderId}/invoice-amount
   * Invoiced bildiriminden hemen once cagrilmalidir.
   */
  async getInvoiceAmountRange(orderId: string | number): Promise<{ min: number; max: number }> {
    const response = await this.http.get<{ min: number; max: number }>({
      operation: 'grocery.getInvoiceAmount',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/orders/${encodePath(orderId)}/invoice-amount`,
    });
    return response.data;
  }

  /** PUT .../packages/{packageId}/invoiced - siparis hazirlandi bildirimi */
  async markPrepared(request: GroceryInvoicedRequest): Promise<void> {
    if (request.bagCount !== undefined && request.bagCount !== null && request.bagCount > 10) {
      throw new ValidationError('bagCount en fazla 10 olabilir.');
    }
    await this.http.put({
      operation: 'grocery.invoiced',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(request.packageId)}/invoiced`,
      body: {
        invoiceAmount: request.invoiceAmount,
        bagCount: request.bagCount ?? null,
        receiptLink: request.receiptLink ?? null,
        invoiceTaxAmount: request.invoiceTaxAmount ?? null,
      },
    });
  }

  /** PUT .../packages/{packageId}/unsupplied - tedarik edememe bildirimi */
  async markUnsupplied(request: GroceryUnsuppliedRequest): Promise<void> {
    if (request.itemIdList.length === 0) {
      throw new ValidationError('itemIdList en az bir packageItemId icermelidir.');
    }
    if (
      request.reasonId === GROCERY_UNSUPPLIED_REASONS.SUPPLY_PROBLEM &&
      (request.causedCancelPackageItemIds?.length ?? 0) === 0 &&
      !request.description
    ) {
      throw new ValidationError(
        '621 (Tedarik problemi) icin causedCancelPackageItemIds veya description gonderilmelidir.',
      );
    }
    await this.http.put({
      operation: 'grocery.unsupplied',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(request.packageId)}/unsupplied`,
      body: {
        itemIdList: request.itemIdList,
        reasonId: request.reasonId,
        causedCancelPackageItemIds: request.causedCancelPackageItemIds,
        description: request.description,
      },
    });
  }

  /** PUT .../packages/{packageId}/mark-alternative - alternatif urun bildirimi */
  async markAlternative(request: GroceryAlternativeRequest): Promise<void> {
    await this.http.put({
      operation: 'grocery.markAlternative',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(request.packageId)}/mark-alternative`,
      body: {
        collectedItemIdList: request.collectedItemIdList,
        alternativeItemIdList: request.alternativeItemIdList,
        alternativeItems: request.alternativeItems,
      },
    });
  }

  /** PUT .../packages/{packageId}/manual-shipped - satici kuryesi yola cikti */
  async markShippedByOwnCourier(packageId: string): Promise<void> {
    await this.http.put({
      operation: 'grocery.manualShipped',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(packageId)}/manual-shipped`,
    });
  }

  /** PUT .../packages/{packageId}/manual-delivered - satici kuryesi teslim etti */
  async markDeliveredByOwnCourier(packageId: string): Promise<void> {
    await this.http.put({
      operation: 'grocery.manualDelivered',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(packageId)}/manual-delivered`,
    });
  }

  /** POST .../packages/{packageId}/bridge - musteri arama servisi */
  async callCustomer(packageId: string, sellerPhoneNumber: string): Promise<void> {
    if (!/^[0-9]{10}$/.test(sellerPhoneNumber)) {
      throw new ValidationError('sellerPhoneNumber ulke kodu olmadan 10 haneli olmalidir.');
    }
    await this.http.post({
      operation: 'grocery.bridgeCall',
      domain: 'GROCERY',
      path: `/integrator/order/grocery/suppliers/${encodePath(this.supplierId)}/packages/${encodePath(packageId)}/bridge`,
      body: { sellerPhoneNumber },
    });
  }

  /** POST /integrator/invoice/grocery/.../supplier-invoice-links/instant */
  async sendInvoiceLink(params: {
    invoiceLink: string;
    shipmentPackageId: number | string;
  }): Promise<void> {
    await this.http.post({
      operation: 'grocery.sendInvoiceLink',
      domain: 'GROCERY',
      path: `/integrator/invoice/grocery/suppliers/${encodePath(this.supplierId)}/supplier-invoice-links/instant`,
      body: params,
    });
  }

  /** POST /integrator/invoice/grocery/.../supplier-invoice-links/delete */
  async deleteInvoiceLink(params: {
    serviceSourceId: number | string;
    customerId: number | string;
    channelId?: number;
  }): Promise<void> {
    await this.http.post({
      operation: 'grocery.deleteInvoiceLink',
      domain: 'GROCERY',
      path: `/integrator/invoice/grocery/suppliers/${encodePath(this.supplierId)}/supplier-invoice-links/delete`,
      body: {
        serviceSourceId: params.serviceSourceId,
        channelId: params.channelId ?? 3,
        customerId: params.customerId,
      },
    });
  }
}
