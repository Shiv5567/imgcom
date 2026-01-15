
import React from 'react';
import SEO from '../components/SEO';
import ImageCompressor from '../components/ImageCompressor';

const CompressorPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <SEO 
        title="imgcom Image Compressor – Reduce Image Size Online"
        description="Use the imgcom image compressor to reduce your photo file size without quality loss. Supports JPG, PNG, and WebP. Fast, free online imgcom tool."
      />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-black text-center text-gray-900 mb-2">
          imgcom <span className="text-blue-600">Image Compressor</span>
        </h1>
        <p className="text-center text-gray-500 mb-12">The fastest way to reduce image KB online.</p>
        
        <ImageCompressor />
      </div>
    </div>
  );
};

export default CompressorPage;
