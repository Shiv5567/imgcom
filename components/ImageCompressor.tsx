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
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        {/* Header/Upload Section */}
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative p-12 text-center transition-all duration-300 ${isDragging ? 'bg-blue-50/50' : 'bg-white'}`}
        >
          {!file ? (
            <div className="py-12 flex flex-col items-center">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-24 h-24 mb-6 rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-500 group shadow-xl ${isDragging ? 'bg-blue-600 scale-110 rotate-12' : 'bg-gray-50 border-2 border-dashed border-gray-200 hover:border-blue-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 transition-colors ${isDragging ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Drop your image here</h3>
              <p className="text-gray-400 mb-8 font-medium">Supports JPG, PNG, WebP and more.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-gray-400/30 flex items-center gap-2"
              >
                Select Files
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                    {result ? <img src={result.originalUrl} className="w-full h-full object-cover" /> : <div className="animate-pulse w-full h-full bg-blue-200" />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-gray-900 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatSize(file.size)}</p>
                  </div>
               </div>
               <button onClick={() => {setFile(null); setResult(null);}} className="text-xs font-black text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors">REMOVE</button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>

        {file && (
          <div className="border-t border-gray-100 p-8 sm:p-12 space-y-10 animate-fade-in bg-white">
            {/* Settings Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">1</div>
                   <h4 className="text-lg font-black text-gray-900 tracking-tight">Mode & Format</h4>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-600 tracking-tight">Preserve Original Format</span>
                    <button onClick={() => setPreserveFormat(!preserveFormat)} className={`relative w-12 h-6 rounded-full transition-all duration-300 ${preserveFormat ? 'bg-blue-600' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${preserveFormat ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <div className="flex bg-gray-200 p-1 rounded-2xl">
                    <button onClick={() => setCompressionMode('lossy')} className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${compressionMode === 'lossy' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>LOSSY</button>
                    <button onClick={() => setCompressionMode('lossless')} className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${compressionMode === 'lossless' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>LOSSLESS</button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">2</div>
                   <h4 className="text-lg font-black text-gray-900 tracking-tight">Optimization Level</h4>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm min-h-[140px] flex flex-col justify-center">
                   {compressionMode === 'lossy' ? (
                     <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-sm font-bold text-gray-500">Quality Ratio</span>
                           <span className="text-3xl font-black text-blue-600 leading-none tracking-tighter">{Math.round(quality * 100)}%</span>
                        </div>
                        <input type="range" min="0.05" max="0.95" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                     </div>
                   ) : (
                     <div className="flex items-center gap-4 text-blue-700">
                        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xs font-bold leading-relaxed uppercase tracking-widest">Pixel-perfect preservation enabled. Maximum fidelity.</p>
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="relative">
              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-200">
                   <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                   <p className="font-black text-gray-900 tracking-tighter text-xl">OPTMIZING...</p>
                </div>
              )}
              
              {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 group">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      <span>BEFORE</span>
                      <span>{formatSize(result.originalSize)}</span>
                    </div>
                    <div className="aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
                      <img src={result.originalUrl} className="max-w-full max-h-full object-contain drop-shadow-2xl" alt="Before" />
                    </div>
                  </div>
                  <div className="space-y-4 group">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                      <span>AFTER</span>
                      <span>{formatSize(result.compressedSize)}</span>
                    </div>
                    <div className="aspect-[4/3] bg-blue-50/30 rounded-3xl overflow-hidden border-2 border-blue-100 flex items-center justify-center p-4">
                      <img src={result.compressedUrl} className="max-w-full max-h-full object-contain drop-shadow-2xl" alt="After" />
                    </div>
                  </div>
                  <div className="md:col-span-2 flex flex-col items-center pt-8">
                    <div className="mb-8 text-center">
                       <div className="inline-flex items-baseline gap-2">
                          <span className="text-5xl font-black text-gray-900 tracking-tighter">
                            {Math.max(0, Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100))}%
                          </span>
                          <span className="text-lg font-black text-blue-600 tracking-tighter">SMALLER</span>
                       </div>
                    </div>
                    <a
                      href={result.compressedUrl}
                      download={result.name}
                      className="w-full sm:w-auto px-16 py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl shadow-2xl shadow-blue-200 transition-all transform hover:-translate-y-1 text-xl tracking-tight text-center"
                    >
                      Download Optimized Image
                    </a>
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