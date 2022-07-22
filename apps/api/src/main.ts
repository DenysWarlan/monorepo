/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { login, register} from './app/routes/auth.route';
import { DBHelper } from './app/helper/db.helper';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

login(app);
register(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
DBHelper.init();
