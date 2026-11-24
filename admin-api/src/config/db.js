const dns = require('dns');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Enquiry = require('../models/Enquiry');
const PortfolioItem = require('../models/PortfolioItem');
const ClientLogo = require('../models/ClientLogo');
const Service = require('../models/Service');
const SiteSettings = require('../models/SiteSettings');
const FounderSlide = require('../models/FounderSlide');
const BlogPost = require('../models/BlogPost');

// Ensure reliable DNS resolution across varied hosting container environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if running in an environment where setServers is restricted
}

let connectionPromise = null;

const connectDB = async () => {
  // If already connected, return existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (connectionPromise) {
    return connectionPromise;
  }

  let uri = process.env.DATABASE_URL || process.env.MONGO_URI;
  if (!uri) {
    const errMsg = 'DATABASE_URL or MONGO_URI is missing in environment variables. Please provide your MongoDB Atlas connection string.';
    console.error(`✗ ERROR: ${errMsg}`);
    throw new Error(errMsg);
  }

  // Sanitize URI: remove quotes, trim whitespace, and auto-correct known typo (iqk1xul -> iqklxul)
  uri = uri.trim().replace(/^['"]|['"]$/g, '');
  if (uri.includes('iqk1xul')) {
    console.warn('⚠️ Auto-correcting hostname typo in DATABASE_URL (iqk1xul -> iqklxul)...');
    uri = uri.replace(/iqk1xul/g, 'iqklxul');
  }

  connectionPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  }).then((conn) => {
    console.log(`✓ MongoDB Connected to Atlas: ${conn.connection.host}`);
    return conn;
  }).catch((error) => {
    connectionPromise = null;
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    throw error;
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
  FounderSlide,
  BlogPost,
};
