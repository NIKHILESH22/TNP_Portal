const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema(
  {
    // ----- Company details -----
    company: {
      name: { type: String, required: [true, 'Company name is required'], trim: true },
      website: { type: String, trim: true },
      industry: { type: String, trim: true },
      contactPersonName: { type: String, required: [true, 'Contact person name is required'], trim: true },
      contactEmail: { type: String, required: [true, 'Contact email is required'], trim: true, lowercase: true },
      contactPhone: { type: String, required: [true, 'Contact phone is required'], trim: true },
    },

    // ----- Role / offer info (kept minimal, part of "company details" for a drive) -----
    jobProfile: { type: String, trim: true },
    packageOffered: { type: String, trim: true },

    // ----- College visit date -----
    visitDate: { type: Date, required: [true, 'College visit date is required'] },

    // ----- Pre-Placement Talk (PPT) details -----
    ppt: {
      date: { type: Date },
      mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Offline' },
      venueOrLink: { type: String, trim: true },
      description: { type: String, trim: true },
    },

    // ----- Assessment details -----
    assessment: {
      date: { type: Date },
      mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Online' },
      details: { type: String, trim: true },
    },

    // ----- Eligibility information -----
    eligibility: {
      minCgpa: { type: Number, min: 0, max: 10 },
      maxBacklogs: { type: Number, min: 0, default: 0 },
      allowedBranches: [{ type: String, trim: true }],
      allowedCourses: [{ type: String, trim: true }],
      otherCriteria: { type: String, trim: true },
    },

    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Drive', driveSchema);
