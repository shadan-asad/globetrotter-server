import { Router } from 'express';
import * as destinationController from '../controllers/destination.controller';

const router = Router();

// Get all destinations
router.get('/', destinationController.getAllDestinations);

// Get random destination
router.get('/random', destinationController.getRandomDestination);

// Get destination by ID
router.get('/:id', destinationController.getDestinationById);

// Add new destination
router.post('/', destinationController.addDestination);

export default router;