import { Router } from 'express';
import { registerUser } from '../controllers/auth/register.controller.js';
import { recognizeUser } from '../controllers/auth/recognize.controller.js';
import { loginUser } from '../controllers/auth/login.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/recognize', recognizeUser);
router.post('/login', loginUser);

export default router;