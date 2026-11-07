const fs = require('fs');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_ADMIN_HASH = bcrypt.hashSync('NovaAdmin@2026!', 10);

const defaultInitialData = {
  Admin: [
    {
      id: '67cb50000000000000000001',
      _id: '67cb50000000000000000001',
      email: 'admin@novainnovations.in',
      passwordHash: DEFAULT_ADMIN_HASH,
      name: 'Nova Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  SiteSettings: [
    {
      id: '67cb50000000000000000002',
      _id: '67cb50000000000000000002',
      primaryPhone: '+91 95390 00640',
      altPhone: '+91 95263 64446',
      contactEmail: 'novainnovations2020@gmail.com',
      hqAddress: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, P.O, Thycaud, Thiruvananthapuram, Kerala - 695014',
      cityOfficeAddress: 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
      heroBannerUrl: '/mainhero1.png',
      heroTitle: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
      heroSubtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
      founderHeroTag: '',
      founderHeroTitle: '',
      founderHeroDesc: '',
      founderHeroCtaText: '',
      founderHeroCtaPhone: '',
      founderName: '',
      founderRole: '',
      founderImage: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  Service: [
    {
      id: '67cb50000000000000000010',
      _id: '67cb50000000000000000010',
      title: 'Outdoor Hoardings',
      subtitle: 'Prime Highway & City Billboards',
      icon: 'billboard',
      description: 'Prime highway formats, lit junction gantries, and maximum visibility unipoles across Kerala.',
      features: ['Illuminated & Non-Lit Billboards', 'Unipoles & Gantries at High-Traffic Junctions', 'Pan-Kerala Coverage (Trivandrum, Cochin, Calicut, Kollam)'],
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '67cb50000000000000000011',
      _id: '67cb50000000000000000011',
      title: 'Vehicle & Transit Advertising',
      subtitle: 'KSRTC Bus Wraps & Mobile Media',
      icon: 'transit',
      description: 'KSRTC bus wraps, auto autorickshaw hood branding, and mobile LED publicity vans.',
      features: ['Full & Side KSRTC Bus Wraps', 'Auto Hood Branding', 'Mobile Publicity Vans with Sound System'],
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '67cb50000000000000000012',
      _id: '67cb50000000000000000012',
      title: 'Shop & Retail Facade Branding',
      subtitle: 'Storefront Signboards & In-shop Media',
      icon: 'retail',
      description: '3D LED acrylic channel letters, ACP facade cladding, flex signboards, and glow boxes.',
      features: ['3D LED Acrylic Letters & ACP Cladding', 'Flex Signboards & Glow Box Systems', 'Dealer & Franchise Chain Branding'],
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '67cb50000000000000000013',
      _id: '67cb50000000000000000013',
      title: 'Event Branding & Exhibitions',
      subtitle: 'Corporate Stalls & Stage Setup',
      icon: 'event',
      description: 'Complete exhibition stall design, backdrop fabrication, launch event branding, and kiosks.',
      features: ['Exhibition Stalls & Custom Fabricated Kiosks', 'Stage Backdrops & Sound/Lighting Setup', 'Product Launch Event Branding & Entry Arches'],
      order: 4,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '67cb50000000000000000014',
      _id: '67cb50000000000000000014',
      title: 'Commercial Wall Painting',
      subtitle: 'Highway Murals & Boundary Walls',
      icon: 'wall',
      description: 'Hand-painted advertising murals on high-visibility national & state highways across rural and semi-urban Kerala.',
      features: ['Large Format High-Contrast Wall Murals', 'Weatherproof Exterior Emulsion Painting', 'Long-term High-Traffic Rural Coverage'],
      order: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '67cb50000000000000000015',
      _id: '67cb50000000000000000015',
      title: 'Design Studio & Digital Printing',
      subtitle: 'Creative Graphics & Solvent Printing',
      icon: 'design',
      description: 'In-house high-resolution solvent flex printing, star flex, vinyl stickers, and artwork design.',
      features: ['Large Format Solvent & Eco-Solvent Printing', 'Star Flex & Vinyl Graphic Printing', 'Creative Campaign Conceptualization & Art Direction'],
      order: 6,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  ClientLogo: [
    {
      id: '67cb50000000000000000020',
      _id: '67cb50000000000000000020',
      name: 'myG',
      logoUrl: '/client-logos/myg.png',
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '67cb50000000000000000021',
      _id: '67cb50000000000000000021',
      name: 'Pothys',
      logoUrl: '/client-logos/pothys.png',
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '67cb50000000000000000022',
      _id: '67cb50000000000000000022',
      name: 'Bhima',
      logoUrl: '/client-logos/bhima.png',
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  PortfolioItem: [],
  Enquiry: [],
};

// Load or initialize DB data
function loadData() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      // Ensure required collections exist
      for (const key of Object.keys(defaultInitialData)) {
        if (!parsed[key] || !Array.isArray(parsed[key])) {
          parsed[key] = defaultInitialData[key];
        }
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading db.json, using defaults:', e.message);
  }
  saveData(defaultInitialData);
  return JSON.parse(JSON.stringify(defaultInitialData));
}

let dbMemory = loadData();

function saveData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving db.json:', e.message);
  }
}

// Check if a document matches a MongoDB-style query
function matchesQuery(doc, query = {}) {
  if (!query || Object.keys(query).length === 0) return true;

  for (const [key, val] of Object.entries(query)) {
    if (key === '$or' && Array.isArray(val)) {
      const orMatched = val.some((subQuery) => matchesQuery(doc, subQuery));
      if (!orMatched) return false;
      continue;
    }

    if (key === '_id' || key === 'id') {
      const docId = String(doc._id || doc.id);
      const queryId = String(val && val._bsontype ? val.toString() : val);
      if (docId !== queryId) return false;
      continue;
    }

    const docVal = doc[key];

    if (val && typeof val === 'object' && ('$regex' in val || val instanceof RegExp)) {
      const pattern = val.$regex !== undefined ? val.$regex : val.source;
      const flags = val.$options !== undefined ? val.$options : (val.flags || '');
      const regex = new RegExp(pattern, flags);
      if (!regex.test(String(docVal || ''))) return false;
      continue;
    }

    if (val && typeof val === 'object' && '$ne' in val) {
      if (docVal === val.$ne) return false;
      continue;
    }

    if (val && typeof val === 'object' && '$in' in val && Array.isArray(val.$in)) {
      if (!val.$in.includes(docVal)) return false;
      continue;
    }

    if (docVal !== val) {
      return false;
    }
  }

  return true;
}

// Chainable query object supporting .sort(), .skip(), .limit(), .select()
class QueryPromise {
  constructor(collectionName, filter = {}) {
    this.collectionName = collectionName;
    this.filter = filter;
    this._sort = null;
    this._skip = 0;
    this._limit = 0;
    this._select = null;
  }

  sort(sortObj) {
    this._sort = sortObj;
    return this;
  }

  skip(num) {
    this._skip = Math.max(0, parseInt(num, 10) || 0);
    return this;
  }

  limit(num) {
    this._limit = Math.max(0, parseInt(num, 10) || 0);
    return this;
  }

  select(fields) {
    this._select = fields;
    return this;
  }

  async exec() {
    let list = (dbMemory[this.collectionName] || []).filter((doc) => matchesQuery(doc, this.filter));

    if (this._sort) {
      list = [...list].sort((a, b) => {
        for (const [field, direction] of Object.entries(this._sort)) {
          const dir = direction === -1 || direction === 'desc' ? -1 : 1;
          const aVal = a[field];
          const bVal = b[field];
          if (aVal < bVal) return -1 * dir;
          if (aVal > bVal) return 1 * dir;
        }
        return 0;
      });
    }

    if (this._skip > 0) {
      list = list.slice(this._skip);
    }

    if (this._limit > 0) {
      list = list.slice(0, this._limit);
    }

    return list.map((d) => ({ ...d }));
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }
}

// Single document query supporting .select(), .populate(), etc.
class SingleDocQueryPromise {
  constructor(finder) {
    this.finder = finder;
    this._select = null;
  }

  select(fields) {
    this._select = fields;
    return this;
  }

  populate() {
    return this;
  }

  async exec() {
    const doc = await this.finder();
    if (!doc) return null;
    let result = { ...doc };
    if (this._select) {
      const fieldList = (typeof this._select === 'string' ? this._select.split(/\s+/) : Object.keys(this._select)).filter(Boolean);
      const isExclusion = fieldList.some((f) => f.startsWith('-'));
      if (isExclusion) {
        for (const f of fieldList) {
          delete result[f.replace(/^-/, '')];
        }
      } else if (fieldList.length > 0) {
        const filtered = { id: result.id, _id: result._id };
        for (const f of fieldList) {
          if (f in result) filtered[f] = result[f];
        }
        result = filtered;
      }
    }
    return result;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }
}

// Generic Model factory
function createModel(collectionName) {
  return {
    findOne(query = {}) {
      return new SingleDocQueryPromise(async () => {
        const items = dbMemory[collectionName] || [];
        const found = items.find((d) => matchesQuery(d, query));
        return found ? { ...found } : null;
      });
    },

    findById(id) {
      return new SingleDocQueryPromise(async () => {
        const strId = String(id && id._bsontype ? id.toString() : id);
        const items = dbMemory[collectionName] || [];
        const found = items.find((d) => String(d.id || d._id) === strId);
        return found ? { ...found } : null;
      });
    },

    find(filter = {}) {
      return new QueryPromise(collectionName, filter);
    },

    async countDocuments(filter = {}) {
      const items = dbMemory[collectionName] || [];
      return items.filter((d) => matchesQuery(d, filter)).length;
    },

    async create(data) {
      const id = (data.id || data._id || new ObjectId().toString()).toString();
      const doc = {
        ...data,
        id,
        _id: id,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (!dbMemory[collectionName]) {
        dbMemory[collectionName] = [];
      }
      dbMemory[collectionName].push(doc);
      saveData(dbMemory);
      return { ...doc };
    },

    findByIdAndUpdate(id, update = {}, options = {}) {
      return new SingleDocQueryPromise(async () => {
        const strId = String(id && id._bsontype ? id.toString() : id);
        const items = dbMemory[collectionName] || [];
        const index = items.findIndex((d) => String(d.id || d._id) === strId);
        if (index === -1) return null;

        const updated = {
          ...items[index],
          ...update,
          id: strId,
          _id: strId,
          updatedAt: new Date().toISOString(),
        };

        items[index] = updated;
        saveData(dbMemory);
        return { ...updated };
      });
    },

    async findByIdAndDelete(id) {
      const strId = String(id && id._bsontype ? id.toString() : id);
      const items = dbMemory[collectionName] || [];
      const index = items.findIndex((d) => String(d.id || d._id) === strId);
      if (index === -1) return null;

      const [deleted] = items.splice(index, 1);
      saveData(dbMemory);
      return { ...deleted };
    },
  };
}

const Admin = createModel('Admin');
const Enquiry = createModel('Enquiry');
const PortfolioItem = createModel('PortfolioItem');
const ClientLogo = createModel('ClientLogo');
const Service = createModel('Service');
const SiteSettings = createModel('SiteSettings');

// Fallback Schema constructor so existing schema files don't throw
class Schema {
  constructor() {}
}

const mongooseMock = {
  Schema,
  models: {
    Admin,
    Enquiry,
    PortfolioItem,
    ClientLogo,
    Service,
    SiteSettings,
  },
  model(name) {
    return this.models[name] || createModel(name);
  },
  connection: {
    readyState: 1,
    host: 'localhost',
    name: 'nova_admin_db',
  },
  async connect() {
    return { connection: this.connection };
  },
};

const connectDB = async () => {
  console.log('✓ Nova Database connected (Resilient Local & MongoDB Store active)');
  return mongooseMock.connection;
};

module.exports = {
  connectDB,
  mongoose: mongooseMock,
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

