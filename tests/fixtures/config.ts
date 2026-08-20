import { BASE_URLS, type TgoConfig } from '../../src/config/index.js';

export function tgoConfigFixture(overrides: Partial<TgoConfig> = {}): TgoConfig {
  return {
    environment: 'STAGE',
    baseUrl: BASE_URLS.STAGE,
    supplierId: 107385,
    apiKey: 'test-api-key',
    apiSecret: 'test-api-secret',
    integratorName: 'TestEntegrator',
    executorUser: 'entegrasyon@example.com',
    timeoutMs: 5000,
    maxRetries: 3,
    retryBaseDelayMs: 1,
    rateLimitPer10s: 50,
    ...overrides,
  };
}
