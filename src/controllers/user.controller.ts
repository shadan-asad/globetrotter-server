import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Challenge from '../models/challenge.model';
import { v4 as uuidv4 } from 'uuid';

// Register or get a user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  
  if (!username) {
    res.status(400).json({ message: 'Username is required' });
    return;
  }
  
  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    
    // If not, create a new user
    if (!user) {
      user = new User({ username });
      await user.save();
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      token,
      user: {
        username: user.username,
        gameStats: user.gameStats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json({
      username: user.username,
      gameStats: user.gameStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

// Create a challenge
export const createChallenge = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  
  if (!username) {
    res.status(400).json({ message: 'Username is required' });
    return;
  }
  
  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Generate a unique challenge ID
    const challengeId = uuidv4();
    
    // Create a new challenge
    const challenge = new Challenge({
      challengeId,
      creator: username
    });
    
    await challenge.save();
    
    // Update user's challenges created list
    user.challenges.created.push(challengeId);
    await user.save();
    
    // Generate challenge link
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    const inviteUrl = `${baseUrl}/challenge/${challengeId}`;
    
    res.status(201).json({
      challengeId,
      inviteUrl,
      message: 'Challenge created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating challenge', error });
  }
};

// Join a challenge
export const joinChallenge = async (req: Request, res: Response): Promise<void> => {
  const { challengeId, username } = req.body;
  
  if (!challengeId || !username) {
    res.status(400).json({ message: 'Challenge ID and username are required' });
    return;
  }
  
  try {
    // Find the challenge
    const challenge = await Challenge.findOne({ challengeId });
    
    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
      return;
    }
    
    if (!challenge.active) {
      res.status(400).json({ message: 'This challenge is no longer active' });
      return;
    }
    
    // Find the user
    const user = await User.findOne({ username });
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Add user to invited users if not already there
    if (!challenge.invitedUsers.includes(username)) {
      challenge.invitedUsers.push(username);
      await challenge.save();
    }
    
    // Add challenge to user's received list if not already there
    if (!user.challenges.received.includes(challengeId)) {
      user.challenges.received.push(challengeId);
      await user.save();
    }
    
    // Get creator profile
    const creator = await User.findOne({ username: challenge.creator });
    
    if (!creator) {
      res.status(404).json({ message: 'Challenge creator not found' });
      return;
    }
    
    res.status(200).json({
      challengeId,
      creatorUsername: creator.username,
      creatorStats: creator.gameStats,
      message: 'Joined challenge successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error joining challenge', error });
  }
};