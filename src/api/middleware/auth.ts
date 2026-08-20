import { timingSafeEqual } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { loadConfig } from '../../config/index.js';

export function safeCompare(a: string, b: string): boolean {
  const bufferA = Buffer.from(a, 'utf8');
  const bufferB = Buffer.from(b, 'utf8');
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export function parseBasicAuth(header: string | undefined): { user: string; password: string } | null {
  if (!header || !header.toLowerCase().startsWith('basic ')) return null;
  const decoded = Buffer.from(header.slice(6).trim(), 'base64').toString('utf8');
  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex < 0) return null;
  return {
    user: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  };
}

/** TGO webhook'lari Basic Authentication ile dogrulanir. */
export function webhookBasicAuth(req: Request, res: Response, next: NextFunction): void {
  const { webhookBasicUser, webhookBasicPassword } = loadConfig().server;
  const credentials = parseBasicAuth(req.header('authorization'));
  if (
    webhookBasicUser === '' ||
    webhookBasicPassword === '' ||
    !credentials ||
    !safeCompare(credentials.user, webhookBasicUser) ||
    !safeCompare(credentials.password, webhookBasicPassword)
  ) {
    res.setHeader('WWW-Authenticate', 'Basic realm="tgo-webhook"');
    res.status(401).json({ message: 'Yetkisiz webhook istegi' });
    return;
  }
  next();
}

/** Panel REST API'si X-Api-Key ile korunur. */
export function panelApiKeyAuth(req: Request, res: Response, next: NextFunction): void {
  const expected = loadConfig().server.panelApiKey;
  const provided = req.header('x-api-key') ?? '';
  if (expected === '' || !safeCompare(provided, expected)) {
    res.status(401).json({ message: 'Gecersiz veya eksik X-Api-Key' });
    return;
  }
  next();
}
