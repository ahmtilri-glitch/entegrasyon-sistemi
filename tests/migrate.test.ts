import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { splitSqlStatements } from '../src/db/migrate.js';

describe('migration dosyasi', () => {
  const sql = readFileSync(new URL('../migrations/001_init.sql', import.meta.url), 'utf8');
  const statements = splitSqlStatements(sql);

  it('tum zorunlu tablolari olusturur', () => {
    for (const table of [
      'orders',
      'order_items',
      'products',
      'categories',
      'stores',
      'api_logs',
      'webhooks',
      'batch_requests',
      'claims',
      'sync_state',
    ]) {
      expect(sql).toContain(`CREATE TABLE IF NOT EXISTS ${table}`);
    }
  });

  it('sik sorgulanan alanlara index ekler', () => {
    expect(sql).toContain('idx_orders_tgo_order_id');
    expect(sql).toContain('idx_orders_status');
    expect(sql).toContain('idx_orders_created_at');
  });

  it('ifadeleri yorum satirlarini atlayarak ayirir', () => {
    expect(statements.length).toBeGreaterThanOrEqual(10);
    expect(statements.every((statement) => !statement.startsWith('--'))).toBe(true);
  });
});
