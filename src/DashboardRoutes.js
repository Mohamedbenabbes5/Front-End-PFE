
import { Profiler, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./dashboard/scenes/global/Topbar";
import Sidebar from "./dashboard/scenes/global/Sidebar";
import Dashboard from "./dashboard/scenes/dashboard";
import Team from "./dashboard/scenes/team";
import Bar from "./dashboard/scenes/bar";
import Form from "./dashboard/scenes/form";
import Line from "./dashboard/scenes/line";
import Pie from "./dashboard/scenes/pie";
import FAQ from "./dashboard/scenes/faq";
import Geography from "./dashboard/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {ColorModeContext, useMode } from "./dashboard/theme";
import Calendar from "./dashboard/scenes/calendar/calendar";
import Company from "./dashboard/scenes/users/Company";
import Guest from "./dashboard/scenes/users/Guest";
import FullFeaturedCrudGrid from "./dashboard/scenes/inspection/InspectionResult";
import Profile from "./dashboard/scenes/users/Profile";
import Projects from "./dashboard/scenes/projects/Projects";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormWizard from "./dashboard/scenes/projects/CreateProject";
import FormUpload from "./dashboard/components/FormUpload";
import "./dashboard_style.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// Importez d'autres composants nécessaires

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
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/companies" element={<Company />} />
                <Route path="/guests" element={< Guest/>} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/result" element={<FullFeaturedCrudGrid/>} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/form" element={<Form />} />
                <Route path="/allprojects" element={<Projects />} />
                <Route path="/creacteproject" element={<FormWizard />} />
                <Route path="/upload" element={<FormUpload />} />
  
  
  
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default DashboardRoutes;