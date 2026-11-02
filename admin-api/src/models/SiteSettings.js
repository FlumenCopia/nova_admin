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
      default: 'T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001',
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
