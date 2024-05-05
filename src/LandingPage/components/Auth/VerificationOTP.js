import React, { useEffect, useState } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import axios from 'axios';
import TransitionAlerts from "../TransitionAlerts";

import BackgroundImage from '../../assets/images/bg/1.jpg';
import Logo from '../../assets/images/unboxing.gif';

/**
 * Reset-password component
 */
export default function VerificationOTP() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [otp, setOTP] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const user = location.state?.userType || queryParams.get('user');

    const [errorMessage, setErrorMessage] = useState("");
    const [warningMessage, setwarningrMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("")

    const handleVerificationFormatOTP = (e) => {
        const otp = e.target.value;
        if (otp.length === 6) {
            setIsAccepted(true);
        } else {
            setIsAccepted(false);
        }
        // Mettre à jour l'état du formulaire avec l'OTP
        setOTP(otp);
    }

    const handleResendOTP = async (e) => {
        e.preventDefault();
        console.log("handleVerificationFormatOTP");
        console.log({ otp });
        console.log({ email });
        console.log({ user });
        // Envoyer l'e-mail et le code OTP au serveur pour vérification
        try {
            setErrorMessage('');
            setSuccessMessage('');
            setwarningrMessage('')
            const response = await axios.post(`http://localhost:3000/auth/${user}-resend-otp`, { email });
            if (response.status === 200) {
                // Rediriger l'utilisateur vers une page de confirmation
                setSuccessMessage(response.data.message)
             
            }
        } catch (error) {
            console.log("erreeur otp");
            if (error.response.status === 409) {
                setwarningrMessage(error.response.data.error)
            }
            else if (error.response?.data?.error) {
                setErrorMessage(error.response.data.error);
            }
            else {
                setErrorMessage("Error while resending verification by email: " );
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ otp });
        console.log({ email });
        console.log({ user });
        // Envoyer l'e-mail et le code OTP au serveur pour vérification
        try {
            setErrorMessage('');
            const response = await axios.post(`http://localhost:3000/auth/${user}-verify-otp`, { otp, email });
            if (response.status === 200) {
                // Rediriger l'utilisateur vers une page de confirmation
                setSuccessMessage(response.data.message)
                setTimeout(() => {
                    navigate('/login',
                        { state: { userType: user } });
                }, 2000);

            }
        } catch (error) {
            console.log("erreeur otp");
            if (error.response?.data?.error) {
                setErrorMessage(error.response.data.error);
            }
            else {
                setErrorMessage("Error verifying OTP");
            }
        }
    };

    return (
        <>
            <div className="back-to-home">
                <Link to="/" className="back-button btn btn-icon btn-primary"><Icon.ArrowLeft className="icons" /></Link>
            </div>
            {/* Hero Start */}
            <section className="cover-user bg-white">
                <div className="container-fluid px-0">
                    <Row className="g-0 position-relative">
                        <Col lg={4} className="cover-my-30 order-2">
                            <div className="cover-user-img d-flex align-items-center">
                                <Row>
                                    <div className="col-12">
                                        <div className="d-flex flex-column auth-hero">
                                            <div className="mt-md-5 text-center">
                                                <Link to="/"><img src={Logo} alt="" style={{ width: '100px' }} /></Link>
                                            </div>
                                            <div className="title-heading my-lg-auto">
                                                <Card className="login-page border-0" style={{ zIndex: 1 }}>
                                                    <CardBody className="p-0 ">
                                                        <h3 className="card-title text-center">OTP Verification Email </h3>
                                                        <form className="login-form mt-4">
                                                            <Row>
                                                                <Col lg={12}>
                                                                    <p className="text-muted">Please enter your One-Time Password to verify your account.</p>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">OTP <span className="text-danger">*</span></label>
                                                                        <input onChange={handleVerificationFormatOTP} type="number" className="form-control" placeholder="Enter your One-Time-Password" name="email" required />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={12}>
                                                                    <div className="d-grid">
                                                                        <button className="btn btn-primary " type="submit"
                                                                            disabled={!isAccepted}
                                                                            onClick={handleSubmit}>
                                                                            Verify OTP
                                                                        </button>
                                                                    </div>
                                                                </Col>

                                                                <div className="mx-auto">
                                                                    <p className="mb-0 mt-3">
                                                                        <small className="text-dark me-2">Dont receive the OTP ?</small>
                                                                        <Link onClick={handleResendOTP} className="text-dark fw-bold resend-link">
                                                                            <span className="fw-bold" style={{ color: 'red' }}>RESEND OTP</span>
                                                                        </Link>

                                                                    </p>
                                                                </div>
                                                            </Row>
                                                        </form>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            <div className="mb-md-5 text-center">
                                                <p className="mb-0 text-muted">© {(new Date().getFullYear())}{" "} Inspectify<i className="mdi mdi-heart text-danger"></i> by <Link to="#" className="text-reset">Med Ben Abbes && chaima Mh </Link>.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>

                        <div className="col-lg-8 offset-lg-4 padding-less img order-1" style={{ backgroundImage: `url(${BackgroundImage})` }} data-jarallax='{"speed": 0.5}'>
                            {errorMessage && (
                                <TransitionAlerts type={"error"}
                                    message={errorMessage}
                                    onClose={() => { }}
                                    variant={"filled"}
                                >

                                </TransitionAlerts>
                            )}
                            {successMessage && (
                                <TransitionAlerts type={"success"}
                                    message={successMessage}
                                    onClose={() => { }}
                                    variant={"filled"}
                                >

                                </TransitionAlerts>
                            )}
                            {warningMessage && (
                                <TransitionAlerts type={"warning"}
                                    message={warningMessage}
                                    onClose={() => { }}
                                    variant={"filled"}
                                >

                                </TransitionAlerts>
                            )}
                        </div>




                    </Row>
                </div>
            </section>
            {/* end section */}
        </>
    )
}
