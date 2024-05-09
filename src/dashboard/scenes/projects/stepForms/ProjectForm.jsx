import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Input,
  Label,
  Row,

} from "reactstrap";

const ProjectForm = ({ onUpdate, oldData }) => {

  const [formData, setFormData] = useState({
    name: null,
    description: null,
    startdate: null,
    enddate: null,
  });
  const [errors, setErrors] = useState({});


  const handleChangeInputForm = (e, v) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // useEffect(() => {
  //   console.log('useEffect:');

  //   console.log('oldData:', oldData);
  //   console.log('formdata:', formData);

  //   if (oldData) {
  //     setFormData({
  //       id: oldData.id || null,
  //       name: oldData.name || null,
  //       description: oldData.description || null,
  //       startdate: oldData.startdate || null,
  //       enddate: oldData.enddate || null,
  //       employees: oldData.employees || []
  //     })
  //   }
  //   validateFields();
  // }, [oldData]);


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

      onUpdate("projectForm", formData, true); // Update parent component with valid data
    }
    else {
      onUpdate("projectForm", formData, false);
    }
  };

  console.log("frm data project form ", formData);
  return (
    <Form>
      <Row className="form-row">
        <Col lg="12">

          <Label>Project Name</Label>
          <Input
            name="name"
            type="text"
            style={{ marginBottom: '2px' }}
            value={formData.name}
            required
            invalid={!!errors.name}
            className="form-control"
            placeholder="e.g., Tacoma Narrows Bridge"
            onChange={handleChangeInputForm}
          />
          {errors.name && <span className="text-danger">{errors.name}</span>}


        </Col>
      </Row>
      <Row className="form-row">
        <Col lg="6">

          <Label>Start Date</Label>
          <Input
            name="startdate"
            style={{ marginBottom: '2px' }}
            type="date"
            value={formData.startdate}
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
            style={{ marginBottom: '2px' }}
            name="enddate"
            type="date"
            value={formData.enddate}
            required
            invalid={!!errors.enddate}
            className="form-control"
            onChange={handleChangeInputForm}
          />
          {errors.enddate && <span className="text-danger">{errors.enddate}</span>}
        </Col>
      </Row>

      <Row className="form-row">
        <Col lg="12">

          <Label>Description</Label>
          <textarea
            style={{ marginBottom: '2px' }}
            name="description"
            className="form-control"
            value={formData.description}
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

