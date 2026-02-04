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
  max: 4,                   // Use 4 instead of 2 (leave 1 for other processes)
  idleTimeoutMillis: 30000,  // Increase to 30s
  connectionTimeoutMillis: 5000, // Reduce to 5s
  maxUses: 7500,            // Prevent connection exhaustion
});

pool.on("connect", () => {
  console.log("📌 PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL pool error:", err.message);
});

module.exports = pool;