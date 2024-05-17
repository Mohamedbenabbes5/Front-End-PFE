import React, { useState, useEffect } from "react";
import { Col, Form, Input, Label, Row, Card, CardBody, Container, } from "reactstrap";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TransitionAlerts from "../../components/TransitionAlerts";
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';

import InputFileUpload from "../../components/FileUploadButton";
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';



const InfrastForm = () => {

    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const { infrastrId } = useParams();
console.log({infrastrId});
    const [alertInfo, setAlertInfo] = useState(null); // Contient le type de message et le message lui-même sous forme d'objet {type, message}

  
    const [formData, setFormData] = useState({
        name: null,
        type: null,
        constructionDate: null,
        span: null,
        length: null,
        country: null,
        locationAddress: null,
        description: null,
        image: null, // Ajout du champ photo dans le formulaire
        
        
    });
    const [imagePreview, setImagePreview] = useState(null); // Nouvel état pour stocker l'URL de l'image prévisualisée

    const [errors, setErrors] = useState({});
    const handleChangeInputForm = (e) => {
        console.log('handleChangeInputForm infra form',formData);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        });
        console.log({formData});
    };
    const handleImageUpload = (file) => {

        setFormData({
            ...formData,
            image: file,
        });
        setImagePreview(URL.createObjectURL(file));


    };
    const fetchFormData = async (infrastrId) => {
        try {
    
          const response = await axios.get(`http://localhost:3000/infrastructure/get/${infrastrId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
    
          });
    
          const data = response.data.infrastructure;
          
          // Suppose que response.data contient un seul objet de données
          if (data) {
            const constructionDate = new Date(data?.constructionDate).toISOString().split('T')[0];
            setFormData(prevState => Object.assign({}, prevState, { ...data, constructionDate }));
        }
        

        } catch (error) {
          console.error('Erreur lors de la récupération des dommages :', error);
          // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
          navigate('/error');
        }
      };

    const onCreateInfrast = async (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire
        if (validateFields()) {
            try {
                console.log("Données du formulaire:", formData); // Journaliser formData pour le débogage
    
                var formDataToSend = new FormData();
                for (const key in formData) {
                    if (formData[key] !== null) {
                        formDataToSend.append(key, formData[key]);
                    }
                }
    
                // Envoyer la requête HTTP avec Axios en utilisant projectId
                const response = await axios.post('http://localhost:3000/infrastructure/create', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                navigate(`/dashboard/allinfrastructures`, { state: { successCreation: "Project created successfully" } });
    
            } catch (error) {
                // Gérer les erreurs
                setAlertInfo(error.response.data.message)
                console.error('Erreur:', error.response.data.message);
                // Définir alertInfo
            }
        }
    };
    
    const onUpdateInfrast = async (e) => {
        if (validateFields()) {
            try {
                const formDataToSend = new FormData();

                // Loop over formData and append each key-value pair to formDataToSend
              
                for (const key in formData) {
                    if (formData[key] !== null) {
                        formDataToSend.append(key, formData[key]);
                    }
                }
                formDataToSend.append('infrastrId', infrastrId);

                // Envoyez une requête HTTP avec Axios en utilisant projectId
                const response = await axios.post('http://localhost:3000/infrastructure/update',   formDataToSend,  {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                navigate(`/dashboard/allinfrastructures`, { state: { successCreation: "Project updated successfully" } });
    
            } catch (error) {
                // Gérer les erreurs
                setAlertInfo(error.response.data.message)
                console.error('Erreur:', error.response.data.message);
                // Définir alertInfo
            }
        }
    };

  

    useEffect(() => {
    

        if (infrastrId)
        {            
         fetchFormData(infrastrId)    
        }
    }, [infrastrId]);


    const validateFields = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = "Infrastructure name is required";
        }
        if (!formData.image?.type?.startsWith("image") && formData.image?.type) {
            newErrors.image = "Please select an image file.";
        }

        if (!formData.type) {
            newErrors.type = "Type is required";
        }

        //autre verification 

        setErrors(newErrors);

        // Check if there are no errors
        if (Object.keys(newErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <div className="page-content">
           
                <Container fluid={true}>


                    <Col lg="12" >
                      {alertInfo && (
                <div > 
                    <TransitionAlerts
                    type={"error"}
                    message={alertInfo}
                    onClose={() => { setAlertInfo(null) }}
                    variant={"filled"}
               
                /> 
                </div>
               
            )}
                        <Card className="Card">
                            <CardBody>
                                <h4 className="card-title mb-4">Creaction New Infrastructure   </h4>
                                <Form>
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="label-form">Infrastructure Name</Label>
                                                <Input
                                                    name="name"
                                                    value={formData.name}

                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    placeholder="e.g., Tacoma Narrows Bridge"
                                                    onChange={handleChangeInputForm}
                                                />
                                                {errors.name && <span className="text-danger">{errors.name}</span>}
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="label-form">Type</Label>
                                                <Input
                                                    type="text"
                                                    name="type"
                                                    value={formData.type}

                                                    required
                                                    className="form-control"
                                                    placeholder="e.g., Bridge, Dam, etc."
                                                    onChange={handleChangeInputForm}
                                                />
                                                {errors.type && <span className="text-danger">{errors.type}</span>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="label-form">Construction Date</Label>
                                                <Input
                                                    name="constructionDate"
                                                    type="date"
                                                    value={formData.constructionDate}

                                                    required
                                                    className="form-control"
                                                    onChange={handleChangeInputForm}
                                                />
                                                {errors.constructionDate && <span className="text-danger">{errors.constructionDate}</span>}
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label className="label-form">Span</Label>
                                                <Input
                                                    name="span"
                                                    value={formData.span}

                                                    type="number"
                                                    className="form-control"
                                                    placeholder="e.g., 853 m"
                                                    onChange={handleChangeInputForm}
                                                />
                                                {errors.span && <span className="text-danger">{errors.span}</span>}
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="mb-3">
                                                <Label className="label-form">Height</Label>
                                                <Input
                                                    name="length"
                                                    type="number"
                                                    value={formData.length}

                                                    className="form-control"
                                                    placeholder="e.g., 1,822 m"
                                                    onChange={handleChangeInputForm}
                                                />
                                                {errors.length && <span className="text-danger">{errors.length}</span>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="label-form">Country</Label>
                                                <Input
                                                    name="country"
                                                    required
                                                    value={formData.country}

                                                    type="text"
                                                    className="form-control"
                                                    placeholder="e.g., Canada"
                                                    onChange={handleChangeInputForm}
                                                />
                                                {errors.country && <span className="text-danger">{errors.country}</span>}
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="label-form">Location Address</Label>
                                                <Input
                                                    name="locationAddress"
                                                    type="text"
                                                    required
                                                    value={formData.locationAddress}

                                                    className="form-control"
                                                    placeholder="e.g., 1 Peace Brg, Buffalo, NY 14213"
                                                    onChange={handleChangeInputForm}
                                                />
                                                {errors.locationAddress && <span className="text-danger">{errors.locationAddress}</span>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="12">
                                            <div className="mb-3">
                                                <Label className="label-form">Description</Label>
                                                <textarea
                                                    name="description"
                                                    className="form-control"
                                                    rows="2"
                                                    value={formData.description}

                                                    placeholder="Enter your description..."
                                                    onChange={handleChangeInputForm}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <div className="mb-1">
                                                <InputFileUpload onImageUpload={handleImageUpload}></InputFileUpload>

                                            </div>
                                            {errors.image && <span className="text-danger">{errors.image}</span>}
                                            {imagePreview && <img src={imagePreview} alt="Uploaded" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />}

                                        </Col>



                                    </Row>
                                    <Row className="justify-content-end">
                                        <Col xs="auto">
                                            {infrastrId ? (<Link
                                                to="#"
                                                onClick={onUpdateInfrast}
                                                className="custom-button"
                                            >
                                               save and Update
                                            </Link>) : (<Link
                                                to="#"
                                                onClick={onCreateInfrast}
                                                className="custom-button"
                                            >
                                                 create
                                            </Link>)}
                                        </Col>
                                    </Row>
                                </Form>

                            </CardBody>
                        </Card>
                    </Col>


                </Container>
            </div>

        </>
    );
};

export default InfrastForm;
