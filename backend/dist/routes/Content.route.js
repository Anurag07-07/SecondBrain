import mongoose from "mongoose";
import express from 'express';
import authMiddleware from "../middlewares/auth.js";
import { createContent, deleteContent, getContent, LinkGenerate } from "../controllers/Content.controllers.js";
const router = express.Router();
router.post('/create', authMiddleware, createContent);
router.get('/view_content', authMiddleware, getContent);
router.delete('/delete_content/:contentId', authMiddleware, deleteContent);
router.post('/share', authMiddleware, LinkGenerate);
export default router;
//# sourceMappingURL=Content.route.js.map