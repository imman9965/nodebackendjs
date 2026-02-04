const { Pool } = require("pg");

// ❌ DO NOT use dotenv on Render
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,                   // 🔑 reduce connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // 🔑 increase timeout
});

pool.on("connect", () => {
  console.log("📌 PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL pool error", err);
  process.exit(1);
});

module.exports = pool;
