import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CorporateFareIcon from '@mui/icons-material/CorporateFare'; import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import defaultadminImage from "../../../public/assets/admin.png"
import defaultmanagerImage from "../../../public/assets/manager.png";
import defaultemployeeImage from "../../../public/assets/employee.jpg";

const Item = ({ title, to, icon, selected, setSelected, style }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100], // Couleur fixe définie ici
        ...style, // Fusionner avec d'autres styles passés
      }}

      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={`/dashboard${to}`} /> {/* Ajoutez '/dashboard' au début du chemin */}
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const decodedToken = localStorage.getItem('decodedToken');
  const userData = JSON.parse(decodedToken).user;
  const profileImagesPath = 'http://localhost:3000/uploads/profileImages/';

  console.log({ userData });

  // Fonction pour gérer l'erreur de chargement de l'image

  // Déterminer la source de l'image par défaut en cas d'échec de chargement en fonction du type d'utilisateur
  const fallbackSrc = userData.user === 'superAdmin' ? defaultadminImage :( userData.user === 'manager' ? defaultmanagerImage:defaultemployeeImage) ;


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {userData.companyname}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profileImagesPath + '/' + userData.profileImage}
                  onError={(e) => { e.target.src = fallbackSrc }}
                  style={{ cursor: "pointer", borderRadius: "50%" }}

                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userData.firstname + ' ' + userData.lastname}

                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userData.user}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {userData.user !== 'superAdmin' &&
              <Item
                title="Profile"
                to="/profile"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            }
            <Item
              title="ALL Projects"
              to="/allprojects"
              icon={<ViewCompactIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {userData.user !== 'superAdmin' &&
              
                <Item


                  title="Creacte Project"
                  to="/creacteproject"
                  icon={<ControlPointIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  style={!isCollapsed ? { marginLeft: "8px" } : {}}


                />
          }
                <Item
                  title="infrastructures"
                  to="/allinfrastructures"
                  icon={<AccountBalanceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                 {userData.user !== 'superAdmin' &&
                <Item
                  title="Creacte Infrastructure"
                  to="/creacteinfrastructure"
                  icon={<ControlPointIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  style={!isCollapsed ? { marginLeft: "8px" } : {}}

                />
              }
          {userData.user !== 'employee' && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              User Management
            </Typography>
            }
            {userData.user === 'superAdmin' && <Item
              title="Companies"
              to="/companies"
              icon={<CorporateFareIcon />}
              selected={selected}
              setSelected={setSelected}
            />}
            {userData.user !== 'employee' && 
            <Item
              title="Employees"
              to="/employees"
              icon={<PeopleOutlinedIcon />}

              selected={selected}
              setSelected={setSelected}
          
            />}


            {userData.user !== 'superAdmin' &&
              <div>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Result
                </Typography>
                <Item
                  title="Inspection results"
                  to="/result"
                  icon={<AssessmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Pages
                </Typography>

                <Item
                  title="Calendar"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            }




          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
