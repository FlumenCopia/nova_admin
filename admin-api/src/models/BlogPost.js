const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: 250,
    },
    slug: {
      type: String,
      required: [true, 'Blog slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt is required'],
      trim: true,
      maxlength: 400,
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    coverImage: {
      type: String,
      default: '/mainhero1.png',
      trim: true,
    },
    category: {
      type: String,
      default: 'Outdoor Advertising',
      trim: true,
      index: true,
    },
    tags: {
      type: [String],
      default: ['Kerala OOH', 'Nova Innovations', 'Billboards'],
    },
    author: {
      type: String,
      default: 'Nova Innovations Media Team',
      trim: true,
    },
    authorRole: {
      type: String,
      default: 'Senior OOH Media Strategist',
      trim: true,
    },
    authorImage: {
      type: String,
      default: '/heroman.jpeg',
      trim: true,
    },
    readTime: {
      type: String,
      default: '5 min read',
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      trim: true,
      default: '',
    },
    seoDescription: {
      type: String,
      trim: true,
      default: '',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for formatted published date
blogPostSchema.virtual('formattedDate').get(function () {
  const d = this.publishedAt || this.createdAt || new Date();
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
});

blogPostSchema.set('toJSON', { virtuals: true });
blogPostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
