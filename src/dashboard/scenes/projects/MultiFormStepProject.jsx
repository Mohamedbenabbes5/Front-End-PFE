import React, { useState, useEffect } from "react";
import Icon from '@mdi/react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {
  Card,
  CardBody,
  Col,
  Container,
  TabContent,
  TabPane,
  NavLink,
  NavItem,
} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";
import DynamicTable from "./stepForms/UploadVideoTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import UploadImages from "./stepForms/UploadImages";
import SelectInfrastructure from "./stepForms/SelectInfrastructure";
import ProjectForm from "./stepForms/ProjectForm";
import Validation from "./stepForms/Validation";
import TransitionAlerts from "../../components/TransitionAlerts";
import LinearIndeterminate from "../../components/LinearIndeterminate";
import { useNavigate, useLocation } from 'react-router-dom';

//Import Breadcrumb

const FormWizard = () => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const location = useLocation();

  const [activeTab, setactiveTab] = useState(0);

  const [passedSteps, setPassedSteps] = useState([1]);

  const [alertInfo, setAlertInfo] = useState(null); // Contient le type de message et le message lui-même sous forme d'objet {type, message}


  const [projectId, setcreatedProjectId] = useState(null);

  const [processingAllowed, setProcessingAllowed] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [oldDataProject, setoldDataProject] = useState(null);
  const [oldDataInfrastructure, setoldDataInfrastructure] = useState(null);
  const [oldImages, setoldImages] = useState(null);

  const [stepValidity, setStepValidity] = useState({
    0: false,
    1: false,
    // Ajoutez des étapes supplémentaires si nécessaire
  });


  const nextStep = () => {
    const tab = activeTab + 1
    if (stepValidity[activeTab] || (activeTab >= 2)) { // Vérifier si l'étape actuelle est valide
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 0 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    } else {
      // Afficher un message d'avertissement ou prendre d'autres mesures si l'étape actuelle n'est pas valide
      console.log(`Les données de l'étape ${activeTab} ne sont pas valides`);
    }
  };
  const previewStep = () => {
    const tab = activeTab - 1
    var modifiedSteps = [...passedSteps, tab];
    if (tab >= 0 && tab <= 4) {
      setactiveTab(tab);
      setPassedSteps(modifiedSteps);
    }

  };

  const [formData, setFormData] = useState({
    project: [],
    infrastructue: [],
    images: [],
    videos_Fpath: []
  });

  // Fonctions de mise à jour pour chaque étape
  const handleUpdateStep = (field, data, isValid) => {
    if (isValid) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: data,
      }));
    }
    setStepValidity((prevValidity) => ({
      ...prevValidity,
      [activeTab]: isValid, // Mettre à jour la validité de l'étape actuelle
    }));


  };
  const onCheckProcessingAllowed = () => {
    console.log("onCheckProcessingAllowed")
    setProcessingAllowed(false);

    if (formData.images.length > 0 || formData?.videos_Fpath[0]?.video) {

      setProcessingAllowed(true);
    }

  }
  const [loading, setLoading] = useState(false);

  const handleSaveAndUploadAll = async () => {
    setLoading(true); // Démarrer le chargement

    try {
      // setFormData(prevState => ({
      //   ...prevState,
      //   project: { ...prevState.project, id: createdProjectId }
      // }));  
      formData.project.id = projectId

      console.log("createproject handleSaveAndUploadAll ", formData)
      const formDataToSend = new FormData();
      if (formData.project) {
        formDataToSend.append('project', JSON.stringify(formData.project));
      }

      // Ajouter l'objet infrastructue (détails de l'infrastructure) à FormData
      if (formData.infrastructue) {
        formDataToSend.append('infrastructure', JSON.stringify(formData.infrastructue));
      }
      if (formData.infrastructue.image) {
        formDataToSend.append(`infrastructureImage`, formData.infrastructue.image);
      };

      // Parcours de images (tableau de fichiers)
      formData.images.forEach((file, index) => {
        formDataToSend.append(`inspectionFile`, file);
      });

      // Parcours de videos_Fpath (tableau d'objets avec des fichiers)
      formData.videos_Fpath.forEach(obj => {
        for (const key in obj) {
          if (key !== 'id') { // Exclure la clé 'id'
            formDataToSend.append(`inspectionFile`, obj[key]);
          }
        }
      });


      const response = await axios.post('http://localhost:3000/project/create_project', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      // Récupérer l'ID du projet de la réponse du backend
      const createdProjectId = response.data?.projectId;
      console.log("createdProjectId", createdProjectId)

      setcreatedProjectId(createdProjectId);

      // Logique de traitement de la réponse réussie...
      setAlertInfo({ type: "success", message: "Project saved successfully!" });

      console.log(response.data); // Afficher la réponse du backend

    } catch (error) {
      setAlertInfo({ type: "error", message: "Error while sending data" });
      console.error("Erreur lors de l'upload : ", error);
    } finally {
      setLoading(false); // Arrêter le chargement
    }

  };
  const onStartProcessing = async () => {
    setProcessing(true); // Déclencher l'affichage de LinearIndeterminate
    try {
      // Envoyez une requête HTTP avec Axios en utilisant projectId
      const response = await axios.post('http://localhost:3000/project/start_process', { projectId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      navigate(`/dashboard/result/${projectId}`, { state: { successProcess: true } });

    } catch (error) {
      console.error('Erreur lors du traitement :', error);
      setAlertInfo({ type: "error", message: "An error occurred during processing" });

    } finally {
      setProcessing(false); // Arrêter l'affichage de LinearIndeterminate à la fin de l'exécution
    }
  };


  const fetchFormData = async (projectId) => {
    console.log("fetchFormData");

    if (location.state?.successProcess) {
      setAlertInfo({ type: "success", message: "Project saved successfully!" });
    }
    try {

      const response = await axios.get(`http://localhost:3000/project/multiFormStepData/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });
      console.log("response.data", response.data);


      const data = response.data[0]; // Suppose que response.data contient un seul objet de données
      // Créer un objet avec les mêmes propriétés que formData en utilisant les valeurs de oldDataProject
      const oldDataProject = {
        id: data.id ?? null,
        name: data.name ?? null,
        description: data.description ?? null,
        startdate: data.createdAt ?? null, // Suppose que createdAt correspond à la date de début
        enddate: data.updatedAt ?? null, // Suppose que updatedAt correspond à la date de fin
        employees: [] // Vous pouvez initialiser les invités comme une liste vide
      };
      setoldDataProject(oldDataProject)
      setoldDataInfrastructure(data.infrastructure)
      const imageResourceNames = data.resources
        .filter(resource => resource.type.includes('image/'))
        .map(resource => resource.name);
      console.log("imageResourceNames", imageResourceNames)
      setoldImages(imageResourceNames)
    } catch (error) {
      console.error('Erreur lors de la récupération des dommages :', error);
      // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
      navigate('/error');
    }
  };

  useEffect(() => {
    if (location.state?.projectId) {
      setcreatedProjectId(location.state?.projectId)

      fetchFormData(location.state?.projectId);
    }

  }, [location]);

  console.log("location.state?.projectId", location.state?.projectId)


  return (
    <>
      <div className="page-content">

        <Container fluid={true}>


          <Col lg="12" >
            {alertInfo && (
              <TransitionAlerts
                type={alertInfo.type}
                message={alertInfo.message}
                onClose={() => setAlertInfo(null)}
              />
            )}
            <Card className="Card">
              <CardBody>
                <h4 className="card-title mb-4">Creaction New Inspection Project  </h4>
                <div id="basic-pills-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">

                    {/* <NavItem className={classnames({ active: activeTab === 0 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 0, NavLink })}
                        onClick={() => {
                          setactiveTab(0);
                        }}
                      >
                        <span className="step-number">0</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>Project Details</span>
                      </NavLink>
                    </NavItem>

                    <NavItem className={classnames({ active: activeTab === 1 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 1, NavLink })}
                        onClick={() => {
                          setactiveTab(1);
                        }}
                      >
                        <span className="step-number">1</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>Infrastructure Details</span>
                      </NavLink>
                    </NavItem> */}


                    <NavItem className={classnames({ active: activeTab === 2 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 2, NavLink })}
                        onClick={() => {
                          setactiveTab(2);
                        }}

                      >

                        <span className="step-number">02</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>upload Images</span>
                      </NavLink>
                    </NavItem>

                    <NavItem className={classnames({ active: activeTab === 3 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 3, NavLink })}
                        onClick={() => {
                          setactiveTab(3);
                        }}

                      >

                        <span className="step-number">03</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>upload Videos & flightpaths</span>
                      </NavLink>
                    </NavItem>


                    <NavItem className={classnames({ active: activeTab === 4 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 4, NavLink })}
                        onClick={() => {
                          setactiveTab(4);
                        }}
                      >
                        <span className="step-number">04</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>Confirm Detail</span>
                      </NavLink>
                    </NavItem>
                  </ul>



                  <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">


                    <TabPane tabId={0}>
                      <div>
                        <ProjectForm onUpdate={handleUpdateStep} oldData={oldDataProject} />
                      </div>
                    </TabPane>


                    <TabPane tabId={1}>




                      <div >

                        <SelectInfrastructure onUpdate={handleUpdateStep} />
                        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', mt: "20px", cursor: 'pointer' }}>
                          <Link to="/dashboard/creacteinfrastructure" >
                            <Fab color="secondary" aria-label="add" sx={{ mr: 2 }}>
                              <AddIcon />
                            </Fab>
                            Create New Infrastructure
                          </Link>
                        </Box>

                      </div>


                    </TabPane>


                    <TabPane tabId={2}>
                      <div>
                        <UploadImages onUpdate={handleUpdateStep} oldData={oldImages} />
                      </div>
                    </TabPane>

                    <TabPane tabId={3}>
                      <div>
                        {/* <FormUpload/> */}
                        <DynamicTable onUpdate={handleUpdateStep} />
                      </div>
                    </TabPane>



                    <TabPane tabId={4}>
                      <div className="row justify-content-center">
                        <Col lg="6">
                          <Validation isFormValid={processingAllowed}>

                          </Validation>
                        </Col>
                      </div>
                    </TabPane>


                  </TabContent>


                  <ul className="pager wizard twitter-bs-wizard-pager-link">

                    <li
                      className={
                        activeTab === 1
                          ? "previous disabled me-2"
                          : "previous me-2"
                      }
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          previewStep();
                        }}
                      >
                        Previous
                      </Link>
                    </li>

                    <li
                      className={activeTab === 4 ? "next disabled" : "next"}
                    >

                      <div>
                        {activeTab === 3 ? (
                          <>
                            {loading && <CircularProgress style={{ marginRight: "10px" }} disableShrink className="CircularProgress" />}

                            <Link to="#" onClick={() => { onCheckProcessingAllowed(); nextStep(); }}>
                              Next
                            </Link>
                            <Link
                              to="#"
                              onClick={() => handleSaveAndUploadAll()}
                              style={{ marginLeft: "10px" }}
                            >
                              save and Upload All
                            </Link>
                          </>
                        ) : activeTab === 4 ? (
                          <>
                            <Link to="#" onClick={onStartProcessing}>

                              Start Processing
                            </Link>
                            <Link
                              to="/"
                              className="btn  mx-2"
                              style={{ background: "#a20404", marginLeft: "10px" }}
                            >
                              Exit
                            </Link>
                          </>
                        ) : (
                          <Link to="#" onClick={() => nextStep()}>
                            Next
                          </Link>
                        )}
                      </div>

                    </li>
                  </ul>
                  {isProcessing && <LinearIndeterminate />}                </div>
              </CardBody>
            </Card>
          </Col>


        </Container>
      </div>
    </>
  );
};

export default FormWizard;
