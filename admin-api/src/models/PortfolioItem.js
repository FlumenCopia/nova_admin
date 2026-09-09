const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    badgeType: {
      type: String,
      trim: true,
      default: null,
    },
    badgeStatus: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    dimensions: {
      type: String,
      trim: true,
      default: null,
    },
    specs: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    serviceName: {
      type: String,
      trim: true,
      default: null,
    },
    isVacant: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: 'PortfolioItem',
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

module.exports = mongoose.models.PortfolioItem || mongoose.model('PortfolioItem', portfolioItemSchema, 'PortfolioItem');
