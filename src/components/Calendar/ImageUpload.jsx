import React, { useState } from 'react';
import Button from '../common/Button/Button';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = React.useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
   const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Button
        text="이미지 업로드하기"
        onClick={() => fileInputRef.current?.click()}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}/>

      {selectedImage && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="preview"
          style={{
            width: '20px',
            height: '20px',
            objectFit: 'cover',
          }}
        />
        <p style={{ margin: 0, color:'#999' }}>{selectedImage.name}</p>
        <button
            onClick={handleRemoveImage}
            style={{
              background: 'none',
              border: 'none',
              color: 'red',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            ×
          </button>
      </div>
    )}
    </div>
  );
};

export default ImageUpload;
