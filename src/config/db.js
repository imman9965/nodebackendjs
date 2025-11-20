// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: Number(process.env.DB_PORT),
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// pool.on('connect', () => console.log('📌 PostgreSQL connected'));
// pool.on('error', (err) => console.error('❌ PostgreSQL pool error', err));

// module.exports = pool;



const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => console.log("📌 PostgreSQL connected"));
pool.on("error", (err) => console.error("❌ PostgreSQL pool error", err));

module.exports = pool;

