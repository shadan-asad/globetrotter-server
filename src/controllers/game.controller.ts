import { Request, Response } from 'express';
import Destination from '../models/destination.model';
import User from '../models/user.model';
import { GameQuestion, GameResponse } from '../types';

// Get a random game question
export const getGameQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    // Count total documents
    const count = await Destination.countDocuments();
    
    // Get a random destination
    const random = Math.floor(Math.random() * count);
    const destination: any = await Destination.findOne().skip(random);
    
    if (!destination) {
      res.status(404).json({ message: 'No destinations found' });
      return;
    }
    
    // Get 3 more random destinations for options
    const optionsCount = await Destination.countDocuments({ _id: { $ne: destination._id } });
    if (optionsCount < 3) {
      res.status(500).json({ message: 'Not enough destinations for options' });
      return;
    }
    
    const otherDestinations = await Destination.aggregate([
      { $match: { _id: { $ne: destination._id } } },
      { $sample: { size: 3 } },
      { $project: { city: 1, country: 1 } }
    ]);
    
    // Pick a random clue
    const clueIndex = Math.floor(Math.random() * destination.clues.length);
    const clues = destination.clues;
    
    // Create options array with correct answer and 3 wrong answers
    const correctAnswer = `${destination.city}, ${destination.country}`;
    const options = [
      correctAnswer,
      ...otherDestinations.map(dest => `${dest.city}, ${dest.country}`)
    ];
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Create game question
    const question: GameQuestion = {
      questionId: destination._id.toString(),
      clues,
      options,
      correctAnswer
    };
    
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error creating game question', error });
  }
};

// Submit answer and get feedback
export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
  const { questionId, answer, username } = req.body;
  
  if (!questionId || !answer) {
    res.status(400).json({ message: 'Question ID and answer are required' });
    return;
  }
  
  try {
    // Find the destination
    const destination = await Destination.findById(questionId);
    
    if (!destination) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }
    
    // Check if answer is correct
    const correctAnswer = `${destination.city}, ${destination.country}`;
    const isCorrect = answer === correctAnswer;
    
    // Get a random fun fact
    const randomFactIndex = Math.floor(Math.random() * destination.fun_fact.length);
    const funFact = destination.fun_fact[randomFactIndex];
    
    // Update user stats if username is provided
    if (username) {
      const user = await User.findOne({ username });
      
      if (user) {
        // Update stats
        user.gameStats.totalPlayed += 1;
        if (isCorrect) {
          user.gameStats.correct += 1;
        } else {
          user.gameStats.incorrect += 1;
        }
        user.gameStats.lastPlayed = new Date();
        
        await user.save();
      }
    }
    
    // Create response
    const response: GameResponse = {
      correct: isCorrect,
      funFact,
      correctAnswer
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error processing answer', error });
  }
};