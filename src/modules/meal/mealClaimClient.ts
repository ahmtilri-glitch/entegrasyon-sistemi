import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';

/** Yemek iade (claim) servisleri. */
export class MealClaimClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** GET /integrator/claim/meal/suppliers/{supplierId}/claims */
  async listClaims(params: {
    page?: number;
    size?: number;
    startDate?: number;
    endDate?: number;
    claimIds?: string[];
    storeId?: string | number;
  } = {}): Promise<unknown> {
    const response = await this.http.get<unknown>({
      operation: 'meal.getClaims',
      domain: 'MEAL',
      path: `/integrator/claim/meal/suppliers/${encodePath(this.supplierId)}/claims`,
      query: {
        page: params.page,
        size: params.size,
        startDate: params.startDate,
        endDate: params.endDate,
        claimIds: params.claimIds,
        storeId: params.storeId,
      },
    });
    return response.data;
  }

  /** PUT .../claims/{claimId}/accept */
  async accept(claimId: string, claimItemIds: string[]): Promise<void> {
    await this.http.put({
      operation: 'meal.claimAccept',
      domain: 'MEAL',
      path: `/integrator/claim/meal/suppliers/${encodePath(this.supplierId)}/claims/${encodePath(claimId)}/accept`,
      body: { claimItemIds },
    });
  }

  /** PUT .../claims/{claimId}/reject */
  async reject(params: {
    claimId: string;
    claimItemIds: string[];
    reasonId?: number;
    description?: string;
  }): Promise<void> {
    await this.http.put({
      operation: 'meal.claimReject',
      domain: 'MEAL',
      path: `/integrator/claim/meal/suppliers/${encodePath(this.supplierId)}/claims/${encodePath(params.claimId)}/reject`,
      body: {
        claimItemIds: params.claimItemIds,
        reasonId: params.reasonId,
        description: params.description,
      },
    });
  }
}
