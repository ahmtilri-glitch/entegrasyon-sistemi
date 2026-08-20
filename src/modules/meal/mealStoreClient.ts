import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';
import { ValidationError } from '../../core/errors.js';
import type { WorkingHour, WorkingStatus } from '../../types/common.js';

export interface MealRestaurant {
  id?: number | string;
  name?: string;
  status?: WorkingStatus;
  workingStatus?: WorkingStatus;
  latitude?: string | number;
  longitude?: string | number;
  workingHours?: WorkingHour[];
  averageDeliveryTime?: { min?: number; max?: number };
  [key: string]: unknown;
}

export interface MealRestaurantListResponse {
  stores?: MealRestaurant[];
  restaurants?: MealRestaurant[];
  content?: MealRestaurant[];
  totalPages?: number;
  totalElements?: number;
  [key: string]: unknown;
}

/** Yemek restoran (store) servisleri. */
export class MealStoreClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** GET /integrator/store/meal/suppliers/{supplierId}/stores */
  async listRestaurants(params: { page?: number; size?: number } = {}): Promise<MealRestaurantListResponse> {
    const response = await this.http.get<MealRestaurantListResponse>({
      operation: 'meal.getRestaurants',
      domain: 'MEAL',
      path: `/integrator/store/meal/suppliers/${encodePath(this.supplierId)}/stores`,
      query: { page: params.page, size: params.size },
    });
    return response.data;
  }

  /** PUT .../stores/{storeId}/status - restoran acma/kapama */
  async setWorkingStatus(storeId: string | number, status: WorkingStatus): Promise<void> {
    await this.http.put({
      operation: 'meal.updateRestaurantStatus',
      domain: 'MEAL',
      path: `/integrator/store/meal/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/status`,
      body: { status },
    });
  }

  /** PUT .../stores/{storeId}/working-hours */
  async updateWorkingHours(storeId: string | number, workingHours: WorkingHour[]): Promise<void> {
    if (workingHours.length === 0) {
      throw new ValidationError('En az bir calisma saati araligi gonderilmelidir.');
    }
    await this.http.put({
      operation: 'meal.updateRestaurantWorkingHours',
      domain: 'MEAL',
      path: `/integrator/store/meal/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/working-hours`,
      body: { workingHours },
    });
  }

  /**
   * PUT .../stores/{storeId}/average-delivery-time
   * min 15-85, max 20-90 ve her ikisi de 5'in kati olmalidir.
   */
  async updateAverageDeliveryTime(
    storeId: string | number,
    min: number,
    max: number,
  ): Promise<void> {
    validateAverageDeliveryTime(min, max);
    await this.http.put({
      operation: 'meal.updateAverageDeliveryTime',
      domain: 'MEAL',
      path: `/integrator/store/meal/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/average-delivery-time`,
      body: { min, max },
    });
  }

  /** GET .../stores/{storeId}/delivery-areas */
  async getDeliveryAreas(storeId: string | number): Promise<unknown> {
    const response = await this.http.get<unknown>({
      operation: 'meal.getDeliveryAreas',
      domain: 'MEAL',
      path: `/integrator/store/meal/suppliers/${encodePath(this.supplierId)}/stores/${encodePath(storeId)}/delivery-areas`,
    });
    return response.data;
  }
}

export function validateAverageDeliveryTime(min: number, max: number): void {
  if (min < 15 || min > 85 || min % 5 !== 0) {
    throw new ValidationError('Ortalama teslimat suresi min degeri 15-85 arasi ve 5in kati olmalidir.');
  }
  if (max < 20 || max > 90 || max % 5 !== 0) {
    throw new ValidationError('Ortalama teslimat suresi max degeri 20-90 arasi ve 5in kati olmalidir.');
  }
  if (max <= min) {
    throw new ValidationError('Ortalama teslimat suresinde max degeri min degerinden buyuk olmalidir.');
  }
}
