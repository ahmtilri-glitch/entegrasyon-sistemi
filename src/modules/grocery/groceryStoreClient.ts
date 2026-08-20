import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';
import { ValidationError } from '../../core/errors.js';
import type { WorkingHour, WorkingStatus } from '../../types/common.js';

export interface GroceryStore {
  id: number;
  name?: string;
  supplierId?: number;
  workingStatus?: WorkingStatus;
  location?: { latitude?: string; longitude?: string };
  deliveryType?: string;
  workingHours?: WorkingHour[];
  creationDate?: number;
  lastModifiedDate?: number;
}

export interface GroceryStoreListResponse {
  groceries: GroceryStore[];
  totalPages?: number;
  totalElements?: number;
}

export interface GroceryWorkingStatusResponse {
  data: {
    items: Array<{ id: number; workingStatus: WorkingStatus; name?: string }>;
    page?: number;
    size?: number;
    totalSize?: number;
  };
}

export interface GrocerySlot {
  timeSlotId: string;
  slotStartDate: number;
  slotEndDate: number;
  capacity?: number;
  sellerZoneId?: string;
  [key: string]: unknown;
}

/** Market magaza (store) servisleri: hemen teslimat + randevulu teslimat. */
export class GroceryStoreClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** GET /integrator/store/grocery/suppliers/{supplierId}/store-listing (size maksimum 50) */
  async listStores(params: { page?: number; size?: number } = {}): Promise<GroceryStoreListResponse> {
    if (params.size !== undefined && (params.size < 1 || params.size > 50)) {
      throw new ValidationError('Market magaza listelemede size 1-50 araliginda olmalidir.');
    }
    const response = await this.http.get<GroceryStoreListResponse>({
      operation: 'grocery.retrieveGroceriesOfSeller',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/store-listing`,
      query: { page: params.page, size: params.size },
    });
    return response.data;
  }

  /** GET .../stores/working-status */
  async getWorkingStatuses(): Promise<GroceryWorkingStatusResponse> {
    const response = await this.http.get<GroceryWorkingStatusResponse>({
      operation: 'grocery.getWorkingStatus',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/working-status`,
    });
    return response.data;
  }

  /** PUT .../stores/{storeId}/working-status */
  async setWorkingStatus(storeId: string | number, workingStatus: WorkingStatus): Promise<void> {
    await this.http.put({
      operation: 'grocery.updateWorkingStatus',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/working-status`,
      body: { workingStatus },
    });
  }

  /** PUT .../stores/{storeId}/working-hours */
  async updateWorkingHours(storeId: string | number, workingHours: WorkingHour[]): Promise<void> {
    if (workingHours.length === 0) {
      throw new ValidationError('En az bir calisma saati araligi gonderilmelidir.');
    }
    await this.http.put({
      operation: 'grocery.updateGroceryWorkingHours',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/working-hours`,
      body: { workingHours },
    });
  }

  /** PUT .../stores/{storeId}/eta - teslimat suresi bildirimi */
  async updateEta(
    storeId: string | number,
    minDeliveryTimeInMin: number,
    maxDeliveryTimeInMin: number,
  ): Promise<void> {
    if (minDeliveryTimeInMin <= 0 || maxDeliveryTimeInMin <= minDeliveryTimeInMin) {
      throw new ValidationError('ETA degerleri pozitif ve max > min olmalidir.');
    }
    await this.http.put({
      operation: 'grocery.updateEta',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/eta`,
      body: { minDeliveryTimeInMin, maxDeliveryTimeInMin },
    });
  }

  /** PUT .../stores/{storeId}/delivery-areas - teslimat bolgeleri bildirimi */
  async updateDeliveryAreas(storeId: string | number, payload: unknown): Promise<void> {
    await this.http.put({
      operation: 'grocery.updateDeliveryAreas',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/delivery-areas`,
      body: payload,
    });
  }

  /** GET .../stores/{storeId}/delivery-areas */
  async getDeliveryAreas(storeId: string | number): Promise<unknown> {
    const response = await this.http.get<unknown>({
      operation: 'grocery.getDeliveryAreas',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/delivery-areas`,
    });
    return response.data;
  }

  /** PUT .../stores/{storeId}/slots - randevulu teslimat slot bildirimi (upsert) */
  async upsertSlots(storeId: string | number, slots: GrocerySlot[]): Promise<void> {
    if (slots.length === 0) {
      throw new ValidationError('En az bir slot gonderilmelidir.');
    }
    await this.http.put({
      operation: 'grocery.upsertSlots',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/slots`,
      body: { slots },
    });
  }

  /** GET .../stores/{storeId}/slots */
  async getSlots(storeId: string | number): Promise<unknown> {
    const response = await this.http.get<unknown>({
      operation: 'grocery.getSlots',
      domain: 'GROCERY',
      path: `/integrator/store/grocery/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/slots`,
    });
    return response.data;
  }
}
