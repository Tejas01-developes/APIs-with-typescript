import mongodb, { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const{
    NOSQL_LINK,NOSQL_DB
}=process.env

if(!NOSQL_LINK || !NOSQL_DB){
    throw new Error
}

const dbconnection=new MongoClient(process.env.NOSQL_LINK as string);
let nosqldb:Db;
export const nosqldatabase=async()=>{
    try{
    await dbconnection.connect();
    nosqldb=dbconnection.db(process.env.NOSQL_DB as string)
return console.log("database connected")

    }catch(err){
        return err
    }
}
export {nosqldb};