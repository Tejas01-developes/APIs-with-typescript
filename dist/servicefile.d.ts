import { RowDataPacket } from "mysql2";
type userdata = {
    id: string;
    email: string;
    name: string;
    password: string;
};
export declare const sqlinsertquery: (data: userdata) => Promise<import("mysql2").QueryResult>;
type getdata = {
    email: string;
};
type tkninfo = RowDataPacket & {
    userid: string;
    email: string;
    name: string;
    password: string;
};
export declare const getall: (data: getdata) => Promise<tkninfo | null>;
export declare const nosqlinsertquery: (data: userdata) => Promise<string>;
type findtkn = {
    userid: string;
};
type info = RowDataPacket & {
    expired_at: number;
    token: string;
    added_at: string;
    userid: string;
};
export declare const sqlfindtoken: (data: findtkn) => Promise<info | null>;
type tkn = {
    token: string;
    userid: string;
};
export declare const updatequery: (data: tkn) => Promise<import("mysql2").QueryResult>;
type inserttkn = {
    userid: string;
    token: string;
};
export declare const inserttknquery: (data: inserttkn) => Promise<import("mysql2").QueryResult>;
type nosqldta = {
    id: string;
    name: string;
    email: string;
    registered_at: string;
};
export declare const getdatanosql: (data: getdata) => Promise<nosqldta | null>;
export {};
//# sourceMappingURL=servicefile.d.ts.map