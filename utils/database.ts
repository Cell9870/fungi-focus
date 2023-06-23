import mysql from "mysql2/promise";

let connection: Promise<mysql.Connection>;

export function connect(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt(process.env.DB_PORT || "3307"),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}
