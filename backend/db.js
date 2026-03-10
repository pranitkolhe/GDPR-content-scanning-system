const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gdpr_db",
  password: "Postgre",   
  port: 5432
});

module.exports = pool;
