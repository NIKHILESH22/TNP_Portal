import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await api.get('/');
        setStatus('connected');
      } catch (error) {
        console.error('Error connecting to backend:', error);
        setStatus('offline');
      }
    };
    checkBackend();
  }, []);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">Training &amp; Placement Portal</h1>
      <p className="text-gray-600 mb-6 text-center max-w-xl">
        Companies can register their upcoming campus recruitment drives, including visit dates,
        pre-placement talks, assessment schedules and eligibility criteria.
      </p>

      <div className="bg-white p-4 rounded-lg shadow-md mb-8 text-sm">
        Backend status:{' '}
        {status === 'checking' && <span className="text-yellow-600 font-semibold">Checking...</span>}
        {status === 'connected' && <span className="text-green-600 font-semibold">Connected</span>}
        {status === 'offline' && <span className="text-red-600 font-semibold">Offline</span>}
      </div>

      <div className="flex gap-4">
        <Link
          to="/register-drive"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow"
        >
          Register a Placement Drive
        </Link>
        <Link
          to="/drives"
          className="bg-white hover:bg-gray-50 text-blue-700 font-semibold px-5 py-3 rounded-lg shadow border border-blue-200"
        >
          View All Drives
        </Link>
      </div>
    </div>
  );
};

export default Home;
