import React, { Component, useState } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import * as Icon from 'react-feather';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundImage from '../../assets/images/bg/1.png';
import Logo from "../../assets/images/logo.png";
import TransitionAlerts from "../TransitionAlerts";

/**
 * Reset-password component
 */
export default function ResetPassword() {
    const location = useLocation();
    // const user = location.state?.userType;
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const [errorInput, setErrorInput] = useState("");

    const [formData, setformData] = useState({
        newPassword: null,
        confirmPassword: null
    });
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const user = queryParams.get('user');

    const handleChangeInputForm = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value,

        });
        console.log({ formData });
    };
    const validateFields = () => {
        const newErrors = {};

        if (!formData.newPassword || formData.newPassword.length < 8) {
            newErrors.newPassword = "Invalid Password, it must be at least 6 cha";
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "password not matched";
        }
        //autre verification 
        setErrorInput(newErrors);
        // Check if there are no errors
        if (Object.keys(newErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
        console.log({formData});

            // Envoyer l'e-mail et le code OTP au serveur pour vérification
            try {
                const newPassword = formData.newPassword
                setErrorMessage('');
                const response = await axios.post(`http://localhost:3000/auth/${user}-reset-password`, { token, newPassword });
                if (response.status === 200) {
                    // Rediriger l'utilisateur vers une page de confirmation
                    setSuccessMessage(response.data.message)
                    setTimeout(() => {
                        navigate('/auth/login',
                            { state: { userType: user } });
                    }, 2000);

                }
            } catch (error) {
                console.log("erreeur otp");
                if (error.response?.data?.error) {
                    setErrorMessage(error.response.data.error);
                }
                else {
                    setErrorMessage("An error occurred during account recovery");
                }
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
                                                <Link to="/"><img src={Logo} alt="" style={{ width: '200px' }} /></Link>
                                            </div>
                                            <div className="title-heading my-lg-auto">
                                                <Card className="login-page border-0" style={{ zIndex: 1 }}>
                                                    <CardBody className="p-0">
                                                        <h4 className="card-title">Recover Account</h4>
                                                        <form className="login-form mt-4" onSubmit={handleSubmit} >
                                                            <Row>
                                                                <Col lg={12}>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">New Password <span className="text-danger">*</span></label>
                                                                        <input required type="password" className="form-control" placeholder="Enter Your New Password" name="newPassword" onChange={handleChangeInputForm}  />
                                                                    </div>
                                                                    {errorInput.newPassword && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errorInput.newPassword}</span>}

                                                                </Col>

                                                                <Col lg={12}>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Confirm New Password <span className="text-danger">*</span></label>
                                                                        <input required type="password" className="form-control" placeholder="Confirm Your New Password" name="confirmPassword" onChange={handleChangeInputForm}  />
                                                                    </div>
                                                                    {errorInput.confirmPassword && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errorInput.confirmPassword}</span>}

                                                                </Col>


                                                                <Col lg={12}>
                                                                    <div className="d-grid">
                                                                        <button className="btn btn-primary "
                                                                            > Submit</button>
                                                                    </div>
                                                                </Col>

                                                                <div className="mx-auto">
                                                                    <p className="mb-0 mt-3"><small className="text-dark me-2">Already have an account ?</small> <Link to="/auth/login" className="text-dark fw-bold" state={{ userType: user }} >  {user == "company" ? "Sign in" : "Join"}</Link></p>
                                                                </div>
                                                            </Row>
                                                        </form>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            <div className="mb-md-5 text-center">
                                                <p className="mb-0 text-muted">© {(new Date().getFullYear())}{" "} <i className="mdi mdi-heart text-danger"></i> by Med Ben Abbes && Chaima Mh</p>
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
                        </div>
                    </Row>
                </div>
            </section>
            {/* end section */}
        </>
    )
}
