const { connectDB, Admin, SiteSettings, Service, ClientLogo, PortfolioItem } = require('../config/db');
const { hashPassword } = require('./hash');
require('dotenv').config();

const clientLogosData = [{'name': 'Pothys', 'logoUrl': '/uploads/clients/pothys.png', 'order': 1, 'isActive': true}, {'name': 'Bank of Baroda', 'logoUrl': '/uploads/clients/bob.png', 'order': 2, 'isActive': true}, {'name': 'Shanoor Projects', 'logoUrl': '/uploads/clients/shanoor.png', 'order': 3, 'isActive': true}, {'name': 'Fair Exports', 'logoUrl': '/uploads/clients/fair.png', 'order': 4, 'isActive': true}, {'name': 'Precise', 'logoUrl': '/uploads/clients/precise.png', 'order': 5, 'isActive': true}, {'name': 'MyG', 'logoUrl': '/uploads/clients/myg.png', 'order': 6, 'isActive': true}, {'name': 'Medimix', 'logoUrl': '/uploads/clients/medimix.png', 'order': 7, 'isActive': true}, {'name': 'Oxygen Digital Shop', 'logoUrl': '/uploads/clients/oxygen.png', 'order': 8, 'isActive': true}, {'name': 'PRS Hospital', 'logoUrl': '/uploads/clients/prs.png', 'order': 9, 'isActive': true}, {'name': 'Pothys Swarna Mahal', 'logoUrl': '/uploads/clients/pothysmahal.png', 'order': 10, 'isActive': true}, {'name': 'Neyyar Medicity', 'logoUrl': '/uploads/clients/neyyarmedicity.png', 'order': 11, 'isActive': true}, {'name': 'Salpido', 'logoUrl': '/uploads/clients/salpido.png', 'order': 12, 'isActive': true}, {'name': 'Susrutha Institute', 'logoUrl': '/uploads/clients/susrutha.png', 'order': 13, 'isActive': true}, {'name': 'Loka Medicity', 'logoUrl': '/uploads/clients/lokamedicity.png', 'order': 14, 'isActive': true}, {'name': 'S Bharath', 'logoUrl': '/uploads/clients/sbharath.png', 'order': 15, 'isActive': true}, {'name': 'Kannan Devan Tea', 'logoUrl': '/uploads/clients/kannandevan.png', 'order': 16, 'isActive': true}, {'name': 'Ananthapuri Hospitals', 'logoUrl': '/uploads/clients/ananthapuri.png', 'order': 17, 'isActive': true}, {'name': 'SP Fort Hospital', 'logoUrl': '/uploads/clients/spfort.png', 'order': 18, 'isActive': true}, {'name': 'Silver Hills', 'logoUrl': '/uploads/clients/silver.png', 'order': 19, 'isActive': true}, {'name': 'Mookambika', 'logoUrl': '/uploads/clients/mookambika.png', 'order': 20, 'isActive': true}, {'name': 'Bhima Jewellery', 'logoUrl': '/uploads/clients/bhima.png', 'order': 21, 'isActive': true}, {'name': 'Muthoot Group', 'logoUrl': '/uploads/clients/muthoot.png', 'order': 22, 'isActive': true}, {'name': 'RK Builders', 'logoUrl': '/uploads/clients/rk.png', 'order': 23, 'isActive': true}, {'name': 'NIMS Medicity', 'logoUrl': '/uploads/clients/nims.png', 'order': 24, 'isActive': true}, {'name': 'Kairali Food Products', 'logoUrl': '/uploads/clients/kairalifood.png', 'order': 25, 'isActive': true}, {'name': 'Arcon Projects', 'logoUrl': '/uploads/clients/arcon.png', 'order': 26, 'isActive': true}, {'name': 'Vyra', 'logoUrl': '/uploads/clients/vyra.png', 'order': 27, 'isActive': true}, {'name': 'Duro Design', 'logoUrl': '/uploads/clients/durodesign.png', 'order': 28, 'isActive': true}, {'name': 'Havells', 'logoUrl': '/uploads/clients/havells.png', 'order': 29, 'isActive': true}, {'name': 'Retnakala Jewellers', 'logoUrl': '/uploads/clients/retnakala.png', 'order': 30, 'isActive': true}, {'name': 'Swayamvaram Silks', 'logoUrl': '/uploads/clients/swayamvaram.png', 'order': 31, 'isActive': true}, {'name': 'Alice Gold', 'logoUrl': '/uploads/clients/alicegold.png', 'order': 32, 'isActive': true}, {'name': 'Lifelong', 'logoUrl': '/uploads/clients/lifelong.png', 'order': 33, 'isActive': true}, {'name': 'Pankajakasthuri', 'logoUrl': '/uploads/clients/pankajakasthuri.png', 'order': 34, 'isActive': true}];
const portfolioData = [{'title': 'Parippally Highway Unipole', 'category': 'Highway Hoardings', 'location': 'Parippally, Kollam - Trivandrum Highway', 'dimensions': '25 x 30 ft', 'specs': ['Front-Lit LED Display', 'National Highway NH 66 Traffic', 'Double Sided High Visibility'], 'imageUrl': '/uploads/portfolio/parippally-25x30.jpg', 'isVacant': false, 'badgeStatus': 'Active'}, {'title': 'Karunagappally Prime Junction Billboard', 'category': 'City Junction Billboards', 'location': 'Karunagappally Town Center, Kollam', 'dimensions': '30 x 25 ft', 'specs': ['High-traffic Town Intersection', 'Lit Billboard', 'Long Distance Viewing Angle'], 'imageUrl': '/uploads/portfolio/karunagappally-30x25.jpg', 'isVacant': false, 'badgeStatus': 'Active'}, {'title': 'Mylakad Highway Facing Unipole', 'category': 'Highway Hoardings', 'location': 'Mylakad, Kollam Bypass NH', 'dimensions': '20 x 30 ft', 'specs': ['Bypass Corridor Traffic', 'Backlit Available', 'Clear Sightline 500m+'], 'imageUrl': '/uploads/portfolio/mylakad-20x30.jpg', 'isVacant': false, 'badgeStatus': 'Active'}, {'title': 'KSRTC Pathanamthitta Terminal Backlit Displays', 'category': 'Transit Advertising', 'location': 'Central Bus Terminal, Pathanamthitta', 'dimensions': 'Terminal Gantry', 'specs': ['High Passenger Footfall', 'Premium Glow Box / Backlit', 'Continuous Visibility'], 'imageUrl': '/uploads/portfolio/pathanamthitta-terminal.jpg', 'isVacant': false, 'badgeStatus': 'Exclusive'}, {'title': 'Punalur High Traffic Junction Hoarding', 'category': 'City Junction Billboards', 'location': 'TB Junction, Punalur', 'dimensions': '30 x 20 ft', 'specs': ['Commercial Hub', 'Prime Roundabout Angle', 'Illuminated at Night'], 'imageUrl': '/uploads/portfolio/punalur-junction.jpg', 'isVacant': false, 'badgeStatus': 'Active'}, {'title': 'MyG 2025 Statewide Brand Campaign', 'category': 'Campaign Showcases', 'location': 'Multiple Locations Pan-Kerala', 'dimensions': 'Multi-site Network', 'specs': ['Overnight Synchronized Launch', 'High-Impact Flex Print', 'Prime Arterial Road Coverage'], 'imageUrl': '/uploads/portfolio/myg-statewide-campaign.jpg', 'isVacant': false, 'badgeStatus': 'Featured'}, {'title': 'MyG Landmark Unipole Gantry', 'category': 'Highway Hoardings', 'location': 'Ernakulam - Thrissur NH Corridor', 'dimensions': '40 x 30 ft', 'specs': ['Dual High-Lumen Floodlights', 'Clear Highway View', 'Steel Fabricated Unipole Structure'], 'imageUrl': '/uploads/portfolio/myg-highway-hoarding.jpg', 'isVacant': false, 'badgeStatus': 'Active'}];

const seedRealData = async () => {
  await connectDB();
  console.log('[*] Connected to MongoDB for seeding real data...');

  try {
    // 1. Seed or update SiteSettings
    let settings = await SiteSettings.findOne();
    const settingsPayload = {
      primaryPhone: '+91 95390 00640',
      altPhone: '+91 95263 64446',
      contactEmail: 'novainnovations2020@gmail.com',
      hqAddress: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, P.O, Thycaud, Thiruvananthapuram, Kerala - 695014',
      cityOfficeAddress: 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
      heroTitle: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
      heroSubtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
      leaderName: 'GIREESH KUMAR S',
      leaderRole: 'Founder, Director & CEO — Nova Innovations'
    };

    if (!settings) {
      await SiteSettings.create(settingsPayload);
      console.log('✓ Created SiteSettings with official Nova contact details.');
    } else {
      await SiteSettings.updateOne({ _id: settings._id }, { $set: settingsPayload });
      console.log('✓ Updated SiteSettings with official Nova contact details.');
    }

    // 2. Seed ClientLogos
    const currentClients = await ClientLogo.countDocuments();
    if (currentClients === 0) {
      await ClientLogo.insertMany(clientLogosData);
      console.log(`✓ Seeded ${clientLogosData.length} real client brand logos.`);
    } else {
      console.log(`✓ ClientLogo collection already has ${currentClients} entries.`);
    }

    // 3. Seed PortfolioItems
    const currentPortfolio = await PortfolioItem.countDocuments();
    if (currentPortfolio === 0) {
      await PortfolioItem.insertMany(portfolioData);
      console.log(`✓ Seeded ${portfolioData.length} real Kerala hoarding portfolio sites.`);
    } else {
      console.log(`✓ Portfolio collection already has ${currentPortfolio} entries.`);
    }

    console.log('\n[+] SEEDING OF REAL OLD-SITE DATA COMPLETE!');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

if (require.main === module) {
  seedRealData().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = seedRealData;
