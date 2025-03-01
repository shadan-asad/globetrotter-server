import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Destination document
export interface IDestination extends Document {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

// Create the Destination schema
const DestinationSchema: Schema = new Schema(
  {
    city: {
      type: String,
      required: [true, 'City name is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country name is required'],
      trim: true,
    },
    clues: {
      type: [String],
      required: [true, 'At least one clue is required'],
      validate: [(val: string[]) => val.length > 0, 'Destination must have at least one clue']
    },
    fun_fact: {
      type: [String],
      required: [true, 'At least one fun fact is required'],
      validate: [(val: string[]) => val.length > 0, 'Destination must have at least one fun fact']
    },
    trivia: {
      type: [String],
      required: [true, 'At least one trivia item is required'],
      validate: [(val: string[]) => val.length > 0, 'Destination must have at least one trivia item']
    }
  },
  {
    timestamps: true
  }
);

// Add an index for faster queries
DestinationSchema.index({ city: 1, country: 1 }, { unique: true });

export default mongoose.model<IDestination>('Destination', DestinationSchema);