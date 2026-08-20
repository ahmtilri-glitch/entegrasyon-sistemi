import type { RowDataPacket } from 'mysql2';
import { getPool, type Executor } from '../pool.js';

export class SyncStateRepository {
  private readonly db: Executor;

  constructor(db: Executor = getPool()) {
    this.db = db;
  }

  async get(syncKey: string): Promise<{ lastCursorValue: number | null } | null> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT last_cursor_value FROM sync_state WHERE sync_key = ? LIMIT 1',
      [syncKey],
    );
    const row = rows[0];
    if (!row) return null;
    return {
      lastCursorValue:
        row.last_cursor_value === null ? null : Number(row.last_cursor_value),
    };
  }

  async save(syncKey: string, cursorValue: number, error?: string): Promise<void> {
    await this.db.execute(
      `INSERT INTO sync_state (sync_key, last_run_at, last_cursor_value, last_error)
       VALUES (?, NOW(3), ?, ?)
       ON DUPLICATE KEY UPDATE
         last_run_at = NOW(3),
         last_cursor_value = VALUES(last_cursor_value),
         last_error = VALUES(last_error)`,
      [syncKey, cursorValue, error ?? null],
    );
  }
}
