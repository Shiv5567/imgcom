
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CompressorPage from './pages/CompressorPage';
import PdfPage from './pages/PdfPage';

const App: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>}>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/image-compressor" element={<CompressorPage />} />
              <Route path="/image-to-pdf" element={<PdfPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </Suspense>
  );
};

export default App;
