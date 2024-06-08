import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import LayersIcon from '@mui/icons-material/Layers';
import axios from 'axios';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Alert from '@mui/material/Alert';

const Dashboard = () => {
  const token = localStorage.getItem('accessToken');
  const decodedToken = localStorage.getItem('decodedToken');
  const userData = JSON.parse(decodedToken).user;
  const [statusMessage, setStatusMessage] = useState(null);

  const [statisticsData, setStatisticsData] = useState({
    projectCount: 0,
    companyCount: 0,
    employeeCount: 0,
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getDataStatystics = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getDataStatystics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      const { projectCount, companyCount, employeeCount } = data;
      setStatisticsData({
        projectCount,
        companyCount,
        employeeCount
      });
    } catch (error) {
      setStatusMessage(error.response.data.error);

      console.log(error.response.data.error);
      // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
    }
  };

  useEffect(() => {


    getDataStatystics();

  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      {statusMessage && (
        <Alert variant="filled" severity="error" sx={{ fontSize: '1.4rem',  my :'16px'}}>
          {statusMessage}
        </Alert>
      )}



      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statisticsData.projectCount}
            subtitle={userData.user === "superAdmin" ? "All Projects" : "My Projects"}
            icon={
              <LayersIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {userData.user !== "employee" &&
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={statisticsData.employeeCount}
              subtitle="All Employee"
              progress="0.30"
              increase="+12%"
              icon={
                <PeopleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        }
        {userData.user === "superAdmin" &&
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={statisticsData.companyCount}
              subtitle="All Company"
              increase="+5%"
              icon={
                <ApartmentIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        }
      </Box>
    </Box>
  );
};

export default Dashboard;
