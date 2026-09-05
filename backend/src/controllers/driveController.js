const Drive = require('../models/Drive');

// Helper: turn a comma-separated string into a clean array of strings
const toArray = (value) => {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
};

// POST /api/drives  -> Register a new placement drive
const createDrive = async (req, res) => {
  try {
    const body = req.body || {};

    const drive = new Drive({
      company: {
        name: body.company?.name,
        website: body.company?.website,
        industry: body.company?.industry,
        contactPersonName: body.company?.contactPersonName,
        contactEmail: body.company?.contactEmail,
        contactPhone: body.company?.contactPhone,
      },
      jobProfile: body.jobProfile,
      packageOffered: body.packageOffered,
      visitDate: body.visitDate,
      ppt: {
        date: body.ppt?.date || undefined,
        mode: body.ppt?.mode,
        venueOrLink: body.ppt?.venueOrLink,
        description: body.ppt?.description,
      },
      assessment: {
        date: body.assessment?.date || undefined,
        mode: body.assessment?.mode,
        details: body.assessment?.details,
      },
      eligibility: {
        minCgpa: body.eligibility?.minCgpa !== '' ? body.eligibility?.minCgpa : undefined,
        maxBacklogs: body.eligibility?.maxBacklogs !== '' ? body.eligibility?.maxBacklogs : undefined,
        allowedBranches: toArray(body.eligibility?.allowedBranches),
        allowedCourses: toArray(body.eligibility?.allowedCourses),
        otherCriteria: body.eligibility?.otherCriteria,
      },
    });

    const saved = await drive.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error creating drive:', error);
    return res.status(500).json({ success: false, message: 'Server error while creating drive' });
  }
};

// GET /api/drives -> List all drives (newest visit date first), optional ?status= filter
const getDrives = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const drives = await Drive.find(filter).sort({ visitDate: 1 });
    return res.json({ success: true, count: drives.length, data: drives });
  } catch (error) {
    console.error('Error fetching drives:', error);
    return res.status(500).json({ success: false, message: 'Server error while fetching drives' });
  }
};

// GET /api/drives/:id -> Get a single drive
const getDriveById = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ success: false, message: 'Drive not found' });
    return res.json({ success: true, data: drive });
  } catch (error) {
    console.error('Error fetching drive:', error);
    return res.status(500).json({ success: false, message: 'Server error while fetching drive' });
  }
};

// PUT /api/drives/:id -> Update a drive (e.g. status change, edits)
const updateDrive = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!drive) return res.status(404).json({ success: false, message: 'Drive not found' });
    return res.json({ success: true, data: drive });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error updating drive:', error);
    return res.status(500).json({ success: false, message: 'Server error while updating drive' });
  }
};

// DELETE /api/drives/:id -> Remove a drive
const deleteDrive = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id);
    if (!drive) return res.status(404).json({ success: false, message: 'Drive not found' });
    return res.json({ success: true, message: 'Drive deleted successfully' });
  } catch (error) {
    console.error('Error deleting drive:', error);
    return res.status(500).json({ success: false, message: 'Server error while deleting drive' });
  }
};

module.exports = {
  createDrive,
  getDrives,
  getDriveById,
  updateDrive,
  deleteDrive,
};
