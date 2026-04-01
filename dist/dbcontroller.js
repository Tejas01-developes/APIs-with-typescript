import { getall, inserttknquery, nosqlinsertquery, sqlfindtoken, sqlinsertquery, updatequery } from "./servicefile.js";
import bcrypt from 'bcrypt';
import { accesstoken, refreshtoken } from './tokens.js';
export const insertuser = async (req, resp) => {
    try {
        const { email, name, password } = req.body;
        if (!name || !email || !password) {
            return resp.status(400).json({ success: false, message: "not recived body" });
        }
        const idd = crypto.randomUUID();
        console.log("id", idd);
        const hash = await bcrypt.hash(password, 10);
        const insertsqlquery = await sqlinsertquery({ id: idd, email, name, password: hash });
        // const insertsqlquery=await nosqlinsertquery({id:idd,email,name,password:hash})
        return resp.status(200).json({ success: true, message: "db insert success" });
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "error insertion in db"
        });
    }
};
export const loginsqluser = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return resp.status(400).json({ success: false, message: "no body recived" });
    }
    try {
        const result = await getall({ email });
        const compare = await bcrypt.compare(password, result[0].password);
        if (!compare) {
            return resp.status(400).json({ success: false, message: "password is incorrect" });
        }
        const userid = result[0].id;
        const access = accesstoken(result[0].id);
        let refresh;
        const gettkninfo = await sqlfindtoken({ userid });
        if (!gettkninfo || gettkninfo.length === 0) {
            console.log("came here");
            refresh = refreshtoken(result[0].id);
            console.log(refresh);
            const inserttoken = await inserttknquery({ userid, token: refresh });
        }
        const now = Date.now();
        const refresh_expiry = gettkninfo[0].expired_at;
        // console.log("expiry",refresh_expiry)
        if (now > refresh_expiry) {
            refresh = refreshtoken(result[0].id);
            const updatetoken = await updatequery({ token: refresh, userid });
        }
        else {
            refresh = gettkninfo[0].token;
        }
        console.log("now came here to set cookie");
        resp.cookie("refresh", refresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: "/"
        });
        return resp.status(200).json({ success: true, message: "login success" });
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "login failed" });
    }
};
export const insertuserinnosql = async (req, resp) => {
    try {
        const { email, name, password } = req.body;
        if (!name || !email || !password) {
            return resp.status(400).json({ success: false, message: "not recived body" });
        }
        const idd = crypto.randomUUID();
        console.log("id", idd);
        const hash = await bcrypt.hash(password, 10);
        const insertsqlquery = await nosqlinsertquery({ id: idd, email, name, password: hash });
        return resp.status(200).json({ success: true, message: "db insert success" });
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "error insertion in db"
        });
    }
};
