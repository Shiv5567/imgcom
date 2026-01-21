
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <SEO 
        title="imgcom – Professional Image Compressor & PDF Converter"
        description="Optimize your workflow with imgcom. High-performance image compression and seamless PDF conversion directly in your browser. Free, fast, and 100% private."
      />
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50/50 border border-indigo-100/50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.15em] mb-10 animate-fade-in backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Browser-Based Processing
          </div>

          <div className="relative inline-block mb-16">
            {/* The "Blue Box" from the screenshot - stylistic overlapping element */}
            <div className="absolute -right-8 -bottom-12 w-[60%] h-[120%] bg-indigo-600 opacity-90 rounded-[2rem] z-[-1] hidden md:block transform rotate-1"></div>
            
            <h1 className="text-7xl sm:text-[9rem] font-black text-gray-900 tracking-[-0.04em] leading-[0.85] relative">
              <span className="block">Superior</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-blue-500 md:text-white drop-shadow-sm">Utilities</span>
            </h1>
          </div>

          <p className="text-xl sm:text-2xl text-gray-500 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            The professional suite for creators. Reduce file sizes and create PDFs without your files ever leaving your device.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Tool Card 1 */}
            <Link 
              to="/image-compressor"
              className="group relative flex flex-col items-start p-12 bg-gray-50/50 rounded-[3rem] border border-gray-100 transition-all hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:shadow-indigo-200/40"
            >
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Compressor</h2>
              <p className="text-gray-500 text-left text-base leading-relaxed mb-8">
                Optimized algorithms to shave off KBs while maintaining pixel-perfect quality.
              </p>
              <div className="mt-auto w-full flex justify-between items-center">
                <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em]">Start Optimizing</span>
                <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>

            {/* Tool Card 2 */}
            <Link 
              to="/image-to-pdf"
              className="group relative flex flex-col items-start p-12 bg-gray-50/50 rounded-[3rem] border border-gray-100 transition-all hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:shadow-blue-200/40"
            >
              <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Image to PDF</h2>
              <p className="text-gray-500 text-left text-base leading-relaxed mb-8">
                Stitch multiple photos into a single, high-quality document in seconds.
              </p>
              <div className="mt-auto w-full flex justify-between items-center">
                <span className="text-blue-500 font-black text-xs uppercase tracking-[0.2em]">Start Conversion</span>
                <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white group-hover:border-transparent transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-16 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
           {['No Server Uploads', 'Instant Download', 'Zero Logs', 'Client-Side Encryption'].map(text => (
             <div key={text} className="flex items-center gap-3 font-black uppercase tracking-tighter text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                {text}
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
