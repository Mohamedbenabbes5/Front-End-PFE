import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Progress,
  NavLink,
  NavItem,
} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";
import DynamicTable from "../../components/UploadVideoTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import UploadImages from "../../components/UploadImages";
import SelectInfrastructure from "../../components/SelectInfrastructure";
import InfrastForm from "../../components/InfrastructureForm";
import ProjectForm from "../../components/ProjectForm";
import { ThemeProvider } from "@mui/material/styles"; // Importez le ThemeProvider

//Import Breadcrumb

const FormWizard = () => {
  const [activeTab, setactiveTab] = useState(0);

  const [passedSteps, setPassedSteps] = useState([1]);


  const [showInfrastForm, setShowInfrastForm] = useState(false);

  const [stepValidity, setStepValidity] = useState({
    0: false,
    1: false,
    // Ajoutez des étapes supplémentaires si nécessaire
  });


  const nextStep = () => {
    const tab=activeTab+1
    if (stepValidity[activeTab]||(activeTab>=2)) { // Vérifier si l'étape actuelle est valide
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
    const tab=activeTab-1
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
  const handleUpdateStep = (field, data,isValid) => {
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

  const [loading, setLoading] = useState(false);

  const handleSaveAndUploadAll = async () => {
    setLoading(true); // Démarrer le chargement
    console.log("createproject formData  handleSaveAndUploadAll ",formData)

    try {
      console.log('form data', formData);
      const formDataToSend = new FormData();
  
      if (formData.project) {
        formDataToSend.append('project', JSON.stringify(formData.project));
      }
  
      // Ajouter l'objet infrastructue (détails de l'infrastructure) à FormData
      if (formData.infrastructue) {
        formDataToSend.append('infrastructure', JSON.stringify(formData.infrastructue));
      }
    
      // Parcours de images (tableau de fichiers)
      formData.images.forEach((file, index) => {
        formDataToSend.append(`image_${index}`, file);
      });

      // Parcours de videos_Fpath (tableau d'objets avec des fichiers)
      formData.videos_Fpath.forEach(obj => {
        for (const key in obj) {
          if (key !== 'id') { // Exclure la clé 'id'
            formDataToSend.append(`${key}_${obj.id}`, obj[key]);
          }
        }
      });
      console.log('formDataToSend', formDataToSend);
      // // Parcourir les entrées de formDataToSend
      // for (const [key, value] of formDataToSend.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      const token = localStorage.getItem('accessToken');
      console.log("token:", token);
      const response = await axios.post('http://localhost:3000/project/create_project', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data); // Afficher la réponse du backend

    } catch (error) {
      // Gérer les erreurs d'upload
      console.error("Erreur lors de l'upload : ", error);
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };   
  console.log("createproject formData",formData)

  return (
    <>
      <div className="page-content">

        <Container fluid={true}>


          <Col lg="12" >

            <Card className="Card">
              <CardBody>
                <h4 className="card-title mb-4">Creaction New Inspection Project  </h4>
                <div id="basic-pills-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">

                    <NavItem className={classnames({ active: activeTab === 0 })}>
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
                    </NavItem>

                  
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
                        <ProjectForm onUpdate={handleUpdateStep}/>
                      </div>
                    </TabPane>


                    <TabPane tabId={1}>
                      {showInfrastForm ? (
                        <div>
                          <InfrastForm onUpdate={handleUpdateStep} />
                          <a style={{
                            cursor: 'pointer',
                            fontSize: '20px',
                            display: 'inline-block',
                            marginTop: '10px',
                            transition: 'red 0.5s',
                          }} onClick={() => setShowInfrastForm(false)}>Select existing Infrastructure</a>
                        </div>

                      ) : (
                        <div >
                          
                          <SelectInfrastructure onUpdate={handleUpdateStep} />

                          <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', mt: "20px", cursor: 'pointer' }}>
                            <Fab color="secondary" aria-label="add">
                              <AddIcon onClick={() => setShowInfrastForm(true)} />
                            </Fab><a onClick={() => setShowInfrastForm(true)}>Create New Infrastructure</a>
                          </Box>
                        </div>
                      )}
                      <div>
                      </div>
                    </TabPane>


                    <TabPane tabId={2}>
                      <div>
                        <UploadImages onUpdate={handleUpdateStep} />
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
                          <div className="text-center">

                            <Icon path={mdiCheckCircle}
                              title="User Profile"
                              size={4}
                              rotate={2}
                              color="green"

                            />                              <div>
                              <h5>Confirm Detail</h5>
                              <p className="text-muted">
                                If several languages coalesce, the grammar
                                of the resulting
                              </p>
                            </div>
                          </div>
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
                      {activeTab === 3 ?
                        (
                          <div>
                            {loading && <CircularProgress disableShrink className="CircularProgress" />}
                            <Link
                              to="#"

                              onClick={() => {
                                handleSaveAndUploadAll()

                              }}

                            >
                              save and Upload All
                            </Link>

                          </div>
                        ) : (activeTab === 4 ? (<div>
                          <Link
                            to="#"
                            onClick={() => {

                            }}
                          >

                            Start Processing
                          </Link>
                          <Link to="/" className="btn btn-danger mx-2" style={{ background: "red" }}>Exit</Link>

                        </div>
                        ) : (
                          <div><Link
                            to="#"
                            onClick={() => {
                              nextStep();

                            }}
                          >
                            Next
                          </Link>
                          </div>


                        )


                        )}

                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>


        </Container>
      </div>
    </>
  );
};

export default FormWizard;
