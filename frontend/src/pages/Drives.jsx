import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { driveApi } from '../services/api';

const formatDate = (d) => (d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—');

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Completed: 'bg-blue-100 text-blue-800',
};

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await driveApi.getAll();
      setDrives(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Could not load drives. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Registered Placement Drives</h1>
          <Link
            to="/register-drive"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow"
          >
            + Register Drive
          </Link>
        </div>

        {loading && <p className="text-gray-500">Loading drives...</p>}
        {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">{error}</p>}
        {!loading && !error && drives.length === 0 && (
          <p className="text-gray-500 bg-white rounded-lg shadow-sm p-6 text-center">
            No drives registered yet. Be the first to{' '}
            <Link to="/register-drive" className="text-blue-600 underline">
              register one
            </Link>
            .
          </p>
        )}

        <div className="grid gap-4">
          {drives.map((drive) => (
            <Link
              key={drive._id}
              to={`/drives/${drive._id}`}
              className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow block"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-blue-700">{drive.company?.name}</h2>
                  <p className="text-sm text-gray-500">{drive.jobProfile || 'Role not specified'}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[drive.status] || 'bg-gray-100 text-gray-700'}`}>
                  {drive.status}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-gray-400">Visit Date</p>
                  <p className="font-medium">{formatDate(drive.visitDate)}</p>
                </div>
                <div>
                  <p className="text-gray-400">PPT Date</p>
                  <p className="font-medium">{formatDate(drive.ppt?.date)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Assessment Date</p>
                  <p className="font-medium">{formatDate(drive.assessment?.date)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Package</p>
                  <p className="font-medium">{drive.packageOffered || '—'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drives;
