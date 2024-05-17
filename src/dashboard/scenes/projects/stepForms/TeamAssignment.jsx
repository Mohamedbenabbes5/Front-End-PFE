import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Label,
  Row,
} from "reactstrap";
import CheckboxesTags from "../../../components/CheckboxesTags";
import axios from 'axios';

const ProjectForm = ({ onUpdate }) => {
  const [employeeAssignment, setEmployeeAssignment] = useState({
    expertId: [],
    inspectorId: [],
    guestsId: []
  });
 
  const [errors, setErrors] = useState({});
  const [allEmployee, setAllEmployee] = useState([]);
  
  const fetchEmployee = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://localhost:3000/project/get-allemployee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.AllEmployee;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  };
 
  useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await fetchEmployee();
      setAllEmployee(employees);
    };
    fetchEmployees();
  }, []);

  const handleSelectedGuestsChange = (selectedGuests) => {
    console.log("handleSelectedGuests",selectedGuests);
    setEmployeeAssignment(prevState => ({
      ...prevState,
      guestsId: selectedGuests
    }));
  };

  const handleSelectedInspectorChange = (selectedInspector) => {
    setEmployeeAssignment(prevState => ({
      ...prevState,
      inspectorId: selectedInspector
    }));
  };

  const handleSelectedExpertChange = (selectedExpert) => {
    setEmployeeAssignment(prevState => ({
      ...prevState,
      expertId: selectedExpert
    }));
  };

  useEffect(() => {
    validateFields();
  }, [employeeAssignment]);

  const validateFields = () => {
    const newErrors = {};

    if (employeeAssignment.inspectorId?.length===0) {
      newErrors.inspectorId = "Inspector assignment is required";
    }

    if (employeeAssignment.expertId?.length===0) {
      newErrors.expertId = "Expert assignment is required";
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
console.log('emplouee assog',employeeAssignment);
    onUpdate("employeeAssignment", employeeAssignment, isValid);
  };

  return (
    <Form>
        <Col lg="12" className="form-row">
          <Label className="label-form">Visual Resource Manager assignment <span className="text-danger">*</span></Label>
          <CheckboxesTags
            Role={1}
            EmployeeList={allEmployee}
            onSelectionChange={handleSelectedInspectorChange}
          />
          {errors.inspectorId && <div className="text-danger">{errors.inspectorId}</div>}
        </Col>
        <Col lg="12" className="form-row">
          <Label className="label-form">Expert assignment <span className="text-danger">*</span> </Label>
          <CheckboxesTags
            Role={2}
            EmployeeList={allEmployee}
            onSelectionChange={handleSelectedExpertChange}
          />
          {errors.expertId && <div className="text-danger">{errors.expertId}</div>}
        </Col>
      
      
        <Col lg="12" className="form-row">
          <Label className="label-form">Shared Project With (these users have privileges to read only)</Label>
          <CheckboxesTags
            Role={0}
            EmployeeList={allEmployee}
            onSelectionChange={handleSelectedGuestsChange}
          />
        </Col>
      
    </Form>
  );
};

export default ProjectForm;
