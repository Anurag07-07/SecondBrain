import express from 'express';
import { Signup, Signin } from '../controllers/User.contollers.js';
const router = express.Router();
router.post('/signup', Signup);
router.post('/signin', Signin);
export default router;
//# sourceMappingURL=user.Route.js.map