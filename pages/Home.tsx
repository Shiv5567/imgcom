import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      <SEO 
        title="imgcom – Professional Image Compressor & PDF Converter"
        description="Optimize your workflow with imgcom. High-performance image compression and seamless PDF conversion directly in your browser. Free, fast, and 100% private."
      />
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Browser-Based Processing
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
            Superior <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Image Utilities</span>
          </h1>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            The professional suite for creators. Reduce file sizes, convert formats, and create PDFs without your files ever leaving your device.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tool Card 1 */}
            <Link 
              to="/image-compressor"
              className="group relative flex flex-col items-start p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/40"
            >
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Image Compressor</h2>
              <p className="text-gray-500 text-left text-sm leading-relaxed mb-6">
                Optimized algorithms to shave off KBs while maintaining pixel-perfect quality.
              </p>
              <ul className="space-y-2 mb-8 w-full">
                {['Lossy & Lossless', 'Preserve Metadata', 'Batch Ready'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full flex justify-between items-center">
                <span className="text-blue-600 font-black text-sm uppercase tracking-widest">Start Compressing</span>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>

            {/* Tool Card 2 */}
            <Link 
              to="/image-to-pdf"
              className="group relative flex flex-col items-start p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-200/40"
            >
              <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-200 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Image to PDF</h2>
              <p className="text-gray-500 text-left text-sm leading-relaxed mb-6">
                Stitch multiple photos into a single, high-quality document in seconds.
              </p>
              <ul className="space-y-2 mb-8 w-full">
                {['Custom Order', 'Original DPI', 'Fast Rendering'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full flex justify-between items-center">
                <span className="text-green-600 font-black text-sm uppercase tracking-widest">Start Conversion</span>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
           {['No Server Uploads', 'Instant Download', 'Zero Logs', 'AES Encryption Support'].map(text => (
             <div key={text} className="flex items-center gap-2 font-black uppercase tracking-tighter text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                {text}
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;