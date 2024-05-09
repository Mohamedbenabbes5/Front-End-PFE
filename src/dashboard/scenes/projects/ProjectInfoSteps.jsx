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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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
import TeamAssignment from "./stepForms/TeamAssignment";

//Import Breadcrumb

const ProjectInfoSteps = () => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const location = useLocation();

  const [activeTab, setactiveTab] = useState(0);


  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const [projectId, setcreatedProjectId] = useState(null);

  const [oldDataProject, setoldDataProject] = useState(null);

  const [loading, setLoading] = useState(false);

  const [stepValidity, setStepValidity] = useState({
    0: false,
    1: false,
    2: false,
    // Ajoutez des étapes supplémentaires si nécessaire
  });


  const nextStep = () => {
    if (stepValidity[activeTab]) {
      setactiveTab(activeTab + 1);
    }
  };
  const previewStep = () => {

    setactiveTab(activeTab - 1);


  };

  const [formData, setFormData] = useState({
    projectForm: null,
    infrastructureID: null,
    employeeAssignment: null,
  });



  // Fonction pour récupérer les infrastructures depuis le backend




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

  const handleCreateProject = async () => {
    // 
    if (stepValidity[activeTab]) {
      setLoading(true);
      try {

        console.log("createproject handleSaveAndUploadAll ", formData)


        const response = await axios.post('http://localhost:3000/project/create_project', formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Récupérer l'ID du projet de la réponse du backend

        if (response.status === 200) {
          // Enregistrement réussi, afficher un message de succès et rediriger vers la page de connexion
          setSuccessMessage(response.data.message);
          setTimeout(() => {
            navigate("/dashboard/allprojects");

          }, 2000);
        }


      } catch (error) {
        if (error.response?.data.error) {
          // Si le serveur renvoie un message d'erreur, afficher le message d'erreur
          setErrorMessage(error.response.data.error);
        } else {
          // Si une autre erreur se produit, afficher un message d'erreur génériqueinspectify
          setErrorMessage("An error occurred while registering account.");
        }
      } finally {
        setLoading(false); // Arrêter le chargement
      }
    }



  };

  const fetchFormData = async (projectId) => {
    console.log("fetchFormData");

    if (location.state?.successProcess) {
      // setAlertInfo({ type: "success", message: "Project saved successfully!" });
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
      const imageResourceNames = data.resources
        .filter(resource => resource.type.includes('image/'))
        .map(resource => resource.name);
      console.log("imageResourceNames", imageResourceNames)
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

  console.log("form dara comp parent", formData)


  return (
    <>
      <div className="page-content">

        <Container fluid={true}>


          <Col lg="12" >
            <Stack sx={{ width: '80%',marginBottom:'20px' }} spacing={2}>
              {errorMessage && (
                <Alert variant="filled" severity="error" className="mt-2">
                  {errorMessage}
                </Alert>
              )}
              {successMessage && (
                <Alert variant="filled" severity="success" className="mt-2">
                  {successMessage}
                </Alert>
              )}
            </Stack>
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
                        <span className="step-title" style={{ paddingLeft: "10px" }}>Team Assignment</span>
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




                      <div >

                        <TeamAssignment onUpdate={handleUpdateStep} />

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
                      {activeTab != 0 && (
                        <Link
                          to="#"
                          onClick={() => {
                            previewStep();
                          }}
                        >
                          Previous
                        </Link>
                      )}
                    </li>

                    <li
                      className={activeTab === 4 ? "next disabled" : "next"}
                    >

                      <div>

                        {
                          activeTab != 2 ? (
                            <Link to="#" onClick={() => nextStep()}>
                              Next
                            </Link>)
                            :
                            (
                              <div>
                                {loading && <CircularProgress style={{ marginRight: "10px" }} disableShrink className="CircularProgress" />}

                                <Link to="#" onClick={handleCreateProject}>
                                  Save Project
                                </Link>
                                <Link
                                  to="/"
                                  className="btn  mx-2"
                                  style={{ background: "#a20404", marginLeft: "10px" }}
                                >
                                  Exit
                                </Link>
                              </div>
                            )

                        }



                      </div>

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

export default ProjectInfoSteps;
