import { BASE_URLS } from '../../config/index.js';
import type { TgoHttpClient } from '../../core/httpClient.js';

export interface GroceryTestOrderRequest {
  address: {
    addressDescription?: string;
    addressText: string;
    apartmentNumber?: string;
    city: string;
    company?: string;
    district: string;
    doorNumber?: string;
    email?: string;
    floor?: string;
    latitude: string;
    longitude: string;
    neighborhood: string;
    phone: string;
  };
  customer: { customerFirstName: string; customerLastName: string; customerNote?: string };
  lines: Array<{ barcode: string; quantity: number }>;
  store: {
    deliveryModel: 'STORE' | 'GO';
    isProvisionedSeller: boolean;
    scheduleType: 'INSTANT' | 'TIMESLOT';
    sellerId: string;
    sellerType: 'GROCERY' | 'WATER';
    storeId: string;
    timeSlot?: { slotStartDate: number; slotEndDate: number } | null;
    timeslotId?: string;
    zoneId?: string;
  };
  similarProduct?: 'SEND_SIMILAR_PRODUCT' | 'CANCEL_NON_EXIST_PRODUCT' | 'CALL_ME';
}

/** Yalnizca STAGE ortaminda calisan test siparisi servisleri. */
export class TestOrderClient {
  private readonly http: TgoHttpClient;

  constructor(http: TgoHttpClient) {
    this.http = http;
  }

  /** POST https://stageapi.tgoapis.com/integrator/grocery-test-order/orders/instant */
  async createGroceryTestOrder(
    request: GroceryTestOrderRequest,
  ): Promise<{ orderNumber: string }> {
    const response = await this.http.post<{ orderNumber: string }>({
      operation: 'grocery.createTestOrder',
      domain: 'GROCERY',
      baseUrlOverride: BASE_URLS.STAGE,
      path: '/integrator/grocery-test-order/orders/instant',
      body: request,
    });
    return response.data;
  }

  /** POST https://stageapi.tgoapis.com/integrator/meal-test-order/orders/meal */
  async createMealTestOrder(request: Record<string, unknown>): Promise<{ orderNumber: string }> {
    const response = await this.http.post<{ orderNumber: string }>({
      operation: 'meal.createTestOrder',
      domain: 'MEAL',
      baseUrlOverride: BASE_URLS.STAGE,
      path: '/integrator/meal-test-order/orders/meal',
      body: request,
    });
    return response.data;
  }
}
