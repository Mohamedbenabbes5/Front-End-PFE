import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { mdiCloudUpload } from '@mdi/js';
import Icon from '@mdi/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const UploadImages = ({ projectId , onSuccessMessage, onErrorMessage}) => {
  // State pour stocker les fichiers sélectionnés

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('accessToken');

  // Gestionnaire d'événement pour les fichiers acceptés
  const handleAcceptedFiles = (files) => {
    // Filtrer les fichiers pour accepter uniquement les images
    const imageFiles = files.filter(file => file.type.includes("image"));

    // Mettre à jour l'état selectedFiles
    setSelectedFiles(prevSelectedFiles => {
      const updatedFiles = [...prevSelectedFiles, ...imageFiles];
      return updatedFiles;//, lorsque nous retournons updatedFiles, cela signifie que selectedFiles sera équivalent à updatedFiles après que la mise à jour de l'état ait été effectuée.
    });
  };

  // Fonction pour formater la taille du fichier
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Fonction pour supprimer un fichier sélectionné
  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };
  const handleUploadAll = async () => {
    setLoading(true);
    try {
      const formData = new FormData(); // Créez une instance de FormData

      // Ajoutez chaque fichier sélectionné à FormData
      selectedFiles.forEach((file, index) => {
        formData.append(`${file.name}`, file);
      });
      formData.append(`projectId`, projectId);

      console.log("createproject handleSaveAndUploadAll ", formData)


      const response = await axios.post('http://localhost:3000/project/add-images', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',

        }
      });

      // Récupérer l'ID du projet de la réponse du backend

      if (response.status === 200) {
        // Enregistrement réussi, afficher un message de succès et rediriger vers la page de connexion
        onSuccessMessage(response.data.message);

      }


    } catch (error) {
      if (error.response?.data.error) {
        // Si le serveur renvoie un message d'erreur, afficher le message d'erreur
        onErrorMessage(error.response.data.error);

      } else {
        // Si une autre erreur se produit, afficher un message d'erreur génériqueinspectify
        onErrorMessage("An error occurred while uploading images.");

      }
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  }

  return (
    <div className="page-content">
      <Row>
        
        <Col className="col-12">
          <Card>
            <CardBody>
              <Form className="dropzone">
                <Dropzone
                  onDrop={handleAcceptedFiles}
                  accept="image/*" // Accepter uniquement les images
                >
                  {({ getRootProps, getInputProps }) => (
                    <div style={{ textAlign: "center" }} {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="mb-3">
                        <Icon path={mdiCloudUpload} title="User Profile" size={4} color="gray" />
                      </div>
                      <h4>Drop Images here to upload</h4>
                    </div>
                  )}
                </Dropzone>
                {/* Aperçu des fichiers sélectionnés */}
                {/* Aperçu des fichiers sélectionnés */}
                {/* Aperçu des fichiers sélectionnés */}
                <div className="dropzone-previews mt-2" id="file-previews">
                  <div className="row">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="col-lg-2 col-md-6 mt-1 mb-0">
                        <Card className="shadow-none border">
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  width="100"
                                  className="avatar-sm rounded bg-light"
                                  alt={file.name}
                                  src={URL.createObjectURL(file)}
                                />
                              </Col>
                              <Col>
                                <p className="mb-0"><strong>{formatBytes(file.size)}</strong></p>
                              </Col>
                              <Col className="col-auto">


                                <DeleteForeverIcon onClick={() => removeFile(index)} sx={{ color: "red" }} > </DeleteForeverIcon>

                              </Col>
                            </Row>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>


              </Form>

            </CardBody>
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: "20px" }}>
         <Button
        onClick={handleUploadAll}
        className='MuiButton'
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}

      >
        Upload All
        {/* Utilisez l'élément VisuallyHiddenInput pour permettre le téléchargement de fichier */}
      </Button>
      {loading && <CircularProgress  style={{ marginLeft: "10px" }} disableShrink className="CircularProgress" />}

      </div>
     
    </div>
  );
};

export default UploadImages;