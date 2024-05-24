import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { mockTransactions } from "../../data/mockData";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import LayersIcon from '@mui/icons-material/Layers';
import axios from 'axios';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import UserStatisticsChart from "../../components/UserStatisticsChart";
const Dashboard = () => {
  const token = localStorage.getItem('accessToken');
  const decodedToken = localStorage.getItem('decodedToken');
  let userData = JSON.parse(decodedToken).user;

  const [statisticsData, setStatisticsData] = useState({
    projectCount: null,
    companyCount: null,
    employeeCount: null,
  })
  const [userStats, setUserStats] = useState({
    labels: [],
    data: []
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
      const { projectCount, companyCount, employeeCount } = data
      // const StatsData=data.formattedStats
      // console.log("StatsData",StatsData);
      // const labels = StatsData.map(entry => entry.date);
      // const userData = StatsData.map(entry => entry.userCount);
      // setUserStats({ labels, data: userData });
      setStatisticsData({
        projectCount,
        companyCount,
        employeeCount
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des donens :', error);
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
        {
          userData.user === "superAdmin" &&
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

        {/* <Box gridColumn="span 12" backgroundColor={colors.primary[400]} p="20px">
          <UserStatisticsChart labels={userStats.labels} data={userStats.data} />
        </Box> */}


        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >

              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}



      </Box>
    </Box>
  );
};

export default Dashboard;
