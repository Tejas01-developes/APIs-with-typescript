import express from 'express';
import router from './routes.js';
import { nosqldatabase } from './nosql_dbconnection.js';




const app=express();


app.use(express.json());
app.use("/apis",router);
nosqldatabase();

app.listen(3000,()=>{
    console.log("server started on the port 3000")
})