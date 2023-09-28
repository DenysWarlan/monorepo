import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly name: string;
  readonly birthDate: Date;
  readonly email: string;
  readonly password: string;
  readonly links?: string;
}

export const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthDate: { type: Date },
  password: { type: String, required: true },
  links: [{ type: mongoose.Types.ObjectId, ref: 'link' }],
});
