import express from 'express';
import "reflect-metadata";
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';

import './database/connection';
import errorHandler from './errors/handler'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => console.log('🔥️ Server started at http://localhost/3333'));