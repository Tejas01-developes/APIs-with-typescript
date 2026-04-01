import express from 'express';
import { loginsqluser, insertuser, insertuserinnosql } from './dbcontroller.js';



const router=express.Router();

router.post("/",insertuser);
router.post("/login",loginsqluser)
router.post("/nosql",insertuserinnosql);

export default router;