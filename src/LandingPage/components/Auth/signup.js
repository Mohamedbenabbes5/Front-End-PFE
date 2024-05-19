import React, { Component, useState, useEffect } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import * as Icon from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import BackgroundImagemanager from '../../assets/images/bg/admin4.jpeg';
import BackgroundImageEmployee from '../../assets/images/bg/guest.jpg';
import Logo from "../../assets/images/logo.png";
import PhoneInput from 'react-phone-input-2'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SearchBar } from "../SearchBar";
import Select from 'react-select';

/**
 * Signup component
 */
export default function Signup() {
    const [selectedManager, setSelectedManager] = useState(null);
    const [allManager, setAllManager] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);

    // Fonction de gestion pour mettre à jour le rôle sélectionné
    const handleRoleChange = (selectedRole) => {
        setSelectedRole(selectedRole);
        setFormData({
            ...formData, ["role"]: selectedRole.value
        })
    };

    const loadUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/auth/get-allmanager`);
            setAllManager(response.data.AllManager);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs :', error);
        }
    };


    let { state } = useLocation();
    const user = state?.userType
    console.log(user)
    const [isAccepted, setIsAccepted] = useState(false);
    const handleCheckboxChange = (e) => {
        setIsAccepted(e.target.checked);
    };

    const handleManagerChange = selectedManager => {
        setSelectedManager(selectedManager);
        setFormData({
            ...formData, ["managerId"]: selectedManager.value
        })
    };




    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        companyname: '',
        // phone: '',

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

    const UserRegister = async (data) => {
        try {
            console.log("UserRegister called",data);
            const response = await axios.post(`http://localhost:3000/auth/${user}-register`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Enregistrement réussi, afficher un message de succès et rediriger vers la page de connexion
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    navigate(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}`,
                        { state: { userType: user } });

                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                // Si le serveur renvoie un message d'erreur, afficher le message d'erreur
                setErrorMessage(error.response.data.error);
            } else {
                // Si une autre erreur se produit, afficher un message d'erreur génériqueinspectify
                setErrorMessage("An error occurred while registering account.");
            }
        }
    };
    // const EmployeeRegister = async (data) => {
    //     try {
    //         console.log("UserRegister called");
    //         const response = await axios.post(`http://localhost:3000/auth/${user}-register`, data, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (response.status === 200) {
    //             // Enregistrement réussi, afficher un message de succès et rediriger vers la page de connexion
    //             setSuccessMessage(response.data.message);
    //             setTimeout(() => {
    //                 navigate(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}`,
    //                     { state: { userType: user } });

    //             }, 2000);
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.data.error) {
    //             // Si le serveur renvoie un message d'erreur, afficher le message d'erreur
    //             setErrorMessage(error.response.data.error);
    //         } else {
    //             // Si une autre erreur se produit, afficher un message d'erreur génériqueinspectify
    //             setErrorMessage("An error occurred while registering account .");
    //         }
    //     }
    // };
    // const registerEmployee = async (data) => {
    //     try {
    //         const response = await axios.post('/register-employee', data);
    //         if (response.status === 200) {
    //             console.log('Employee registered successfully');
    //             // Rediriger ou effectuer d'autres actions en fonction du succès de l'enregistrement
    //         } else {
    //             console.error('Failed to register employee');
    //             // Gérer les erreurs d'enregistrement
    //         }
    //     } catch (error) {
    //         console.error('Error registering employee:', error);
    //         // Gérer les erreurs réseau ou autres erreurs
    //     }
    // };
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
        if (user === "manager" && formData.companyname.length == 1) {
            validationErrors.companyname = "manager name  is not valid";
        }
        console.log("formData.managerId?.length", formData.managerId?.length);
        if (user === "employee" && (!formData.managerId || formData.managerId === "")) {
            validationErrors.companyname = "please select your manager";
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

            // Call function for registering manager
            if (user === "employee") {
                const { confirmPassword, companyname, ...newformData } = formData;
                UserRegister(newformData);
            }
            else if (user === "manager") {
                const { confirmPassword, ...newformData } = formData;
                UserRegister(newformData);

            }
        }

    }
    console.log({ selectedManager });
    console.log({ formData });

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
                            <div className="mt-md-0  text-center">
                                <Link to="/"><img src={Logo} alt="" width="200px" /></Link>
                            </div>

                            <div className="cover-user-img d-flex align-items-center  ">

                                <Row>
                                    <div className="col-12 ">
                                        <div className="d-flex flex-column auth-hero ">

                                            <div className="title-heading my-lg-auto ">
                                                <Card className="border-0 " style={{ zIndex: 1 }}>
                                                    <CardBody className="p-0 mt-0">
                                                        <h4 className="card-title " >{user === "employee" ? "Employee Register" : "Manager Register"}</h4>



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
                                                                <Col md={12} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">manager name <span className="text-danger">*</span></label>
                                                                        {user === "manager" && (<input onChange={handleChange} type="text" className="form-control" placeholder="e.g. ABC Inc" name="companyname" required />)}
                                                                        {user === "employee" && (<div className="search-bar-container">
                                                                            <Select
                                                                                value={selectedManager}
                                                                                onChange={handleManagerChange}
                                                                                options={allManager.map(manager => ({ value: manager.id, label: manager.companyname }))}
                                                                                isSearchable // Permet la recherche dans le menu
                                                                                placeholder="Select your manager name"
                                                                                onFocus={loadUsers} // Appel de loadUsers lors du focus sur le champ de recherche
                                                                            />
                                                                        </div>)}
                                                                    </div>
                                                                </Col>
                                                                {errors.companyname && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errors.companyname}</span>}
                                                                {user === "employee" && (<Col md={12} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Role<span className="text-danger">*</span></label>
                                                                        <Select
                                                                            value={selectedRole} // Utilisez selectedRole et non selectedManager car il s'agit d'une autre sélection
                                                                            onChange={handleRoleChange} // Assurez-vous de définir la fonction de gestion du changement
                                                                            options={[
                                                                                { value: 0, label: "Guest" },
                                                                                { value: 1, label: "Inspecteur" },
                                                                                { value: 2, label: "Expert" },
                                                                                { value: 3, label: "Project Manager" }
                                                                            ]}
                                                                            isSearchable // Permet la recherche dans le menu
                                                                            placeholder="Select employee role" // Placeholder en anglais
                                                                        />
                                                                    </div>
                                                                </Col>)}

                                                                <Col md={12} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Location Adresse <span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="Location Adresse" name="address" required />
                                                                    </div>
                                                                </Col>



                                                                <Col md={12} >
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Email<span className="text-danger">*</span></label>
                                                                        <input onChange={handleChange} type="text" className="form-control" placeholder="example@example.com" name="email" required />
                                                                    </div>
                                                                    {errors.email && <span style={{ color: 'red', fontSize: "14px", marginLeft: "10px" }}>{errors.email}</span>}
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
                                                                    <p className="mb-0 mt-3"><small className="text-dark me-2">Already have an account ?</small> <Link to="/auth/login" className="text-dark fw-bold" state={{ userType: user }} >  {user == "manager" ? "Sign in" : "Join"}</Link></p>
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
