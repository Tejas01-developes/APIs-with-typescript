import * as dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
const { MYSQL_DB, MYSQL_HOST, MYSQL_PORT, MYSQL_ROOT, MYSQL_PASS } = process.env;
if (!MYSQL_DB ||
    !MYSQL_HOST ||
    !MYSQL_PORT ||
    !MYSQL_ROOT || !MYSQL_PASS) {
    throw new Error("mysql_host not defined");
}
export const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_ROOT,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASS
});
