import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import { useLocation ,useNavigate} from 'react-router-dom';

export default function TransitionAlerts({ type, message, onClose ,variant}) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true);
    
    // Fermer automatiquement l'alerte après 5 secondes (5000 millisecondes)
    const timer = setTimeout(() => {
      setOpen(false);
      onClose(); // Appel de la fonction de fermeture lorsque l'alerte est cachée
    }, 4000); // Modifier le délai en fonction de vos besoins

    // Nettoyer le timer lors du démontage du composant
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Box sx={{ width: '70%' }}>
      <Collapse in={open}>
        <Alert 
         iconSize="large" // Augmentation de la taille de l'icône

        variant={variant}
          severity={type} // Utilisation du type de message passé en props
          action={
            <IconButton
              aria-label="close"
              size="medium"
              onClick={() => {
                setOpen(false);
                onClose(); // Appel de la fonction de fermeture lorsque l'alerte est fermée
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2 ,mb: 2 , fontSize: '1.15rem'}}
        >
             {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
