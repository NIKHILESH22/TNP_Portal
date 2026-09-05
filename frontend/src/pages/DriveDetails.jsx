import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { driveApi } from '../services/api';

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const Row = ({ label, value }) => (
  <div className="py-2 flex justify-between gap-4 border-b border-gray-100 last:border-0">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="font-medium text-sm text-right">{value || '—'}</span>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
    <h2 className="text-lg font-semibold text-blue-700 mb-2 border-b pb-2">{title}</h2>
    {children}
  </div>
);

const DriveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drive, setDrive] = useState(null);
  const [error, setError] = useState('');
  const [statusSaving, setStatusSaving] = useState(false);

  const load = async () => {
    try {
      const res = await driveApi.getById(id);
      setDrive(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Drive not found or backend unavailable.');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const changeStatus = async (status) => {
    setStatusSaving(true);
    try {
      const res = await driveApi.update(id, { status });
      setDrive(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setStatusSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this drive? This cannot be undone.')) return;
    try {
      await driveApi.remove(id);
      navigate('/drives');
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-100">
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">{error}</p>
      </div>
    );
  }

  if (!drive) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/drives" className="text-blue-600 text-sm hover:underline">
          &larr; Back to all drives
        </Link>

        <div className="flex items-center justify-between mt-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{drive.company?.name}</h1>
          <div className="flex items-center gap-2">
            <select
              disabled={statusSaving}
              value={drive.status}
              onChange={(e) => changeStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Completed</option>
            </select>
            <button
              onClick={handleDelete}
              className="text-red-600 text-sm border border-red-300 rounded-md px-3 py-1 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>

        <Card title="Company Details">
          <Row label="Company" value={drive.company?.name} />
          <Row label="Industry" value={drive.company?.industry} />
          <Row label="Website" value={drive.company?.website} />
          <Row label="Contact Person" value={drive.company?.contactPersonName} />
          <Row label="Contact Email" value={drive.company?.contactEmail} />
          <Row label="Contact Phone" value={drive.company?.contactPhone} />
          <Row label="Job Profile" value={drive.jobProfile} />
          <Row label="Package Offered" value={drive.packageOffered} />
        </Card>

        <Card title="College Visit">
          <Row label="Visit Date" value={formatDate(drive.visitDate)} />
        </Card>

        <Card title="Pre-Placement Talk (PPT)">
          <Row label="Date" value={formatDate(drive.ppt?.date)} />
          <Row label="Mode" value={drive.ppt?.mode} />
          <Row label="Venue / Link" value={drive.ppt?.venueOrLink} />
          <Row label="Description" value={drive.ppt?.description} />
        </Card>

        <Card title="Assessment Details">
          <Row label="Date" value={formatDate(drive.assessment?.date)} />
          <Row label="Mode" value={drive.assessment?.mode} />
          <Row label="Details" value={drive.assessment?.details} />
        </Card>

        <Card title="Eligibility">
          <Row label="Minimum CGPA" value={drive.eligibility?.minCgpa} />
          <Row label="Max Backlogs" value={drive.eligibility?.maxBacklogs} />
          <Row label="Allowed Branches" value={drive.eligibility?.allowedBranches?.join(', ')} />
          <Row label="Allowed Courses" value={drive.eligibility?.allowedCourses?.join(', ')} />
          <Row label="Other Criteria" value={drive.eligibility?.otherCriteria} />
        </Card>
      </div>
    </div>
  );
};

export default DriveDetails;
