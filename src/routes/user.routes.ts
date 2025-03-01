import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

// Register or get user
router.post('/register', userController.registerUser);

// Get user profile
router.get('/profile/:username', userController.getUserProfile);

// Create a challenge
router.post('/challenge/create', userController.createChallenge);

// Join a challenge
router.post('/challenge/join', userController.joinChallenge);

export default router;