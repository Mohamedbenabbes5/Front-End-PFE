import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Box, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import {
    GridRowModes,
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
const Profile = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Données fictives de l'utilisateur et des projets
    const user = {
        name: "John Doe",
        contact: "john.doe@example.com",
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        company: "ABC Inc.",
        projectNumber: 5
    };

    const projects = [
        { id: 2, status:"complete" ,projectImage: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg', name: "Project B", description: "Consectetur adipiscing elit" },
        { id: 1, status:"incomplete", projectImage: 'https://www.shaymurtagh.co.uk/wp-content/uploads/2020/07/BridgeBeamsPageHero-1024x768.jpg', name: "Project A", description: "Lorem ipsum dolor sit amet", },
        { id: 3, status:"complete", projectImage: 'https://concreteindustries.com/wp-content/uploads/2017/07/girders-06.jpg', name: "Project C", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
        { id: 4, status:"incomplete", projectImage: 'https://www.shaymurtagh.co.uk/wp-content/uploads/2020/07/BridgeBeamsPageHero-1024x768.jpg', name: "Project D", description: "Ut enim ad minim veniam" },
        { id: 5, status:"complete", projectImage: 'https://www.shaymurtagh.co.uk/wp-content/uploads/2020/07/BridgeBeamsPageHero-1024x768.jpg', name: "Project E", description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat" }
    ];

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        {
            field: 'projectImage', headerName: 'Project Image', width: 300, renderCell: (params) => (<img src={params.value} alt="User" style={{ width: 250 }} />)
        },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 400 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
                  renderCell: (params) => {
              return (
                <div className={`projectStatus ${params.row.status}`}>
                  {params.row.status}
                </div>
              );
            },
          },
    ];
    return (
        <Container fluid>


            <Box className="user-profile">
                <div className="profile-header">
                    <Avatar src="https://maphotoportrait.fr/1775-thickbox_default/face-ou-profil-quel-est-le-meilleur-angle-pour-la-photo-linkedin-.jpg" alt="Profile Image" className="profile-image" sx={{ width: 200, height: 200 }}
                    />
                  
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-status">Status: {user.status}</p>
                </div>
                <hr className="divider" />
                <div className="profile-info">
                    <div className="info-section">
                        <p><strong>Contact:</strong></p>
                        <p>Email: JohnDoe@gmail.com{user.email}</p>
                        <p>Phone: +33 555 888 444{user.phone}</p>
                    </div>
                    <div className="info-section">
                        <p><strong>Projects:</strong></p>
                        <p>Total: 10{user.projectsCount}</p>
                    </div>
                    <div className="info-section">
                        <p><strong>About:</strong></p>
                        <p>Region: USA{user.region}</p>
                        <p>Bio: {user.bio}</p>
                    </div>
                    <div className="info-section">
                        <p><strong>Company:</strong></p>
                        <p>Name: q2ii {user.companyName}</p>
                        <p>Creation Date : 20/10/2022 {user.creationDate}</p>
                        <p>Usage : 80% {user.usage}</p>
                        <p>Expiration Date:20/10/2025 {user.expirationDate}</p>
                    </div>
                </div>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt="50px">
                <Header title="All Companies" subtitle="List of Company account" />

                <Box>
                    <Link to="/form" style={{ textDecoration: "none" }}>
                        <Button
                            sx={{
                                backgroundColor: colors.greenAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                        >
                            Create new Project
                        </Button>
                    </Link>
                </Box>
            </Box>

            <Box sx={{ height: '100%', width: '100%', mt: '50px' }}>
                <DataGrid
                    rows={projects}
                    columns={columns}
                    rowHeight={250}
                    sx={{
                        "& .MuiDataGrid-cell": {
                            fontSize: "1.2rem", // Modifier la taille de la police ici
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            fontSize: "1.5rem",
                          },
                          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                      
                    }}
                   
                    pageSizeOptions={[5]}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            </Box>


        </Container>
    );


}



export default Profile;
