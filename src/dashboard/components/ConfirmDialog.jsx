import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function ConfirmDialog({ onConfirm,projectId }) {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem('accessToken');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
        const response = await axios.post('http://localhost:3000/project/canConfirmResource', { projectId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        // Une fois la requête réussie, appelez la fonction de confirmation fournie par le composant parent

        // Puis fermez la boîte de dialogue après confirmation
        handleClose();
    } catch (error) {
        console.error('Erreur lors de la requête vers le backend:', error.response);
        // Gérez les erreurs ici
    }
};
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Confirm Task Completion
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Task Completion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to confirm that your task is completed? After confirmation, no further changes can be made to the data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
