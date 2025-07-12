import express from 'express';
import cors from 'cors';
import routes from './routes';
import externalApiRoutes from './routes/externalApi';

// Initiate Express app
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Internal API & Profisee API
app.use('/api', routes);
app.use('/api', externalApiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'BeSpoked Bikes API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`BeSpoked Bikes API server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});