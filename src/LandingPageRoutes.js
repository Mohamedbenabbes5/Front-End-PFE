import React from "react";
import { Routes, Route } from "react-router-dom";
import "./LandingPage/assets/scss/themes.scss";
import Index from "./LandingPage/components/Index";
import Login from "./LandingPage/components/Auth/Login";
import Signup from "./LandingPage/components/Auth/Signup";
import Error from "./LandingPage/components/Error";
import VerificationOTP from "./LandingPage/components/Auth/VerificationOTP";
import ForgotPassword from "./LandingPage/components/Auth/ForgotPassword";
import { ProtectedAuthRoute } from "./ProtectedRoute";
import AminAuth from "./LandingPage/components/Auth/Admin_auth";
import ResetPassword from "./LandingPage/components/Auth/Reset-password";
import Unauthorized from "./LandingPage/components/Unauthorized";

function LandingPageRoutes() {
  return (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized/>} />
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Index />} />
      <Route path="*" element={<Error />} />
      <Route 
        path="/auth/*" 
        element={
          <ProtectedAuthRoute>     

            <Routes>            
               <Route path="/adminlogin" element={<AminAuth />} />

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="resetpassword" element={<ResetPassword />} />
              <Route path="forgotpassword" element={<ForgotPassword />} />
              <Route path="verify-otp" element={<VerificationOTP />} />
            </Routes>
          </ProtectedAuthRoute>
        } 
      />
    </Routes>
  );
}

export default LandingPageRoutes;
