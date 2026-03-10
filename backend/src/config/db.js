const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gdpr_db",
  password: "Postgre",   
  port: 5432
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
  } else {
    console.log("✅ PostgreSQL Database connected successfully");
    release();
  }
});

module.exports = pool;
