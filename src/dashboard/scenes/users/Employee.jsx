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
import defaultemployeeImage from "../../../public/assets/employee.jpg";


const Employee = () => {

  const location = useLocation();

  // Vérifiez si le message de succès est passé en tant que state lors de la navigation
  const successCreation = location.state?.successCreation;

  const profileImagePath = 'http://localhost:3000/uploads/profileImages/';

  const token = localStorage.getItem('accessToken');

  const [alertInfo, setAlertInfo] = useState(null);
  const fallbackSrc = defaultemployeeImage;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const roles = ['employee', 'inspector','expert', 'project manager' ];
  const status = ['pending', 'suspended', 'active'];

  const decodedToken = localStorage.getItem('decodedToken');
  let userData;
  if (decodedToken) {
    userData = JSON.parse(decodedToken).user;
  }
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
  const fetchEmployee = async () => {
    try {

      const response = await axios.get(`http://localhost:3000/users/get-allemployee`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const AllEmployee = response.data.AllEmployee
      AllEmployee.forEach(employee => {
        employee.projectCount = employee.project.length;

        delete employee.project;
      });
      console.log(AllEmployee);
      setRowsData(AllEmployee);
      console.log("response.data", response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des dommages :', error);
      // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);


  const handleSaveClick = async (id) => {
    setAlertInfo(null)
    const editedRow = RowsData.find(row => row.id === id);
    const editedData = editedRow ? { role: editedRow.role, status: editedRow.status, id: editedRow.id } : {};
    try {
      const response = await axios.post(`http://localhost:3000/users/update-employee`, editedData, {
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



  const handleDeleteClick = async (employeeId) => {
    setAlertInfo(null)
    try {
      const response = await axios.delete(`http://localhost:3000/users/delete-employee/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Mettre à jour l'état local des données avec les nouvelles valeurs

      setRowsData(RowsData.filter((row) => row.id !== employeeId));
      setRowModesModel({
        ...rowModesModel,
        [employeeId]: { mode: GridRowModes.View, ignoreModifications: true }
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



  const columns = [
    { field: "id", headerName: "ID",   flex: 0.2,
  },

    {
      field: "employee",
      headerName: "employee",
      flex: 0.7,
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
      field: "email",
      headerName: "Email",
      flex: 1,
    },


    ...(userData?.user === 'superAdmin' ? [{
      field: "companyname",
      headerName: "company name",
      renderCell: (params) => {
        return (
          <div>
            {params.row.manager.companyname}
          </div>
        );
      },
      flex: 1,
    }] : []),
  

    {

      field: "projectCount",
      headerName: "Authorized Projects",
      flex: 1,
    },



    {
      field: 'status',
      headerName: 'Status',
      flex: 1.1,
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
      field: 'role',
      headerName: 'Role',
      flex: 1,
      editable: true,
      type: 'singleSelect',
      renderCell: (params) => {
        return (
          <div >
            {mapIntToLabel(roles, params.row.role)} {/* Utiliser la fonction de mappage ici */}
          </div>
        );

      },
      renderEditCell: (params) => (
        <TextField
          select
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, 'role', e.target.value)}
          fullWidth
        >
          {roles.map((label, index) => (
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
      headerName: "account Verified",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className={`accountStatus ${params.row.accountVerified}`}>
            {params.row.accountVerified.toString()} {/* Convertissez la valeur booléenne en chaîne */}
          </div>
        );
      },
    }
    ,
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

        {alertInfo && (

          <TransitionAlerts
            sx={{}}
            type={alertInfo.type}
            message={alertInfo.message}
            onClose={() => { }}
            variant={"filled"}
          />
        )}
      </div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="50px">

        <Header
          title="All Employees"
          subtitle="List of Employees "
        />
        <Box>
          {userData.user === "manager" &&
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
                Create new Employee Account
              </Button>
            </Link>
          }
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

export default Employee;
