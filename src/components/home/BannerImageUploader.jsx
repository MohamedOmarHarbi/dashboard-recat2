import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

const BannerImageUploader = ({ imageUrl, onImageChange }) => {
  const [preview, setPreview] = useState(imageUrl || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-text-main mb-2">Banner Image (Wide aspect ratio recommended)</label>
      <div 
        className="relative group w-full aspect-[21/9] border-2 border-dashed border-border-soft rounded-2xl flex flex-col items-center justify-center text-center hover:bg-page-bg hover:border-primary/40 transition-all cursor-pointer overflow-hidden"
        onClick={() => document.getElementById('banner-image-input').click()}
      >
        {preview ? (
          <>
            <img src={preview} alt="Banner preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-bold flex items-center gap-1">
                <UploadCloud className="w-4 h-4" /> Change Banner
              </span>
            </div>
            <button 
              onClick={removeImage}
              className="absolute top-3 right-3 p-1.5 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors z-10"
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : (
          <div className="p-10 flex flex-col items-center">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="text-base font-black text-text-main">Upload promotional banner</p>
            <p className="text-xs text-text-muted mt-1 font-medium">Recommended size: 1200x600px</p>
          </div>
        )}
        <input 
          id="banner-image-input"
          type="file" 
          accept="image/*"
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default BannerImageUploader;
