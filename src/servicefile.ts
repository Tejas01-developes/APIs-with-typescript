
import { error } from "console"
import { db } from "./database_connections.js"
import { nosqldb } from "./nosql_dbconnection.js"
import { RowDataPacket } from "mysql2"



type userdata={
    id:string
  email:string,
  name:string,
  password:string
    }
export const sqlinsertquery=async(data:userdata)=>{
// const{id,email,name,password}=data;
   
        const[result]=await db.query(
            'insert into person (id,email,name,password) values (?,?,?,?)',
            [data.id,data.email,data.name,data.password],
        )
        return result;
    }
   
   type getdata={
    email:string
   }
type tkninfo={
    userid:string,
    email:string,
    name:string
    password:string
}

export const getall=async(data:getdata):Promise<tkninfo | null>=>{
    const [res]=await db.query<tkninfo[]>(
        'select * from person where email =?',
        [data.email]
    )
    return res.length > 0 ? res[0] : null
}



export const nosqlinsertquery=async(data:userdata)=>{
    try{
const insertnosql=await nosqldb.collection("tscollect").insertOne({id:data.id,email:data.email,name:data.name,password:data.password,registered_at:new Date(Date.now())});
return "success insert"

}catch(err){
    throw error
}
}

type findtkn={
userid:string
}


type info={
expired_at:number,
token:string,
added_at:string,
userid:string
}

export const sqlfindtoken=async(data:findtkn):Promise<info | null>=>{
    try{
 const [res]=await db.query<info[]>(
'select * from  refreshtoken where userid=?',
[data.userid]
)
// console.log(res)
return res.length > 0 ? res[0] : null
}catch(err){
    console.log("find token error");
    throw err
}
}

type tkn={
    token:string,
    userid:string
}

export const updatequery=async(data:tkn)=>{
    try{
 const [res]=await db.query(
    'update refreshtoken set token=?,created_at=now(),expired_at=date_add(now(),interval 7 day) where userid=?',
    [data.token,data.userid]
 )       
 return res
    }catch(err){
        throw err
    }
}


type inserttkn={
    userid:string,
    token:string,
}

export const inserttknquery=async(data:inserttkn)=>{
    console.log("entered insert token service function")
    try{
 const [res]=await db.query(
    'insert into refreshtoken (userid, token,created_at,expired_at) values (?,?,now(),date_add(now(),interval 7 day))',
    [data.userid,data.token]
 )    
 return res   
    }catch(err){
        throw err
    }
}
