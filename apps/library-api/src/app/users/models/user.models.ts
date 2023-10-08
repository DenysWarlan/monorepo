import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly name: string;
  readonly birthDate: string;
  readonly email: string;
  readonly password: string;
  readonly booksIds?: string[];
}

export const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthDate: { type: String },
  password: { type: String, required: true },
  booksIds: [{ type: mongoose.Types.ObjectId, ref: 'book' }],
});
