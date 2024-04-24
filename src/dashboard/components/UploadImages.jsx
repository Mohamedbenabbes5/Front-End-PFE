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
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const UploadImages = ({ onUpdate }) => {
  // State pour stocker les fichiers sélectionnés
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Gestionnaire d'événement pour les fichiers acceptés
  const handleAcceptedFiles = (files) => {
    // Filtrer les fichiers pour accepter uniquement les images
    const imageFiles = files.filter(file => file.type.includes("image"));

   // Mettre à jour l'état selectedFiles
    setSelectedFiles(prevSelectedFiles => {
      const updatedFiles = [...prevSelectedFiles, ...imageFiles];
      onUpdate("images",updatedFiles,true); // Passer les nouveaux fichiers à la fonction onUpdate
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
    </div>
  );
};

export default UploadImages;
