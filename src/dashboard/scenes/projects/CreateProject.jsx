import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';

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
import FormUpload from "../../components/FormUpload";
import DynamicTable from "../../components/UploadVideoTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

//Import Breadcrumb

const FormWizard = () => {
  document.title = "Form Wizard | Upzet - React Admin & Dashboard Template";
  const [activeTab, setactiveTab] = useState(1);
  const [activeTabwiz, setoggleTabwiz] = useState(1);

  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedStepswiz, setpassedStepswiz] = useState([1]);

  const idGuest = 123; // Remplacez par l'ID utilisateur de test
  const idCompany = 456; // Remplacez par l'ID entreprise de test
  const payload = {
    idGuest: idGuest,
    idCompany: idCompany,
  };


  // Décodage du token pour vérification

  // Utilisation du token
  // Vous pouvez stocker ce token dans localStorage ou le transmettre à votre backend pour authentification
  // Exemple de stockage dans localStorage :

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }


  const [formData, setFormData] = useState({
    step1: {
      infrastructure: '',
      type: '',
      creationDate: '',
      span: '',
      length: '',
      country: '',
      locationAddress: '',
      description: ''
    },
    step2: [],
    step3: []
  });

  // Fonctions de mise à jour pour chaque étape
  const handleChangeInputForm = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      step1: {
        ...prevState.step1,
        [name]: value
      }
    }));
  };

  const handelChangeImages = (data) => {
    setFormData(prevState => ({
      ...prevState,
      step2: data
    }));
  };

  const handelChangeVideos = (data) => {
    setFormData(prevState => ({
      ...prevState,
      step3: data
    }));

  };

  const [loading, setLoading] = useState(false);

  const handleSaveAndUploadAll = async () => {
    setLoading(true); // Démarrer le chargement

    try {
      const formDataToSend = new FormData();
  
      // Ajouter les valeurs de step1 à formDataToSend
      for (const key in formData.step1) {
        formDataToSend.append(key, formData.step1[key]);
      }
      
      // Parcours de step2 (tableau de fichiers)
      formData.step2.forEach((file, index) => {
        formDataToSend.append(`image_${index}`, file);
      });
      
      // Parcours de step3 (tableau d'objets avec des fichiers)
      formData.step3.forEach(obj => {
        for (const key in obj) {
          if (key !== 'id') { // Exclure la clé 'id'
            formDataToSend.append(`${key}_${obj.id}`, obj[key]);
          }
        }
      });
  
// Parcourir les entrées de formDataToSend
for (const [key, value] of formDataToSend.entries()) {
  console.log(`${key}: ${value}`);
}

      const response = await axios.post('http://localhost:3000/project/create_project', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>


          <Col lg="12">
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">Creaction New Inspection  </h4>
                <div id="basic-pills-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                    <NavItem className={classnames({ active: activeTab === 1 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 1 })}
                        onClick={() => {
                          setactiveTab(1);
                        }}
                      >
                        <span className="step-number">01</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>Infrastructure Details</span>
                      </NavLink>
                    </NavItem>
                    <NavItem className={classnames({ active: activeTab === 2 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 2 })}
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
                        className={classnames({ active: activeTab === 3 })}
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
                        className={classnames({ active: activeTab === 4 })}
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
                    {/***************form to creating project **************** */}
                    <TabPane tabId={1}>
                      <Form >
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-firstname-input1">
                                Infrastructure
                              </Label>
                              <Input
                                name="infrastructure"
                                type="text"
                                required
                                className="form-control"
                                id="basicpill-firstname-input1"
                                placeholder="eg. Tacoma Narrows Bridge"
                                onChange={handleChangeInputForm}

                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-lastname-input2">
                                Type
                              </Label>
                              <Input
                                type="text"
                                name="type"
                                required
                                className="form-control"
                                id="basicpill-lastname-input2"
                                placeholder="eg. Bridge ,Dam ,... "
                                onChange={handleChangeInputForm}

                              />
                            </div>
                          </Col>


                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-firstname-input1">
                                creation date
                              </Label>
                              <Input
                                name="creationDate"

                                type="date"
                                required
                                className="form-control"
                                id="basicpill-firstname-input1"
                              />
                            </div>
                          </Col>
                          <Col lg="3">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-firstname-input1">
                                Span
                              </Label>
                              <Input
                                name="span"

                                type="number"
                                className="form-control"
                                id="basicpill-firstname-input1"
                                placeholder="eg. 853 m"
                                onChange={handleChangeInputForm}

                              />
                            </div>
                          </Col>
                          <Col lg="3">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-lastname-input2">
                                Length
                              </Label>
                              <Input
                                name="length"
                                type="number"
                                className="form-control"
                                id="basicpill-lastname-input2"
                                placeholder="eg. 1,822 m"
                                onChange={handleChangeInputForm}

                              />
                            </div>
                          </Col>


                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-phoneno-input3">
                                Country
                              </Label>
                              <Input
                                name="country"
                                required
                                type="text"
                                className="form-control"
                                id="basicpill-phoneno-input3"
                                placeholder="eg. Canada"
                                onChange={handleChangeInputForm}

                              />
                            </div>
                          </Col>

                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-email-input4">
                                Location address
                              </Label>
                              <Input
                                name="locationAddress"
                                type="email"
                                required
                                className="form-control"
                                id="basicpill-email-input4"
                                placeholder="eg. 1 Peace Brg, Buffalo, NY 14213"
                                onChange={handleChangeInputForm}

                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <div className="mb-3">
                              <Label htmlFor="basicpill-address-input1">
                                Description
                              </Label>
                              <textarea
                                name="description"
                                id="basicpill-address-input1"
                                className="form-control"
                                rows="2"
                                placeholder="Enter Your description ..."
                                onChange={handleChangeInputForm}

                              />
                            </div>
                          </Col>
                        </Row>
                      </Form >
                    </TabPane>

                    <TabPane tabId={2}>
                      <div>
                        <FormUpload onUpdate={handelChangeImages} />
                      </div>
                    </TabPane>

                    <TabPane tabId={3}>
                      <div>
                        {/* <FormUpload/> */}
                        <DynamicTable onUpdate={handelChangeVideos} />
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
                          toggleTab(activeTab - 1);
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
                          <Link to="/" className="btn btn-danger mx-2" style={{background:"red" }}>Exit</Link>

                        </div>
                        ) : (
                          <div><Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab + 1);

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
    </React.Fragment>
  );
};

export default FormWizard;
