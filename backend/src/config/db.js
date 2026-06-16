require("dotenv").config();

const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
  // Production (Neon)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Local PostgreSQL
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
}

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
  } else {
    console.log("✅ PostgreSQL Database connected successfully");
    release();
  }
});

module.exports = pool;



// require("dotenv").config();  // load .env

// const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// // Test connection
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err.stack);
//   } else {
//     console.log("✅ PostgreSQL Database connected successfully");
//     release();
//   }
// });

// module.exports = pool;