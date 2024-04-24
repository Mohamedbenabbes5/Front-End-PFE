import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file)
     {
        setSelectedImage(file); // Sélectionnez uniquement le premier fichier image
        onImageUpload(file); // Appelez la fonction de gestion du téléchargement avec les fichiers image
      } 
     
    
  };


  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload image for infrastructure
      {/* Utilisez l'élément VisuallyHiddenInput pour permettre le téléchargement de fichier */}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="image/*" />
    </Button>
  );
}
