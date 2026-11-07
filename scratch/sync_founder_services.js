const fs = require('fs');
const dbPath = 'admin-api/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.Service = [
  {
    id: "67cb50000000000000000010",
    _id: "67cb50000000000000000010",
    title: "Innovative Hoardings",
    subtitle: "High-visibility billboards & unipoles",
    icon: "billboard",
    description: "High-visibility billboards, unipoles, gantries, and cantilever structures in prime city junctions and national highways across Kerala.",
    features: [
      "Prime footfall locations",
      "Weatherproof flex & LED lights"
    ],
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "67cb50000000000000000011",
    _id: "67cb50000000000000000011",
    title: "Vehicle Advertising",
    subtitle: "KSRTC bus & fleet transit branding",
    icon: "transit",
    description: "Time-bound mobile advertising fleet services including KSRTC buses, private transit branding, and promotional display vans.",
    features: [
      "High city-wide reach & mobility",
      "Full body wrap & side panels"
    ],
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "67cb50000000000000000012",
    _id: "67cb50000000000000000012",
    title: "Shop & Retail Branding",
    subtitle: "Storefront signboards & retail facade",
    icon: "retail",
    description: "Complete store exterior & interior transformations: 3D illuminated signboards, LED glow boards, ACP signboards, and retail display units.",
    features: [
      "LED glow & ACP signboards",
      "Showroom facade design"
    ],
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "67cb50000000000000000013",
    _id: "67cb50000000000000000013",
    title: "Event Branding & Stalls",
    subtitle: "Exhibition stalls & stage setup",
    icon: "event",
    description: "Capturing the essence of your brand in corporate events, exhibition stalls, stage backdrops, kiosks, and product launch productions.",
    features: [
      "Custom stall fabrication",
      "Turnkey event management"
    ],
    order: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "67cb50000000000000000014",
    _id: "67cb50000000000000000014",
    title: "Commercial Wall Paintings",
    subtitle: "Direct highway artwork & murals",
    icon: "wall",
    description: "Long-lasting direct wall artworks and branding murals executed with durable weather-resistant paint on prominent roadsides and town walls.",
    features: [
      "Long-term brand retention",
      "Rural & urban highway routes"
    ],
    order: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "67cb50000000000000000015",
    _id: "67cb50000000000000000015",
    title: "Design Studio & Printing",
    subtitle: "Flex printing & graphic production",
    icon: "design",
    description: "State-of-the-art flex digital printing, large format banners, offset catalogs, brochures, bulk posters, and corporate stationery.",
    features: [
      "Large format flex & vinyl",
      "Corporate identity design"
    ],
    order: 6,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated db.json with exact 6 founder services!');

