const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  password: process.env.DB_PASSWORD || 'test123',
  database: process.env.DB_NAME || 'test',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => console.log('📌 PostgreSQL connected'));
pool.on('error', (err) => console.error('❌ PostgreSQL pool error', err));

module.exports = pool;
