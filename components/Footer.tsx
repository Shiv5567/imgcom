
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-[8px]">IC</span>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">imgcom</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-medium">
              Professional, browser-based media utilities. Your privacy is our priority—files never leave your local device.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Tools</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/image-compressor" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">
                  Compressor
                </Link>
              </li>
              <li>
                <Link to="/image-to-pdf" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">
                  Image to PDF
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Network</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://www.effectivegatecpm.com/ttz15272?key=f912466b03f48d05a684462229d57d96" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  Sponsored Content
                </a>
              </li>
              <li><span className="text-sm font-bold text-gray-400">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em]">
            &copy; {new Date().getFullYear()} IMGCOM UTILITIES
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em]">Client-Side</span>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em]">Fast</span>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em]">Private</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
