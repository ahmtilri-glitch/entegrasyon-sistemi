import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';

/** Yemek degerlendirme (review) servisleri. */
export class MealReviewClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** GET /integrator/review/meal/suppliers/{supplierId}/reviews/statistics */
  async getStatistics(storeId?: string | number): Promise<unknown> {
    const response = await this.http.get<unknown>({
      operation: 'meal.getReviewStatistics',
      domain: 'MEAL',
      path: `/integrator/review/meal/suppliers/${encodePath(this.supplierId)}/reviews/statistics`,
      query: { storeId },
    });
    return response.data;
  }

  /** GET /integrator/review/meal/suppliers/{supplierId}/reviews */
  async listReviews(params: {
    storeId?: string | number;
    page?: number;
    size?: number;
    startDate?: number;
    endDate?: number;
  } = {}): Promise<unknown> {
    const response = await this.http.get<unknown>({
      operation: 'meal.getReviews',
      domain: 'MEAL',
      path: `/integrator/review/meal/suppliers/${encodePath(this.supplierId)}/reviews`,
      query: {
        storeId: params.storeId,
        page: params.page,
        size: params.size,
        startDate: params.startDate,
        endDate: params.endDate,
      },
    });
    return response.data;
  }

  /** POST /integrator/review/meal/suppliers/{supplierId}/reviews/{reviewId}/answer */
  async answerReview(reviewId: string | number, answer: string): Promise<void> {
    await this.http.post({
      operation: 'meal.answerReview',
      domain: 'MEAL',
      path: `/integrator/review/meal/suppliers/${encodePath(this.supplierId)}/reviews/${encodePath(reviewId)}/answer`,
      body: { answer },
    });
  }
}
