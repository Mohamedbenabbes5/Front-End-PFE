import React, { lazy } from "react";
import { Routes, Route } from 'react-router-dom';
import { ProtectedDashboard } from "./ProtectedRoute";

const DashboardRoutes = lazy(() => import("./DashboardRoutes"));
const LandingPageRoutes = lazy(() => import("./LandingPageRoutes"));

function App() {
  return (
    
      <Routes>
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedDashboard>
              <DashboardRoutes />
            </ProtectedDashboard>
          } 
        />
        <Route 
          path="/*" 
          element={<LandingPageRoutes />} 
        />
      </Routes>
  );
}

export default App;
