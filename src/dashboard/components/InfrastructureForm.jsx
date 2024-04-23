import React, { useState, useEffect } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";

const InfrastForm = ({  onUpdate, triggerValidation  }) => {
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

  const handleChangeInputForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Appeler onUpdate chaque fois que formData change
    onUpdate(formData);
  }, [formData]); // Ajoutez formData comme dépendance

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
          </div>
        </Col>
        <Col lg="6">
          <div className="mb-3">
            <Label>Location Address</Label>
            <Input
              name="locationAddress"
              type="text" // Remplacez le type email par text
              required
              className="form-control"
              placeholder="e.g., 1 Peace Brg, Buffalo, NY 14213"
              onChange={handleChangeInputForm}
            />
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
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InfrastForm;
