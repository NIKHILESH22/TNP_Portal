import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'
  }`;

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <NavLink to="/" className="text-lg font-bold text-blue-700">
          TNP Portal
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/drives" className={linkClass}>
            All Drives
          </NavLink>
          <NavLink to="/register-drive" className={linkClass}>
            Register a Drive
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
