import type { TgoDomain } from '../config/index.js';
import type { TgoOrderLine, TgoPackage } from '../types/order.js';

export interface NormalizedOrderItem {
  tgoLineId: string | null;
  tgoItemId: string | null;
  packageItemId: string | null;
  tgoProductId: string | null;
  barcode: string | null;
  name: string | null;
  productSaleName: string | null;
  brandName: string | null;
  quantity: number;
  unitPrice: number | null;
  amount: number | null;
  discount: number | null;
  vatBaseAmount: number | null;
  saleUnitValue: string | null;
  saleUnitType: string | null;
  isCancelled: boolean;
  isCollected: boolean;
  isAlternative: boolean;
  modifiers: unknown;
  removedIngredients: unknown;
  extraIngredients: unknown;
  coupons: unknown;
  promotions: unknown;
  note: string | null;
  rawPayload: unknown;
}

export interface NormalizedOrder {
  domain: TgoDomain;
  tgoOrderId: string;
  tgoOrderNumber: string | null;
  tgoOrderInternalId: string | null;
  supplierId: number;
  tgoStoreId: string | null;
  status: string;
  previousStatus: string | null;
  deliveryModel: string | null;
  deliveryType: string | null;
  scheduleType: string | null;
  timeSlotId: string | null;
  zoneId: string | null;
  isStorePickup: boolean;
  customerId: string | null;
  customerFirstName: string | null;
  customerLastName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  customerNote: string | null;
  shipmentAddress: unknown;
  invoiceAddress: unknown;
  currencyCode: string;
  grossAmount: number | null;
  totalDiscount: number | null;
  totalPrice: number | null;
  totalCargo: number | null;
  sellerInvoiceAmount: number | null;
  invoiceTaxAmount: number | null;
  paymentType: string | null;
  coupons: unknown;
  promotions: unknown;
  cancelInfo: unknown;
  etaText: string | null;
  estimatedDeliveryStart: Date | null;
  estimatedDeliveryEnd: Date | null;
  orderDate: Date | null;
  lastModifiedDate: Date | null;
  sellerAccepted: boolean;
  sellerAcceptedAt: Date | null;
  isCourierNearby: boolean;
  receiptLink: string | null;
  items: NormalizedOrderItem[];
  rawPayload: TgoPackage;
}

function toDate(value: unknown): Date | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return null;
  return new Date(value);
}

function toStringOrNull(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  return String(value);
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

function readPaymentType(pkg: TgoPackage): string | null {
  const payment = pkg.payment as { paymentType?: string } | undefined;
  return toStringOrNull(payment?.paymentType ?? pkg.paymentType);
}

/** Market modelinde bir line birden fazla item icerir; her item ayri kalem olarak normalize edilir. */
function normalizeGroceryLine(line: TgoOrderLine): NormalizedOrderItem[] {
  const items = line.items ?? [];
  if (items.length === 0) {
    return [
      {
        tgoLineId: toStringOrNull(line.id),
        tgoItemId: null,
        packageItemId: null,
        tgoProductId: toStringOrNull(line.productId),
        barcode: toStringOrNull(line.barcode),
        name: toStringOrNull(line.product?.name ?? line.name),
        productSaleName: toStringOrNull(line.product?.productSaleName),
        brandName: toStringOrNull(line.product?.brandName),
        quantity: 1,
        unitPrice: toNumberOrNull(line.price),
        amount: toNumberOrNull(line.amount),
        discount: null,
        vatBaseAmount: toNumberOrNull(line.vatBaseAmount),
        saleUnitValue: toStringOrNull(line.product?.saleUnitValue),
        saleUnitType: toStringOrNull(line.product?.saleUnitType),
        isCancelled: false,
        isCollected: false,
        isAlternative: false,
        modifiers: null,
        removedIngredients: null,
        extraIngredients: null,
        coupons: line.coupons ?? null,
        promotions: line.promotions ?? null,
        note: toStringOrNull(line.note),
        rawPayload: line,
      },
    ];
  }

  return items.map((item) => ({
    tgoLineId: toStringOrNull(line.id),
    tgoItemId: toStringOrNull(item.id),
    packageItemId: toStringOrNull(item.packageItemId),
    tgoProductId: toStringOrNull(line.productId),
    barcode: toStringOrNull(line.barcode),
    name: toStringOrNull(line.product?.name ?? line.name),
    productSaleName: toStringOrNull(line.product?.productSaleName),
    brandName: toStringOrNull(line.product?.brandName),
    quantity: 1,
    unitPrice: toNumberOrNull(item.price ?? line.price),
    amount: toNumberOrNull(line.amount),
    discount: toNumberOrNull(item.discount),
    vatBaseAmount: toNumberOrNull(line.vatBaseAmount),
    saleUnitValue: toStringOrNull(line.product?.saleUnitValue),
    saleUnitType: toStringOrNull(line.product?.saleUnitType),
    isCancelled: item.isCancelled === true,
    isCollected: item.isCollected === true,
    isAlternative: item.isAlternative === true,
    modifiers: null,
    removedIngredients: null,
    extraIngredients: null,
    coupons: item.coupons ?? line.coupons ?? null,
    promotions: item.promotions ?? line.promotions ?? null,
    note: toStringOrNull(line.note),
    rawPayload: { ...line, items: [item] },
  }));
}

/** Yemek modelinde her line bir urun kalemidir; modifier/opsiyon bilgileri ayrica saklanir. */
function normalizeMealLine(line: TgoOrderLine): NormalizedOrderItem[] {
  const items = line.items ?? [];
  const packageItemIds = items.map((item) => item.packageItemId).filter(Boolean);
  return [
    {
      tgoLineId: toStringOrNull(line.id ?? line.lineItemId),
      tgoItemId: toStringOrNull(items[0]?.id ?? line.id),
      packageItemId: toStringOrNull(packageItemIds[0] ?? line.id ?? null),
      tgoProductId: toStringOrNull(line.productId),
      barcode: toStringOrNull(line.barcode),
      name: toStringOrNull(line.name ?? line.productName ?? line.product?.name),
      productSaleName: toStringOrNull(line.product?.productSaleName),
      brandName: toStringOrNull(line.product?.brandName),
      quantity: toNumberOrNull(line.quantity) ?? Math.max(items.length, 1),
      unitPrice: toNumberOrNull(line.price),
      amount: toNumberOrNull(line.amount ?? line.price),
      discount: toNumberOrNull(items[0]?.discount),
      vatBaseAmount: toNumberOrNull(line.vatBaseAmount),
      saleUnitValue: null,
      saleUnitType: null,
      isCancelled: items.some((item) => item.isCancelled === true),
      isCollected: false,
      isAlternative: false,
      modifiers: line.modifierProducts ?? line.ingredientOptions ?? null,
      removedIngredients: line.removedIngredients ?? null,
      extraIngredients: line.extraIngredients ?? null,
      coupons: line.coupons ?? null,
      promotions: line.promotions ?? null,
      note: toStringOrNull(line.note),
      rawPayload: line,
    },
  ];
}

export function normalizePackage(
  domain: TgoDomain,
  pkg: TgoPackage,
  fallbackSupplierId: number,
): NormalizedOrder {
  const lines = pkg.lines ?? [];
  const items = lines.flatMap((line) =>
    domain === 'GROCERY' ? normalizeGroceryLine(line) : normalizeMealLine(line),
  );

  return {
    domain,
    tgoOrderId: String(pkg.id),
    tgoOrderNumber: toStringOrNull(pkg.orderNumber ?? pkg.orderCode),
    tgoOrderInternalId: toStringOrNull(pkg.orderId),
    supplierId: Number(pkg.supplierId ?? pkg.sellerId ?? fallbackSupplierId),
    tgoStoreId: toStringOrNull(pkg.storeId),
    status: toStringOrNull(pkg.packageStatus) ?? 'Created',
    previousStatus: toStringOrNull(pkg.prevStatus),
    deliveryModel: toStringOrNull(pkg.deliveryModel),
    deliveryType: toStringOrNull(pkg.deliveryType),
    scheduleType: toStringOrNull(pkg.scheduleType),
    timeSlotId: toStringOrNull(pkg.timeSlotId),
    zoneId: toStringOrNull(pkg.zoneId),
    isStorePickup:
      pkg.isStorePickupSelected === true || (pkg.storePickupSelected as boolean) === true,
    customerId: toStringOrNull(pkg.customer?.id),
    customerFirstName: toStringOrNull(pkg.customer?.firstName),
    customerLastName: toStringOrNull(pkg.customer?.lastName),
    customerEmail: toStringOrNull(pkg.customer?.email),
    customerPhone: toStringOrNull(pkg.shipmentAddress?.phone),
    customerNote: toStringOrNull(pkg.customer?.note),
    shipmentAddress: pkg.shipmentAddress ?? null,
    invoiceAddress: pkg.invoiceAddress ?? null,
    currencyCode: toStringOrNull(pkg.currencyCode) ?? 'TRY',
    grossAmount: toNumberOrNull(pkg.grossAmount),
    totalDiscount: toNumberOrNull(pkg.totalDiscount),
    totalPrice: toNumberOrNull(pkg.totalPrice),
    totalCargo: toNumberOrNull(pkg.totalCargo ?? pkg.totalDeliveryPrice),
    sellerInvoiceAmount: toNumberOrNull(pkg.sellerInvoiceAmount),
    invoiceTaxAmount: toNumberOrNull(pkg.invoiceTaxAmount),
    paymentType: readPaymentType(pkg),
    coupons: pkg.coupons ?? pkg.coupon ?? null,
    promotions: pkg.promotions ?? null,
    cancelInfo: pkg.cancelInfo ?? null,
    etaText: toStringOrNull(pkg.eta),
    estimatedDeliveryStart: toDate(pkg.estimatedDeliveryStartDate),
    estimatedDeliveryEnd: toDate(pkg.estimatedDeliveryEndDate),
    orderDate: toDate(pkg.orderDate),
    lastModifiedDate: toDate(pkg.lastModifiedDate),
    sellerAccepted: pkg.sellerAccepted === true,
    sellerAcceptedAt: toDate(pkg.sellerAcceptedDate),
    isCourierNearby: pkg.isCourierNearby === true,
    receiptLink: toStringOrNull(pkg.receiptLink),
    items,
    rawPayload: pkg,
  };
}
