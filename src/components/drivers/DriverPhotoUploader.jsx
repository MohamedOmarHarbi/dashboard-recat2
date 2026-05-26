import React, { useState } from 'react';
import { UploadCloud, X, User } from 'lucide-react';

const DriverPhotoUploader = ({ imageUrl, onImageChange }) => {
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
    <div className="space-y-3">
      <label className="block text-sm font-bold text-text-main">Upload driver photo</label>
      <div 
        className="relative group w-32 h-32 border-2 border-dashed border-border-soft rounded-2xl flex flex-col items-center justify-center text-center hover:bg-page-bg hover:border-primary/40 transition-all cursor-pointer overflow-hidden mx-auto"
        onClick={() => document.getElementById('driver-photo-input').click()}
      >
        {preview ? (
          <>
            <img src={preview} alt="Driver preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">Change Photo</span>
            </div>
            <button 
              onClick={removeImage}
              className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors z-10"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-1">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-text-muted">Upload Photo</p>
          </div>
        )}
        <input 
          id="driver-photo-input"
          type="file" 
          accept="image/*"
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default DriverPhotoUploader;
