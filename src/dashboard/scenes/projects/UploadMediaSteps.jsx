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
import { jwtDecode } from 'jwt-decode';
import ConfirmDialog from "../../components/ConfirmDialog";

//Import Breadcrumb

const ProjectInfoSteps = ({ }) => {
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.user);
    const navigate = useNavigate();

    const location = useLocation();



    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")

    const [projectId, setcreatedProjectId] = useState(null);

    const [oldDataProject, setoldDataProject] = useState(null);
    const [alertInfo, setAlertInfo] = useState(null); // Contient le type de message et le message lui-même sous forme d'objet {type, message}
    const [isProcessing, setProcessing] = useState(false);

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
            if (error.response?.data.error) {
                // Si le serveur renvoie un message d'erreur, afficher le message d'erreur
                setAlertInfo({ type: "error", message: error.response.data.error });

            }

            else {
                // Si une autre erreur se produit, afficher un message d'erreur génériqueinspectify
                setAlertInfo({ type: "error", message: "An error occurred while uploading images." });

            }
        }
        finally {
            setProcessing(false); // Arrêter l'affichage de LinearIndeterminate à la fin de l'exécution
        }
    };



    useEffect(() => {
        if (location.state?.projectId) {
            console.log('Projectid: ' + location.state.projectId);
            setcreatedProjectId(location.state?.projectId)
        } if (location.state?.step) {
            console.log('step already', location.state?.step);
            setactiveTab(location.state?.step)
        }

    }, []);



    return (
        <>
            <div className="page-content">

                <Container fluid={true}>
                    {alertInfo && (
                        <TransitionAlerts
                            type={alertInfo.type}
                            message={alertInfo.message}
                            onClose={() => setAlertInfo(null)}
                        />
                    )}

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
                                                <UploadImages projectId={projectId} onSuccessMessage={handleSuccessMessage} onErrorMessage={handleErrorMessage} />
                                            </div>
                                        </TabPane>

                                        <TabPane tabId={4}>
                                            <div>
                                                {/* <FormUpload/> */}
                                                <DynamicTable projectId={projectId} onSuccessMessage={handleSuccessMessage} onErrorMessage={handleErrorMessage} />
                                            </div>
                                        </TabPane>


                                        <TabPane tabId={5}>
                                            <div className="row justify-content-center">
                                                {activeTab === 5 && <Col lg="6">
                                                    <Validation projectId={projectId}>

                                                    </Validation>
                                                </Col>}
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
                                                <div>
                                                    {activeTab !== 5 && (
                                                        <>
                                                            {activeTab === 4 && decodedToken.user.role === 1 && (
                                                                <ConfirmDialog projectId={projectId}></ConfirmDialog>
                                                            )}
                                                            <Link to="#" onClick={() => nextStep()} style={{ marginLeft: "10px" }}
                                                            >
                                                                Next
                                                            </Link>
                                                        </>
                                                    )}

                                                    {activeTab === 5 ? (
                                                        <>
                                                            {loading && (
                                                                <CircularProgress
                                                                    style={{ marginRight: "10px" }}
                                                                    disableShrink
                                                                    className="CircularProgress"
                                                                />
                                                            )}
                                                            <Link to="#" onClick={onStartProcessing}>
                                                                Start Processing
                                                            </Link>
                                                        </>
                                                    ) : null}

                                                    <Link
                                                        to="/dashboard/allprojects"
                                                        className="btn mx-2"
                                                        style={{ background: "#a20404", marginLeft: "10px" }}
                                                    >
                                                        Exit
                                                    </Link>
                                                </div>


                                            </div>

                                        </li>
                                    </ul>
                                </div> {isProcessing && <LinearIndeterminate />}
                            </CardBody>
                        </Card>
                    </Col>


                </Container>
            </div>
        </>
    );
};

export default ProjectInfoSteps;
