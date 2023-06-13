import mysql from "mysql2/promise"

let connection: any

if (!connection) {
    connection = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "fungidb",
        //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    })
}

export {connection as conn}




/*
import { Pool } from 'pg'

let connection: any

if (!connection) {
    connection = new Pool({
        user: 'postgres',
        password: 'admin',
        host: 'localhost',
        port: 5432,
        database: 'fungidb'
    })
}

export { connection as conn }*/