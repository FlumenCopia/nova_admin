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

const isReplicaSetError = (err) => {
  return err.code === 'P2031' || (err.message && (err.message.includes('replica set') || err.message.includes('transactions')));
};

const escapeRegex = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const translatePortfolioWhere = (where = {}) => {
  if (!where || typeof where !== 'object') return {};
  const mongoWhere = {};

  if (typeof where.isActive === 'boolean') {
    mongoWhere.isActive = where.isActive;
  }
  if (typeof where.isVacant === 'boolean') {
    mongoWhere.isVacant = where.isVacant;
  }
  if (where.category) {
    if (typeof where.category === 'string') {
      mongoWhere.category = where.category;
    } else if (where.category.contains) {
      const escaped = escapeRegex(String(where.category.contains).slice(0, 100));
      mongoWhere.category = { $regex: escaped, $options: 'i' };
    }
  }
  if (where.title) {
    if (typeof where.title === 'string') {
      mongoWhere.title = where.title;
    } else if (where.title.contains) {
      const escaped = escapeRegex(String(where.title.contains).slice(0, 100));
      mongoWhere.title = { $regex: escaped, $options: 'i' };
    }
  }
  if (where.location) {
    if (typeof where.location === 'string') {
      mongoWhere.location = where.location;
    } else if (where.location.contains) {
      const escaped = escapeRegex(String(where.location.contains).slice(0, 100));
      mongoWhere.location = { $regex: escaped, $options: 'i' };
    }
  }
  if (Array.isArray(where.OR)) {
    mongoWhere.$or = where.OR.map((item) => translatePortfolioWhere(item)).filter(Boolean);
  }

  return mongoWhere;
};

// Safe DB Abstraction supporting both Prisma and Standalone MongoDB
const safeDb = {
  admin: {
    findUnique: async ({ where }) => {
      try {
        return await prisma.admin.findUnique({ where });
      } catch (err) {
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
          const db = await getNativeDb();
          const docData = {
            ...data,
            source: data.source || 'Website Form',
            status: data.status || 'NEW',
            createdAt: new Date(),
            updatedAt: new Date()
          };
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
          const db = await getNativeDb();
          const where = translatePortfolioWhere(args.where);
          let cursor = db.collection('PortfolioItem').find(where);

          if (args.orderBy) {
            const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'category', 'location', 'order'];
            const sortObj = {};
            for (const [k, v] of Object.entries(args.orderBy)) {
              if (allowedSortFields.includes(k)) {
                sortObj[k] = v === 'asc' ? 1 : -1;
              }
            }
            cursor = cursor.sort(Object.keys(sortObj).length > 0 ? sortObj : { createdAt: -1 });
          } else {
            cursor = cursor.sort({ createdAt: -1 });
          }

          if (typeof args.skip === 'number' && args.skip > 0) {
            cursor = cursor.skip(args.skip);
          }
          if (typeof args.take === 'number' && args.take > 0) {
            cursor = cursor.limit(args.take);
          }

          const docs = await cursor.toArray();
          return docs.map(formatDoc);
        }
        throw err;
      }
    },
    count: async (args = {}) => {
      try {
        return await prisma.portfolioItem.count(args);
      } catch (err) {
        if (isReplicaSetError(err)) {
          const db = await getNativeDb();
          const where = translatePortfolioWhere(args.where);
          return await db.collection('PortfolioItem').countDocuments(where);
        }
        throw err;
      }
    },
    findUnique: async ({ where }) => {
      try {
        return await prisma.portfolioItem.findUnique({ where });
      } catch (err) {
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
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
        if (isReplicaSetError(err)) {
          const db = await getNativeDb();
          const filter = ObjectId.isValid(where.id)
            ? { $or: [{ _id: new ObjectId(where.id) }, { id: where.id }] }
            : { id: where.id };
          await db.collection('Service').updateOne(filter, { $set: { ...data, updatedAt: new Date() } });
          const updated = await db.collection('Service').findOne(filter);
          return formatDoc(updated);
        }
        throw err;
      }
    },
    delete: async ({ where }) => {
      try {
        return await prisma.service.delete({ where });
      } catch (err) {
        if (isReplicaSetError(err)) {
          const db = await getNativeDb();
          const filter = ObjectId.isValid(where.id)
            ? { $or: [{ _id: new ObjectId(where.id) }, { id: where.id }] }
            : { id: where.id };
          await db.collection('Service').deleteOne(filter);
          return { id: where.id };
        }
        throw err;
      }
    },
  },

  siteSettings: {
    findFirst: async () => {
      try {
        const db = await getNativeDb();
        const doc = await db.collection('SiteSettings').findOne({});
        const formatted = formatDoc(doc);
        if (formatted) {
          formatted.heroBannerUrl = formatted.heroBannerUrl || '/mainhero1.png';
          formatted.heroTitle = formatted.heroTitle || 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND';
          formatted.heroSubtitle = formatted.heroSubtitle || 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.';
        }
        return formatted;
      } catch (err) {
        return await prisma.siteSettings.findFirst();
      }
    },
    create: async ({ data }) => {
      const db = await getNativeDb();
      const docData = {
        heroBannerUrl: '/mainhero1.png',
        heroTitle: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
        heroSubtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
        ...data,
        updatedAt: new Date()
      };
      const res = await db.collection('SiteSettings').insertOne(docData);
      return { id: res.insertedId.toString(), ...docData };
    },
    update: async ({ where, data }) => {
      const db = await getNativeDb();
      const targetId = where.id ? new ObjectId(where.id) : (where._id ? new ObjectId(where._id) : null);
      const filter = targetId ? { _id: targetId } : {};
      await db.collection('SiteSettings').updateOne(filter, { $set: { ...data, updatedAt: new Date() } });
      const updated = await db.collection('SiteSettings').findOne(filter);
      return formatDoc(updated);
    },
  },
};

module.exports = safeDb;
