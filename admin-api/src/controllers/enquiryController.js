const prisma = require('../config/db');
const { z } = require('zod');

const publicEnquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(150, 'Name cannot exceed 150 characters'),
  phone: z.string().min(5, 'Valid phone number is required').max(30, 'Phone number cannot exceed 30 characters'),
  company: z.string().max(200, 'Company name cannot exceed 200 characters').optional(),
  email: z.string().max(150, 'Email cannot exceed 150 characters').optional(),
  serviceType: z.string().max(150, 'Service type cannot exceed 150 characters').optional(),
  notes: z.string().max(2000, 'Message cannot exceed 2000 characters').optional(),
  message: z.string().max(2000, 'Message cannot exceed 2000 characters').optional(),
  service: z.string().max(150, 'Service cannot exceed 150 characters').optional(),
  source: z.string().max(100, 'Source cannot exceed 100 characters').optional(),
});

const createEnquiry = async (req, res) => {
  try {
    const parseResult = publicEnquirySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors[0].message,
      });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        ...parseResult.data,
        status: 'NEW',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully!',
      data: newEnquiry,
    });
  } catch (error) {
    console.error('Create enquiry error:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit enquiry.' });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const { status, query, page, limit } = req.query;

    const whereClause = {};

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query, mode: 'insensitive' } },
        { company: { contains: query, mode: 'insensitive' } },
      ];
    }

    const filteredTotal = await prisma.enquiry.count({ where: whereClause });

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = limit === 'all' ? null : Math.max(1, parseInt(limit, 10) || 10);
    const queryOptions = {
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    };

    if (limitNum) {
      queryOptions.skip = (pageNum - 1) * limitNum;
      queryOptions.take = limitNum;
    }

    const enquiries = await prisma.enquiry.findMany(queryOptions);

    const counts = {
      total: await prisma.enquiry.count(),
      newCount: await prisma.enquiry.count({ where: { status: 'NEW' } }),
      contactedCount: await prisma.enquiry.count({ where: { status: 'CONTACTED' } }),
      closedCount: await prisma.enquiry.count({ where: { status: 'CLOSED' } }),
    };

    const totalPages = limitNum ? Math.ceil(filteredTotal / limitNum) : 1;
    const hasMore = limitNum ? pageNum < totalPages : false;

    return res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total: filteredTotal,
        page: pageNum,
        limit: limitNum || filteredTotal,
        totalPages,
        hasMore,
      },
      counts,
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving enquiries.' });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Update enquiry error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating enquiry.' });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    await prisma.enquiry.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting enquiry.' });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
