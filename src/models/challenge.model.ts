import mongoose, { Document, Schema } from 'mongoose';

// Define the Challenge interface
export interface IChallenge extends Document {
  challengeId: string;
  creator: string;
  invitedUsers: string[];
  active: boolean;
  expiresAt: Date;
}

// Create the Challenge schema
const ChallengeSchema: Schema = new Schema(
  {
    challengeId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    creator: {
      type: String,
      required: true,
      ref: 'User'
    },
    invitedUsers: {
      type: [String],
      default: []
    },
    active: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expires after 7 days
    }
  },
  {
    timestamps: true
  }
);

// Index for faster lookups
ChallengeSchema.index({ challengeId: 1 }, { unique: true });
ChallengeSchema.index({ creator: 1 });
ChallengeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);