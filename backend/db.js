import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "ciplostem_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize database and tables
export async function initDB() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected");

    // Create database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "ciplostem_db"}\``
    );
    connection.release();

    // Select database
    await pool.query(`USE \`${process.env.DB_NAME || "ciplostem_db"}\``);

    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create users table for doctors with MCI Code as primary credential
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mci_code VARCHAR(100) NOT NULL,
        email VARCHAR(255) NULL,
        city VARCHAR(255) NULL,
        phone VARCHAR(50) NULL,
        is_verified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_mci_code (mci_code)
      )
    `);

    // Ensure email, city, phone are nullable if table was created previously with NOT NULL
    try {
      await pool.query(`ALTER TABLE users MODIFY COLUMN email VARCHAR(255) NULL`);
    } catch {
      // ignore
    }
    try {
      await pool.query(`ALTER TABLE users MODIFY COLUMN city VARCHAR(255) NULL`);
    } catch {
      // ignore
    }
    try {
      await pool.query(`ALTER TABLE users MODIFY COLUMN phone VARCHAR(50) NULL`);
    } catch {
      // ignore
    }

    // Clean up unused otps table
    try {
      await pool.query(`DROP TABLE IF EXISTS otps`);
    } catch {
      // ignore
    }

    console.log("Database initialized successfully (contacts & doctor MCI tables ready).");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export default pool;
