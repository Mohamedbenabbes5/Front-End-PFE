import React, { useState, useEffect } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";

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
  });
  const [errors, setErrors] = useState({});

  const handleChangeInputForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

    if (!formData.type) {
      newErrors.type = "Type is required";
    }

    // if (!formData.constructionDate) {
    //   newErrors.constructionDate = "Construction date is required";
    // }

    // if (!formData.span) {
    //   newErrors.span = "Span is required";
    // } else if (isNaN(formData.span)) {
    //   newErrors.span = "Span must be a number";
    // }

    // if (!formData.length) {
    //   newErrors.length = "Length is required";
    // } else if (isNaN(formData.length)) {
    //   newErrors.length = "Length must be a number";
    // }

    // if (!formData.country) {
    //   newErrors.country = "Country is required";
    // }

    // if (!formData.locationAddress) {
    //   newErrors.locationAddress = "Location address is required";
    // }

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
          <div className="mb-3">
            <Label>Description</Label>
            <textarea
              name="description"
              className="form-control"
              rows="2"
              placeholder="Enter your description..."
              onChange={handleChangeInputForm}
            />
            {/* Ajoutez la validation et les messages d'erreur pour le champ Description si nécessaire */}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InfrastForm;
