import React, { useState } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import { Link, useLocation } from 'react-router-dom';
import * as Icon from 'react-feather';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import BackgroundImagemanager from '../../assets/images/bg/admin4.jpeg';
import BackgroundImageEmployee from '../../assets/images/bg/guest.jpg';
import Stack from '@mui/material/Stack';
import Logo from "../../assets/images/logo.png";
import TransitionAlerts from "../TransitionAlerts";
import { jwtDecode } from 'jwt-decode';


/**
 * Login component
 */
export default function Login() {
    const location = useLocation(); // Utilisation du hook useLocation pour obtenir l'objet location
       const queryParams = new URLSearchParams(location.search);
 const user = location.state?.userType || queryParams.get('user');; // Récupérer la valeur de user depuis location.state ou depuis lurl
    const token = queryParams.get('token');

    const navigate = useNavigate();

    const [LoginError, setLoginError] = useState('');

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        ...(token && { token: token })
    });
    // Fonction pour mettre à jour l'état local lorsque les champs du formulaire changent
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    };

    console.log('Utilisateur :', user); // Afficher la valeur de user dans la console

    const userLogin = async (data) => {
        try {
            console.log("userLogin called");
            console.log('Utilisateur :', user); // Afficher la valeur de user dans la console
            console.log('Utilisateur data:', data); // Afficher la valeur de user dans la console

            // Réinitialiser les messages d'erreur
            setLoginError('');

            const response = await axios.post(`http://localhost:3000/auth/${user}-login`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Enregistrement réussi, afficher un message de succès et rediriger vers la dashboard
                const token = response.data.accessToken;
                // Supposez que token soit votre token JWT
                const decodedToken = jwtDecode(token);

                // Convertissez les données décodées en chaîne JSON
                const decodedTokenData = JSON.stringify(decodedToken);

                // Enregistrez les données décodées dans le localStorage
                localStorage.setItem('decodedToken', decodedTokenData);

                // Utilisez les données de l'utilisateur comme vous le souhaitez
                localStorage.setItem('accessToken', token);
                navigate(
                    '/dashboard',
                    { state: { userType: user } }
                );

            }


        } catch (error) {
            console.log("erreurrrr,", error.response.data?.error);
            if (error.response?.data?.error) {
                // Si le serveur renvoie un message d'erreur, afficher le message d'erreur

                setLoginError(error.response.data?.error);
                if (error.response.status === 401) {
                    // Enregistrement réussi, afficher un message de succès et rediriger vers la dashboard
                    setTimeout(() => {
                        navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`,
                            { state: { userType: user } });
                    }, 2000);
                }
            } else {
                setLoginError("An error occurred while login the manager.");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Handle submit function called");
        userLogin(formData);

    }
    return (
        <>
            <div className="back-to-home">
                <Link to="/" className="back-button btn btn-icon btn-primary"><Icon.ArrowLeft className="icons" /></Link>
            </div>
            {/* Hero Start */}
            <section className="cover-user ">
                <div className="container-fluid px-0">
                    <Row className="g-0 position-relative">
                        <Col lg={4} className="cover-my-30 order-2">
                            <div className="cover-user-img d-flex align-items-center">
                                <Row>
                                    <div className="col-12">
                                        <div className="d-flex flex-column auth-hero">
                                            <div className="mt-md-5 text-center">
                                                <Link to="/"><img src={Logo} alt="" width="200px" /></Link>
                                            </div>
                                            <div className="title-heading my-lg-auto">
                                                <Card className="login-page border-0" style={{ zIndex: 1 }}>
                                                    <CardBody className="p-0">
                                                        <h4 className="card-title">{user === "employee" ? "Employee Login" : "manager Login"}</h4>
                                                        <form className="login-form mt-4" onSubmit={handleSubmit}>
                                                            <Row>
                                                                <Col lg={12} >
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Email <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="email" className="form-control" placeholder="Email" name="email" required />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={12} >
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Password <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="password" className="form-control" placeholder="Password" name="password" required />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={12} >
                                                                    <div className="d-flex justify-content-between">
                                                                        <div className="mb-3">
                                                                            <label className="form-check-label" >
                                                                                Remember me
                                                                                <input type="checkbox" className="form-check-input ms-2" />
                                                                            </label>
                                                                        </div>
                                                                        <p className="forgot-pass mb-0"><Link to="/forgotpassword" state={{ userType: user }} className="text-dark fw-semibold">Forgot password ?</Link></p>
                                                                    </div>
                                                                </Col>

                                                                <div className="col-lg-12 mb-0">
                                                                    <div className="d-grid">
                                                                        <button className="btn btn-primary ">{user === "manager" ? "Login" : "Join"}</button>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12">
                                                                    <p className="mb-0 mt-3"><small className="text-dark me-2">Don't have an account ?</small> <Link to="/signup" state={{ userType: user }} className="text-dark fw-semibold">Register</Link></p>
                                                                </div>
                                                            </Row>
                                                        </form>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            <div className="mb-md-5 text-center">
                                                <p className="mb-0 text-muted">© {(new Date().getFullYear())}{" "}Design with <i className="mdi mdi-heart text-danger"></i> by <Link to=".." className="text-reset">Abbes and Chaima</Link>.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>

                        <div className="col-lg-8 offset-lg-4 padding-less img order-1" style={{ backgroundImage: `url(${user === "manager" ? BackgroundImagemanager : BackgroundImageEmployee})` }} data-jarallax='{"speed": 0.5}'>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                {LoginError && (
                                    <TransitionAlerts type={"error"}
                                        message={LoginError}
                                        onClose={() => { }}
                                        variant={"filled"}
                                    >

                                    </TransitionAlerts>
                                )}

                            </Stack>
                        </div>
                    </Row>
                </div>
            </section>
            {/* end section */}
        </>
    )
} 