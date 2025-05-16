import express from 'express';
import { login, register, logout, getMe } from '../controllers/authController.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get("/me", authenticateUser, getMe);

export default router;
