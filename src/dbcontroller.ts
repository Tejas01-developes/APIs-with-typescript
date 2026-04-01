
import  { Request, Response } from 'express';
import { getall, getdatanosql, inserttknquery, nosqlinsertquery, sqlfindtoken, sqlinsertquery, updatequery } from "./servicefile.js";
import bcrypt from 'bcrypt';
import { accesstoken, refreshtoken } from './tokens.js';



export const insertuser=async(req:Request,resp:Response)=>{
    try{
    const{email,name,password}=req.body;
if(!name || !email || !password){
    return resp.status(400).json({success:false,message:"not recived body"})
}
const idd= crypto.randomUUID();
console.log("id",idd);
const hash=await bcrypt.hash(password,10);
const insertsqlquery=await sqlinsertquery({id:idd,email,name,password:hash})

        return resp.status(200).json({success:true,message:"db insert success"})
    }catch(err){
        return resp.status(400).json({success:false,message
            :"error insertion in db"
        })
    }
}


export const loginsqluser=async(req:Request,resp:Response)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return resp.status(400).json({success:false,message:"no body recived"})
    }
    try{
const result=await getall({email});
if(!result){
    return resp.status(400).json({success:false,message:"no result in the array"})
}
const compare=await bcrypt.compare(password,result.password);
if(!compare){
    return resp.status(400).json({success:false,message:"password is incorrect"})
}
const userid:string=result.id

const access:string=accesstoken({userid:result.userid});
let refresh:string;

const gettkninfo=await sqlfindtoken({userid});
if(!gettkninfo){
    return resp.status(400).json({success:false,message:"no result in the token info type array"})
}
if(!gettkninfo){
    console.log("came here")
    refresh=refreshtoken({userid:result.userid})
    console.log(refresh);
    const inserttoken=await inserttknquery({userid,token:refresh})
}
const now=Date.now();
const refresh_expiry:number=gettkninfo.expired_at

if(now > refresh_expiry){
    refresh=refreshtoken({userid:result.userid})
    const updatetoken= await updatequery({token:refresh,userid})
}else{
refresh=gettkninfo.token
}
console.log("now came here to set cookie")
 resp.cookie("refresh",refresh,{
    httpOnly:true,
    secure:true,
    sameSite:'lax',
    path:"/"
})
return resp.status(200).json({success:true,message:"login success"})
}catch(err){
    return resp.status(400).json({success:false,message:"login failed"})
}
}





export const insertuserinnosql=async(req:Request,resp:Response)=>{
    try{
    const{email,name,password}=req.body;
if(!name || !email || !password){
    return resp.status(400).json({success:false,message:"not recived body"})
}
const idd= crypto.randomUUID();
console.log("id",idd);
const hash=await bcrypt.hash(password,10);

const insertsqlquery=await nosqlinsertquery({id:idd,email,name,password:hash})
        return resp.status(200).json({success:true,message:"db insert success"})
    }catch(err){
        return resp.status(400).json({success:false,message
            :"error insertion in db"
        })
    }
}


export const nosqlget=async(req:Request,resp:Response)=>{
    const{email}=req.body;
    try{
    const getall=await getdatanosql({email});
    return resp.status(200).json({success:true,message:getall?.name})
}catch(err){
    return resp.status(400).json({success:false,message:"nosql error"})
}
}


