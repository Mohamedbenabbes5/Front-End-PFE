import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme, TextField } from "@mui/material";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

import {
    GridRowModes,
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import PieChartBox from '../../components/PieChartBox';
import axios from 'axios';
import TransitionAlerts from "../../components/TransitionAlerts";
import { jwtDecode } from 'jwt-decode';




function Timestamp() {
    const randomDate = randomCreatedDate();
    return `${randomDate.getHours().toString().padStart(2, '0')}:${randomDate.getMinutes().toString().padStart(2, '0')}:${randomDate.getSeconds().toString().padStart(2, '0')}`;
}

const degre = ['Low', 'Medium', 'High'];
const type = ['crack', 'spall'];
const mapIntToLabel = (labels,value) => {
    return labels[value];
  };



export default function FullFeaturedCrudGrid() {

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
console.log(decodedToken);
    const resultImagePath = 'http://localhost:3000/result/';
    const croppedImagesPath = 'http://localhost:3000/result/cropped_images/';

    const [RowsData, setRowsData] = useState([]);

    const [statisticDamages, setStatisticDamages] = useState({
        crackCount: 0,
        spallCount: 0,
        dangerCounts: {
            Low: 0,
            Medium: 0,
            High: 0,
        },
    });

    const { projectId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [alertInfo, setAlertInfo] = useState(null);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fetchDamages = async () => {
        if (location.state?.successProcess) {
            setAlertInfo({ type: "success", message: "Project saved successfully!" });
        }
        try {

            const response = await axios.get(`http://localhost:3000/results/${projectId}`,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
            setRowsData(response.data);
            updateDamageCounts(response.data)
            console.log("response.data", response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des dommages :', error);
            // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
        }
    };

    useEffect(() => {
        fetchDamages();
    }, [projectId]);

    
    const handleSaveClick = async (id) => {
        const editedRow = RowsData.find(row => row.id === id);
        try {
            const response = await axios.post(`http://localhost:3000/results`, { editedRow },{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });

            // Mettre à jour l'état local des données avec les nouvelles valeurs
            const updatedRowsData = RowsData.map(row => {
                if (row.id === id) {
                    return editedRow;
                }
                return row;
            });
            setRowsData(updatedRowsData);
            // Mettre à jour le modèle de mode de ligne pour changer le mode en mode de vue
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View , ignoreModifications: true}
            });
            // Gérer la réponse de votre backend (par exemple, afficher une alerte de succès)
            setAlertInfo({ type: "success", message: "row updated successfully!" });

        } catch (error) {
            // Gérer les erreurs (par exemple, afficher une alerte d'erreur)
            setAlertInfo({ type: "error", message:error.response.data.error });
            console.error('Erreur lors de la sauvegarde des modifications :', error);
        }
    };
    

        
    const handleDeleteClick = async (damageId) =>  {
        try {
            const response = await axios.delete(`http://localhost:3000/results/${damageId}`,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });

            // Mettre à jour l'état local des données avec les nouvelles valeurs
          
            setRowsData(RowsData.filter((row) => row.id !== damageId));
            setRowModesModel({
                ...rowModesModel,
                [damageId]: { mode: GridRowModes.View , ignoreModifications: true}
            });
            setAlertInfo({ type: "success", message: "row deleted successfully!" });

        } catch (error) {
            // Gérer les erreurs (par exemple, afficher une alerte d'erreur)
            console.error('Erreur lors de la sauvegarde des modifications :', error);
            setAlertInfo({ type: "error", message:error.response.data.error });

        } 
       };

    // Fonction pour mettre à jour les données modifiées dans l'état local
    const handleCellEdit = (id, field, value) => {
        const updatedRowsData = RowsData.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRowsData(updatedRowsData);
    };
    // Fonction pour mettre à jour les données modifiées dans l'état local

    // Fonction pour envoyer les modifications à la base de données

    const columns = [
        { field: 'id', headerName: 'id', width: 80 },
        {
            field: 'croppedDamageImage',
            headerName: 'croppedDamageImage',
            width: 150,
            renderCell: (params) => (<img src={croppedImagesPath + "/" + params.value} alt="User" style={{ width: 200 }} />)
        },
        {
            field: 'DetectResultImage',
            headerName: 'Frame',
            width: 150,
            renderCell: (params) => {
                let imagePath = '';
                // Vérifier le type de ressource
                if (params.row.resource && params.row.resource.type.startsWith('video/')) {
                    // Ressource de type vidéo
                    imagePath = resultImagePath + '/' + params.value;
                } else if (params.row.resource && params.row.resource.type.startsWith('image/')) {
                    // Ressource de type image
                    imagePath = resultImagePath + '/' + params.value + '/' + params.value;
                }

                return <img src={imagePath} alt="damage" style={{ width: 200 }} />;
            },
        },
        {
            field: 'timestamps',
            headerName: 'Timestamps',
            type: 'Date',
            flex: 1,
            editable: true,
        },
        {
            headerName: 'Media ressource',
            field: 'ressource',
            flex: 1,
            editable: true,
            renderCell: (params) => {
                const handleVideoClick = (event) => {
                    // Empêcher la propagation de l'événement pour éviter le déclenchement de l'édition de la ligne
                    event.stopPropagation();
                };

                return (
                    <a href={'/image'} target="_blank" rel="noopener noreferrer" onClick={handleVideoClick}>
                        {params.row.resource.name}
                    </a>
                );
            },
        },
        {
            field: 'type',
            headerName: 'type',
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className={`dangerType ${params.row.type}`}>
                        {params.row.type} 
                    </div>
                );
                
            },
        },
        {
            field: 'confidence',
            headerName: 'confidence',
            flex: 1,
            type: 'singleSelect',
            valueOptions: ['crack', 'spall',],
        },
       
        {
            field: 'DangerDegre',
            headerName: 'Danger Degre',
            flex: 1.2,
            editable: true,
            type: 'singleSelect',
            renderCell: (params) => {
                return (
                    <div className={`cellWithDangerDegre ${mapIntToLabel(degre,params.row.dangerDegree)}`}>
                        {mapIntToLabel(degre,params.row.dangerDegree)} {/* Utiliser la fonction de mappage ici */}
                    </div>
                );
                
            },
            renderEditCell: (params) => (
                <TextField
                    select
                    value={params.value}
                    onChange={(e) => handleCellEdit(params.id, 'dangerDegree', e.target.value)}
                    fullWidth
                >
                    {degre.map((label, index) => (
                        <MenuItem key={label} value={index}>{label}</MenuItem>
                    ))}
                </TextField>
            ),
    
        },
        {
            field: 'comment',
            headerName: 'Comment',
            flex: 2,
            editable: true,
            renderEditCell: (params) => {
                return (
                    <TextField
                        multiline
                        fullWidth
                        value={params.value}
                        onChange={(e) => {
                            handleCellEdit(params.id, 'comment',  e.target.value);
                        }}
                    />
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            color="inherit"
                            onClick={() => handleSaveClick(id)} // Utilisez une fonction fléchée ici
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
        
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={ handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)} // Wrap in arrow function
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

 

    

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = RowsData.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRowsData(RowsData.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRowsData(RowsData.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const updateDamageCounts = (data) => {
        const statisticDamages = {
            crackCount: data.filter(row => row.type === 'crack').length,
            spallCount: data.filter(row => row.type === 'spall').length,
            dangerCounts: {
                Low: data.filter(row => row.dangerDegree === 0).length,
                Medium: data.filter(row => row.dangerDegree === 1).length,
                High: data.filter(row => row.dangerDegree === 2).length,
            },
        };
        setStatisticDamages(statisticDamages)
    }
    console.log("RowsData", RowsData)
    console.log("rowModesModel", rowModesModel)

    return (
        <Box m="20px">
            <Header
                title="Inspection Result"
                subtitle="List of domage result"
            />
            {alertInfo && (
                <TransitionAlerts
                    type={alertInfo.type}
                    message={alertInfo.message}
                    onClose={() => { }}
                    variant={"filled"}
                />
            )}
            <div className="home">


                <div className="box box-1">
                    <PieChartBox charttype="type"
                        crackCount={statisticDamages.crackCount}
                        spallCount={statisticDamages.spallCount} />
                </div>
                <div className="box box-1">
                    <PieChartBox charttype="danger"
                        dangerCounts={statisticDamages.dangerCounts} />


                </div>
            </div>

            <Box
                m="20px 0 0 0"
                height="200vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        fontSize: "1rem", // Modifier la taille de la police ici
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontSize: "14px", // Augmenter la taille de police ici
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },

                }}
            >
                <DataGrid
                    rows={RowsData}
                    columns={columns}
                    editMode="row"
                    rowHeight={150} // Modifier la taille des lignes selon vos besoins
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            </Box>
        </Box>
    );

}