import type { TgoConfig } from '../config/index.js';

export interface TgoHeaders extends Record<string, string> {
  Authorization: string;
  'User-Agent': string;
  'x-agentname': string;
  'x-executor-user': string;
  Accept: string;
}

/**
 * TGO servisleri HTTP Basic Authentication kullanir.
 * Kullanici adi API Key, parola API Secret bilgisidir.
 */
export function buildBasicAuthHeader(apiKey: string, apiSecret: string): string {
  const encoded = Buffer.from(`${apiKey}:${apiSecret}`, 'utf8').toString('base64');
  return `Basic ${encoded}`;
}

/**
 * User-Agent formati: "{supplierId} - {IntegratorName}".
 * Kendi entegrasyonunu yazan saticilar icin "{supplierId} - SelfIntegration" kullanilir.
 */
export function buildUserAgent(supplierId: number, integratorName: string): string {
  return `${supplierId} - ${integratorName}`;
}

export function buildAuthHeaders(config: TgoConfig): TgoHeaders {
  return {
    Authorization: buildBasicAuthHeader(config.apiKey, config.apiSecret),
    'User-Agent': buildUserAgent(config.supplierId, config.integratorName),
    'x-agentname': config.integratorName,
    'x-executor-user': config.executorUser,
    Accept: 'application/json',
  };
}
