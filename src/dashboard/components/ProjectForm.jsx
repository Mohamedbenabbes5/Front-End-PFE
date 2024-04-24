import React, { useState, useEffect } from "react";
import {
    Col,
    Form,
    Input,
    FormFeedback,
    Label,
    Row,
    FormGroup,
} from "reactstrap";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const ProjectForm = ({ onUpdate }) => {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
    ]
  const [formData, setFormData] = useState({
    id: null,
    name: null,
    description: null,
    startdate: null,
    enddate: null,
    guests: []
  });
  const [errors, setErrors] = useState({});

  const handleChangeInputForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  useEffect(() => {
    // Génération d'un entier aléatoire sur 32 bits pour id lors du premier rendu
    const randomId = Math.round(Math.random() * Math.pow(2, 32));
    setFormData({ ...formData, id: randomId });
}, []);

  useEffect(() => {
    validateFields();
  }, [formData]);

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Project name is required";
    }

    if (!formData.startdate) {
      newErrors.startdate = "Start date is required";
    }

    if (!formData.enddate) {
      newErrors.enddate = "End date is required";
    }


    setErrors(newErrors);

    // Check if there are no errors
    if (Object.keys(newErrors).length === 0) {
        console.log("No errors");
        console.log(" errors",newErrors);
        console.log(" data prj",formData);
        
      onUpdate("project", formData,true); // Update parent component with valid data
    }
    else{
        onUpdate("project", formData,false); 
    }
  };

  return (
    <Form>
      <Row>
        <Col lg="12">
          <FormGroup>
            <Label>Project Name</Label>
            <Input
              name="name"
              type="text"
              required
              invalid={!!errors.name}
              className="form-control"
              placeholder="e.g., Tacoma Narrows Bridge"
              onChange={handleChangeInputForm}
            />
            {errors.name && (
              <FormFeedback>{errors.name}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <FormGroup>
            <Label>Start Date</Label>
            <Input
              name="startdate"
              type="date"
              required
              invalid={!!errors.startdate}
              className="form-control"
              onChange={handleChangeInputForm}
            />
            {errors.startdate && (
              <FormFeedback>{errors.startdate}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col lg="6">
          <FormGroup>
            <Label>End Date</Label>
            <Input
              name="enddate"
              type="date"
              required
              invalid={!!errors.enddate}
              className="form-control"
              onChange={handleChangeInputForm}
            />
            {errors.enddate && (
              <FormFeedback>{errors.enddate}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <FormGroup>
            <Label>Shared With</Label>
            <Autocomplete
              className="custom-autocomplete"
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Add guests"
                />
              )}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <FormGroup>
            <Label>Description</Label>
            <textarea
              name="description"
              className="form-control"
              rows="2"
              placeholder="Enter your description..."
              onChange={handleChangeInputForm}
            />
            {errors.description && (
              <FormFeedback>{errors.description}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectForm;

