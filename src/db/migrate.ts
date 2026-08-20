import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import { loadConfig } from '../config/index.js';
import { logger } from '../core/logger.js';

const MIGRATIONS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../migrations',
);

const CREATE_HISTORY_TABLE = `
CREATE TABLE IF NOT EXISTS schema_migrations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  filename VARCHAR(255) NOT NULL,
  applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_schema_migrations_filename (filename)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

/** SQL dosyasini ifadelere ayirir; string literal ve yorum satirlarina duyarlidir. */
export function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = '';
  let quote: string | null = null;
  let lineComment = false;

  for (let i = 0; i < sql.length; i += 1) {
    const char = sql[i] as string;
    const next = sql[i + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      else continue;
    }

    if (!quote && char === '-' && next === '-') {
      lineComment = true;
      i += 1;
      continue;
    }

    if (quote) {
      current += char;
      if (char === '\\') {
        const following = sql[i + 1];
        if (following !== undefined) {
          current += following;
          i += 1;
        }
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      current += char;
      continue;
    }

    if (char === ';') {
      const trimmed = current.trim();
      if (trimmed.length > 0) statements.push(trimmed);
      current = '';
      continue;
    }

    current += char;
  }

  const tail = current.trim();
  if (tail.length > 0) statements.push(tail);
  return statements;
}

export async function runMigrations(): Promise<string[]> {
  const config = loadConfig();
  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    multipleStatements: false,
    charset: 'utf8mb4',
  });

  const applied: string[] = [];
  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await connection.changeUser({ database: config.db.database });
    await connection.query(CREATE_HISTORY_TABLE);

    const [rows] = await connection.query<mysql.RowDataPacket[]>(
      'SELECT filename FROM schema_migrations',
    );
    const done = new Set(rows.map((row) => String(row.filename)));

    const files = (await readdir(MIGRATIONS_DIR))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      if (done.has(file)) continue;
      const sql = await readFile(path.join(MIGRATIONS_DIR, file), 'utf8');
      for (const statement of splitSqlStatements(sql)) {
        await connection.query(statement);
      }
      await connection.query('INSERT INTO schema_migrations (filename) VALUES (?)', [file]);
      applied.push(file);
      logger.info('migration_uygulandi', { file });
    }
  } finally {
    await connection.end();
  }

  return applied;
}

const isDirectRun = process.argv[1] !== undefined && process.argv[1].includes('migrate');
if (isDirectRun) {
  runMigrations()
    .then((applied) => {
      logger.info('migration_tamamlandi', { applied, count: applied.length });
      process.exit(0);
    })
    .catch((error: unknown) => {
      logger.error('migration_hatasi', {
        error: error instanceof Error ? error.message : String(error),
      });
      process.exit(1);
    });
}
