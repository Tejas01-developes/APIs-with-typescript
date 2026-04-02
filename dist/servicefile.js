import { error } from "console";
import { db } from "./database_connections.js";
import { nosqldb } from "./nosql_dbconnection.js";
export const sqlinsertquery = async (data) => {
    // const{id,email,name,password}=data;
    const [result] = await db.query('insert into person (id,email,name,password) values (?,?,?,?)', [data.id, data.email, data.name, data.password]);
    return result;
};
export const getall = async (data) => {
    const [res] = await db.query('select * from person where email =?', [data.email]);
    return res.length > 0 ? res[0] : null;
};
export const nosqlinsertquery = async (data) => {
    try {
        const insertnosql = await nosqldb.collection("tscollect").insertOne({ id: data.id, email: data.email, name: data.name, password: data.password, registered_at: new Date(Date.now()) });
        return "success insert";
    }
    catch (err) {
        throw error;
    }
};
export const sqlfindtoken = async (data) => {
    // console.log(data.userid);
    try {
        const [res] = await db.query('select * from  refreshtoken where userid=?', [data.userid]);
        // console.log(res)
        return res.length > 0 ? res[0] : null;
    }
    catch (err) {
        console.log("find token error");
        throw err;
    }
};
export const updatequery = async (data) => {
    try {
        const [res] = await db.query('update refreshtoken set token=?,created_at=now(),expired_at=date_add(now(),interval 7 day) where userid=?', [data.token, data.userid]);
        return res;
    }
    catch (err) {
        throw err;
    }
};
export const inserttknquery = async (data) => {
    console.log("entered insert token service function");
    try {
        const [res] = await db.query('insert into refreshtoken (userid, token,created_at,expired_at) values (?,?,now(),date_add(now(),interval 7 day))', [data.userid, data.token]);
        return res;
    }
    catch (err) {
        throw err;
    }
};
export const getdatanosql = async (data) => {
    try {
        const getinfos = await nosqldb.collection("tscollect").findOne({ email: data.email });
        return getinfos;
    }
    catch (err) {
        throw new Error();
    }
};
//# sourceMappingURL=servicefile.js.map