const prisma = require('../config/db');
const path = require('path');
const fs = require('fs');
const { isValidObjectId } = require('../middleware/validateObjectId');

const getPublicClients = async (req, res) => {
  try {
    const clients = await prisma.clientLogo.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return res.status(200).json({ success: true, data: clients });
  } catch (error) {
    console.error('Get public clients error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving client logos.' });
  }
};

const getAllClientsAdmin = async (req, res) => {
  try {
    const clients = await prisma.clientLogo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, data: clients });
  } catch (error) {
    console.error('Get admin clients error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving client logos.' });
  }
};

const createClientLogo = async (req, res) => {
  try {
    const { name, order, isActive } = req.body;

    let logoUrl = req.processedImageUrl || req.body.logoUrl || req.body.url;
    if (!logoUrl) {
      return res.status(400).json({ success: false, message: 'Logo image is required.' });
    }

    const newLogo = await prisma.clientLogo.create({
      data: {
        name: name || 'Brand Partner',
        logoUrl,
        order: parseInt(order, 10) || 0,
        isActive: isActive !== 'false' && isActive !== false,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Client logo added successfully!',
      data: newLogo,
    });
  } catch (error) {
    console.error('Create client logo error:', error);
    return res.status(500).json({ success: false, message: 'Failed to add client logo.' });
  }
};

const deleteClientLogo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid identifier format. Must be a 24-character hexadecimal ObjectId.' });
    }

    const existing = await prisma.clientLogo.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Client logo not found.' });
    }

    if (existing.logoUrl && existing.logoUrl.startsWith('/uploads/clients/')) {
      const filePath = path.join(__dirname, '../../', existing.logoUrl);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { console.error('Error removing file:', e); }
      }
    }

    await prisma.clientLogo.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Client logo deleted successfully.' });
  } catch (error) {
    console.error('Delete client logo error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to delete client logo.' });
  }
};

module.exports = {
  getPublicClients,
  getAllClientsAdmin,
  createClientLogo,
  deleteClientLogo,
};
