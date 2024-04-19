import { Routes, Route } from "react-router-dom";
import "./LandingPage/assets/scss/themes.scss";
import Index from "./LandingPage/components/Index";
import Login from "./LandingPage/components/login";
import Signup from "./LandingPage/components/signup";
import ResetPassword from "./LandingPage/components/reset-password";
import Error from "./LandingPage/components/error";
import reportWebVitals from './LandingPage/reportWebVitals';

function LandingPageRoutes() {

  return (

    <Routes>

      <Route path="/error" element={<Error />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Index />} />
      <Route path="*" element={<Error />} />



    </Routes>
  );
}

export default LandingPageRoutes;
reportWebVitals();