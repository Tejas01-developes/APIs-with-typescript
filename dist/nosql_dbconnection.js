import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const { NOSQL_LINK, NOSQL_DB } = process.env;
if (!NOSQL_LINK || !NOSQL_DB) {
    throw new Error;
}
const dbconnection = new MongoClient(process.env.NOSQL_LINK);
let nosqldb;
export const nosqldatabase = async () => {
    try {
        await dbconnection.connect();
        nosqldb = dbconnection.db(process.env.NOSQL_DB);
        return console.log("database connected");
    }
    catch (err) {
        return err;
    }
};
export { nosqldb };
