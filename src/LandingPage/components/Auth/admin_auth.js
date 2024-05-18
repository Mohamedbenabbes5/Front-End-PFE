import React, { useState } from "react";
import { Col, Card, CardBody } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import axios from 'axios';
import BackgroundImageEmployee from '../../assets/images/bg/guest.jpg';
import TransitionAlerts from "../TransitionAlerts";
import { jwtDecode } from 'jwt-decode';
import Stack from '@mui/material/Stack';

export default function AminAuth() {
    const navigate = useNavigate();
    const [LoginError, setLoginError] = useState('');
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const Login = async (data) => {
        try {
            setLoginError('');
            const response = await axios.post(`http://localhost:3000/auth/superAdmin-login`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const token = response.data.accessToken;
                const decodedToken = jwtDecode(token);
                const decodedTokenData = JSON.stringify(decodedToken);
                localStorage.setItem('decodedToken', decodedTokenData);
                localStorage.setItem('accessToken', token);
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response?.data?.error) {
                setLoginError(error.response.data?.error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(formData);
    }

    return (
        <div className="container-fluid">


            <div className="row justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#f0f0f0" }}>
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
                <div className="col-lg-3">
                    <div className="back-to-home">
                        <Link to="/" className="back-button btn btn-icon btn-primary"><Icon.ArrowLeft className="icons" /></Link>
                    </div>
                    <div className="title-heading my-lg-auto">
                        <Card className="login-page border-0" style={{ zIndex: 1, backgroundColor: "#f0f0f0" }}>
                            <CardBody className="p-0">
                                <h2 className="card-title">Admin Login</h2>
                                <form className="login-form mt-4" onSubmit={handleSubmit}>
                                    <Col lg={12}>
                                        <div className="mb-3">
                                            <label className="form-label">Username <span className="text-danger">*</span></label>
                                            <input onChange={handleChange} type="text" className="form-control" placeholder="username" name="username" required />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="mb-3">
                                            <label className="form-label">Password <span className="text-danger">*</span></label>
                                            <input onChange={handleChange} type="password" className="form-control" placeholder="Password" name="password" required />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="d-flex justify-content-between">
                                            <div className="mb-3">
                                                <label className="form-check-label" >
                                                    Remember me
                                                    <input type="checkbox" className="form-check-input ms-2" />
                                                </label>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={12} mb={0}>
                                        <div className="d-grid">
                                            <button className="btn btn-primary ">Login</button>
                                        </div>
                                    </Col>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    )
}
