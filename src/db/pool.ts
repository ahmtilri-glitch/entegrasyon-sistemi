import mysql from 'mysql2/promise';
import { loadConfig, type DbConfig } from '../config/index.js';

let pool: mysql.Pool | null = null;

export function createPool(config: DbConfig): mysql.Pool {
  return mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit,
    waitForConnections: true,
    charset: 'utf8mb4',
    timezone: 'Z',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: false,
  });
}

export function getPool(): mysql.Pool {
  if (!pool) pool = createPool(loadConfig().db);
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export type Executor = mysql.Pool | mysql.PoolConnection;

export async function withTransaction<T>(
  handler: (connection: mysql.PoolConnection) => Promise<T>,
): Promise<T> {
  const connection = await getPool().getConnection();
  try {
    await connection.beginTransaction();
    const result = await handler(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
