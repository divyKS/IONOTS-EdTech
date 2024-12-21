import React from 'react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 
      'bg-blue-700 text-white' : 
      'text-blue-100 hover:bg-blue-600 hover:text-white';
  };

  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              EdTech Platform
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}
            >
              Projects
            </Link>
            <Link
              to="/progress"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/progress')}`}
            >
              My Progress
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;