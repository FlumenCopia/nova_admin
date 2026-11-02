const mongoose = require('mongoose');
require('dotenv').config();

const {
  Admin,
  Enquiry,
  PortfolioItem,
  ClientLogo,
  Service,
  SiteSettings,
} = require('../models');

let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const mongoUri = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/nova_admin_db';

  connectionPromise = mongoose.connect(mongoUri)
    .then((conn) => {
      console.log(`✓ MongoDB connected successfully: ${conn.connection.host}/${conn.connection.name}`);
      return conn.connection;
    })
    .catch((err) => {
      connectionPromise = null;
      console.error('MongoDB connection error:', err.message);
      throw err;
    });

  return connectionPromise;
};

module.exports = {
  connectDB,
  mongoose,
  Admin,
  Enquiry,
  PortfolioItem,
  ClientLogo,
  Service,
  SiteSettings,
  admin: Admin,
  enquiry: Enquiry,
  portfolioItem: PortfolioItem,
  clientLogo: ClientLogo,
  service: Service,
  siteSettings: SiteSettings,
};
