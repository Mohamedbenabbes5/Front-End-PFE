import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Input,
  FormFeedback,
  Label,
  Row,

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
    id:null,
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
      console.log(" errors", newErrors);
      console.log(" data prj", formData);

      onUpdate("project", formData, true); // Update parent component with valid data
    }
    else {
      onUpdate("project", formData, false);
    }
  };

  return (
    <Form>
      <Row>
        <Col lg="12">

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
          {errors.name && <span className="text-danger">{errors.name}</span>}


        </Col>
      </Row>
      <Row>
        <Col lg="6">

          <Label>Start Date</Label>
          <Input
            name="startdate"
            type="date"
            required
            invalid={!!errors.startdate}
            className="form-control"
            onChange={handleChangeInputForm}
          />
          {errors.startdate && <span className="text-danger">{errors.startdate}</span>}
        </Col>
        <Col lg="6">

          <Label>End Date</Label>
          <Input
            name="enddate"
            type="date"
            required
            invalid={!!errors.enddate}
            className="form-control"
            onChange={handleChangeInputForm}
          /> 
          {errors.enddate && <span className="text-danger">{errors.enddate}</span>}
        </Col>
      </Row>
      <Row>
        <Col lg="12">

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
        </Col>
      </Row>
      <Row>
        <Col lg="12">

          <Label>Description</Label>
          <textarea
            name="description"
            className="form-control"
            rows="2"
            placeholder="Enter your description..."
            onChange={handleChangeInputForm}
          />
        {errors.description && <span className="text-danger">{errors.description}</span>}

        </Col>
      </Row>
    </Form>
  );
};

export default ProjectForm;

