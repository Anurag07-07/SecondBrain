import mongoose from "mongoose";
import express from 'express';
import authMiddleware from "../middlewares/auth.js";
import { createContent } from "../controllers/Content.controllers.js";
const router = express.Router();
router.post('/create', authMiddleware, createContent);
export default router;
//# sourceMappingURL=Content.route.js.map