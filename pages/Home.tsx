
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="imgcom – Free Image Compressor & Image to PDF Converter"
        description="imgcom is the ultimate online suite for your images. Compress images to reduce size or convert multiple photos to PDF. Fast, free, and secure imgcom tools."
      />
      
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight leading-none mb-6">
            imgcom <span className="text-blue-600">Online Image Tools</span>
          </h1>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Lightweight, lightning-fast, and 100% private. Optimize your images or create PDFs in seconds with <strong>imgcom</strong>.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link 
              to="/image-compressor"
              className="flex flex-col items-center p-8 bg-blue-50 hover:bg-blue-100 rounded-3xl border-2 border-blue-100 transition-all group"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Compressor</h2>
              <p className="text-gray-500 text-sm">Reduce KB size for web & mobile</p>
            </Link>

            <Link 
              to="/image-to-pdf"
              className="flex flex-col items-center p-8 bg-green-50 hover:bg-green-100 rounded-3xl border-2 border-green-100 transition-all group"
            >
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Image to PDF</h2>
              <p className="text-gray-500 text-sm">Convert photos into documents</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
