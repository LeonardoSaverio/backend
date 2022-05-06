import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import "reflect-metadata";
import 'express-async-errors';
dotenv.config();
import routes from './routes';
import errorHandler from './errors/handler'

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => console.log('🔥️ Server started at http://localhost/3333'));