import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Import routes (to be created)
// import destinationRoutes from './routes/destination.routes';
// import gameRoutes from './routes/game.routes';
// import userRoutes from './routes/user.routes';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes (to be implemented)
// app.use('/api/destinations', destinationRoutes);
// app.use('/api/game', gameRoutes);
// app.use('/api/users', userRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;