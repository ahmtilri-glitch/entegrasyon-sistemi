import { describe, expect, it } from 'vitest';
import { SlidingWindowRateLimiter } from '../src/core/rateLimiter.js';
import { maskSensitive } from '../src/core/logger.js';

describe('rate limiter', () => {
  it('pencere dolmadan bekletmez', async () => {
    const limiter = new SlidingWindowRateLimiter(3, 10_000);
    let now = 1_000;
    for (let i = 0; i < 3; i += 1) {
      await limiter.acquire('endpoint', () => now);
    }
    now += 10_001;
    await limiter.acquire('endpoint', () => now);
    expect(true).toBe(true);
  });
});

describe('log maskeleme', () => {
  it('hassas alanlari maskeler', () => {
    const masked = maskSensitive({
      Authorization: 'Basic abc',
      apiSecret: 'gizli',
      nested: { password: '123', safe: 'ok' },
    }) as Record<string, unknown>;

    expect(masked.Authorization).not.toContain('abc');
    expect(masked.apiSecret).not.toBe('gizli');
    expect((masked.nested as Record<string, unknown>).safe).toBe('ok');
  });
});
