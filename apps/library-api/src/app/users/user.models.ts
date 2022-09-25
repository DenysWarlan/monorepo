import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: number;
  email: string;
  password: string;
  links?: string;
}

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: mongoose.Types.ObjectId, ref: 'link' }],
});
