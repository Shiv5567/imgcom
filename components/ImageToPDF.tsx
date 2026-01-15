
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
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Images
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>
        </div>

        {images.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={img.id} className="relative group bg-gray-50 rounded-lg p-2 border border-gray-200 aspect-square flex flex-col items-center">
                  <img src={img.preview} alt="Thumbnail" className="w-full h-full object-cover rounded shadow-sm" />
                  <div className="absolute top-1 right-1 flex gap-1">
                    <button 
                      onClick={() => removeImage(img.id)}
                      className="bg-red-500 text-white p-1.5 rounded-full shadow hover:bg-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      disabled={index === 0}
                      onClick={() => moveImage(index, 'up')}
                      className="bg-white/90 p-1.5 rounded-full shadow text-gray-700 disabled:opacity-30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      disabled={index === images.length - 1}
                      onClick={() => moveImage(index, 'down')}
                      className="bg-white/90 p-1.5 rounded-full shadow text-gray-700 disabled:opacity-30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6 pt-10 border-t border-gray-100">
               <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-black py-4 px-12 rounded-full transition-all shadow-lg text-center text-lg flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                   <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating PDF...
                   </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Download PDF Document
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400">
                Tip: You can reorder images using the arrows.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToPDF;
