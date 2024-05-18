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


const Manager = () => {

  const location = useLocation();

  // Vérifiez si le message de succès est passé en tant que state lors de la navigation
  const successCreation = location.state?.successCreation;

  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const [alertInfo, setAlertInfo] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const status = ['pending', 'active', 'suspended'];

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
  const fetchManager = async () => {
    try {

      const response = await axios.get(`http://localhost:3000/users/get-allmanager`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const AllManager = response.data.AllManager
      AllManager.forEach(manager => {
        manager.projectCount = manager.projects?.length;
        manager.employeeCount = manager.employee?.length;
        delete manager.projects;
        delete manager.employee;
      });
      console.log(AllManager);
      setRowsData(AllManager);
      console.log("response.data", response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des dommages :', error);
      // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
    }
  };

  useEffect(() => {
    fetchManager();
  }, []);


  const handleSaveClick = async (id) => {
    const editedRow = RowsData.find(row => row.id === id);
    try {
      console.log(RowsData);
      const response = await axios.post(`http://localhost:3000/users/update-manager`, { editedRow }, {
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
      setAlertInfo({ type: "success", message: `Manager account with id ${id}  updated successfully!` });

    } catch (error) {
      // Gérer les erreurs (par exemple, afficher une alerte d'erreur)
      setAlertInfo({ type: "error", message: error.response.data.error });
      console.error('Erreur lors de la sauvegarde des modifications :', error);
    }
  };



  const handleDeleteClick = async (managerId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/delete-manager/${managerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Mettre à jour l'état local des données avec les nouvelles valeurs

      setRowsData(RowsData.filter((row) => row.id !== managerId));
      setRowModesModel({
        ...rowModesModel,
        [managerId]: { mode: GridRowModes.View, ignoreModifications: true }
      });
      setAlertInfo({ type: "success", message: "Manager account deleted successfully!" });

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



  const columns = [
    { field: "id", headerName: "Registrar ID" },

    {
      field: "Profileimg",
      headerName: "Profile Image",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkfoEX97d292BsiNpL9jQY2w4lUZPzs2J6MfeWVpwe6Q&s" alt="avatar" />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        return (
          <div

          > {params.row.firstname + ' ' + params.row.lastname}


          </div>
        );
      },
    },

    {
      field: "companyname",
      headerName: "Manager name",
      renderCell: (params) => {
        return (
          <div>
            {params.row.companyname}
          </div>
        );
      },
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },





    {

      field: "projectCount",
      headerName: "Projects",
      flex: 1,
    },

    {

      field: "employeeCount",
      headerName: "Employees",
      flex: 1,
    },



    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      editable: true,
      type: 'singleSelect',
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${mapIntToLabel(status, params.row.status)}`}>
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
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "accountVerified",
      headerName: "Valid account ",
      flex: 1,
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
        {successCreation && (

          <TransitionAlerts
            sx={{}}
            type={"success"}
            message={successCreation}
            onClose={() => { }}
            variant={"filled"}
          />
        )}
      </div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="50px">

        <Header
          title="All Manager"
          subtitle="List of Managers "
        />
        <Box>
          <Link to="/dashboard/form" state={{ actionType: "create" }} style={{ textDecoration: "none" }}>
            <Button
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Create new Manager Account
            </Button>
          </Link>
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

export default Manager;
