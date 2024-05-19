import React, { useContext, startTransition } from 'react';

import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNavigate } from 'react-router-dom';

import SearchIcon from "@mui/icons-material/Search";
import Logout from '@mui/icons-material/Logout';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate= useNavigate()

const handleLogout = () => {
  startTransition(() => {
    console.log('handleLogout');
    localStorage.removeItem('accessToken'); // Supprime le token du localStorage
    navigate('/'); // Redirige l'utilisateur vers la page d'accueil ou une autre page appropriée
  });
};
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
  
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>




        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
      
          {/* Logout Button */}
          <IconButton onClick={handleLogout} >
          <Logout color="error" />
        </IconButton>
      
      </Box>
    </Box>
  );
};

export default Topbar;
