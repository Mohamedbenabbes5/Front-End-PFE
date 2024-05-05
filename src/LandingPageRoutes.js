import { Routes, Route } from "react-router-dom";
import "./LandingPage/assets/scss/themes.scss";
import Index from "./LandingPage/components/Index";
import Login from "./LandingPage/components/Auth/login";
import Signup from "./LandingPage/components/Auth/signup";
import ResetPassword from "./LandingPage/components/Auth/reset-password";
import Error from "./LandingPage/components/error";
import reportWebVitals from './LandingPage/reportWebVitals';
import VerificationOTP from "./LandingPage/components/Auth/VerificationOTP";
import ForgotPassword from "./LandingPage/components/Auth/ForgotPassword";

function LandingPageRoutes() {

  return (

    <Routes>

      <Route path="/error" element={<Error />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="/verify-otp" element={<VerificationOTP />} />

      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Index />} />
      <Route path="*" element={<Error />} />



    </Routes>
  );
}

export default LandingPageRoutes;
reportWebVitals();