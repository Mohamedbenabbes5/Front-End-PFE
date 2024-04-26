import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataCompany } from "../../data/mockData"
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(mockDataCompany);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/user/details" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "user",
      headerName: "Company",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "registerId", headerName: "Registrar ID" },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,

      cellClassName: "name-column--cell",

    },
    {
      field: "name",
      headerName: "Username",
      flex: 1,

    },


    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,


    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,

    },
    {
      field: "country",
      headerName: "country",
      flex: 1,

    },
    {
      field: "city",
      headerName: "City",
      flex: 1,

    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,

    },

    {
      field: "projects",
      headerName: "projects",
      flex: 1,

    },
    {
      field: "guests",
      headerName: "guests",
      flex: 1,

    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
            renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    
  ];

  return (
    <Box m="20px">


      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header 
        title="All Companies" 
        subtitle="List of Company account" 
        />

        <Box>
          <Link to="/dashboard/form" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Create new user
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
          rows={data}
          columns={columns.concat(actionColumn)}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Company;
