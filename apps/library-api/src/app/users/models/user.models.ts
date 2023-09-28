import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly email: string;
  readonly password: string;
  readonly links?: string;
}

export const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: mongoose.Types.ObjectId, ref: 'link' }],
});
