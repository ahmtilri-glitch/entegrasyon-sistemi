import { describe, expect, it } from 'vitest';
import { normalizePackage } from '../src/services/orderNormalizer.js';
import { groceryPackageFixture, mealPackageFixture } from './fixtures/packages.js';

describe('siparis normalizasyonu', () => {
  it('yemek paketini musteri notu, modifier ve adres bilgileriyle donusturur', () => {
    const order = normalizePackage('MEAL', mealPackageFixture, 1);

    expect(order.domain).toBe('MEAL');
    expect(order.tgoOrderId).toBe(mealPackageFixture.id);
    expect(order.tgoOrderNumber).toBe('1E1');
    expect(order.supplierId).toBe(107385);
    expect(order.customerNote).toBe('Zili calmayin');
    expect(order.paymentType).toBe('PAY_WITH_CARD');
    expect(order.orderDate?.getTime()).toBe(1710000000000);
    expect(order.items).toHaveLength(1);
    expect(order.items[0]?.quantity).toBe(2);
    expect(order.items[0]?.modifiers).toEqual([{ name: 'Ayran', price: 10.5 }]);
    expect(order.items[0]?.removedIngredients).toEqual(['sogan']);
    expect(order.items[0]?.packageItemId).toBe('pkg-item-1');
  });

  it('market paketinde her item ayri kalem olarak normalize edilir', () => {
    const order = normalizePackage('GROCERY', groceryPackageFixture, 1);

    expect(order.items).toHaveLength(3);
    expect(order.items.map((item) => item.packageItemId)).toEqual(['gp-1', 'gp-2', 'gp-3']);
    expect(order.items[0]?.isCollected).toBe(true);
    expect(order.items[1]?.isCancelled).toBe(true);
    expect(order.items[2]?.isAlternative).toBe(true);
    expect(order.items[0]?.barcode).toBe('8690000000001');
    expect(order.items[0]?.saleUnitType).toBe('LT');
    expect(order.tgoOrderInternalId).toBe('5544332211');
  });

  it('eksik alanlarda guvenli varsayilanlar uretir', () => {
    const order = normalizePackage('MEAL', { id: 'x' }, 42);

    expect(order.supplierId).toBe(42);
    expect(order.status).toBe('Created');
    expect(order.currencyCode).toBe('TRY');
    expect(order.items).toHaveLength(0);
    expect(order.orderDate).toBeNull();
  });
});
