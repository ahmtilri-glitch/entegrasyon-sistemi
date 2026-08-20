import { describe, expect, it, vi } from 'vitest';
import { buildQueryString, encodePath, TgoHttpClient } from '../src/core/httpClient.js';
import { TgoApiError, TgoNetworkError } from '../src/core/errors.js';
import { tgoConfigFixture } from './fixtures/config.js';

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function createClient(fetchImpl: typeof fetch, overrides = {}) {
  return new TgoHttpClient({
    config: tgoConfigFixture(overrides),
    fetchImpl: fetchImpl as never,
    sleep: async () => undefined,
  });
}

describe('sorgu ve path kodlama', () => {
  it('dizileri tekrar eden parametre olarak serilestirir', () => {
    expect(buildQueryString({ status: ['Created', 'Picking'], page: 0 })).toBe(
      '?status=Created&status=Picking&page=0',
    );
  });

  it('null/undefined degerleri atlar', () => {
    expect(buildQueryString({ a: undefined, b: null, c: 1 })).toBe('?c=1');
  });

  it('path segmentlerini guvenli kodlar', () => {
    expect(encodePath(107385, 'a/b')).toBe('107385/a%2Fb');
  });
});

describe('TgoHttpClient', () => {
  it('zorunlu TGO basliklarini gonderir', async () => {
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) =>
      jsonResponse(200, { ok: true }),
    );
    const client = createClient(fetchMock as never);
    await client.get({ operation: 'test', path: '/x' });

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toMatch(/^Basic /);
    expect(headers['x-agentname']).toBe('TestEntegrator');
    expect(headers['User-Agent']).toBe('107385 - TestEntegrator');
  });

  it('5xx yanitlarinda yeniden dener ve basarili olunca sonucu doner', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(503, { message: 'gecici' }))
      .mockResolvedValueOnce(jsonResponse(200, { id: '1' }));
    const client = createClient(fetchMock as never);

    const response = await client.get<{ id: string }>({ operation: 'test', path: '/x' });
    expect(response.data.id).toBe('1');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('429 yanitinda retry sonrasi hala hata varsa TgoApiError firlatir', async () => {
    const fetchMock = vi.fn(async () => jsonResponse(429, { message: 'rate limit' }));
    const client = createClient(fetchMock as never, { maxRetries: 1 });

    await expect(client.get({ operation: 'test', path: '/x' })).rejects.toBeInstanceOf(TgoApiError);
  });

  it('401 hatasini yeniden denemez', async () => {
    const fetchMock = vi.fn(async () => jsonResponse(401, { message: 'unauthorized' }));
    const client = createClient(fetchMock as never);

    await expect(client.get({ operation: 'test', path: '/x' })).rejects.toMatchObject({
      statusCode: 401,
      isAuthError: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('400 hatasini yeniden denemez', async () => {
    const fetchMock = vi.fn(async () => jsonResponse(400, { message: 'hatali parametre' }));
    const client = createClient(fetchMock as never);

    await expect(client.get({ operation: 'test', path: '/x' })).rejects.toBeInstanceOf(TgoApiError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('ag hatalarinda yeniden dener ve tukendiginde TgoNetworkError firlatir', async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error('ECONNRESET');
    });
    const client = createClient(fetchMock as never, { maxRetries: 2 });

    await expect(client.get({ operation: 'test', path: '/x' })).rejects.toBeInstanceOf(
      TgoNetworkError,
    );
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('api log sink kaydini hassas basliklar maskelenmis sekilde doldurur', async () => {
    const fetchMock = vi.fn(async () => jsonResponse(200, { ok: true }));
    const records: Array<Record<string, unknown>> = [];
    const client = new TgoHttpClient({
      config: tgoConfigFixture(),
      fetchImpl: fetchMock as never,
      sleep: async () => undefined,
      logSink: async (record) => {
        records.push(record as unknown as Record<string, unknown>);
      },
    });

    await client.post({ operation: 'test.post', path: '/x', body: { a: 1 } });
    expect(records).toHaveLength(1);
    const headers = records[0]?.requestHeaders as Record<string, string>;
    expect(headers.Authorization).not.toMatch(/test-api-key/);
    expect(records[0]?.success).toBe(true);
  });
});
