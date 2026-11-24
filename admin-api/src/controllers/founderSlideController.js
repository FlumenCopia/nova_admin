const path = require('path');
const fs = require('fs');
const { FounderSlide } = require('../models');

const DEFAULT_SLIDES = [
  {
    title: 'GIREESH KUMAR S — Founder, Director & CEO',
    badgeText: 'Executive Profile',
    badgeIcon: 'fa-user-tie',
    meta: '27+ Years Excellence • Managing 500+ Prime Media Assets Across Kerala',
    metaIcon: 'fa-award',
    imageUrl: '/assets/founder_gireesh.jpg',
    actionText: 'Connect with Director',
    modalSubject: 'Founder Meeting',
    order: 1,
    isActive: true,
  },
  {
    title: 'Founder Inspection — Highway Hoarding Landmark',
    badgeText: 'Highway Inspection',
    badgeIcon: 'fa-bolt',
    meta: 'NH 66 Corridor • Director Gireesh Kumar S Overseeing Spot-Lit 40x20 FT Billboard',
    metaIcon: 'fa-location-dot',
    imageUrl: '/assets/founder_hoarding.jpg',
    actionText: 'Inquire Location',
    modalSubject: 'Highway Hoarding',
    order: 2,
    isActive: true,
  },
  {
    title: 'Gireesh Kumar S Launching KSRTC Transit Wrap Fleet',
    badgeText: 'Transit Fleet Launch',
    badgeIcon: 'fa-bus',
    meta: '14 Districts Pan-Kerala • Statewide Mobile Media Network',
    metaIcon: 'fa-location-dot',
    imageUrl: '/assets/founder_transit.jpg',
    actionText: 'Inquire Fleet',
    modalSubject: 'Transit Media',
    order: 3,
    isActive: true,
  },
  {
    title: 'Retail Facade & 3D LED Display Unveiling',
    badgeText: 'Retail Unveiling',
    badgeIcon: 'fa-store',
    meta: 'Highway Commercial Hub • Gireesh Kumar S at Architectural Facade Opening',
    metaIcon: 'fa-location-dot',
    imageUrl: '/assets/founder_retail.jpg',
    actionText: 'Inquire Branding',
    modalSubject: 'Retail Facade',
    order: 4,
    isActive: true,
  },
  {
    title: 'Overnight Hoarding Mount & Illumination Testing',
    badgeText: 'Live Execution',
    badgeIcon: 'fa-wrench',
    meta: 'Zero-Downtime Installation • Structural Integrity & High-Lumen Illumination',
    metaIcon: 'fa-shield-halved',
    imageUrl: '/assets/founder_execution.jpg',
    actionText: 'View Standards',
    modalSubject: 'Safety Standards',
    order: 5,
    isActive: true,
  },
  {
    title: 'Advertising Leadership & Brand Hallmark Honour',
    badgeText: 'Industry Recognition',
    badgeIcon: 'fa-trophy',
    meta: 'Kerala Media Excellence Award • Honoured for 27+ Years Industry Leadership',
    metaIcon: 'fa-award',
    imageUrl: '/assets/founder_award.jpg',
    actionText: 'Meet the Founder',
    modalSubject: 'Leadership Accolades',
    order: 6,
    isActive: true,
  },
];

const ensureDefaultSlides = async () => {
  try {
    const count = await FounderSlide.countDocuments();
    if (count === 0) {
      await FounderSlide.insertMany(DEFAULT_SLIDES);
      console.log('✓ Seeded initial 6 Founder Gallery & Award Showcase slides');
    }
  } catch (err) {
    console.error('Error ensuring default founder slides:', err.message);
  }
};

// GET /api/public/founder-gallery (Public)
const getPublicSlides = async (req, res) => {
  try {
    await ensureDefaultSlides();
    const slides = await FounderSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, count: slides.length, data: slides });
  } catch (error) {
    console.error('Get public founder slides error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving founder gallery.' });
  }
};

// GET /api/admin/founder-gallery (Admin)
const getAllSlides = async (req, res) => {
  try {
    await ensureDefaultSlides();
    const slides = await FounderSlide.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, count: slides.length, data: slides });
  } catch (error) {
    console.error('Get all founder slides error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving founder slides.' });
  }
};

// POST /api/admin/founder-gallery (Admin)
const createSlide = async (req, res) => {
  try {
    const {
      title,
      badgeText,
      badgeIcon,
      meta,
      metaIcon,
      actionText,
      modalSubject,
      order,
      isActive,
      imageUrl: bodyImageUrl,
    } = req.body;

    const imageUrl = req.processedImageUrl || bodyImageUrl;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Slide title is required.' });
    }

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image is required (upload or URL).' });
    }

    const slideCount = await FounderSlide.countDocuments();
    const finalOrder = order !== undefined && order !== '' ? Number(order) : slideCount + 1;

    const newSlide = await FounderSlide.create({
      title: title.trim(),
      badgeText: badgeText ? badgeText.trim() : 'Award & Milestone',
      badgeIcon: badgeIcon ? badgeIcon.trim() : 'fa-award',
      meta: meta ? meta.trim() : '',
      metaIcon: metaIcon ? metaIcon.trim() : 'fa-location-dot',
      imageUrl: imageUrl.trim(),
      actionText: actionText ? actionText.trim() : 'Connect with Director',
      modalSubject: modalSubject ? modalSubject.trim() : 'Founder Meeting',
      order: finalOrder,
      isActive: isActive !== undefined ? isActive === true || isActive === 'true' : true,
    });

    return res.status(201).json({
      success: true,
      message: 'Founder gallery slide created successfully!',
      data: newSlide,
    });
  } catch (error) {
    console.error('Create founder slide error:', error);
    return res.status(500).json({ success: false, message: 'Server error creating founder slide.' });
  }
};

// PUT /api/admin/founder-gallery/:id (Admin)
const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      badgeText,
      badgeIcon,
      meta,
      metaIcon,
      actionText,
      modalSubject,
      order,
      isActive,
      imageUrl: bodyImageUrl,
    } = req.body;

    const existing = await FounderSlide.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Founder slide not found.' });
    }

    const updatePayload = {};
    if (title !== undefined) updatePayload.title = title.trim();
    if (badgeText !== undefined) updatePayload.badgeText = badgeText.trim();
    if (badgeIcon !== undefined) updatePayload.badgeIcon = badgeIcon.trim();
    if (meta !== undefined) updatePayload.meta = meta.trim();
    if (metaIcon !== undefined) updatePayload.metaIcon = metaIcon.trim();
    if (actionText !== undefined) updatePayload.actionText = actionText.trim();
    if (modalSubject !== undefined) updatePayload.modalSubject = modalSubject.trim();
    if (order !== undefined) updatePayload.order = Number(order);
    if (isActive !== undefined) updatePayload.isActive = isActive === true || isActive === 'true';

    if (req.processedImageUrl) {
      updatePayload.imageUrl = req.processedImageUrl;
    } else if (bodyImageUrl) {
      updatePayload.imageUrl = bodyImageUrl.trim();
    }

    const updated = await FounderSlide.findByIdAndUpdate(id, updatePayload, { new: true });

    return res.status(200).json({
      success: true,
      message: 'Founder slide updated successfully!',
      data: updated,
    });
  } catch (error) {
    console.error('Update founder slide error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating founder slide.' });
  }
};

// DELETE /api/admin/founder-gallery/:id (Admin)
const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await FounderSlide.findById(id);
    if (!slide) {
      return res.status(404).json({ success: false, message: 'Founder slide not found.' });
    }

    // If local uploaded image in uploads/founder, remove file
    if (slide.imageUrl && slide.imageUrl.startsWith('/uploads/founder/')) {
      const filePath = path.join(__dirname, '../..', slide.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {});
      }
    }

    await FounderSlide.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Founder slide deleted successfully.' });
  } catch (error) {
    console.error('Delete founder slide error:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting founder slide.' });
  }
};

module.exports = {
  getPublicSlides,
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
};
