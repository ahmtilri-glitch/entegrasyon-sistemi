/** Yemek ve Market paket statuleri. */
export type PackageStatus =
  | 'Created'
  | 'Picking'
  | 'Invoiced'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'UnSupplied'
  | 'UnPacked'
  | 'Returned';

export interface TgoAddress {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  cityCode?: number;
  cityId?: number;
  district?: string;
  districtId?: number;
  neighborhood?: string;
  neighborhoodId?: number;
  apartmentNumber?: string;
  floor?: string;
  doorNumber?: string;
  addressDescription?: string;
  postalCode?: string;
  countryCode?: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  identityNumber?: string;
}

export interface TgoCustomer {
  id?: number | string;
  firstName?: string;
  lastName?: string;
  email?: string;
  taxNumber?: string;
  note?: string;
}

export interface TgoCoupon {
  couponId?: string;
  sellerCoverageRatio?: number;
  amount?: { seller?: number };
  supplierId?: string | number;
  supplierType?: string;
}

export interface TgoPromotion {
  promotionId?: number;
  discountType?: string;
  sellerCoverageRatio?: number;
  amount?: { seller?: number };
  supplierType?: string;
  supplierId?: number;
  tagId?: number;
}

export interface TgoLineItem {
  id?: string;
  packageItemId?: string;
  isCancelled?: boolean;
  isCollected?: boolean;
  isAlternative?: boolean;
  price?: number;
  discount?: number;
  coupons?: TgoCoupon[];
  promotions?: TgoPromotion[];
}

export interface TgoModifierProduct {
  name?: string;
  price?: number;
  modifierProducts?: TgoModifierProduct[];
  [key: string]: unknown;
}

export interface TgoOrderLine {
  id?: string;
  lineItemId?: string | number;
  amount?: number;
  price?: number;
  barcode?: string;
  vatBaseAmount?: number;
  quantity?: number;
  name?: string;
  productName?: string;
  productId?: string | number;
  note?: string;
  modifierProducts?: TgoModifierProduct[];
  ingredientOptions?: unknown;
  removedIngredients?: unknown;
  extraIngredients?: unknown;
  product?: {
    name?: string;
    productSaleName?: string;
    brandName?: string;
    imageUrls?: string[] | null;
    weight?: { typeName?: string; defaultSaleUnitValue?: string } | null;
    saleUnitValue?: string;
    saleUnitType?: string;
  };
  items?: TgoLineItem[];
  coupons?: TgoCoupon[];
  promotions?: TgoPromotion[];
}

export interface TgoPackage {
  id: string;
  orderId?: string;
  orderNumber?: string;
  orderCode?: string;
  sellerId?: number;
  supplierId?: number;
  storeId?: number | string;
  packageStatus?: PackageStatus | string;
  prevStatus?: string;
  deliveryModel?: string;
  deliveryType?: string;
  scheduleType?: string;
  timeSlotId?: string;
  zoneId?: string;
  isStorePickupSelected?: boolean;
  customer?: TgoCustomer;
  shipmentAddress?: TgoAddress;
  invoiceAddress?: TgoAddress;
  currencyCode?: string;
  grossAmount?: number;
  totalDiscount?: number;
  totalPrice?: number;
  totalCargo?: number;
  sellerInvoiceAmount?: number;
  invoiceTaxAmount?: number;
  paymentType?: string;
  lines?: TgoOrderLine[];
  coupons?: TgoCoupon[];
  promotions?: TgoPromotion[];
  cancelInfo?: { reasonType?: string; reason?: string; reasonCode?: number } | null;
  eta?: string;
  estimatedDeliveryStartDate?: number;
  estimatedDeliveryEndDate?: number;
  orderDate?: number;
  lastModifiedDate?: number;
  sellerAccepted?: boolean;
  sellerAcceptedDate?: number;
  isCourierNearby?: boolean;
  receiptLink?: string;
  similarProduct?: string | null;
  [key: string]: unknown;
}
