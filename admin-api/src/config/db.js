const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Enquiry = require('../models/Enquiry');
const PortfolioItem = require('../models/PortfolioItem');
const ClientLogo = require('../models/ClientLogo');
const Service = require('../models/Service');
const SiteSettings = require('../models/SiteSettings');

const connectDB = async () => {
  const uri = process.env.DATABASE_URL || process.env.MONGO_URI;
  if (!uri) {
    const errMsg = 'DATABASE_URL or MONGO_URI is missing in environment variables. Please provide your MongoDB Atlas connection string.';
    console.error(`✗ ERROR: ${errMsg}`);
    throw new Error(errMsg);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✓ MongoDB Connected to Atlas: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
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
};
