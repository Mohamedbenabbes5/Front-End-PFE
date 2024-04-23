import React, { Component, useState } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import * as Icon from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import BackgroundImageAdmin from '../assets/images/bg/admin4.jpeg';
import BackgroundImageGuest from '../assets/images/bg/guest.jpg';
import Logo from '../assets/images/unboxing.gif';
import PhoneInput from 'react-phone-input-2'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
/**
 * Signup component
 */
export default function Signup() {


    let { state } = useLocation();
    console.log(state?.userType)
    const [isAccepted, setIsAccepted] = useState(false);
    const handleCheckboxChange = (e) => {
        setIsAccepted(e.target.checked);
    };
    const [phone, setPhone] = useState('');
    const handlePhoneChange = (value) => {
        setPhone(value); // Met à jour l'état local du numéro de téléphone
        setFormData({
            ...formData,
            phone: value // Met à jour formData avec le nouveau numéro de téléphone
        });
    };
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        company: '',
        country: '',
        phone: '',

    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate();

    const registerAdmin = async (data) => {
        try {
            console.log("registerAdmin called");
            const response = await axios.post('http://localhost:3000/auth/register-company', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                // Enregistrement réussi, afficher un message de succès et rediriger vers la page de connexion
                setSuccessMessage("Company registered successfully!");
                setTimeout(() => {
                    navigate(
                        '/login',
                        { state: { userType: state?.userType } }
                    );

                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                // Si le serveur renvoie un message d'erreur, afficher le message d'erreur
                setErrorMessage(error.response.data.error);
            } else {
                // Si une autre erreur se produit, afficher un message d'erreur génériqueinspectify
                setErrorMessage("An error occurred while registering the company.");
            }
        }
    };

    const registerGuest = async (data) => {
        try {
            const response = await axios.post('/register-guest', data);
            if (response.status === 200) {
                console.log('Guest registered successfully');
                // Rediriger ou effectuer d'autres actions en fonction du succès de l'enregistrement
            } else {
                console.error('Failed to register guest');
                // Gérer les erreurs d'enregistrement
            }
        } catch (error) {
            console.error('Error registering guest:', error);
            // Gérer les erreurs réseau ou autres erreurs
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Handle submit function called");

        const validationErrors = {}
        let name = formData.firstname + ' ' + formData.lastname;

        // Vérification du nom complet
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
            validationErrors.email = "email is not valid";
        }
        if (!/^[a-zA-Z ]+$/.test(name) || formData.lastname.length < 3 || formData.firstname.length < 3) {
            validationErrors.name = "name is not valid";
        }
        if (formData.company.length == 1) {
            validationErrors.company = "organization name  is not valid";
        }


        if (formData.password.length < 6) {
            validationErrors.password = "password should be at least 6 char"
        }

        if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = "password not matched"
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            // Form submitted with valid data
            console.log("Form submitted with valid data:");
            console.log(formData);

            // Call different functions based on userType
            if (state?.userType === "Admin") {
                // Call function for registering admin
                const { confirmPassword, ...newformData } = formData;
                registerAdmin(newformData);
            } else {
                // Call function for registering guest
                registerGuest(formData);
            }
        }

    }
    return (
        < >
            <div className="back-to-home">
                <Link to="/" className="back-button btn btn-icon btn-primary"><Icon.ArrowLeft className="icons" /></Link>
            </div>
            {/* Hero Start */}

            <section className="cover-user bg-white  ">
                <div className="container-fluid px-0  ">

                    <Row className="g-0 position-relative">
                        <Col lg={4} className="cover-my-30 order-2 ">
                            <div className="mt-md-0   mb-4 text-center">
                                <Link to="/"><img src={Logo} alt="" width="100px" /></Link>
                            </div>

                            <div className="cover-user-img d-flex align-items-center  ">

                                <Row>
                                    <div className="col-12 ">
                                        <div className="d-flex flex-column auth-hero ">

                                            <div className="title-heading my-lg-auto ">
                                                <Card className="border-0 " style={{ zIndex: 1 }}>
                                                    <CardBody className="p-0 mt-0">
                                                        <h4 className="card-title " >{state?.userType === "Guest" ? "Guest Register" : "Admin Regiter"}</h4>



                                                        <form className="login-form mt-4" onSubmit={handleSubmit} >
                                                            <Row>

                                                                <Col md={6} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">First name <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="e.g. John" name="firstname" required />
                                                                    </div>
                                                                </Col>

                                                                <Col md={6} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Last name <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="e.g. Doe" name="lastname" required />
                                                                    </div>

                                                                </Col>
                                                                {errors.name && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errors.name}</span>}
                                                                {state?.userType == "Admin" ? (<Col md={12} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Company <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="e.g. ABC Inc" name="company" required />
                                                                    </div>
                                                                </Col>) : null}
                                                                {errors.company && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errors.company}</span>}

                                                                <Col md={7} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Country <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="United States" name="country" required />
                                                                    </div>
                                                                </Col>
                                                                <Col md={5} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">City</label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="New York City" name="city" />
                                                                    </div>
                                                                </Col>

                                                                <Col md={12} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Email<span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="example@example.com" name="email" required />
                                                                    </div>
                                                                    {errors.email && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errors.email}</span>}
                                                                </Col>


                                                                <Col md={12} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Phone</label>
                                                                        <PhoneInput
                                                                            country={'usa'}
                                                                            value={phone}
                                                                            onChange={handlePhoneChange}
                                                                        />                                                                  </div>
                                                                </Col>


                                                                <Col md={12}>
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Password <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="password" className="form-control" placeholder="Password (min 6 char)" name="password" required />
                                                                    </div>
                                                                    {errors.password && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px", }}>{errors.password}</span>}
                                                                </Col>
                                                                <Col md={12}>
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Confirm Password <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" required />
                                                                    </div>
                                                                    {errors.confirmPassword && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errors.confirmPassword}</span>}
                                                                </Col>

                                                                <Col md={12}>
                                                                    <div className="mb-1">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleCheckboxChange} />
                                                                            <label className="form-check-label" >I Accept <Link to="#" className="text-primary">Terms And Condition</Link></label>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <div className="col-lg-12 mb-0">
                                                                    <div className="d-grid">
                                                                        <button
                                                                            type="submit"
                                                                            disabled={!isAccepted}
                                                                            className="btn btn-primary">Register</button>
                                                                    </div>
                                                                </div>

                                                                <div className="mx-auto">
                                                                    <p className="mb-0 mt-3"><small className="text-dark me-2">Already have an account ?</small> <Link to="/login" className="text-dark fw-bold" state={{ userType: state?.userType }} >  {state?.userType == "Admin" ? "Sign in" : "Join"}</Link></p>
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

                        <div className="col-lg-8 offset-lg-4 padding-less img order-1" style={{ backgroundImage: `url(${state?.userType === "Admin" ? BackgroundImageAdmin : BackgroundImageGuest})` }} data-jarallax='{"speed": 0.5}'>
                           
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                {errorMessage && (
                                    <Alert variant="filled" severity="error" className="mt-2">
                                        {errorMessage}
                                    </Alert>
                                )}
                                {successMessage && (
                                    <Alert variant="filled" severity="success" className="mt-2">
                                        {successMessage}
                                    </Alert>
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
