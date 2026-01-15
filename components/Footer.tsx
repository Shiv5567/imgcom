
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <span className="text-xl font-black text-blue-600 tracking-tighter">imgcom</span>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              imgcom is your go-to destination for high-quality, client-side image optimization tools. 
              We prioritize your privacy by processing everything directly in your browser.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Tools</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/image-compressor" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  imgcom Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/image-to-pdf" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  imgcom Image to PDF
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><span className="text-sm text-gray-500">Privacy First</span></li>
              <li><span className="text-sm text-gray-500">No Sign-up Required</span></li>
              <li><span className="text-sm text-gray-500">100% Free imgcom Tools</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col items-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} imgcom – All rights reserved. Your photos never leave your device.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
