
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-black text-blue-600 tracking-tighter group-hover:text-blue-700 transition-colors">
                imgcom
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/image-compressor"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all"
              >
                Image Compressor
              </Link>
              <Link
                to="/image-to-pdf"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all"
              >
                Image to PDF
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
             {/* Mobile links could go here if needed */}
             <div className="flex space-x-4">
                <Link to="/image-compressor" className="text-xs font-bold text-gray-500 uppercase tracking-widest">Compress</Link>
                <Link to="/image-to-pdf" className="text-xs font-bold text-gray-500 uppercase tracking-widest">To PDF</Link>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
