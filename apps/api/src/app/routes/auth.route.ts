import { User } from '../models/user.models';
import { check, validationResult } from 'express-validator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Express } from 'express';

export function login(app: Express) {
  app.post(
    '/api/login',
    [check('email', 'Error e-mail').isEmail(), check('password', 'Error password length').exists()],
    async (req, res) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Error e-mail or password',
          });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'User already not exists' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ message: 'Error password' });
        }

        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
        res.header('Access-Control-Allow-Origin', '*');
        res.json({ token, userId: user.id });
      } catch (e) {
        res.status(500).json({ message: 'Server Error' });
      }
    }
  );
}
export function register(app: Express) {
  app.post(
    '/api/register',
    [check('email', 'Error e-mail').isEmail(), check('password', 'Error password length').isLength({ min: 6 })],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Error e-mail or password',
          });
        }
        const { email, password } = req.body;

        const newUser = await User.findOne({ email });

        if (newUser) {
          return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'user created' });
      } catch (e) {
        res.status(500).json({ message: 'Server Error' });
      }
    }
  );
}
