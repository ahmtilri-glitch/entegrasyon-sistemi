import { describe, expect, it } from 'vitest';
import { buildAuthHeaders, buildBasicAuthHeader, buildUserAgent } from '../src/core/auth.js';
import { validateIntegratorName } from '../src/config/index.js';
import { tgoConfigFixture } from './fixtures/config.js';

describe('TGO kimlik dogrulama', () => {
  it('Basic Auth basligini apiKey:apiSecret ile uretir', () => {
    const header = buildBasicAuthHeader('key', 'secret');
    expect(header).toBe(`Basic ${Buffer.from('key:secret').toString('base64')}`);
  });

  it('User-Agent formatini "supplierId - IntegratorName" olarak kurar', () => {
    expect(buildUserAgent(107385, 'TedarikTurkiye')).toBe('107385 - TedarikTurkiye');
  });

  it('zorunlu TGO basliklarini ekler', () => {
    const headers = buildAuthHeaders(tgoConfigFixture());
    expect(headers.Authorization).toMatch(/^Basic /);
    expect(headers['User-Agent']).toBe('107385 - TestEntegrator');
    expect(headers['x-agentname']).toBe('TestEntegrator');
    expect(headers['x-executor-user']).toBe('entegrasyon@example.com');
  });

  it('entegrator ismi alfanumerik ve en fazla 30 karakter olmalidir', () => {
    expect(() => validateIntegratorName('Gecerli123')).not.toThrow();
    expect(() => validateIntegratorName('Gecersiz Isim!')).toThrow();
    expect(() => validateIntegratorName('a'.repeat(31))).toThrow();
  });
});
