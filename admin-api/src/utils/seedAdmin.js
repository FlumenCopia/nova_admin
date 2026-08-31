const db = require('../config/db');
const { hashPassword } = require('./hash');
require('dotenv').config();

const defaultServices = [
  {
    title: 'Outdoor Hoardings',
    subtitle: 'Prime Highway & City Billboards',
    icon: 'billboard',
    description: 'Prime highway formats, lit junction gantries, and maximum visibility unipoles across Kerala.',
    features: ['Illuminated & Non-Lit Billboards', 'Unipoles & Gantries at High-Traffic Junctions', 'Pan-Kerala Coverage (Trivandrum, Cochin, Calicut, Kollam)'],
    order: 1,
    isActive: true,
  },
  {
    title: 'Vehicle & Transit Advertising',
    subtitle: 'KSRTC Bus Wraps & Mobile Media',
    icon: 'transit',
    description: 'KSRTC bus wraps, auto autorickshaw hood branding, and mobile LED publicity vans.',
    features: ['Full & Side KSRTC Bus Wraps', 'Auto Hood Branding', 'Mobile Publicity Vans with Sound System'],
    order: 2,
    isActive: true,
  },
  {
    title: 'Shop & Retail Facade Branding',
    subtitle: 'Storefront Signboards & In-shop Media',
    icon: 'retail',
    description: '3D LED acrylic channel letters, ACP facade cladding, flex signboards, and glow boxes.',
    features: ['3D LED Acrylic Letters & ACP Cladding', 'Flex Signboards & Glow Box Systems', 'Dealer & Franchise Chain Branding'],
    order: 3,
    isActive: true,
  },
  {
    title: 'Event Branding & Exhibitions',
    subtitle: 'Corporate Stalls & Stage Setup',
    icon: 'event',
    description: 'Complete exhibition stall design, backdrop fabrication, launch event branding, and kiosks.',
    features: ['Exhibition Stalls & Custom Fabricated Kiosks', 'Stage Backdrops & Sound/Lighting Setup', 'Product Launch Event Branding & Entry Arches'],
    order: 4,
    isActive: true,
  },
  {
    title: 'Commercial Wall Painting',
    subtitle: 'Long-term High Impact Media',
    icon: 'wall',
    description: 'Hand-painted high-visibility artwork on highway walls and commercial compounds.',
    features: ['High-Durability Weatherproof Paints', 'Highway Compound & Village Center Wall Coverage', 'Cost-Effective Long-Term Exposure'],
    order: 5,
    isActive: true,
  },
  {
    title: 'Design Studio & Digital Printing',
    subtitle: 'Creative Graphics & Solvent Printing',
    icon: 'design',
    description: 'In-house high-resolution solvent flex printing, star flex, vinyl stickers, and artwork design.',
    features: ['Large Format Solvent & Eco-Solvent Printing', 'Star Flex & Vinyl Graphic Printing', 'Creative Campaign Conceptualization & Art Direction'],
    order: 6,
    isActive: true,
  },
];

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@novainnovations.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await hashPassword(adminPassword);

  try {
    const existingAdmin = await db.admin.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
      await db.admin.create({
        data: {
          email: adminEmail,
          passwordHash,
          name: 'Nova Admin',
        },
      });
      console.log(`✓ Admin user created successfully: ${adminEmail}`);
    } else {
      console.log(`✓ Admin user already exists: ${adminEmail}`);
    }

    let settings = await db.siteSettings.findFirst();
    if (!settings) {
      await db.siteSettings.create({
        data: {
          primaryPhone: '+91 95390 00640',
          altPhone: '+91 95263 64446',
          contactEmail: 'novainnovations2020@gmail.com',
          hqAddress: 'T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001',
          cityOfficeAddress: 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
        },
      });
      console.log('✓ Default site settings created.');
    }

    const existingServices = await db.service.findMany();
    if (existingServices.length === 0) {
      for (const s of defaultServices) {
        await db.service.create({ data: s });
      }
      console.log('✓ Default 6 core services created.');
    }

    console.log('✓ Seeding complete.');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

if (require.main === module) {
  seedAdmin();
}

module.exports = seedAdmin;
