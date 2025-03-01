import { Request, Response } from 'express';
import Destination from '../models/destination.model';

// Get all destinations
export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await Destination.find({}).select('city country');
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations', error });
  }
};

// Get random destination for the game
export const getRandomDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    // Count total documents
    const count = await Destination.countDocuments();
    // Get a random destination
    const random = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(random);
    
    if (!destination) {
      res.status(404).json({ message: 'No destinations found' });
    }
    
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random destination', error });
  }
};

// Get destination by ID
export const getDestinationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      res.status(404).json({ message: 'Destination not found' });
    }
    
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination', error });
  }
};

// Add new destination
export const addDestination = async (req: Request, res: Response) => {
  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: 'Error adding destination', error });
  }
};