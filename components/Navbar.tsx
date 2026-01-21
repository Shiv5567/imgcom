
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Home Icon SVG component
  const HomeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group" onClick={closeMenu}>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-all shadow-xl shadow-indigo-200">
                <span className="text-white font-black text-[10px] tracking-tight">IC</span>
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-[-0.05em]">
                imgcom
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-12 md:flex md:space-x-10">
              <Link
                to="/"
                className={`inline-flex items-center gap-2 px-1 pt-1 border-b-2 text-[13px] font-black uppercase tracking-widest transition-all ${
                  isActive('/') 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                <HomeIcon />
                Home
              </Link>
              <Link
                to="/image-compressor"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-[13px] font-black uppercase tracking-widest transition-all ${
                  isActive('/image-compressor') 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                Compressor
              </Link>
              <Link
                to="/image-to-pdf"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-[13px] font-black uppercase tracking-widest transition-all ${
                  isActive('/image-to-pdf') 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                Image to PDF
              </Link>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-3 rounded-2xl text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 transition-all duration-500 ease-out origin-top shadow-2xl ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 space-y-6">
          <Link
            to="/"
            onClick={closeMenu}
            className={`flex items-center gap-4 px-6 py-5 rounded-[2rem] text-lg font-black tracking-tight transition-colors ${
              isActive('/') 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
          <Link
            to="/image-compressor"
            onClick={closeMenu}
            className={`block px-6 py-5 rounded-[2rem] text-lg font-black tracking-tight transition-colors ${
              isActive('/image-compressor') 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Compressor
          </Link>
          <Link
            to="/image-to-pdf"
            onClick={closeMenu}
            className={`block px-6 py-5 rounded-[2rem] text-lg font-black tracking-tight transition-colors ${
              isActive('/image-to-pdf') 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Image to PDF
          </Link>
          <div className="pt-6 border-t border-gray-50">
            <p className="px-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
              Professional Browser Tools
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
