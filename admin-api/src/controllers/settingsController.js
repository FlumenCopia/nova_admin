const { SiteSettings } = require('../models');

const DEFAULT_SETTINGS = {
  primaryPhone: '+91 95390 00640',
  altPhone: '+91 95263 64446',
  contactEmail: 'novainnovations2020@gmail.com',
  hqAddress: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, P.O, Thycaud, Thiruvananthapuram, Kerala - 695014',
  cityOfficeAddress: 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
  heroBannerUrl: '/mainhero1.png',
  heroTitle: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
  heroSubtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
  leaderName: 'GIREESH KUMAR S',
  leaderRole: 'Founder, Director & CEO — Nova Innovations',
  leaderTag: 'Leadership Spotlight',
  leaderYears: '27+',
  leaderYearsLabel: 'Years Leadership',
  leaderImage: '/heroman.jpeg',
  leaderBio: "Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions.",
  leaderPhone: '+91 9539000640',
  leaderFeature1Title: 'Visionary Direction',
  leaderFeature1Desc: "Building Kerala's most reliable 24/7 overnight advertising engine.",
  leaderFeature2Title: 'Enterprise Relationships',
  leaderFeature2Desc: 'Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.',
};

const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }

    const doc = settings.toObject ? settings.toObject() : { ...settings };
    const merged = { ...DEFAULT_SETTINGS, ...doc };

    return res.status(200).json({ success: true, data: merged });
  } catch (error) {
    console.error('Get settings error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving settings.' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const {
      primaryPhone,
      altPhone,
      contactEmail,
      hqAddress,
      cityOfficeAddress,
      heroBannerUrl,
      heroTitle,
      heroSubtitle,
      leaderName,
      leaderRole,
      leaderTag,
      leaderYears,
      leaderYearsLabel,
      leaderImage,
      leaderBio,
      leaderPhone,
      leaderFeature1Title,
      leaderFeature1Desc,
      leaderFeature2Title,
      leaderFeature2Desc,
    } = req.body;

    let settings = await SiteSettings.findOne();

    const updateData = {
      ...(primaryPhone !== undefined && { primaryPhone }),
      ...(altPhone !== undefined && { altPhone }),
      ...(contactEmail !== undefined && { contactEmail }),
      ...(hqAddress !== undefined && { hqAddress }),
      ...(cityOfficeAddress !== undefined && { cityOfficeAddress }),
      ...(heroBannerUrl !== undefined && { heroBannerUrl }),
      ...(heroTitle !== undefined && { heroTitle }),
      ...(heroSubtitle !== undefined && { heroSubtitle }),
      ...(leaderName !== undefined && { leaderName }),
      ...(leaderRole !== undefined && { leaderRole }),
      ...(leaderTag !== undefined && { leaderTag }),
      ...(leaderYears !== undefined && { leaderYears }),
      ...(leaderYearsLabel !== undefined && { leaderYearsLabel }),
      ...(leaderImage !== undefined && { leaderImage }),
      ...(leaderBio !== undefined && { leaderBio }),
      ...(leaderPhone !== undefined && { leaderPhone }),
      ...(leaderFeature1Title !== undefined && { leaderFeature1Title }),
      ...(leaderFeature1Desc !== undefined && { leaderFeature1Desc }),
      ...(leaderFeature2Title !== undefined && { leaderFeature2Title }),
      ...(leaderFeature2Desc !== undefined && { leaderFeature2Desc }),
    };

    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings.id, updateData, { new: true });
    } else {
      settings = await SiteSettings.create({
        ...DEFAULT_SETTINGS,
        ...updateData,
      });
    }

    const doc = settings.toObject ? settings.toObject() : { ...settings };
    const merged = { ...DEFAULT_SETTINGS, ...doc };

    return res.status(200).json({
      success: true,
      message: 'Site settings updated successfully!',
      data: merged,
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating settings.' });
  }
};

const uploadHeroBanner = async (req, res) => {
  try {
    if (!req.processedImageUrl) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    let settings = await SiteSettings.findOne();

    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(
        settings.id,
        { heroBannerUrl: req.processedImageUrl },
        { new: true }
      );
    } else {
      settings = await SiteSettings.create({
        ...DEFAULT_SETTINGS,
        heroBannerUrl: req.processedImageUrl,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Hero background banner uploaded and updated successfully!',
      bannerUrl: req.processedImageUrl,
      data: settings,
    });
  } catch (error) {
    console.error('Upload hero banner error:', error);
    return res.status(500).json({ success: false, message: 'Server error uploading hero banner.' });
  }
};

const uploadLeaderImage = async (req, res) => {
  try {
    if (!req.processedImageUrl) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    let settings = await SiteSettings.findOne();

    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(
        settings.id,
        { leaderImage: req.processedImageUrl },
        { new: true }
      );
    } else {
      settings = await SiteSettings.create({
        ...DEFAULT_SETTINGS,
        leaderImage: req.processedImageUrl,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Leader profile photo uploaded and updated successfully!',
      imageUrl: req.processedImageUrl,
      data: settings,
    });
  } catch (error) {
    console.error('Upload leader image error:', error);
    return res.status(500).json({ success: false, message: 'Server error uploading leader image.' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  uploadHeroBanner,
  uploadLeaderImage,
};
