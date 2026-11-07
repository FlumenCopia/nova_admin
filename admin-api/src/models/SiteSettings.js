const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    primaryPhone: {
      type: String,
      default: '+91 95390 00640',
      trim: true,
    },
    altPhone: {
      type: String,
      default: '+91 95263 64446',
      trim: true,
    },
    contactEmail: {
      type: String,
      default: 'novainnovations2020@gmail.com',
      trim: true,
    },
    hqAddress: {
      type: String,
      default: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, P.O, Thycaud, Thiruvananthapuram, Kerala - 695014',
      trim: true,
    },
    cityOfficeAddress: {
      type: String,
      default: 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
      trim: true,
    },
    heroBannerUrl: {
      type: String,
      default: '/mainhero1.png',
      trim: true,
    },
    heroTitle: {
      type: String,
      default: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
      trim: true,
    },
    heroSubtitle: {
      type: String,
      default: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
      trim: true,
    },
    // Leadership Spotlight
    leaderName: {
      type: String,
      default: 'GIREESH KUMAR S',
      trim: true,
    },
    leaderRole: {
      type: String,
      default: 'Founder, Director & CEO — Nova Innovations',
      trim: true,
    },
    leaderTag: {
      type: String,
      default: 'Leadership Spotlight',
      trim: true,
    },
    leaderYears: {
      type: String,
      default: '27+',
      trim: true,
    },
    leaderYearsLabel: {
      type: String,
      default: 'Years Leadership',
      trim: true,
    },
    leaderImage: {
      type: String,
      default: '/heroman.jpeg',
      trim: true,
    },
    leaderBio: {
      type: String,
      default: "Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions.",
      trim: true,
    },
    leaderPhone: {
      type: String,
      default: '+91 9539000640',
      trim: true,
    },
    leaderFeature1Title: {
      type: String,
      default: 'Visionary Direction',
      trim: true,
    },
    leaderFeature1Desc: {
      type: String,
      default: "Building Kerala's most reliable 24/7 overnight advertising engine.",
      trim: true,
    },
    leaderFeature2Title: {
      type: String,
      default: 'Enterprise Relationships',
      trim: true,
    },
    leaderFeature2Desc: {
      type: String,
      default: 'Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.',
      trim: true,
    },
    // Founder Page Hero Section
    founderHeroTag: {
      type: String,
      default: '27+ Years of Creative Advertising Excellence',
      trim: true,
    },
    founderHeroTitle: {
      type: String,
      default: 'INNOVATIONS THAT HALLMARKS YOUR BRAND',
      trim: true,
    },
    founderHeroDesc: {
      type: String,
      default: 'Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign execution across Kerala.',
      trim: true,
    },
    founderHeroCtaText: {
      type: String,
      default: 'Book Hoardings',
      trim: true,
    },
    founderHeroCtaPhone: {
      type: String,
      default: '+91 95390 00640',
      trim: true,
    },
    founderName: {
      type: String,
      default: 'GIREESH KUMAR S',
      trim: true,
    },
    founderRole: {
      type: String,
      default: 'Founder & CEO — NOVA Innovations',
      trim: true,
    },
    founderImage: {
      type: String,
      default: '/heroman.jpeg',
      trim: true,
    },
  },
  {
    collection: 'SiteSettings',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema, 'SiteSettings');
