const { Enquiry } = require('../models');
const { z } = require('zod');
const { isValidObjectId } = require('../middleware/validateObjectId');
const { sendNewEnquiryNotification } = require('../utils/notificationService');

const publicEnquirySchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim().min(1, 'Name is required').max(150, 'Name cannot exceed 150 characters'),
  phone: z.string({ required_error: 'Valid phone number is required' }).trim().min(5, 'Valid phone number is required').max(30, 'Phone number cannot exceed 30 characters'),
  company: z.string().trim().max(200, 'Company name cannot exceed 200 characters').optional().nullable(),
  email: z.string().trim().max(150, 'Email cannot exceed 150 characters').optional().nullable(),
  serviceType: z.string().trim().max(150, 'Service type cannot exceed 150 characters').optional().nullable(),
  notes: z.string().trim().max(2000, 'Message cannot exceed 2000 characters').optional().nullable(),
  message: z.string().trim().max(2000, 'Message cannot exceed 2000 characters').optional().nullable(),
  service: z.string().trim().max(150, 'Service cannot exceed 150 characters').optional().nullable(),
  source: z.string().trim().max(100, 'Source cannot exceed 100 characters').optional().nullable(),
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

    const {
      name,
      phone,
      company,
      email,
      serviceType,
      notes,
      message,
      service,
      source,
    } = parseResult.data;

    // Normalization & Precedence:
    // 1. Prefer canonical field (notes / serviceType) over alias (message / service)
    // 2. Map alias 'message' to 'notes' if 'notes' is not provided
    // 3. Map alias 'service' to 'serviceType' if 'serviceType' is not provided
    const resolvedNotes = (notes && notes.trim().length > 0)
      ? notes.trim()
      : (message && message.trim().length > 0)
      ? message.trim()
      : null;

    const resolvedServiceType = (serviceType && serviceType.trim().length > 0)
      ? serviceType.trim()
      : (service && service.trim().length > 0)
      ? service.trim()
      : null;

    const resolvedCompany = (company && company.trim().length > 0) ? company.trim() : null;
    const resolvedEmail = (email && email.trim().length > 0) ? email.trim() : null;
    const resolvedSource = (source && source.trim().length > 0) ? source.trim() : 'Website Form';

    const enquiryData = {
      name: name.trim(),
      phone: phone.trim(),
      ...(resolvedCompany && { company: resolvedCompany }),
      ...(resolvedEmail && { email: resolvedEmail }),
      ...(resolvedServiceType && { serviceType: resolvedServiceType }),
      ...(resolvedNotes && { notes: resolvedNotes }),
      source: resolvedSource,
      status: 'NEW',
    };

    const newEnquiry = await Enquiry.create(enquiryData);

    // Asynchronously dispatch notification alerts (non-blocking)
    sendNewEnquiryNotification(newEnquiry).catch((err) =>
      console.warn('Notification alert background error:', err.message)
    );

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully!',
      data: newEnquiry,
    });
  } catch (error) {
    console.error('Create enquiry error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to submit enquiry.' });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const { status, query, page, limit } = req.query;

    const filter = {};

    if (status && status !== 'ALL') {
      filter.status = status;
    }

    if (query) {
      const clean = String(query).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(clean, 'i');
      filter.$or = [
        { name: regex },
        { phone: regex },
        { company: regex },
      ];
    }

    const filteredTotal = await Enquiry.countDocuments(filter);

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = limit === 'all' ? null : Math.max(1, parseInt(limit, 10) || 10);

    let queryBuilder = Enquiry.find(filter).sort({ createdAt: -1 });

    if (limitNum) {
      queryBuilder = queryBuilder.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    const enquiries = await queryBuilder;

    const [total, newCount, contactedCount, closedCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'NEW' }),
      Enquiry.countDocuments({ status: 'CONTACTED' }),
      Enquiry.countDocuments({ status: 'CLOSED' }),
    ]);

    const counts = {
      total,
      newCount,
      contactedCount,
      closedCount,
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
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid identifier format. Must be a 24-character hexadecimal ObjectId.' });
    }

    const { status, adminNotes } = req.body;

    const existing = await Enquiry.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const updated = await Enquiry.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Update enquiry error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Server error updating enquiry.' });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid identifier format. Must be a 24-character hexadecimal ObjectId.' });
    }

    const existing = await Enquiry.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    await Enquiry.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (error) {
    console.error('Delete enquiry error:', error.message || error);
    return res.status(500).json({ success: false, message: 'Server error deleting enquiry.' });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
