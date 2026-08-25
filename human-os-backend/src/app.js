/**
 * app.js
 *
 * Assembles the Express application: global middleware,
 * health check, authentication routes, profile routes,
 * wellness routes, activity routes, sleep routes,
 * dashboard routes, insight routes, and error handlers.
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./config/env');
const corsOptions = require('./config/cors');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const moodRoutes = require('./routes/moodRoutes');
const waterRoutes = require('./routes/waterRoutes');
const activityRoutes = require('./routes/activityRoutes');
const sleepRoutes = require('./routes/sleepRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const insightRoutes = require('./routes/insightRoutes');

const app = express();

// Security headers
app.use(helmet());

// Restricted CORS
app.use(cors(corsOptions));

// JSON body parsing
app.use(express.json());

// Request logging in development only
if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: { status: 'ok' },
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Profile routes
app.use('/api/profile', profileRoutes);

// Wellness routes
app.use('/api/wellness', moodRoutes);
app.use('/api/wellness', waterRoutes);

// Activity routes
app.use('/api/activity', activityRoutes);

// Sleep routes
app.use('/api/sleep', sleepRoutes);

// Dashboard routes
app.use('/api/dashboard', dashboardRoutes);

// Insight routes
app.use('/api/insights', insightRoutes);

// 404 handler for any unmatched route
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

module.exports = app;