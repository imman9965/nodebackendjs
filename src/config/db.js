const { Pool } = require("pg");

// ❌ Do NOT use dotenv on Render
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  max: 2,                   // safer for Render
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 20000,
});

pool.on("connect", () => {
  console.log("📌 PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL pool error:", err.message);
});

module.exports = pool;