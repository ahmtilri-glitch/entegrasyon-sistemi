import type { TgoPackage } from '../../src/types/order.js';

export const mealPackageFixture: TgoPackage = {
  id: '4dc2e9573983ce9fb97aa905df33f06f',
  orderCode: '1E1',
  supplierId: 107385,
  storeId: 153,
  packageStatus: 'Created',
  deliveryModel: 'STORE',
  storePickupSelected: false,
  customer: { id: 9001, firstName: 'Ahmet', lastName: 'Yilmaz', note: 'Zili calmayin' },
  shipmentAddress: {
    address1: 'Ornek Mah. Test Sok. No 1',
    city: 'Istanbul',
    district: 'Kadikoy',
    phone: '5550000000',
  },
  invoiceAddress: { city: 'Istanbul', district: 'Kadikoy' },
  payment: { paymentType: 'PAY_WITH_CARD', mealCard: null },
  currencyCode: 'TRY',
  totalPrice: 210.5,
  totalDiscount: 10,
  orderDate: 1710000000000,
  lines: [
    {
      id: 'line-1',
      name: 'Adana Kebap',
      productId: 555,
      quantity: 2,
      price: 100,
      amount: 200,
      note: 'Az acili',
      modifierProducts: [{ name: 'Ayran', price: 10.5 }],
      removedIngredients: ['sogan'],
      items: [
        { id: 'item-1', packageItemId: 'pkg-item-1', isCancelled: false, price: 100 },
        { id: 'item-2', packageItemId: 'pkg-item-2', isCancelled: false, price: 100 },
      ],
    },
  ],
};

export const groceryPackageFixture: TgoPackage = {
  id: '9182736450',
  orderNumber: 'TY-123456',
  orderId: '5544332211',
  supplierId: 107385,
  storeId: 991,
  packageStatus: 'Picking',
  deliveryType: 'INSTANT',
  scheduleType: 'INSTANT',
  customer: { firstName: 'Ayse', lastName: 'Demir' },
  shipmentAddress: { city: 'Ankara', district: 'Cankaya', phone: '5551112233' },
  grossAmount: 150,
  totalPrice: 140,
  lines: [
    {
      id: 'g-line-1',
      barcode: '8690000000001',
      amount: 45,
      price: 15,
      vatBaseAmount: 1,
      product: {
        name: 'Sut 1L',
        brandName: 'Marka',
        saleUnitValue: '1',
        saleUnitType: 'LT',
      },
      items: [
        { id: 'gi-1', packageItemId: 'gp-1', price: 15, isCollected: true, isCancelled: false },
        { id: 'gi-2', packageItemId: 'gp-2', price: 15, isCollected: false, isCancelled: true },
        { id: 'gi-3', packageItemId: 'gp-3', price: 15, isAlternative: true },
      ],
    },
  ],
};
