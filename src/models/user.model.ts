import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the game session interface
interface IGameSession {
  correct: number;
  incorrect: number;
  totalPlayed: number;
  lastPlayed: Date;
}

// Define the user interface
export interface IUser extends Document {
  username: string;
  gameStats: IGameSession;
  challenges: {
    created: string[];
    received: string[];
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the User schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
    },
    password: {
      type: String,
      required: false, // Optional password for registered users
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Don't return password in queries
    },
    gameStats: {
      correct: {
        type: Number,
        default: 0,
      },
      incorrect: {
        type: Number,
        default: 0,
      },
      totalPlayed: {
        type: Number,
        default: 0,
      },
      lastPlayed: {
        type: Date,
        default: Date.now,
      },
    },
    challenges: {
      created: {
        type: [String],
        default: [],
      },
      received: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Method to compare entered password with stored password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this as unknown as IUser;

  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password") || !this.password) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with the new salt
    const hash = await bcrypt.hash(this.password as string, salt);
    // Override the cleartext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Index for faster username lookups
UserSchema.index({ username: 1 }, { unique: true });

export default mongoose.model<IUser>("User", UserSchema);
