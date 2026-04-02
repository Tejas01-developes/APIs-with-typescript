import express from 'express';
import { loginsqluser, insertuser, insertuserinnosql, nosqlget } from './dbcontroller.js';
const router = express.Router();
router.post("/", insertuser);
router.post("/login", loginsqluser);
router.post("/nosql", insertuserinnosql);
router.post("/nosqlget", nosqlget);
export default router;
//# sourceMappingURL=routes.js.map