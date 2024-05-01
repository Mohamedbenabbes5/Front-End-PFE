import { Profiler, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./dashboard/scenes/global/Topbar";
import Sidebar from "./dashboard/scenes/global/Sidebar";
import Dashboard from "./dashboard/scenes/dashboard";
import Form from "./dashboard/scenes/users/form";

import Geography from "./dashboard/scenes/geography";
import { CssBaseline, ThemeProvider, createTheme  } from "@mui/material";
import {ColorModeContext, useMode } from "./dashboard/theme";
import Calendar from "./dashboard/scenes/calendar/calendar";
import Admin from "./dashboard/scenes/users/Admin";
import Guest from "./dashboard/scenes/users/Guest";
import FullFeaturedCrudGrid from "./dashboard/scenes/inspection/InspectionResult";
import Profile from "./dashboard/scenes/users/Profile";
import Projects from "./dashboard/scenes/projects/ProjectList";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormWizard from "./dashboard/scenes/projects/MultiFormStepProject";
import "./dashboard_style.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import InfrastForm from "./dashboard/scenes/infrastructure/InfrstructureForm";

// Définissez le thème spécifique pour FormWizard
const formWizardTheme = createTheme({
  palette: {},
  typography: {},
});

function DashboardRoutes() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  
    return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes >
                  {/* Autres routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/companies" element={<Admin />} />
                  <Route path="/guests" element={< Guest/>} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/result/:projectId" element={<FullFeaturedCrudGrid/>} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/allprojects" element={<Projects />} />
                  <Route path="/allinfrastructure" element={<Projects />} />
                  <Route path="/creacteinfrastructure" element={<InfrastForm/>} />
                  <Route path="/updateinfrastructure" element={<InfrastForm/>} />

                   {/* Route FormWizard avec thème spécifique */}
                   <Route path="/creacteproject" element={
                    <ThemeProvider theme={formWizardTheme}>
                      <FormWizard />
                    </ThemeProvider>
                  } />
               
                </Routes>
               
              </main>
            </div>
          </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default DashboardRoutes;
