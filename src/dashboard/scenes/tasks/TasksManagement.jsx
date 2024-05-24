import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormTask from "./FormTask";
import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
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
import defaultmissionImage from "../../../public/assets/employee.jpg";


const TasksManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOpen, setIsOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  const decodedToken = localStorage.getItem('decodedToken');
  let userData;
  if (decodedToken) {
    userData = JSON.parse(decodedToken).user;
  }
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  //*********************** */
  
  const profileImagePath = 'http://localhost:3000/uploads/profileImages/';

  const token = localStorage.getItem('accessToken');
  const status = ['pending',  'completed'];

  const fallbackSrc = defaultmissionImage;

  const mapIntToLabel = (labels, value) => {
    return labels[value];
  };

  const [RowsData, setRowsData] = useState([]);

  const [rowModesModel, setRowModesModel] = React.useState({});


  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCellEdit = (id, field, value) => {
    const updatedRowsData = RowsData.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRowsData(updatedRowsData);
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
  const fetchMissions = async () => {
    try {
console.log('fetchedmissions');
      const response = await axios.get(`http://localhost:3000/missions/get-allmissions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const AllMissions = response.data
      console.log("allmissionsffff", response.data);
      const transformedData = transformData(AllMissions)
      setRowsData(transformedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des missions :', error);
      // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMissions();
    };
  
    fetchData();    
  }, []);

  const transformData = (data) => {
    console.log('transformData', data);
    const transformedData = [];
  
    data.forEach(item => {
      item.mission.forEach(mission => {
        const transformedMission = {
          id: mission.id,
          status: mission.status,

          firstname: item.firstname,
          lastname: item.lastname,
          title: mission.title,
          description: mission.description,
          createdAt: mission.createdAt,
        };
  
        transformedData.push(transformedMission);
      });
    });
  
    return transformedData;
  };
  const handleSaveClick = async (id) => {
    setAlertInfo(null)
    const editedRow = RowsData.find(row => row.id === id);
    const editedData = editedRow ? { role: editedRow.role, status: editedRow.status, id: editedRow.id } : {};
    try {
      const response = await axios.post(`http://localhost:3000/missions/update-mission/${id}`, editedData, {
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
        [id]: { mode: GridRowModes.View, ignoreModifications: true }
      });
      // Gérer la réponse de votre backend (par exemple, afficher une alerte de succès)
      setAlertInfo({ type: "success", message: response.data.message });

    } catch (error) {
      // Gérer les erreurs (par exemple, afficher une alerte d'erreur)
      setAlertInfo({ type: "error", message: error.response.data.error });
      console.error('Erreur lors de la sauvegarde des modifications :', error);
    }
  };



  const handleDeleteClick = async (missionId) => {
    setAlertInfo(null)
    try {
      const response = await axios.delete(`http://localhost:3000/missions/delete-mission/${missionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Mettre à jour l'état local des données avec les nouvelles valeurs

      setRowsData(RowsData.filter((row) => row.id !== missionId));
      setRowModesModel({
        ...rowModesModel,
        [missionId]: { mode: GridRowModes.View, ignoreModifications: true }
      });
      setAlertInfo({ type: "success", message: response.data.message });

    } catch (error) {
      // Gérer les erreurs (par exemple, afficher une alerte d'erreur)
      console.error('Erreur lors de la sauvegarde des modifications :', error);
      setAlertInfo({ type: "error", message: error.response.data.error });

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
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };


  /************* */
  const columns = [
    { field: "id", headerName: "id",flex: 0.1  },

    {
      field: "Responsable",
      headerName: "Responsable",
      flex: 0.5,
      renderCell: (params) => {
        console.log('params.row.profileImage', params.row);
        return (
          <div className="cellWithImg">
            <img
              width="100px"
              height="100px"
              src={profileImagePath + '/' + params.row.profileImage}
              onError={(e) => { e.target.src = fallbackSrc }}
              style={{ cursor: "pointer", borderRadius: "50%" }}
              className="cellImg"
            />
          </div>
        );
      },
    },

    {
      field: "name",
      headerName: "name",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div

          > {params.row.firstname + ' ' + params.row.lastname}


          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Task",
      flex: 1,
    },
    {
      field: "description",
      headerName: "description",
      flex: 2,
    },

    {
      field: 'status',
      headerName: 'status',
      flex: 1,
      editable: true,
      type: 'singleSelect',
      renderCell: (params) => {
        return (
          <div className={`taskStatus ${mapIntToLabel(status, params.row.status)}`}>
            {mapIntToLabel(status, params.row.status)} {/* Utiliser la fonction de mappage ici */}
          </div>
        );

      },
      renderEditCell: (params) => (
        <TextField
          select
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, 'status', e.target.value)}
          fullWidth
        >
          {status.map((label, index) => (
            <MenuItem key={label} value={index}>{label}</MenuItem>
          ))}
        </TextField>
      ),

    },
    
    {
      field: "createdAt",
      headerName: "createdAt",
      flex: 1,
    },
   
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.8,
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
            onClick={handleEditClick(id)}
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

  return (
    <Box m="20px">       

      <div style={{ marginLeft: "20px" }}>
   

        {alertInfo && (

          <TransitionAlerts
            sx={{}}
            type={"success"}
            message={alertInfo.message}
            onClose={() => { }}
            variant={"filled"}
          />
        )}
      </div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="50px">

        <Header
          title="Task Management"
          subtitle="All Tasks"
        />
        <Box>     
          <FormTask isOpen={isOpen} onClose={handleCloseDialog} />

            <Button
              onClick={handleOpenDialog}
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: colors.greenAccent[800], // Garder la même couleur que l'état initial
                  color: colors.grey[100], // Garder la même couleur que l'état initial
              }
              }}
            >
              Create new Mission
            </Button>
          
        </Box>

      </Box>
      <Box
        m="40px 0 0 0"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
};

export default TasksManagement;
