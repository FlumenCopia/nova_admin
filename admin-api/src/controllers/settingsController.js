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
    const { primaryPhone, altPhone, contactEmail, hqAddress, cityOfficeAddress } = req.body;

    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          ...(primaryPhone && { primaryPhone }),
          ...(altPhone && { altPhone }),
          ...(contactEmail && { contactEmail }),
          ...(hqAddress && { hqAddress }),
          ...(cityOfficeAddress && { cityOfficeAddress }),
        },
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: {
          primaryPhone: primaryPhone || '+91 95390 00640',
          altPhone: altPhone || '+91 95263 64446',
          contactEmail: contactEmail || 'novainnovations2020@gmail.com',
          hqAddress: hqAddress || 'T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001',
          cityOfficeAddress: cityOfficeAddress || 'T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014',
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Site contact settings updated successfully!',
      data: settings,
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating settings.' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
