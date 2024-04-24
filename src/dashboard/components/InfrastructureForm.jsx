import React, { useState, useEffect } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from '@mui/material/styles';
import InputFileUpload from "./FileUploadButton";
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const InfrastForm = ({ onUpdate }) => {


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
  const [errors, setErrors] = useState({});

  const handleChangeInputForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,

    });
  };
  const handleImageUpload = (file) => {
    
      setFormData({
        ...formData,
        image: file,
      });
 
  };

  useEffect(() => {
    validateFields();
  }, [formData]);

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Infrastructure name is required";
    }
    if ( formData.image) 
    {
      if (!formData.image.type.startsWith('image/')) {
      newErrors.image = "Please select an image file.";
    }
  }
    if (!formData.type) {
      newErrors.type = "Type is required";
    }
  
    //autre verification 

    setErrors(newErrors);

    // Check if there are no errors
    if (Object.keys(newErrors).length === 0) {
      onUpdate("infrastructue", formData, true); // Update parent component with valid data
    } else {
      onUpdate("infrastructue", formData, false);
    }
  };
  console.log('InfrastForm', formData);
  return (
    <Form>
      <Row>
        <Col lg="6">
          <div className="mb-3">
            <Label>Infrastructure Name</Label>
            <Input
              name="name"
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
            <Label>Type</Label>
            <Input
              type="text"
              name="type"
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
            <Label>Construction Date</Label>
            <Input
              name="constructionDate"
              type="date"
              required
              className="form-control"
              onChange={handleChangeInputForm}
            />
            {errors.constructionDate && <span className="text-danger">{errors.constructionDate}</span>}
          </div>
        </Col>
        <Col lg="3">
          <div className="mb-3">
            <Label>Span</Label>
            <Input
              name="span"
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
            <Label>Length</Label>
            <Input
              name="length"
              type="number"
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
            <Label>Country</Label>
            <Input
              name="country"
              required
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
            <Label>Location Address</Label>
            <Input
              name="locationAddress"
              type="text"
              required
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
          <div className="mb-4">
            <Label>Description</Label>
            <textarea
              name="description"
              className="form-control"
              rows="2"
              placeholder="Enter your description..."
              onChange={handleChangeInputForm}
            />
          </div>
        </Col>
      </Row>
      <Row>
      <Col lg="12">
        <div className="mb-1">
          <InputFileUpload onImageUpload={handleImageUpload}></InputFileUpload>

        </div>
        {errors.image && <span className="text-danger">{errors.image}</span>}


      </Col> 
      </Row>
    </Form>
  );
};

export default InfrastForm;
