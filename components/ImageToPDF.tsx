import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';

interface FileWithPreview {
  file: File;
  preview: string;
  id: string;
}

const ImageToPDF: React.FC = () => {
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const newImages = selectedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 11)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === images.length - 1)) return;
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setImages(newImages);
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const imageData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(img.file);
        });

        const tempImg = new Image();
        tempImg.src = imageData;
        await new Promise((resolve) => { tempImg.onload = resolve; });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = tempImg.width / tempImg.height;
        
        let width = pageWidth;
        let height = pageWidth / ratio;

        if (height > pageHeight) {
          height = pageHeight;
          width = pageHeight * ratio;
        }

        if (i > 0) pdf.addPage();
        pdf.addImage(imageData, 'JPEG', (pageWidth - width) / 2, (pageHeight - height) / 2, width, height);
      }

      pdf.save('imgcom_converted.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
        {/* Upload Zone */}
        <div className="p-12 text-center bg-white border-b border-gray-50">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group inline-flex flex-col items-center gap-4 transition-all"
          >
            <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center text-green-600 shadow-inner group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Add Photos</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Stitch images into one PDF</p>
            </div>
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple className="hidden" />
        </div>

        {/* Content Area */}
        <div className="flex-grow p-8 sm:p-12 bg-gray-50/50">
          {images.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-4 border-2 border-dashed border-gray-200 rounded-[2rem]">
               <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               <p className="font-bold text-sm uppercase tracking-widest">No images selected yet</p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {images.map((img, index) => (
                  <div key={img.id} className="group relative aspect-[3/4] bg-white rounded-3xl p-2 shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100">
                       <img src={img.preview} alt="PDF Part" className="w-full h-full object-cover" />
                       <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[10px] font-black text-white">{index + 1}</div>
                       <button 
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 scale-75 group-hover:scale-100"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                       </button>
                    </div>
                    {/* Controls */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                       <button disabled={index === 0} onClick={() => moveImage(index, 'up')} className="bg-white p-2 rounded-xl shadow-lg text-gray-700 disabled:opacity-30 border border-gray-100 hover:text-green-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                       </button>
                       <button disabled={index === images.length - 1} onClick={() => moveImage(index, 'down')} className="bg-white p-2 rounded-xl shadow-lg text-gray-700 disabled:opacity-30 border border-gray-100 hover:text-green-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                       </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center pt-12 border-t border-gray-200/50">
                 <button
                  onClick={generatePDF}
                  disabled={isGenerating || images.length === 0}
                  className="group w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-black py-6 px-16 rounded-[2rem] transition-all shadow-2xl shadow-green-200 text-xl flex items-center justify-center gap-4 transform hover:-translate-y-1"
                >
                  {isGenerating ? (
                     <>
                      <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
                      Rendering PDF...
                     </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      Generate PDF Document
                    </>
                  )}
                </button>
                <p className="mt-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] animate-pulse">
                  Ready to compile {images.length} pages
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToPDF;