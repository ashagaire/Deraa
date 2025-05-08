const fs = require("fs");
const path = require("path");
const pool = require("./db");

const migrate = async () => {
  try {
     // Drop all existing tables
     const dropTablesSQL = `
     DROP TABLE IF EXISTS images CASCADE;
     DROP TABLE IF EXISTS apartments CASCADE;
     DROP TABLE IF EXISTS users CASCADE;
   `;
   await pool.query(dropTablesSQL);
   console.log("Existing tables dropped successfully!");

    const sql = fs.readFileSync(
      path.join(__dirname, "../database/deraa_app_query"),
      "utf-8"
    );
    await pool.query(sql);
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Error initializing database:", err.message);
  } finally {
    pool.end();
  }
};

migrate();