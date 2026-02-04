const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  max: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 20000,
  keepAlive: true,   // 🔥 IMPORTANT
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL pool error:", err.message);
});

module.exports = pool;