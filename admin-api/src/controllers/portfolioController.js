const prisma = require('../config/db');
const path = require('path');
const fs = require('fs');

const getPublicPortfolio = async (req, res) => {
  try {
    const { category, isVacant, page, limit } = req.query;
    const whereClause = { isActive: true };

    if (category && category !== 'all') {
      whereClause.category = { contains: category, mode: 'insensitive' };
    }

    if (isVacant === 'true') {
      whereClause.isVacant = true;
    }

    const total = await prisma.portfolioItem.findMany({ where: whereClause }).then((res) => res.length);
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = limit === 'all' ? null : (parseInt(limit, 10) || null);
    const queryOptions = {
      where: whereClause,
      orderBy: { order: 'asc' },
    };

    if (limitNum) {
      queryOptions.skip = (pageNum - 1) * limitNum;
      queryOptions.take = limitNum;
    }

    const items = await prisma.portfolioItem.findMany(queryOptions);
    const totalPages = limitNum ? Math.ceil(total / limitNum) : 1;
    const hasMore = limitNum ? pageNum < totalPages : false;

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum || total,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error('Get public portfolio error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving portfolio.' });
  }
};

const getAllPortfolioAdmin = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const allItems = await prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } });

    const stats = {
      total: allItems.length,
      vacantCount: allItems.filter((item) => item.isVacant).length,
      activeCount: allItems.filter((item) => item.isActive).length,
    };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = limit === 'all' ? null : (parseInt(limit, 10) || null);
    let items = allItems;

    if (limitNum) {
      const skip = (pageNum - 1) * limitNum;
      items = allItems.slice(skip, skip + limitNum);
    }

    const totalPages = limitNum ? Math.ceil(allItems.length / limitNum) : 1;
    const hasMore = limitNum ? pageNum < totalPages : false;

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total: allItems.length,
        page: pageNum,
        limit: limitNum || allItems.length,
        totalPages,
        hasMore,
      },
      stats,
    });
  } catch (error) {
    console.error('Get admin portfolio error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving admin portfolio.' });
  }
};

const uploadPortfolioImage = async (req, res) => {
  try {
    const imageUrl = req.processedImageUrl;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'No image file provided.' });
    }
    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully!',
      url: imageUrl,
    });
  } catch (error) {
    console.error('Upload portfolio image error:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload image.' });
  }
};

const createPortfolioItem = async (req, res) => {
  try {
    const {
      title,
      category,
      badgeType,
      badgeStatus,
      location,
      dimensions,
      specs,
      serviceName,
      isVacant,
      isActive,
      order,
    } = req.body;

    let imageUrl = req.processedImageUrl || req.body.imageUrl;
    if (!imageUrl) {
      imageUrl = '/uploads/portfolio/placeholder.webp';
    }

    const parsedSpecs = Array.isArray(specs)
      ? specs
      : (specs ? specs.split(',').map((s) => s.trim()) : []);

    const newItem = await prisma.portfolioItem.create({
      data: {
        title,
        category: category || 'hoardings',
        badgeType: badgeType || 'Billboard',
        badgeStatus: badgeStatus || (isVacant === 'true' || isVacant === true ? 'VACANT NOW' : 'Prime Location'),
        location: location || 'Highway Junction, Kerala',
        dimensions: dimensions || '30 x 20 Feet',
        specs: parsedSpecs,
        imageUrl,
        serviceName: serviceName || `Hoarding - ${title}`,
        isVacant: isVacant === 'true' || isVacant === true,
        isActive: isActive !== 'false' && isActive !== false,
        order: parseInt(order, 10) || 0,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Hoarding portfolio item created successfully!',
      data: newItem,
    });
  } catch (error) {
    console.error('Create portfolio item error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create portfolio item.' });
  }
};

const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.portfolioItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found.' });
    }

    const {
      title,
      category,
      badgeType,
      badgeStatus,
      location,
      dimensions,
      specs,
      serviceName,
      isVacant,
      isActive,
      order,
    } = req.body;

    let imageUrl = existing.imageUrl;
    if (req.processedImageUrl) {
      imageUrl = req.processedImageUrl;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    let parsedSpecs = existing.specs;
    if (specs !== undefined) {
      parsedSpecs = Array.isArray(specs)
        ? specs
        : specs.split(',').map((s) => s.trim());
    }

    const updatedItem = await prisma.portfolioItem.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(badgeType !== undefined && { badgeType }),
        ...(badgeStatus !== undefined && { badgeStatus }),
        ...(location && { location }),
        ...(dimensions !== undefined && { dimensions }),
        ...(specs !== undefined && { specs: parsedSpecs }),
        ...(imageUrl && { imageUrl }),
        ...(serviceName !== undefined && { serviceName }),
        ...(isVacant !== undefined && { isVacant: isVacant === 'true' || isVacant === true }),
        ...(isActive !== undefined && { isActive: isActive === 'true' || isActive === true }),
        ...(order !== undefined && { order: parseInt(order, 10) }),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Portfolio item updated successfully.',
      data: updatedItem,
    });
  } catch (error) {
    console.error('Update portfolio item error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update portfolio item.' });
  }
};

const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.portfolioItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found.' });
    }

    if (existing.imageUrl && existing.imageUrl.startsWith('/uploads/portfolio/')) {
      const filePath = path.join(__dirname, '../../', existing.imageUrl);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { console.error('Error removing file:', e); }
      }
    }

    await prisma.portfolioItem.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Portfolio item deleted successfully.' });
  } catch (error) {
    console.error('Delete portfolio item error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete portfolio item.' });
  }
};

module.exports = {
  getPublicPortfolio,
  getAllPortfolioAdmin,
  uploadPortfolioImage,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
