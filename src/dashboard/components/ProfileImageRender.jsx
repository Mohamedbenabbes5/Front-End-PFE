import React, { useState } from 'react';

const ImageComponent = ({ src, fallbackSrc, alt }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    // En cas d'échec de chargement de l'image, passer à l'image par défaut
    setImageSrc(fallbackSrc);
  };

  return (
    <img
      src={imageSrc}
      onError={handleImageError}
      alt={alt}
      width="100px"
      height="100px"
      style={{ cursor: "pointer", borderRadius: "50%" }}

    />
  );
};

export default ImageComponent;
