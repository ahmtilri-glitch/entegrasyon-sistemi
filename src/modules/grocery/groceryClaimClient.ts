import { encodePath, type TgoHttpClient } from '../../core/httpClient.js';

/** Market iade sebepleri (createClaim). */
export const GROCERY_CLAIM_REASONS = {
  EXPIRED_PRODUCT: 3000,
  DAMAGED: 3001,
  WRONG_PRODUCT: 3002,
  MISSING_PRODUCT: 3003,
  PIN_ERROR: 3005,
  NEAR_EXPIRY: 3006,
  LOW_QUALITY: 3007,
  BAG_LEFT_IN_STORE: 3008,
  LATE_DELIVERY: 3009,
  POISONING_INJURY: 3010,
  FOREIGN_OBJECT: 3011,
  NOT_RECEIVED: 3012,
  RECEIPT_MISSING: 3013,
  ORDERS_MIXED: 3014,
  RECEIPT_AMOUNT_MISMATCH: 3015,
} as const;

/** Market iade ret sebepleri (claimReject). */
export const GROCERY_CLAIM_REJECT_REASONS = {
  WRONG_PRODUCT_FROM_CUSTOMER: 201,
  DAMAGED_FROM_CUSTOMER: 251,
  NOT_MY_PRODUCT: 301,
  MISSING_QUANTITY_FROM_CUSTOMER: 401,
  SENT_PRODUCT_NOT_WRONG: 1701,
  SENT_PRODUCT_NOT_DEFECTIVE: 1751,
  HYGIENIC_PACKAGE_OPENED: 2051,
  NOTHING_MISSING: 2200,
  NO_SELLER_DELAY: 2201,
  NOT_SELLER_PROBLEM: 2202,
  RECEIPT_ALREADY_SENT: 2203,
  RECEIPT_AMOUNT_CORRECT: 2204,
  INSUFFICIENT_EVIDENCE: 2205,
  SELLER_DID_NOT_RESPOND: 2206,
  RECEIPT_RESENT: 2207,
} as const;

export interface CreateClaimRequest {
  orderId: number | string;
  lines: Array<{ itemIds: Array<number | string>; reasonId: number; description?: string }>;
}

/** Market iade (claim) servisleri. */
export class GroceryClaimClient {
  private readonly http: TgoHttpClient;
  private readonly supplierId: number;

  constructor(http: TgoHttpClient, supplierId: number) {
    this.http = http;
    this.supplierId = supplierId;
  }

  /** POST /integrator/claim/grocery/suppliers/{supplierId}/claims */
  async createClaim(
    request: CreateClaimRequest,
  ): Promise<{ claimId: string; claimItemIds: string[] }> {
    const response = await this.http.post<{ claimId: string; claimItemIds: string[] }>({
      operation: 'grocery.createClaim',
      domain: 'GROCERY',
      path: `/integrator/claim/grocery/suppliers/${encodePath(this.supplierId)}/claims`,
      body: request,
    });
    return response.data;
  }

  /** PUT .../claims/{claimId}/accept */
  async accept(claimId: string, claimItemIds: string[]): Promise<void> {
    await this.http.put({
      operation: 'grocery.claimAccept',
      domain: 'GROCERY',
      path: `/integrator/claim/grocery/suppliers/${encodePath(this.supplierId)}/claims/${encodePath(claimId)}/accept`,
      body: { claimItemIds },
    });
  }

  /** PUT .../claims/{claimId}/reject (reasonId gonderilmezse 1751 varsayilir) */
  async reject(params: {
    claimId: string;
    claimItemIds: string[];
    reasonId?: number;
    description?: string;
  }): Promise<void> {
    await this.http.put({
      operation: 'grocery.claimReject',
      domain: 'GROCERY',
      path: `/integrator/claim/grocery/suppliers/${encodePath(this.supplierId)}/claims/${encodePath(params.claimId)}/reject`,
      body: {
        claimItemIds: params.claimItemIds,
        reasonId: params.reasonId,
        description: params.description,
      },
    });
  }

  /** GET .../claims/{claimId}/items/objectionable */
  async getObjectionableItems(claimId: string): Promise<unknown> {
    const response = await this.http.get<unknown>({
      operation: 'grocery.getObjectionableItems',
      domain: 'GROCERY',
      path: `/integrator/claim/grocery/suppliers/${encodePath(this.supplierId)}/claims/${encodePath(claimId)}/items/objectionable`,
    });
    return response.data;
  }

  /** POST .../claims/{claimId}/items/objections */
  async createObjection(params: {
    claimId: string;
    claimItemIds: string[];
    description: string;
  }): Promise<void> {
    await this.http.post({
      operation: 'grocery.createObjection',
      domain: 'GROCERY',
      path: `/integrator/claim/grocery/suppliers/${encodePath(this.supplierId)}/claims/${encodePath(params.claimId)}/items/objections`,
      body: { claimItemIds: params.claimItemIds, description: params.description },
    });
  }
}
