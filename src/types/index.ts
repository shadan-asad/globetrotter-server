// Game-related interfaces
export interface DestinationData {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

export interface GameQuestion {
  questionId: string;
  clues: string;
  options: string[];
  correctAnswer: string;
}

export interface GameResponse {
  correct: boolean;
  funFact: string;
  correctAnswer: string;
}

// User-related interfaces
export interface UserStats {
  correct: number;
  incorrect: number;
  totalPlayed: number;
  lastPlayed: Date;
}

export interface UserProfile {
  username: string;
  gameStats: UserStats;
}

// Challenge-related interfaces
export interface ChallengeInvite {
  challengeId: string;
  creatorUsername: string;
  creatorStats: UserStats;
}

export interface ChallengeLink {
  challengeId: string;
  inviteUrl: string;
  imageUrl: string;
}
