import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.routes';
import customerRoutes from './routes/customer.routes';
import vehicleRoutes from './routes/vehicle.routes';
import uploadRoutes from './routes/upload.routes';
import driverRoutes from './routes/driver.routes';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/drivers', driverRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Sapthagiri Water API is Running 🚀');
});

export default app;
