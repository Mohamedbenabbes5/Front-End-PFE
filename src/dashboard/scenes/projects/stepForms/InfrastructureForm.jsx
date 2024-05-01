import React, { useState, useEffect } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";

import { styled } from '@mui/material/styles';
import InputFileUpload from "../../../components/FileUploadButton";

const InfrastForm = ({ onUpdate,oldData }) => {


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
  console.log('old data infrastructure',oldData);
  console.log('formdata infrastructure',formData);

    if (oldData) {
      setFormData({
        name: oldData.name || null,
        type: oldData.type || null,
        constructionDate: oldData.constructionDate ||  null,
        span: oldData.span || null,
        length: oldData.length || null,
        country: oldData.country || null,
        locationAddress: oldData.locationAddress || null,
        description: oldData.description || null,
        image:oldData.image || null,
      })
    }
    validateFields();
  }, [oldData]);

  
  useEffect(() => {
      console.log('formdata infrastructure',formData);

    validateFields();
  }, [formData]);


  const validateFields = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Infrastructure name is required";
    }
    if (  !formData.image?.type?.startsWith("image") && formData.image?.type  )
    {
      newErrors.image = "Please select an image file.";
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
  return (
    <Form>
      <Row>
        <Col lg="6">
          <div className="mb-3">
            <Label>Infrastructure Name</Label>
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
            <Label>Type</Label>
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
            <Label>Construction Date</Label>
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
            <Label>Span</Label>
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
            <Label>Height</Label>
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
            <Label>Country</Label>
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
            <Label>Location Address</Label>
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
          <div className="mb-4">
            <Label>Description</Label>
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
