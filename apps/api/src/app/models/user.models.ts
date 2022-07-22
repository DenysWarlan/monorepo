import { Schema, model, Types } from 'mongoose';

export  const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'link' }],
});

export const User = model('user', schema);
