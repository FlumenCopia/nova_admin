const prisma = require('../config/db');
const path = require('path');
const fs = require('fs');
const { isValidObjectId } = require('../middleware/validateObjectId');

const STRICT_INT_REGEX = /^[1-9]\d*$/;

// Helper to strictly parse pagination parameters
const parsePaginationParams = (pageQuery, limitQuery) => {
  // Page validation
  let page = 1;
  if (pageQuery !== undefined && pageQuery !== null && pageQuery !== '') {
    const trimmedPage = String(pageQuery).trim();
    if (!STRICT_INT_REGEX.test(trimmedPage)) {
      return { error: 'Invalid page parameter. Must be a positive integer.' };
    }
    page = parseInt(trimmedPage, 10);
  }

  // Limit validation:
  // 1. Explicit limit=all -> safety ceiling of 500
  // 2. Omitted limit -> existing safe default of 10
  // 3. Numeric limit -> strict complete positive integer capped at 100
  let limit = 10; // Safe default for omitted limits
  let isAll = false;

  if (limitQuery !== undefined && limitQuery !== null && limitQuery !== '') {
    const trimmedLimit = String(limitQuery).trim();
    if (trimmedLimit === 'all') {
      limit = 500;
      isAll = true;
    } else if (STRICT_INT_REGEX.test(trimmedLimit)) {
      const parsedLimit = parseInt(trimmedLimit, 10);
      limit = Math.min(100, parsedLimit);
    } else {
      return { error: 'Invalid limit parameter. Must be a positive integer or "all".' };
    }
  }

  const skip = (page - 1) * limit;
  const take = limit;

  return { page, limit, skip, take, isAll };
};

const getPublicPortfolio = async (req, res) => {
  try {
    const { category, isVacant, page, limit } = req.query;

    const pagination = parsePaginationParams(page, limit);
    if (pagination.error) {
      return res.status(400).json({ success: false, message: pagination.error });
    }

    const whereClause = { isActive: true };

    if (category && category !== 'all' && category !== 'ALL') {
      const cleanCat = String(category).trim().slice(0, 100);
      whereClause.category = { contains: cleanCat, mode: 'insensitive' };
    }

    if (isVacant === 'true') {
      whereClause.isVacant = true;
    } else if (isVacant === 'false') {
      whereClause.isVacant = false;
    }

    // Concurrent DB count and paginated query
    const [total, items] = await Promise.all([
      prisma.portfolioItem.count({ where: whereClause }),
      prisma.portfolioItem.findMany({
        where: whereClause,
        orderBy: { order: 'asc' },
        skip: pagination.skip,
        take: pagination.take,
      }),
    ]);

    const totalPages = Math.ceil(total / pagination.limit) || 1;
    const hasMore = pagination.page < totalPages;

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page: pagination.page,
        limit: pagination.limit,
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
    const { page, limit, category, isVacant, isActive, search } = req.query;

    const pagination = parsePaginationParams(page, limit);
    if (pagination.error) {
      return res.status(400).json({ success: false, message: pagination.error });
    }

    const whereClause = {};

    // Filter validation & whitelisting
    if (category && category !== 'all' && category !== 'ALL') {
      const cleanCat = String(category).trim().slice(0, 100);
      whereClause.category = { contains: cleanCat, mode: 'insensitive' };
    }

    if (isVacant === 'true') {
      whereClause.isVacant = true;
    } else if (isVacant === 'false') {
      whereClause.isVacant = false;
    }

    if (isActive === 'true') {
      whereClause.isActive = true;
    } else if (isActive === 'false') {
      whereClause.isActive = false;
    }

    if (search && typeof search === 'string') {
      const cleanSearch = search.trim().slice(0, 100);
      if (cleanSearch) {
        whereClause.OR = [
          { title: { contains: cleanSearch, mode: 'insensitive' } },
          { location: { contains: cleanSearch, mode: 'insensitive' } },
        ];
      }
    }

    // Run database-level queries concurrently:
    // 1. filtered count matching query
    // 2. global collection totals for stats
    // 3. paginated items
    const [filteredTotal, overallTotal, vacantCount, activeCount, items] = await Promise.all([
      prisma.portfolioItem.count({ where: whereClause }),
      prisma.portfolioItem.count(),
      prisma.portfolioItem.count({ where: { isVacant: true } }),
      prisma.portfolioItem.count({ where: { isActive: true } }),
      prisma.portfolioItem.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: pagination.skip,
        take: pagination.take,
      }),
    ]);

    const stats = {
      total: overallTotal,
      vacantCount,
      activeCount,
    };

    const totalPages = Math.ceil(filteredTotal / pagination.limit) || 1;
    const hasMore = pagination.page < totalPages;

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total: filteredTotal,
        page: pagination.page,
        limit: pagination.limit,
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
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid identifier format. Must be a 24-character hexadecimal ObjectId.' });
    }

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
    console.error('Update portfolio item error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to update portfolio item.' });
  }
};

const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid identifier format. Must be a 24-character hexadecimal ObjectId.' });
    }

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
    console.error('Delete portfolio item error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to delete portfolio item.' });
  }
};

const getMediaLibrary = async (req, res) => {
  try {
    const targetFolder = path.join(__dirname, '../../uploads/portfolio');

    let files = [];
    try {
      files = await fs.promises.readdir(targetFolder);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(200).json({ success: true, data: [] });
      }
      console.error('Readdir portfolio error:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to access media directory.' });
    }

    // Fetch existing portfolio items for category & title metadata derivation
    const dbItems = await prisma.portfolioItem.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    // Normalize URLs to filename for resilient matching
    const normalizeFilename = (urlStr) => {
      if (!urlStr || typeof urlStr !== 'string') return '';
      try {
        const clean = urlStr.split('?')[0].split('#')[0].replace(/\\/g, '/');
        return path.basename(clean);
      } catch {
        return '';
      }
    };

    const dbItemMap = new Map();
    for (const item of dbItems) {
      const fn = normalizeFilename(item.imageUrl);
      if (fn && !dbItemMap.has(fn)) {
        dbItemMap.set(fn, item);
      }
    }

    const ALLOWED_MEDIA_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif']);
    const mediaList = [];

    for (const file of files) {
      if (file.startsWith('.')) continue; // ignore hidden / .gitkeep
      const ext = path.extname(file).toLowerCase();
      if (!ALLOWED_MEDIA_EXTS.has(ext)) continue;

      const fullPath = path.join(targetFolder, file);
      try {
        const stats = await fs.promises.stat(fullPath);
        if (!stats.isFile()) continue;

        const dbMatch = dbItemMap.get(file);
        mediaList.push({
          id: dbMatch ? dbMatch.id : null,
          url: `/uploads/portfolio/${file}`,
          filename: file,
          title: dbMatch ? dbMatch.title : null,
          category: dbMatch ? dbMatch.category : null,
          createdAt: dbMatch && dbMatch.createdAt ? dbMatch.createdAt : stats.mtime,
        });
      } catch (statErr) {
        console.error('Stat error for file:', file, statErr.message);
      }
    }

    // Sort newest first
    mediaList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      data: mediaList,
    });
  } catch (error) {
    console.error('Get media library error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Server error retrieving media library.' });
  }
};

const uploadMultiplePortfolioImages = async (req, res) => {
  try {
    const images = req.processedImages || [];
    const urls = req.processedImageUrls || [];

    if (images.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided.' });
    }

    return res.status(200).json({
      success: true,
      message: `${images.length} image(s) uploaded successfully!`,
      data: images,
      urls: urls,
      count: images.length,
    });
  } catch (error) {
    console.error('Upload multiple portfolio images error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to complete multiple image upload.' });
  }
};

module.exports = {
  getPublicPortfolio,
  getAllPortfolioAdmin,
  uploadPortfolioImage,
  uploadMultiplePortfolioImages,
  getMediaLibrary,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
