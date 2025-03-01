import { Router } from 'express';
import * as gameController from '../controllers/game.controller';

const router = Router();

// Get a random game question
router.get('/question', gameController.getGameQuestion);

// Submit answer
router.post('/answer', gameController.submitAnswer);

export default router;