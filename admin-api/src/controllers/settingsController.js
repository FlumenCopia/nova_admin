const { SiteSettings } = require('../models');

const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    const doc = settings.toObject ? settings.toObject() : { ...settings };
    return res.status(200).json({ success: true, data: doc });
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
      founderHeroTag,
      founderHeroTitle,
      founderHeroDesc,
      founderHeroCtaText,
      founderHeroCtaPhone,
      founderName,
      founderRole,
      founderImage,
      servicesSectionSubhead,
      servicesSectionHeading,
      servicesSectionDesc,
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
      ...(founderHeroTag !== undefined && { founderHeroTag }),
      ...(founderHeroTitle !== undefined && { founderHeroTitle }),
      ...(founderHeroDesc !== undefined && { founderHeroDesc }),
      ...(founderHeroCtaText !== undefined && { founderHeroCtaText }),
      ...(founderHeroCtaPhone !== undefined && { founderHeroCtaPhone }),
      ...(founderName !== undefined && { founderName }),
      ...(founderRole !== undefined && { founderRole }),
      ...(founderImage !== undefined && { founderImage }),
      ...(servicesSectionSubhead !== undefined && { servicesSectionSubhead }),
      ...(servicesSectionHeading !== undefined && { servicesSectionHeading }),
      ...(servicesSectionDesc !== undefined && { servicesSectionDesc }),
    };

    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings.id || settings._id, updateData, { new: true });
    } else {
      settings = await SiteSettings.create(updateData);
    }

    const doc = settings.toObject ? settings.toObject() : { ...settings };
    return res.status(200).json({
      success: true,
      message: 'Site settings updated successfully!',
      data: doc,
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
        settings.id || settings._id,
        { heroBannerUrl: req.processedImageUrl },
        { new: true }
      );
    } else {
      settings = await SiteSettings.create({
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
        settings.id || settings._id,
        { leaderImage: req.processedImageUrl },
        { new: true }
      );
    } else {
      settings = await SiteSettings.create({
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

const uploadFounderImage = async (req, res) => {
  try {
    if (!req.processedImageUrl) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    let settings = await SiteSettings.findOne();

    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(
        settings.id || settings._id,
        { founderImage: req.processedImageUrl },
        { new: true }
      );
    } else {
      settings = await SiteSettings.create({
        founderImage: req.processedImageUrl,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Founder photo uploaded and updated successfully!',
      imageUrl: req.processedImageUrl,
      data: settings,
    });
  } catch (error) {
    console.error('Upload founder image error:', error);
    return res.status(500).json({ success: false, message: 'Server error uploading founder image.' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  uploadHeroBanner,
  uploadLeaderImage,
  uploadFounderImage,
};
