import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {mockDataGuest} from "../../data/mockData"
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(mockDataGuest);

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
      headerName: "User",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
          </div>
        );
      },
    },
    { field: "registerId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
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
     {  field: "city",
      headerName: "City",
      flex: 1,
    }, 
    {

      field: "address",
      headerName: "Address",
      flex: 1,
    },
   
    {

        field: "hosts",
        headerName: "Hosts",
        flex: 1,
      },
      {

        field: "authorizedProjects",
        headerName: "Authorized Projects",
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
      <Header
        title="All Guests"
        subtitle="List of Guests "
      />
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

export default Employee;
