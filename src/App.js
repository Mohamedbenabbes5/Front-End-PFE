import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LazyDashboardRoutes = lazy(() => import("./DashboardRoutes"));
const LazyLandingPageRoutes = lazy(() => import("./LandingPageRoutes"));

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
            <LazyDashboardRoutes />
        }
      />
      <Route
        path="/*"
        element={
            <LazyLandingPageRoutes />
        }
      />
    </Routes>
  );
}

export default App;
