import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

const ImageUpload = ({ 
  images = [], 
  onImagesChange, 
  maxImages = 10, 
  accept = "image/*",
  multiple = true 
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    // Simulate file upload (in real app, upload to server)
    const newImages = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      caption: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      isMain: images.length === 0 && index === 0 // First image is main if no images exist
    }));

    onImagesChange([...images, ...newImages]);
    setUploading(false);
    toast.success(`${files.length} image(s) uploaded successfully!`);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success('Image removed successfully!');
  };

  const setMainImage = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    onImagesChange(newImages);
    toast.success('Main image updated!');
  };

  const updateCaption = (index, caption) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], caption };
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors">
        <div className="text-4xl mb-4">📷</div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {uploading ? 'Uploading...' : 'Drop images here or click to upload'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Support for JPG, PNG, GIF files up to 5MB each
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxImages}
          className="bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : `Choose Images (${images.length}/${maxImages})`}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={image.caption || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                      onClick={() => setMainImage(index)}
                      className={`p-1 rounded ${
                        image.isMain 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-green-500 hover:text-white'
                      } transition-colors`}
                      title={image.isMain ? 'Main Image' : 'Set as Main'}
                    >
                      {image.isMain ? '✓' : '★'}
                    </button>
                    <button
                      onClick={() => removeImage(index)}
                      className="p-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                      title="Remove Image"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Main Image Badge */}
                {image.isMain && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      Main
                    </span>
                  </div>
                )}
              </div>

              {/* Caption Input */}
              <input
                type="text"
                value={image.caption || ''}
                onChange={(e) => updateCaption(index, e.target.value)}
                placeholder="Image caption..."
                className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
            <span className="text-gray-700 dark:text-gray-300">Uploading images...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 