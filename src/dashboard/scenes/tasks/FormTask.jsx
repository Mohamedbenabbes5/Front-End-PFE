import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FreeSolo from "../../components/FreeSolo";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TransitionAlerts from "../../../LandingPage/components/TransitionAlerts";
import axios from 'axios';

const FormTask = ({ isOpen, onClose ,onAlert}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigneeId: null
  });
  const [allEmployees, setAllEmployees] = useState([]);

  const token = localStorage.getItem('accessToken');

  const handleOpen = async () => {
    // Fetch  employees only when the dialog is opened
    const Employees = await fetchEmployee();
    setAllEmployees(Employees);
  };

  const handleClose = () => {
    onClose();
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/get-allassignee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.EmployeeNames;
    } catch (error) {
      console.error("Error fetching  employees:", error);
      return [];
    }
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const response = await axios.post("http://localhost:3000/missions/create-mission", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Mission created:", response.data);

        // Reset the form after mission creation
        setFormData({
          title: "",
          description: "",
          assigneeId: null
        });
        setIsAccepted(false);

        onAlert({ type: "success", message: response.data.message });
        onClose(); // Close the dialog after mission creation
      } catch (error) {
        onAlert({ type: "error", message: error.response.data.error });
        console.error("Error creating mission:", error);
      }
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Mission title is required";
    }

    if (!formData.description) {
      newErrors.description = "Mission description is required";
    }

    if (!formData.assigneeId) {
      newErrors.assigneeId = " employee is required";
    }

    setErrors(newErrors);

    // Check if there are no errors
    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle disableTypography>
        <Typography variant="h1">Create New Mission</Typography>
        <IconButton onClick={handleClose} style={{ float: 'right' }}>
          <CloseIcon color="primary"></CloseIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <FreeSolo
            label="Employee"
            employeesList={allEmployees}
            onSelectionChange={(selectedId) => setFormData({ ...formData, assigneeId: selectedId })}
          />
          {errors.assigneeId && <span className="text-danger">{errors.assigneeId}</span>}
          <TextField
            variant="outlined"
            label="Mission Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <span className="text-danger">{errors.title}</span>}
          <TextField
            variant="outlined"
            label="Description Mission"
            rows={4}
            multiline
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && <span className="text-danger">{errors.description}</span>}
          <FormControlLabel
            control={<Checkbox color="primary" checked={isAccepted} onChange={(e) => setIsAccepted(e.target.checked)} />}
            label="All data is valid"
          />
          <Button color="success" variant="contained" onClick={handleSubmit} disabled={!isAccepted}>Create Mission</Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        {/* Add actions if needed */}
      </DialogActions>
    </Dialog>
  );
};

export default FormTask;
