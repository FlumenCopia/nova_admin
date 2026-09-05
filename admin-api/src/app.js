const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const clientRoutes = require('./routes/clientRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve proxy trust explicitly:
// In production behind same-server Nginx connecting via loopback (127.0.0.1 / ::1),
// 'loopback' ensures Express correctly respects X-Forwarded-* headers from Nginx while preventing spoofing.
// In development, trust proxy is disabled (false) to prevent forwarded IP spoofing.
// SECURITY REQUIREMENT: Port 5000 must NOT be directly exposed to the public internet (bind to 127.0.0.1 or firewall port 5000).
app.set('trust proxy', process.env.NODE_ENV === 'production' ? 'loopback' : false);

// Disable X-Powered-By header
app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (process.env.NODE_ENV === 'production' && req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// Middleware & CORS Configuration
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [
  process.env.PUBLIC_FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
  ...(isProduction ? [] : ['http://localhost:3000', 'http://localhost:3001']),
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (such as mobile apps, curl, server-to-server, health checks)
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin) || (!isProduction && /^http:\/\/(localhost|127\.0\.0\.1):(3000|3001)$/.test(origin))) {
      return callback(null, true);
    }
    // Reject by passing false: Express CORS omits Access-Control-Allow-Origin header
    // without throwing an unhandled exception, causing the browser to block cross-origin access.
    return callback(null, false);
  },
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files with isolated Cross-Origin-Resource-Policy header
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, '../uploads'), {
  maxAge: '7d',
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  },
}));

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/enquiries', enquiryRoutes);
app.use('/api/admin/portfolio', portfolioRoutes);
app.use('/api/admin/clients', clientRoutes);
app.use('/api/admin/services', serviceRoutes);
app.use('/api/admin/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Nova Admin API', timestamp: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  const errMessage = err && err.message ? err.message : String(err);
  console.error('Express Error Handler:', errMessage);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload.',
    });
  }

  const statusCode = (typeof err.status === 'number' && err.status >= 400 && err.status < 500)
    ? err.status
    : 500;

  const safeMessage = statusCode < 500
    ? (err.message || 'Bad request.')
    : 'Internal server error.';

  return res.status(statusCode).json({
    success: false,
    message: safeMessage,
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Nova Admin API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
