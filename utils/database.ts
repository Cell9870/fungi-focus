import mysql from "mysql2/promise";

let connection: Promise<mysql.Connection>;

export function connect(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3307,
    password: process.env.DB_PASSWORD,
    database: "fungidb",
    //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
  });
}
