const { SiteSettings } = require('../models');

const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({
        primaryPhone: '+91 95390 00640',
        altPhone: '+91 95263 64446',
        contactEmail: 'novainnovations2020@gmail.com',
        hqAddress: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, P.O, Thycaud, Thiruvananthapuram, Kerala - 695014',
        cityOfficeAddress: 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
        heroBannerUrl: '/mainhero1.png',
        heroTitle: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
        heroSubtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
      });
    }

    return res.status(200).json({ success: true, data: settings });
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
    };

    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings.id, updateData, { new: true });
    } else {
      settings = await SiteSettings.create({
        primaryPhone: primaryPhone || '+91 95390 00640',
        altPhone: altPhone || '+91 95263 64446',
        contactEmail: contactEmail || 'novainnovations2020@gmail.com',
        hqAddress: hqAddress || 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, P.O, Thycaud, Thiruvananthapuram, Kerala - 695014',
        cityOfficeAddress: cityOfficeAddress || 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
        heroBannerUrl: heroBannerUrl || '/mainhero1.png',
        heroTitle: heroTitle || 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
        heroSubtitle: heroSubtitle || 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
        ...updateData,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Site settings updated successfully!',
      data: settings,
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

module.exports = {
  getSettings,
  updateSettings,
  uploadHeroBanner,
};
