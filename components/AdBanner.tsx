
import React, { useEffect, useRef } from 'react';

const AdBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.firstChild) {
      const atOptionsScript = document.createElement('script');
      atOptionsScript.type = 'text/javascript';
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : '557be09d4f5402fca68eabe6f186d36b',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/557be09d4f5402fca68eabe6f186d36b/invoke.js';

      bannerRef.current.appendChild(atOptionsScript);
      bannerRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div className="flex flex-col items-center my-8 overflow-x-hidden w-full">
      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Advertisement</p>
      <div 
        ref={bannerRef} 
        className="min-h-[90px] w-full max-w-[728px] flex justify-center bg-gray-50/50 rounded-xl overflow-hidden"
      >
        {/* Adsterra script will inject here */}
      </div>
    </div>
  );
};

export default AdBanner;
