
// lib/db.ts
import mysql from 'mysql2/promise';

// Export a pool for query usage everywhere
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Example: Parameterized query (prevents SQL injection)
export async function getUserByEmail(email: string) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  // Never log sensitive data in production
  return rows;
}

