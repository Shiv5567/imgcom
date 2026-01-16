import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
                <span className="text-white font-black text-xs">IC</span>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter transition-colors">
                imgcom
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/image-compressor"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-all ${
                  isActive('/image-compressor') 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                Compressor
              </Link>
              <Link
                to="/image-to-pdf"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-all ${
                  isActive('/image-to-pdf') 
                    ? 'border-green-600 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                Image to PDF
              </Link>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-1.5 gap-4">
              <Link to="/image-compressor" className={`text-[10px] font-black uppercase tracking-widest ${isActive('/image-compressor') ? 'text-blue-600' : 'text-gray-400'}`}>Compress</Link>
              <div className="w-px h-3 bg-gray-300" />
              <Link to="/image-to-pdf" className={`text-[10px] font-black uppercase tracking-widest ${isActive('/image-to-pdf') ? 'text-green-600' : 'text-gray-400'}`}>To PDF</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;