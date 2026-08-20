import { describe, expect, it, vi } from 'vitest';
import { TgoHttpClient } from '../src/core/httpClient.js';
import { ValidationError } from '../src/core/errors.js';
import { MealOrderClient } from '../src/modules/meal/mealOrderClient.js';
import { MealMenuClient, chunkArray } from '../src/modules/meal/mealMenuClient.js';
import { validateAverageDeliveryTime } from '../src/modules/meal/mealStoreClient.js';
import { GroceryOrderClient, GROCERY_UNSUPPLIED_REASONS } from '../src/modules/grocery/groceryOrderClient.js';
import { GroceryProductClient, validateBarcode } from '../src/modules/grocery/groceryProductClient.js';
import { tgoConfigFixture } from './fixtures/config.js';

function createHarness() {
  const fetchMock = vi.fn(async () =>
    new Response(JSON.stringify({ content: [], batchRequestId: 'b-1' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  );
  const http = new TgoHttpClient({
    config: tgoConfigFixture(),
    fetchImpl: fetchMock as never,
    sleep: async () => undefined,
  });
  return { http, fetchMock };
}

function lastUrl(fetchMock: ReturnType<typeof vi.fn>): string {
  return String(fetchMock.mock.calls.at(-1)?.[0]);
}

function lastInit(fetchMock: ReturnType<typeof vi.fn>): RequestInit {
  return fetchMock.mock.calls.at(-1)?.[1] as RequestInit;
}

describe('yemek modulu', () => {
  it('paket sorgusunda statuleri virgulle birlestirir', async () => {
    const { http, fetchMock } = createHarness();
    await new MealOrderClient(http, 107385).getPackages({
      packageStatuses: ['Created', 'Picking'],
      size: 50,
    });
    expect(lastUrl(fetchMock)).toContain('/integrator/order/meal/suppliers/107385/packages');
    expect(lastUrl(fetchMock)).toContain('packageStatuses=Created%2CPicking');
  });

  it('size 50 ustunde ise dogrulama hatasi verir', async () => {
    const { http } = createHarness();
    await expect(
      new MealOrderClient(http, 1).getPackages({ size: 51 }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('siparis kabulunde picked endpointine packageId ve preparationTime gonderir', async () => {
    const { http, fetchMock } = createHarness();
    await new MealOrderClient(http, 107385).accept({ packageId: 'p1', preparationTime: 30 });
    expect(lastUrl(fetchMock)).toContain('/packages/picked');
    expect(JSON.parse(String(lastInit(fetchMock).body))).toEqual({
      packageId: 'p1',
      preparationTime: 30,
    });
  });

  it('iptalde bos itemIdList kabul etmez', async () => {
    const { http } = createHarness();
    await expect(
      new MealOrderClient(http, 1).cancel({ packageId: 'p1', itemIdList: [], reasonId: 621 }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('fiyat guncellemede 1000 item sinirini uygular', async () => {
    const { http } = createHarness();
    const items = Array.from({ length: 1001 }, (_, index) => ({
      productId: index,
      sellingPrice: 10,
    }));
    await expect(new MealMenuClient(http, 1).updatePrices(items)).rejects.toBeInstanceOf(
      ValidationError,
    );
    expect(chunkArray(items, 1000)).toHaveLength(2);
  });

  it('ortalama teslimat suresi kurallarini dogrular', () => {
    expect(() => validateAverageDeliveryTime(20, 30)).not.toThrow();
    expect(() => validateAverageDeliveryTime(12, 30)).toThrow();
    expect(() => validateAverageDeliveryTime(20, 95)).toThrow();
    expect(() => validateAverageDeliveryTime(40, 30)).toThrow();
  });
});

describe('market modulu', () => {
  it('paket sorgusunda status parametresini tekrarli gonderir', async () => {
    const { http, fetchMock } = createHarness();
    await new GroceryOrderClient(http, 107385).getPackages({ status: ['Created', 'Picking'] });
    expect(lastUrl(fetchMock)).toContain('status=Created&status=Picking');
  });

  it('poset sayisi 10u asamaz', async () => {
    const { http } = createHarness();
    await expect(
      new GroceryOrderClient(http, 1).markPrepared({
        packageId: 'p1',
        invoiceAmount: 100,
        bagCount: 11,
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('tedarik problemi sebebi icin ek bilgi zorunludur', async () => {
    const { http } = createHarness();
    await expect(
      new GroceryOrderClient(http, 1).markUnsupplied({
        packageId: 'p1',
        itemIdList: ['i1'],
        reasonId: GROCERY_UNSUPPLIED_REASONS.SUPPLY_PROBLEM,
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('musteri arama servisinde telefon formatini dogrular', async () => {
    const { http } = createHarness();
    await expect(
      new GroceryOrderClient(http, 1).callCustomer('p1', '+905551112233'),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('urun filtrelemede size 100 ile sinirlidir', async () => {
    const { http } = createHarness();
    await expect(
      new GroceryProductClient(http, 1).filterProducts(5, { size: 101 }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('barkod ozel karakter icermemelidir', () => {
    expect(() => validateBarcode('8690000000001')).not.toThrow();
    expect(() => validateBarcode('869 000')).toThrow();
    expect(() => validateBarcode('869/000')).toThrow();
    expect(() => validateBarcode('a'.repeat(41))).toThrow();
  });

  it('magaza listelemede size 50 ile sinirlidir', async () => {
    const { http } = createHarness();
    const { GroceryStoreClient } = await import('../src/modules/grocery/groceryStoreClient.js');
    await expect(
      new GroceryStoreClient(http, 1).listStores({ size: 51 }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
