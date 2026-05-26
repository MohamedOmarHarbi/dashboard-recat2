import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

const CategoryImageUploader = ({ imageUrl, onImageChange }) => {
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
      <label className="block text-sm font-bold text-text-main mb-2">Category Image</label>
      <div 
        className="relative group w-full aspect-square max-w-[200px] border-2 border-dashed border-border-soft rounded-xl flex flex-col items-center justify-center text-center hover:bg-page-bg hover:border-primary/40 transition-all cursor-pointer overflow-hidden"
        onClick={() => document.getElementById('category-image-input').click()}
      >
        {preview ? (
          <>
            <img src={preview} alt="Category preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-bold flex items-center gap-1">
                <UploadCloud className="w-4 h-4" /> Change Image
              </span>
            </div>
            <button 
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors z-10"
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : (
          <div className="p-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-text-main">Upload category image</p>
            <p className="text-xs text-text-muted mt-1 font-medium">PNG, JPG up to 2MB</p>
          </div>
        )}
        <input 
          id="category-image-input"
          type="file" 
          accept="image/*"
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default CategoryImageUploader;
