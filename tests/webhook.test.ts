import { describe, expect, it, vi } from 'vitest';
import express from 'express';
import { buildIdempotencyKey, WebhookService } from '../src/services/webhookService.js';
import { createWebhookRouter } from '../src/api/routes/webhookRoutes.js';
import { errorHandler } from '../src/api/middleware/errorHandler.js';
import { parseBasicAuth, safeCompare } from '../src/api/middleware/auth.js';
import { groceryPackageFixture, mealPackageFixture } from './fixtures/packages.js';

describe('webhook yardimcilari', () => {
  it('idempotency anahtarini id + packageStatus uzerinden kurar', () => {
    const key = buildIdempotencyKey('MEAL', mealPackageFixture);
    expect(key).toContain(String(mealPackageFixture.id));
    expect(key).toContain('Created');
  });

  it('farkli statuler farkli anahtar uretir', () => {
    const created = buildIdempotencyKey('GROCERY', groceryPackageFixture);
    const delivered = buildIdempotencyKey('GROCERY', {
      ...groceryPackageFixture,
      packageStatus: 'Delivered',
    });
    expect(created).not.toBe(delivered);
  });

  it('Basic Auth basligini cozer', () => {
    const header = `Basic ${Buffer.from('user:pass').toString('base64')}`;
    expect(parseBasicAuth(header)).toEqual({ user: 'user', password: 'pass' });
    expect(parseBasicAuth('Bearer abc')).toBeNull();
    expect(safeCompare('a', 'ab')).toBe(false);
    expect(safeCompare('abc', 'abc')).toBe(true);
  });
});

describe('webhook servisi', () => {
  it('tekrarli bildirimde siparis tekrar islenmez', async () => {
    const insert = vi
      .fn()
      .mockResolvedValueOnce({ id: 1, duplicate: false })
      .mockResolvedValueOnce({ id: 1, duplicate: true });
    const markProcessed = vi.fn().mockResolvedValue(undefined);
    const persistPackage = vi.fn().mockResolvedValue({ orderId: 10 });

    const service = new WebhookService(
      { insert, markProcessed, markFailed: vi.fn() } as never,
      { persistPackage } as never,
    );

    const input = {
      domain: 'MEAL' as const,
      payload: mealPackageFixture,
      headers: {},
      remoteIp: '127.0.0.1',
    };
    const first = await service.handle(input);
    const second = await service.handle(input);

    expect(first.duplicate).toBe(false);
    expect(second.duplicate).toBe(true);
    expect(persistPackage).toHaveBeenCalledTimes(1);
    expect(markProcessed).toHaveBeenCalledTimes(1);
  });

  it('isleme hatasinda webhook FAILED olarak isaretlenir', async () => {
    const markFailed = vi.fn().mockResolvedValue(undefined);
    const service = new WebhookService(
      { insert: vi.fn().mockResolvedValue({ id: 5, duplicate: false }), markProcessed: vi.fn(), markFailed } as never,
      { persistPackage: vi.fn().mockRejectedValue(new Error('db down')) } as never,
    );

    await expect(
      service.handle({ domain: 'MEAL', payload: mealPackageFixture, headers: {}, remoteIp: null }),
    ).rejects.toThrow('db down');
    expect(markFailed).toHaveBeenCalledWith(5, 'db down');
  });
});

describe('webhook endpointi', () => {
  function createTestApp(handle: ReturnType<typeof vi.fn>) {
    const app = express();
    app.use(express.json());
    app.use('/webhooks/tgo', createWebhookRouter({ handle } as never));
    app.use(errorHandler);
    return app;
  }

  async function post(app: express.Express, path: string, body: unknown, auth?: string) {
    const { createServer } = await import('node:http');
    const server = createServer(app);
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : 0;
    const response = await fetch(`http://127.0.0.1:${port}${path}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(auth ? { authorization: auth } : {}),
      },
      body: JSON.stringify(body),
    });
    const json = (await response.json().catch(() => null)) as unknown;
    server.close();
    return { status: response.status, json };
  }

  const validAuth = `Basic ${Buffer.from('webhook-user:webhook-pass').toString('base64')}`;

  it('kimlik dogrulamasiz istegi 401 ile reddeder', async () => {
    const app = createTestApp(vi.fn());
    const result = await post(app, '/webhooks/tgo/meal', mealPackageFixture);
    expect(result.status).toBe(401);
  });

  it('gecerli bildirimde 200 doner', async () => {
    const handle = vi.fn().mockResolvedValue({ webhookId: 1, duplicate: false, orderId: 3 });
    const app = createTestApp(handle);
    const result = await post(app, '/webhooks/tgo/meal', mealPackageFixture, validAuth);
    expect(result.status).toBe(200);
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('paket id olmayan govdeyi 400 ile reddeder', async () => {
    const app = createTestApp(vi.fn());
    const result = await post(app, '/webhooks/tgo/grocery', { foo: 'bar' }, validAuth);
    expect(result.status).toBe(400);
  });
});
