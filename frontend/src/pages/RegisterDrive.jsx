import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { driveApi } from '../services/api';

const initialForm = {
  company: {
    name: '',
    website: '',
    industry: '',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
  },
  jobProfile: '',
  packageOffered: '',
  visitDate: '',
  ppt: {
    date: '',
    mode: 'Offline',
    venueOrLink: '',
    description: '',
  },
  assessment: {
    date: '',
    mode: 'Online',
    details: '',
  },
  eligibility: {
    minCgpa: '',
    maxBacklogs: '0',
    allowedBranches: '',
    allowedCourses: '',
    otherCriteria: '',
  },
};

const inputClass =
  'w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
    <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

const RegisterDrive = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const updateField = (section, field, value) => {
    if (section) {
      setForm((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validate = () => {
    if (!form.company.name.trim()) return 'Company name is required';
    if (!form.company.contactPersonName.trim()) return 'Contact person name is required';
    if (!form.company.contactEmail.trim()) return 'Contact email is required';
    if (!form.company.contactPhone.trim()) return 'Contact phone is required';
    if (!form.visitDate) return 'College visit date is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    const validationError = validate();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await driveApi.create(form);
      setSuccess(true);
      setForm(initialForm);
      setTimeout(() => navigate('/drives'), 1200);
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong while submitting the drive.';
      setErrors(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-100 py-8 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register a Campus Placement Drive</h1>

        {errors && (
          <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-md px-4 py-3 mb-4">
            {errors}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-300 text-green-700 text-sm rounded-md px-4 py-3 mb-4">
            Drive registered successfully! Redirecting to all drives...
          </div>
        )}

        <Section title="Company Details">
          <div>
            <label className={labelClass}>Company Name *</label>
            <input
              className={inputClass}
              value={form.company.name}
              onChange={(e) => updateField('company', 'name', e.target.value)}
              placeholder="Acme Corp"
            />
          </div>
          <div>
            <label className={labelClass}>Website</label>
            <input
              className={inputClass}
              value={form.company.website}
              onChange={(e) => updateField('company', 'website', e.target.value)}
              placeholder="https://acme.com"
            />
          </div>
          <div>
            <label className={labelClass}>Industry</label>
            <input
              className={inputClass}
              value={form.company.industry}
              onChange={(e) => updateField('company', 'industry', e.target.value)}
              placeholder="IT Services, Product, Core, etc."
            />
          </div>
          <div>
            <label className={labelClass}>Contact Person Name *</label>
            <input
              className={inputClass}
              value={form.company.contactPersonName}
              onChange={(e) => updateField('company', 'contactPersonName', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Contact Email *</label>
            <input
              type="email"
              className={inputClass}
              value={form.company.contactEmail}
              onChange={(e) => updateField('company', 'contactEmail', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Contact Phone *</label>
            <input
              className={inputClass}
              value={form.company.contactPhone}
              onChange={(e) => updateField('company', 'contactPhone', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Job Profile</label>
            <input
              className={inputClass}
              value={form.jobProfile}
              onChange={(e) => updateField(null, 'jobProfile', e.target.value)}
              placeholder="Software Engineer Trainee"
            />
          </div>
          <div>
            <label className={labelClass}>Package Offered (CTC)</label>
            <input
              className={inputClass}
              value={form.packageOffered}
              onChange={(e) => updateField(null, 'packageOffered', e.target.value)}
              placeholder="6 LPA"
            />
          </div>
        </Section>

        <Section title="College Visit">
          <div>
            <label className={labelClass}>College Visit Date *</label>
            <input
              type="date"
              className={inputClass}
              value={form.visitDate}
              onChange={(e) => updateField(null, 'visitDate', e.target.value)}
            />
          </div>
        </Section>

        <Section title="Pre-Placement Talk (PPT)">
          <div>
            <label className={labelClass}>PPT Date</label>
            <input
              type="date"
              className={inputClass}
              value={form.ppt.date}
              onChange={(e) => updateField('ppt', 'date', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Mode</label>
            <select
              className={inputClass}
              value={form.ppt.mode}
              onChange={(e) => updateField('ppt', 'mode', e.target.value)}
            >
              <option>Offline</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Venue / Link</label>
            <input
              className={inputClass}
              value={form.ppt.venueOrLink}
              onChange={(e) => updateField('ppt', 'venueOrLink', e.target.value)}
              placeholder="Auditorium / Zoom link"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              className={inputClass}
              rows={2}
              value={form.ppt.description}
              onChange={(e) => updateField('ppt', 'description', e.target.value)}
            />
          </div>
        </Section>

        <Section title="Assessment Details">
          <div>
            <label className={labelClass}>Assessment Date</label>
            <input
              type="date"
              className={inputClass}
              value={form.assessment.date}
              onChange={(e) => updateField('assessment', 'date', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Mode</label>
            <select
              className={inputClass}
              value={form.assessment.mode}
              onChange={(e) => updateField('assessment', 'mode', e.target.value)}
            >
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Details</label>
            <textarea
              className={inputClass}
              rows={2}
              value={form.assessment.details}
              onChange={(e) => updateField('assessment', 'details', e.target.value)}
              placeholder="Aptitude test + technical MCQ + coding round, duration, platform, etc."
            />
          </div>
        </Section>

        <Section title="Eligibility Information">
          <div>
            <label className={labelClass}>Minimum CGPA</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              className={inputClass}
              value={form.eligibility.minCgpa}
              onChange={(e) => updateField('eligibility', 'minCgpa', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Max Active Backlogs</label>
            <input
              type="number"
              min="0"
              className={inputClass}
              value={form.eligibility.maxBacklogs}
              onChange={(e) => updateField('eligibility', 'maxBacklogs', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Allowed Branches (comma separated)</label>
            <input
              className={inputClass}
              value={form.eligibility.allowedBranches}
              onChange={(e) => updateField('eligibility', 'allowedBranches', e.target.value)}
              placeholder="CSE, IT, ECE"
            />
          </div>
          <div>
            <label className={labelClass}>Allowed Courses (comma separated)</label>
            <input
              className={inputClass}
              value={form.eligibility.allowedCourses}
              onChange={(e) => updateField('eligibility', 'allowedCourses', e.target.value)}
              placeholder="B.Tech, M.Tech"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Other Criteria</label>
            <textarea
              className={inputClass}
              rows={2}
              value={form.eligibility.otherCriteria}
              onChange={(e) => updateField('eligibility', 'otherCriteria', e.target.value)}
              placeholder="No standing arrears, gap year restriction, etc."
            />
          </div>
        </Section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg shadow"
        >
          {submitting ? 'Submitting...' : 'Register Drive'}
        </button>
      </form>
    </div>
  );
};

export default RegisterDrive;
