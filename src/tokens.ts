import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
dotenv.config();

type payloadid={
    userid:string ;
}

export const accesstoken=(userid:payloadid):string=>{
   return jwt.sign(
        {id:userid},
        process.env.ACCESS_KEY as string,
        {expiresIn:'15m'}
    )
   

}


export const refreshtoken=(id:payloadid):string=>{
    return jwt.sign(
        {id:id},
        process.env.REFRESH_KEY as string,
        {expiresIn:'7d'}
    )

}