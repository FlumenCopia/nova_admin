const db = require('../config/db');
const { isValidObjectId } = require('../middleware/validateObjectId');

const getPublicServices = async (req, res) => {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error('Get public services error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving services.' });
  }
};

const getAllServicesAdmin = async (req, res) => {
  try {
    const services = await db.service.findMany({
      orderBy: { order: 'asc' },
    });
    return res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error('Get admin services error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving services.' });
  }
};

const createService = async (req, res) => {
  try {
    const { title, subtitle, icon, description, features, order, isActive } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const parsedFeatures = Array.isArray(features)
      ? features
      : (features ? features.split('\n').map((f) => f.trim()).filter(Boolean) : []);

    const newService = await db.service.create({
      data: {
        title,
        subtitle: subtitle || '',
        icon: icon || 'billboard',
        description,
        features: parsedFeatures,
        order: parseInt(order, 10) || 0,
        isActive: isActive !== 'false' && isActive !== false,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Service created successfully!',
      data: newService,
    });
  } catch (error) {
    console.error('Create service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create service.' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid identifier format. Must be a 24-character hexadecimal ObjectId.' });
    }

    const { title, subtitle, icon, description, features, order, isActive } = req.body;

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    let parsedFeatures = existing.features;
    if (features !== undefined) {
      parsedFeatures = Array.isArray(features)
        ? features
        : features.split('\n').map((f) => f.trim()).filter(Boolean);
    }

    const updated = await db.service.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(icon !== undefined && { icon }),
        ...(description && { description }),
        ...(features !== undefined && { features: parsedFeatures }),
        ...(order !== undefined && { order: parseInt(order, 10) }),
        ...(isActive !== undefined && { isActive: isActive === 'true' || isActive === true }),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Update service error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to update service.' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid identifier format. Must be a 24-character hexadecimal ObjectId.' });
    }

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    await db.service.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    console.error('Delete service error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to delete service.' });
  }
};

module.exports = {
  getPublicServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
};
