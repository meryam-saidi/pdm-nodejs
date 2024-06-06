import express, { response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import userRoutes from './routes/userRoutes.js';
import surplusFoodRoutes from './routes/surplusFoodRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import authRoutes from './routes/authRoutes.js';

mongoose.set('strictQuery', true);

const app = express();
const port = process.env.PORT || 7002;
const databaseName = 'pdm';
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`${dbUrl}/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB: ${databaseName}`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));

// Routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/surplusFood', surplusFoodRoutes);
app.use('/collection', collectionRoutes);

// Error handling middleware
app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
