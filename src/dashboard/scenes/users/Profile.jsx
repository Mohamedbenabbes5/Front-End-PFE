import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import { Box, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Header from "../../components/Header";
import {
    DataGrid,
    GridToolbar,
} from '@mui/x-data-grid';
import defaultmanagerImage from "../../../public/assets/manager.png";
import defaultemployeeImage from "../../../public/assets/employee.jpg";
import TransitionAlerts from "../../components/TransitionAlerts";

const Profile = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const decodedToken = localStorage.getItem('decodedToken');
    const token = localStorage.getItem('accessToken');
    const [alertInfo, setAlertInfo] = useState(null); // Contient le type de message et le message lui-même sous forme d'objet {type, message}
    const [profileData, setProfileData] = useState(null);
    const [projectCount, setProjectCount] = useState(0);
    const status = ['pending', 'active', 'suspended'];
    const roles = ['guest', 'project manager', 'expert', 'inspector'];
    const profileImagesPath = 'http://localhost:3000/uploads/profileImages/';
    const location = useLocation();
    const successCreation = location.state?.successCreation;

    let userData;
    if (decodedToken) {
        userData = JSON.parse(decodedToken).user;
        console.log('Données de l\'utilisateur :', userData);
    } else {
        console.error('Données de l\'utilisateur non trouvées dans le localStorage.');
    }
    // Données fictives de l'utilisateur et des projets
    const fallbackSrc = userData.user === 'employee' ? defaultemployeeImage : (userData.user === 'manager' ? defaultmanagerImage : null);

    const fetchProfile = async () => {
        console.log('user data type :', userData.user);
        console.log('user data id :', userData.managerId);

        if (userData.user === 'manager') {
            try {
                const response = await axios.get(`http://localhost:3000/users/get-manager/${userData.managerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });           
                     console.log('profileInfo;',response.data.profileInfo);

                const profileInfo = response.data.profileInfo;
                setProfileData(profileInfo);
                setProjectCount(profileInfo.projects.length);

            }

            catch (error) {
                setAlertInfo(error.response?.data.error)
            }

        }
        else if (userData.user === 'employee') {
            try {
                const response = await axios.get(`http://localhost:3000/users/get-employee/${userData.employeeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const profileInfo = response.data.profileInfo;
                setProfileData(profileInfo);
                setProjectCount(profileInfo.project.length);
                console.log(profileInfo);
            }
            catch (error) {
                setAlertInfo(error.response.data.error)
            }

        }
    };
    useEffect(() => {
        // Lors du premier rendu, si successCreation est présent, afficher l'alerte de succès
        fetchProfile()
        // Nettoyer le timer lors du démontage du composant
    }, []);



    return (
        <Container fluid>
            {successCreation && (

                <TransitionAlerts
                    sx={{}}
                    type={"success"}
                    message={successCreation}
                    onClose={() => { }}
                    variant={"filled"}
                />
            )}
            {profileData && (
            <Box className="profileData-profile">
                <div className="profile-header">
                    <img
                        alt="profile-user"
                        width="200px"
                        height="200px"
                        src={profileImagesPath + '/' + profileData.profileImage}
                        onError={(e) => { e.target.src = fallbackSrc }}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        className="profile-image"
                    />
                    <h3 className="profileData-name">{profileData.firstname + " " + profileData.lastname}</h3>
                    <h4 className="profileData-status"><strong>{roles[profileData.role]}</strong></h4>
                </div>
                <Link to="/dashboard/form" state={{ actionType: "update", profileData: profileData }} style={{ textDecoration: "none" }}>
                    <Button
                        sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        update Profile
                    </Button>
                </Link>
                <hr className="divider" />
                <div className="profile-info">
                    <div className="info-section">
                        <p></p>
                        <p>Email: {profileData.email}</p>
                        <p>Phone: {profileData.phone}</p>
                    </div>
                    <div className="info-section">
                        <p><strong>Projects:</strong></p>
                        <p>Total: {projectCount}</p>
                    </div>

                    <div className="info-section">
                        <p><strong>Company:</strong></p>
                        <p>Name: {profileData.manager?.companyname||profileData.companyname}</p>
                        <p>Usage : undefined</p>
                        <p>Expiration Date: undefined</p>
                    </div>
                    <div className="info-section">
                        <p><strong>About:</strong></p>
                        <p>address: USA{profileData.address}</p>
                        <p>status: {status[profileData.status]}</p>
                        <p>Creation Date :  {profileData?.createdAt?.split('T')[0].split('-').join('-')}</p>

                    </div>
                </div>
            </Box>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt="50px">

                <Box>

                </Box>
            </Box>



        </Container>
    );


}



export default Profile;
