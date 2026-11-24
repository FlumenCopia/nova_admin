const mongoose = require('mongoose');

const founderSlideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    badgeText: {
      type: String,
      trim: true,
      default: 'Award & Milestone',
    },
    badgeIcon: {
      type: String,
      trim: true,
      default: 'fa-award',
    },
    meta: {
      type: String,
      trim: true,
      default: '',
    },
    metaIcon: {
      type: String,
      trim: true,
      default: 'fa-location-dot',
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    actionText: {
      type: String,
      trim: true,
      default: 'Connect with Director',
    },
    actionType: {
      type: String,
      trim: true,
      enum: ['modal', 'whatsapp', 'call', 'url'],
      default: 'modal',
    },
    actionUrl: {
      type: String,
      trim: true,
      default: '',
    },
    modalSubject: {
      type: String,
      trim: true,
      default: 'Founder Milestone',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

founderSlideSchema.index({ order: 1, createdAt: 1 });

module.exports =
  mongoose.models.FounderSlide || mongoose.model('FounderSlide', founderSlideSchema, 'FounderSlide');
