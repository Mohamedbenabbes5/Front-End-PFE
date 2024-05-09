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
import LinearIndeterminate from "../../components/LinearIndeterminate";
import { useNavigate, useLocation } from 'react-router-dom';
import TeamAssignment from "./stepForms/TeamAssignment";
import TransitionAlerts from "../../../LandingPage/components/TransitionAlerts"

//Import Breadcrumb

const ProjectInfoSteps = ({}) => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const location = useLocation();



  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const [projectId, setcreatedProjectId] = useState(null);

  const [oldDataProject, setoldDataProject] = useState(null);

  const [loading, setLoading] = useState(false);

    const [activeTab, setactiveTab] = useState(3);
    
 const handleSuccessMessage = (message) => {
  setSuccessMessage("");
    setSuccessMessage(message);
    setErrorMessage(""); // Effacer le message d'erreur
  };

  const handleErrorMessage = (message) => {
    setErrorMessage("");
    setErrorMessage(message);
    setSuccessMessage(""); // Effacer le message de succès
  };

  const nextStep = () => {

      setactiveTab(activeTab + 1);
  
  };
  const previewStep = () => {

    setactiveTab(activeTab - 1);


  };
 



  useEffect(() => {
    if (location.state?.projectId) {
      console.log('Projectid: ' + location.state.projectId);
      setcreatedProjectId(location.state?.projectId)
    }    if (location.state?.step) {
      console.log('step already', location.state?.step);
      setactiveTab(location.state?.step)
    }

  }, []);



  return (
    <>
      <div className="page-content">

        <Container fluid={true}>


          <Col lg="12" >
          {errorMessage && (
                <TransitionAlerts type={"error"}
                    message={errorMessage}
                    onClose={() => { }}
                    variant={"filled"}
                >

                </TransitionAlerts>
            )}
            {successMessage && (
                <TransitionAlerts type={"success"}
                    message={successMessage}
                    onClose={() => { }}
                    variant={"filled"}
                >

                </TransitionAlerts>
            )}
            
            <Card className="Card">
              <CardBody>
                <h4 className="card-title mb-4">Creaction New Inspection Project  </h4>
                <div id="basic-pills-wizard" className="twitter-bs-wizard">

                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">

                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 3, NavLink })}
                        onClick={() => {
                          setactiveTab(3);
                        }}

                      >

                        <span className="step-number">03</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>upload Images</span>
                      </NavLink>
                    

                    <NavItem className={classnames({ active: activeTab === 4 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 4, NavLink })}
                        onClick={() => {
                          setactiveTab(4);
                        }}

                      >

                        <span className="step-number">04</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>upload Videos & flightpaths</span>
                      </NavLink>
                    </NavItem>


                    <NavItem className={classnames({ active: activeTab === 5 })}>
                      <NavLink
                        data-toggle="tab"
                        className={classnames({ active: activeTab === 5, NavLink })}
                        onClick={() => {
                          setactiveTab(5);
                        }}
                      >
                        <span className="step-number">05</span>
                        <span className="step-title" style={{ paddingLeft: "10px" }}>Confirm Detail</span>
                      </NavLink>
                    </NavItem>
                  </ul>



                  <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                  <TabPane tabId={3}>
                      <div>
                        <UploadImages projectId={projectId}  onSuccessMessage={handleSuccessMessage} onErrorMessage={handleErrorMessage}/>
                      </div>
                    </TabPane>

                    <TabPane tabId={4}>
                      <div>
                        {/* <FormUpload/> */}
                        <DynamicTable projectId={projectId}  onSuccessMessage={handleSuccessMessage} onErrorMessage={handleErrorMessage}/>
                      </div>
                    </TabPane>



                    <TabPane tabId={5}>
                      <div className="row justify-content-center">
                        <Col lg="6">
                          <Validation isFormValid={null}>

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

                                <Link to="#" onClick={null}>
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
