
import React from 'react';
import SEO from '../components/SEO';
import ImageToPDF from '../components/ImageToPDF';

const PdfPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <SEO 
        title="imgcom Image to PDF Converter – Convert Images to PDF Online"
        description="imgcom Image to PDF converter lets you combine multiple images into one high-quality PDF document. Organize and convert with imgcom image tools for free."
      />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-black text-center text-gray-900 mb-2">
          imgcom <span className="text-green-600">Image to PDF</span>
        </h1>
        <p className="text-center text-gray-500 mb-12">Professional conversion directly in your browser.</p>
        
        <ImageToPDF />
      </div>
    </div>
  );
};

export default PdfPage;
