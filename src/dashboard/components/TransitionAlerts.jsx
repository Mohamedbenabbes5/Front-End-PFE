import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';

export default function TransitionAlerts({ type, message, onClose ,variant}) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true);
    
    // Fermer automatiquement l'alerte après 5 secondes (5000 millisecondes)
    const timer = setTimeout(() => {
      setOpen(false);
      onClose(); // Appel de la fonction de fermeture lorsque l'alerte est cachée
    }, 5000); // Modifier le délai en fonction de vos besoins

    // Nettoyer le timer lors du démontage du composant
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert 
        variant={variant}
          severity={type} // Utilisation du type de message passé en props
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                setOpen(false);
                onClose(); // Appel de la fonction de fermeture lorsque l'alerte est fermée
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
             {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
