/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { login, register } from './app/routes/auth.route';
import { DBHelper } from './app/helper/db.helper';
import * as bodyParser from 'body-parser';
import * as serverless from 'serverless-http';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

login(app);
register(app);

DBHelper.init();

module.exports.handler = serverless(app);
