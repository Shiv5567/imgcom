
import React, { useState, useRef, useCallback, useEffect } from 'react';

interface CompressedImage {
  originalUrl: string;
  compressedUrl: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  type: string;
}

const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.7);
  const [preserveFormat, setPreserveFormat] = useState<boolean>(false);
  const [compressionMode, setCompressionMode] = useState<'lossy' | 'lossless'>('lossy');
  const [result, setResult] = useState<CompressedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sponsoredLink = "https://www.effectivegatecpm.com/ttz15272?key=f912466b03f48d05a684462229d57d96";

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressImage = useCallback(async (selectedFile: File, compressionQuality: number, preserve: boolean, mode: 'lossy' | 'lossless') => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const mimeType = preserve ? selectedFile.type : 'image/jpeg';
        const finalQuality = mode === 'lossless' ? 1.0 : compressionQuality;
        const compressedDataUrl = canvas.toDataURL(mimeType, finalQuality);
        
        const head = 'data:' + mimeType + ';base64,';
        const imgSize = Math.round((compressedDataUrl.length - head.length) * 3 / 4);
        const extension = mimeType.split('/')[1] || 'jpg';

        setResult({
          originalUrl: img.src,
          compressedUrl: compressedDataUrl,
          name: selectedFile.name.replace(/\.[^/.]+$/, "") + `_imgcom.${extension}`,
          originalSize: selectedFile.size,
          compressedSize: imgSize,
          type: mimeType
        });
        setIsProcessing(false);
      };
    };
  }, []);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        compressImage(file, quality, preserveFormat, compressionMode);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [quality, preserveFormat, compressionMode, file, compressImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
        {/* Header/Upload Section */}
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative p-12 text-center transition-all duration-300 ${isDragging ? 'bg-indigo-50/50' : 'bg-white'}`}
        >
          {!file ? (
            <div className="py-12 flex flex-col items-center">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-24 h-24 mb-8 rounded-[2.5rem] flex items-center justify-center cursor-pointer transition-all duration-500 group shadow-xl ${isDragging ? 'bg-indigo-600 scale-110 rotate-12' : 'bg-gray-50 border-2 border-dashed border-gray-200 hover:border-indigo-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 transition-colors ${isDragging ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Drop your image here</h3>
              <p className="text-gray-400 mb-10 font-bold uppercase tracking-widest text-xs">PNG, JPG, WebP Supported</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 px-12 rounded-[2rem] transition-all shadow-xl shadow-indigo-100 flex items-center gap-3 transform hover:-translate-y-1"
              >
                Select Files
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
               <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden shadow-inner">
                    {result ? <img src={result.originalUrl} className="w-full h-full object-cover" /> : <div className="animate-pulse w-full h-full bg-indigo-200" />}
                  </div>
                  <div className="text-left">
                    <p className="text-base font-black text-gray-900 truncate max-w-[200px] tracking-tight">{file.name}</p>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{formatSize(file.size)}</p>
                  </div>
               </div>
               <button onClick={() => {setFile(null); setResult(null);}} className="text-xs font-black text-red-500 hover:bg-red-50 px-6 py-3 rounded-2xl transition-colors uppercase tracking-widest">Remove</button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>

        {file && (
          <div className="border-t border-gray-50 p-8 sm:p-14 space-y-12 animate-fade-in bg-white">
            {/* Settings Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">1</div>
                   <h4 className="text-xl font-black text-gray-900 tracking-tight uppercase tracking-[0.05em]">Settings</h4>
                </div>
                <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 space-y-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-gray-500 tracking-tight uppercase tracking-widest">Original Format</span>
                    <button onClick={() => setPreserveFormat(!preserveFormat)} className={`relative w-14 h-7 rounded-full transition-all duration-300 ${preserveFormat ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${preserveFormat ? 'translate-x-7' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <div className="flex bg-gray-200/50 p-1.5 rounded-2xl border border-gray-200">
                    <button onClick={() => setCompressionMode('lossy')} className={`flex-1 py-3 text-[11px] font-black rounded-xl transition-all tracking-widest ${compressionMode === 'lossy' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>LOSSY</button>
                    <button onClick={() => setCompressionMode('lossless')} className={`flex-1 py-3 text-[11px] font-black rounded-xl transition-all tracking-widest ${compressionMode === 'lossless' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>LOSSLESS</button>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">2</div>
                   <h4 className="text-xl font-black text-gray-900 tracking-tight uppercase tracking-[0.05em]">Quality</h4>
                </div>
                <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[160px] flex flex-col justify-center">
                   {compressionMode === 'lossy' ? (
                     <div className="space-y-6">
                        <div className="flex justify-between items-end">
                           <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Intensity</span>
                           <span className="text-4xl font-black text-indigo-600 leading-none tracking-tighter">{Math.round(quality * 100)}%</span>
                        </div>
                        <input type="range" min="0.05" max="0.95" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full h-2.5 bg-indigo-100 rounded-full appearance-none cursor-pointer accent-indigo-600" />
                     </div>
                   ) : (
                     <div className="flex flex-col items-center gap-3 text-indigo-600 text-center">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-[10px] font-black leading-relaxed uppercase tracking-[0.2em]">Perfect preservation enabled.</p>
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="relative pt-4">
              {isProcessing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center rounded-[3rem] border border-indigo-100">
                   <div className="animate-spin w-14 h-14 border-[5px] border-indigo-600 border-t-transparent rounded-full mb-6"></div>
                   <p className="font-black text-gray-900 tracking-tight text-2xl uppercase">Rendering...</p>
                </div>
              )}
              
              {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                      <span>BEFORE</span>
                      <span>{formatSize(result.originalSize)}</span>
                    </div>
                    <div className="aspect-[4/3] bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 flex items-center justify-center p-6 shadow-inner">
                      <img src={result.originalUrl} className="max-w-full max-h-full object-contain drop-shadow-2xl" alt="Before" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600">
                      <span>AFTER</span>
                      <span>{formatSize(result.compressedSize)}</span>
                    </div>
                    <div className="aspect-[4/3] bg-indigo-50/20 rounded-[2.5rem] overflow-hidden border border-indigo-100/50 flex items-center justify-center p-6 shadow-inner">
                      <img src={result.compressedUrl} className="max-w-full max-h-full object-contain drop-shadow-2xl" alt="After" />
                    </div>
                  </div>
                  <div className="md:col-span-2 flex flex-col items-center pt-10">
                    <div className="mb-10 text-center bg-indigo-50 px-8 py-4 rounded-full border border-indigo-100">
                       <div className="inline-flex items-center gap-3">
                          <span className="text-6xl font-black text-gray-900 tracking-tighter">
                            {Math.max(0, Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100))}%
                          </span>
                          <div className="text-left">
                            <span className="block text-xl font-black text-indigo-600 tracking-tighter leading-none">SMALLER</span>
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Optimized</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <a
                        href={result.compressedUrl}
                        download={result.name}
                        className="px-16 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-[2.5rem] shadow-2xl shadow-indigo-100 transition-all transform hover:-translate-y-1 text-xl tracking-tight text-center"
                      >
                        Download Image
                      </a>
                      {/* Sponsored Action */}
                      <a
                        href={sponsoredLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-16 py-6 bg-gray-900 hover:bg-black text-white font-black rounded-[2.5rem] transition-all transform hover:-translate-y-1 text-xl tracking-tight text-center flex items-center justify-center gap-3"
                      >
                        <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" /></svg>
                        Boost Speed
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
