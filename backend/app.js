const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

const allowedOrigins = String(process.env.FRONTEND_ORIGINS || 'http://127.0.0.1:5500,http://localhost:5500')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    const error = new Error('Origin is not allowed by CORS.');
    error.status = 403;
    callback(error);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ success: true, service: 'student-management-api', database: 'connected' });
  } catch (error) {
    res.status(503).json({ success: false, service: 'student-management-api', database: 'unavailable' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' });
});

app.use((error, req, res, next) => {
  console.error(error);
  const status = Number(error.status) || 500;
  const message = status >= 500 ? 'Internal server error.' : error.message;
  res.status(status).json({ success: false, message });
});

module.exports = app;
