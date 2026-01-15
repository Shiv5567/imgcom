
import React, { useState, useRef, useCallback } from 'react';

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
  const [result, setResult] = useState<CompressedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressImage = useCallback(async (selectedFile: File, compressionQuality: number) => {
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

        const mimeType = selectedFile.type === 'image/png' ? 'image/jpeg' : selectedFile.type;
        const compressedDataUrl = canvas.toDataURL(mimeType, compressionQuality);
        
        // Convert to blob to get size
        const head = 'data:' + mimeType + ';base64,';
        const imgSize = Math.round((compressedDataUrl.length - head.length) * 3 / 4);

        setResult({
          originalUrl: img.src,
          compressedUrl: compressedDataUrl,
          name: selectedFile.name.replace(/\.[^/.]+$/, "") + "_imgcom.jpg",
          originalSize: selectedFile.size,
          compressedSize: imgSize,
          type: mimeType
        });
        setIsProcessing(false);
      };
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      compressImage(selectedFile, quality);
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseFloat(e.target.value);
    setQuality(newQuality);
    if (file) {
      compressImage(file, newQuality);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <div className="text-center mb-10">
          <div className="flex justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Select Image to Compress
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {file && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Compression Level: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="0.95"
                step="0.05"
                value={quality}
                onChange={handleQualityChange}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Smaller File</span>
                <span>Better Quality</span>
              </div>
            </div>

            {isProcessing ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : result && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700">Before (Original)</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group">
                    <img src={result.originalUrl} alt="Original" className="w-full h-full object-contain" />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-xs">
                      {formatSize(result.originalSize)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-blue-600">After imgcom Compression</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-blue-200 relative group">
                    <img src={result.compressedUrl} alt="Compressed" className="w-full h-full object-contain" />
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-3 py-1 rounded text-xs">
                      {formatSize(result.compressedSize)}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col items-center gap-6 pt-4 border-t border-gray-100">
                   <div className="text-center">
                      <span className="text-3xl font-black text-green-600">
                        {Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100)}% Reduced
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        You saved {formatSize(result.originalSize - result.compressedSize)} with imgcom
                      </p>
                   </div>
                   <a
                    href={result.compressedUrl}
                    download={result.name}
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-black py-4 px-12 rounded-full transition-all shadow-lg text-center text-lg"
                  >
                    Download Compressed Photo
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
