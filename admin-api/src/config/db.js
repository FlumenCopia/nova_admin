const { PrismaClient } = require('@prisma/client');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
});

// Fallback native MongoDB client for standalone MongoDB instances without Replica Set
const mongoUrl = (process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/nova_admin_db').split('?')[0];
const nativeClient = new MongoClient(mongoUrl);
let nativeDb = null;

const getNativeDb = async () => {
  if (!nativeDb) {
    await nativeClient.connect();
    nativeDb = nativeClient.db();
  }
  return nativeDb;
};

// Helper function to format Mongo document ID to standard string
const formatDoc = (doc) => {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id ? _id.toString() : doc.id, ...rest };
};

// Safe DB Abstraction supporting both Prisma and Standalone MongoDB
const safeDb = {
  admin: {
    findUnique: async ({ where }) => {
      try {
        return await prisma.admin.findUnique({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const doc = await db.collection('Admin').findOne(where.id ? { _id: new ObjectId(where.id) } : { email: where.email });
          return formatDoc(doc);
        }
        throw err;
      }
    },
    create: async ({ data }) => {
      try {
        return await prisma.admin.create({ data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docData = { ...data, createdAt: new Date(), updatedAt: new Date() };
          const res = await db.collection('Admin').insertOne(docData);
          return { id: res.insertedId.toString(), ...docData };
        }
        throw err;
      }
    },
    update: async ({ where, data }) => {
      try {
        return await prisma.admin.update({ where, data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const q = where.id ? { _id: new ObjectId(where.id) } : { email: where.email };
          await db.collection('Admin').updateOne(q, { $set: { ...data, updatedAt: new Date() } });
          const updated = await db.collection('Admin').findOne(q);
          return formatDoc(updated);
        }
        throw err;
      }
    },
  },

  enquiry: {
    findMany: async (args = {}) => {
      try {
        return await prisma.enquiry.findMany(args);
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const where = args.where || {};
          let cursor = db.collection('Enquiry').find(where.status && where.status !== 'ALL' ? { status: where.status } : {}).sort({ createdAt: -1 });
          if (args.skip) cursor = cursor.skip(args.skip);
          if (args.take) cursor = cursor.limit(args.take);
          const docs = await cursor.toArray();
          return docs.map(formatDoc);
        }
        throw err;
      }
    },
    findUnique: async ({ where }) => {
      try {
        return await prisma.enquiry.findUnique({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const doc = await db.collection('Enquiry').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(doc);
        }
        throw err;
      }
    },
    create: async ({ data }) => {
      try {
        return await prisma.enquiry.create({ data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docData = { ...data, createdAt: new Date(), updatedAt: new Date() };
          const res = await db.collection('Enquiry').insertOne(docData);
          return { id: res.insertedId.toString(), ...docData };
        }
        throw err;
      }
    },
    update: async ({ where, data }) => {
      try {
        return await prisma.enquiry.update({ where, data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('Enquiry').updateOne({ _id: new ObjectId(where.id) }, { $set: { ...data, updatedAt: new Date() } });
          const updated = await db.collection('Enquiry').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(updated);
        }
        throw err;
      }
    },
    delete: async ({ where }) => {
      try {
        return await prisma.enquiry.delete({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('Enquiry').deleteOne({ _id: new ObjectId(where.id) });
          return { id: where.id };
        }
        throw err;
      }
    },
    count: async (args = {}) => {
      try {
        return await prisma.enquiry.count(args);
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          return await db.collection('Enquiry').countDocuments(args.where || {});
        }
        throw err;
      }
    },
  },

  portfolioItem: {
    findMany: async (args = {}) => {
      try {
        return await prisma.portfolioItem.findMany(args);
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          let cursor = db.collection('PortfolioItem').find(args.where || {}).sort({ createdAt: -1 });
          if (args.skip) cursor = cursor.skip(args.skip);
          if (args.take) cursor = cursor.limit(args.take);
          const docs = await cursor.toArray();
          return docs.map(formatDoc);
        }
        throw err;
      }
    },
    findUnique: async ({ where }) => {
      try {
        return await prisma.portfolioItem.findUnique({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const doc = await db.collection('PortfolioItem').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(doc);
        }
        throw err;
      }
    },
    create: async ({ data }) => {
      try {
        return await prisma.portfolioItem.create({ data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docData = { ...data, createdAt: new Date(), updatedAt: new Date() };
          const res = await db.collection('PortfolioItem').insertOne(docData);
          return { id: res.insertedId.toString(), ...docData };
        }
        throw err;
      }
    },
    update: async ({ where, data }) => {
      try {
        return await prisma.portfolioItem.update({ where, data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('PortfolioItem').updateOne({ _id: new ObjectId(where.id) }, { $set: { ...data, updatedAt: new Date() } });
          const updated = await db.collection('PortfolioItem').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(updated);
        }
        throw err;
      }
    },
    delete: async ({ where }) => {
      try {
        return await prisma.portfolioItem.delete({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('PortfolioItem').deleteOne({ _id: new ObjectId(where.id) });
          return { id: where.id };
        }
        throw err;
      }
    },
  },

  clientLogo: {
    findMany: async (args = {}) => {
      try {
        return await prisma.clientLogo.findMany(args);
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docs = await db.collection('ClientLogo').find(args.where || {}).sort({ createdAt: -1 }).toArray();
          return docs.map(formatDoc);
        }
        throw err;
      }
    },
    findUnique: async ({ where }) => {
      try {
        return await prisma.clientLogo.findUnique({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const doc = await db.collection('ClientLogo').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(doc);
        }
        throw err;
      }
    },
    create: async ({ data }) => {
      try {
        return await prisma.clientLogo.create({ data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docData = { ...data, createdAt: new Date(), updatedAt: new Date() };
          const res = await db.collection('ClientLogo').insertOne(docData);
          return { id: res.insertedId.toString(), ...docData };
        }
        throw err;
      }
    },
    delete: async ({ where }) => {
      try {
        return await prisma.clientLogo.delete({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('ClientLogo').deleteOne({ _id: new ObjectId(where.id) });
          return { id: where.id };
        }
        throw err;
      }
    },
  },

  service: {
    findMany: async (args = {}) => {
      try {
        return await prisma.service.findMany(args);
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docs = await db.collection('Service').find(args.where || {}).sort({ order: 1 }).toArray();
          return docs.map(formatDoc);
        }
        throw err;
      }
    },
    findUnique: async ({ where }) => {
      try {
        return await prisma.service.findUnique({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const doc = await db.collection('Service').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(doc);
        }
        throw err;
      }
    },
    create: async ({ data }) => {
      try {
        return await prisma.service.create({ data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docData = { ...data, createdAt: new Date(), updatedAt: new Date() };
          const res = await db.collection('Service').insertOne(docData);
          return { id: res.insertedId.toString(), ...docData };
        }
        throw err;
      }
    },
    update: async ({ where, data }) => {
      try {
        return await prisma.service.update({ where, data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('Service').updateOne({ _id: new ObjectId(where.id) }, { $set: { ...data, updatedAt: new Date() } });
          const updated = await db.collection('Service').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(updated);
        }
        throw err;
      }
    },
    delete: async ({ where }) => {
      try {
        return await prisma.service.delete({ where });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('Service').deleteOne({ _id: new ObjectId(where.id) });
          return { id: where.id };
        }
        throw err;
      }
    },
  },

  siteSettings: {
    findFirst: async () => {
      try {
        return await prisma.siteSettings.findFirst();
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const doc = await db.collection('SiteSettings').findOne({});
          return formatDoc(doc);
        }
        throw err;
      }
    },
    create: async ({ data }) => {
      try {
        return await prisma.siteSettings.create({ data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          const docData = { ...data, updatedAt: new Date() };
          const res = await db.collection('SiteSettings').insertOne(docData);
          return { id: res.insertedId.toString(), ...docData };
        }
        throw err;
      }
    },
    update: async ({ where, data }) => {
      try {
        return await prisma.siteSettings.update({ where, data });
      } catch (err) {
        if (err.code === 'P2031') {
          const db = await getNativeDb();
          await db.collection('SiteSettings').updateOne({ _id: new ObjectId(where.id) }, { $set: { ...data, updatedAt: new Date() } });
          const updated = await db.collection('SiteSettings').findOne({ _id: new ObjectId(where.id) });
          return formatDoc(updated);
        }
        throw err;
      }
    },
  },
};

module.exports = safeDb;
