import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const accesstoken = (userid) => {
    return jwt.sign({ id: userid }, process.env.ACCESS_KEY, { expiresIn: '15m' });
};
export const refreshtoken = (id) => {
    return jwt.sign({ id: id }, process.env.REFRESH_KEY, { expiresIn: '7d' });
};
