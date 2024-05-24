import React, { useState } from 'react';
import { Grid, Button, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


function DynamicTable({ projectId, handleAlertMessage }) {
    const [rows, setRows] = useState([]);
  
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('accessToken');

    const handleFileChange = (event, rowIndex, columnName) => {

        const updatedRows = [...rows];
        updatedRows[rowIndex][columnName] = event.target.files[0];
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { id: rows.length + 1, video: null, flightpath: null }]);
    };

    const handleDeleteRow = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleDeleteAll = () => {
        setRows([{ id: 1, video: null, flightpath: null }]);
    };
    const handleUploadAll = async () => {
        if(rows.length > 0) {

        setLoading(true);
        try {
            const formData = new FormData(); // Créez une instance de FormData
            rows.forEach(row => {
                const videoName = row.video.name.split('.').slice(0, -1).join('.'); // Supprimez l'extension de la vidéo
                // Utilisez le nom de la vidéo (sans extension) pour créer un nom commun pour le fichier            
                formData.append(`${videoName}.txt`, row.flightpath);
                formData.append(`${videoName}.mp4`, row.video);
            });


            formData.append(`projectId`, projectId);
            console.log("createproject handleSaveAndUploadAll ", formData)



            const response = await axios.post('http://localhost:3000/project/add-videos-flightpaths', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Récupérer l'ID du projet de la réponse du backend

            if (response.status === 200) {
                // Enregistrement réussi, afficher un message de succès et rediriger vers la page de connexion
                handleAlertMessage({ type: "success", message: response.data.message });
        
              }
        
        
            } catch (error) {
              if (error.response?.data.error) {
                // Si le serveur renvoie un message d'erreur, afficher le message d'erreur
                handleAlertMessage({ type: "error", message: error.response.data.error });
        
              } 
             
            } finally {
              setLoading(false); // Arrêter le chargement
            }
          }
        }

    const columns = [
        { field: 'id', headerName: 'Num', width: 70 },
        {
            field: 'video',
            headerName: 'Video',
            flex: 1,
            renderCell: (params) => (
                <label>
                    <SlideshowOutlinedIcon fontSize="large" />
                    <input
                        type="file"
                        onChange={(event) => handleFileChange(event, params.row.id - 1, 'video')}
                        style={{ display: 'none' }}
                        accept="video/*"
                    />
                    {params.row.video ? params.row.video.name : <span style={{ color: 'red' }}>No video chosen!</span>}
                </label>
            ),
        },
        {
            field: 'flightpath',
            headerName: 'Flightpath',
            flex: 1,
            renderCell: (params) => (
                <label>
                    <RouteOutlinedIcon fontSize="large" />
                    <input
                        type="file"
                        onChange={(event) => handleFileChange(event, params.row.id - 1, 'flightpath')}
                        style={{ display: 'none' }}
                        accept=".txt"
                    />
                    {params.row.flightpath ? params.row.flightpath.name : <span style={{ color: 'red' }}>No flightpath file chosen!</span>}
                </label>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => (
                [
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ fontSize: '28px' }} />}
                        label="Delete"
                        onClick={handleDeleteRow(id)}
                        color="error"
                    />,
                ]
            ),
        },
    ];

    return (
        <div style={{ height: 'auto', width: '50%', margin: 'auto', overflow: 'auto' }}>
       
            <Grid container spacing={2} justifyContent="center" alignItems="center" mt='75px'>
                <Grid item xs={12}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        slots={{ footer: 'null' }}
                        sx={{
                            boxShadow: 10,
                            border: 4,
                            borderColor: '#3e4396',
                            color: '#3e4396',
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#3e4396",
                                color: "white",
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: "#c3c6fd",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: "#c3c6fd",
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontSize: "18px",
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="secondary" onClick={handleAddRow}>
                            Add
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteAll}>
                            Delete All
                        </Button>
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
                        {loading && <CircularProgress style={{ marginRight: "10px" }} disableShrink className="CircularProgress" />}

                    </Stack>

                </Grid>
            </Grid>
        </div>
    );
}

export default DynamicTable;
