const prisma = require('../config/db');

const getSettings = async (req, res) => {
  try {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          primaryPhone: '+91 95390 00640',
          altPhone: '+91 95263 64446',
          contactEmail: 'novainnovations2020@gmail.com',
          hqAddress: 'T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001',
          cityOfficeAddress: 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
          heroBannerUrl: '/mainhero1.png',
          heroTitle: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
          heroSubtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
        },
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

    let settings = await prisma.siteSettings.findFirst();

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
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: {
          primaryPhone: primaryPhone || '+91 95390 00640',
          altPhone: altPhone || '+91 95263 64446',
          contactEmail: contactEmail || 'novainnovations2020@gmail.com',
          hqAddress: hqAddress || 'T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001',
          cityOfficeAddress: cityOfficeAddress || 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
          heroBannerUrl: heroBannerUrl || '/mainhero1.png',
          heroTitle: heroTitle || 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
          heroSubtitle: heroSubtitle || 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
          ...updateData,
        },
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

    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          heroBannerUrl: req.processedImageUrl,
        },
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: {
          heroBannerUrl: req.processedImageUrl,
        },
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
