import { Box, Button, TextField, Avatar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CountrySelect from "../../../components/CountrySelect";
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState, useEffect } from "react";

const Form = () => {
  const location = useLocation();
  const actionType = location.state?.actionType;
  console.log("action", actionType);
  const decodedToken = localStorage.getItem('decodedToken');
  const token = localStorage.getItem('accessToken');
  const [selectedImage, setSelectedImage] = useState(null);


  let userData;
  if (decodedToken) {
    userData = JSON.parse(decodedToken).user;
    console.log('Données de l\'utilisateur :', userData);
  } else {
    console.error('Données de l\'utilisateur non trouvées dans le localStorage.');
  }
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    status: '',
    image: null,
    ...(userData?.user === "superadmin" && { companyname: '' }),
    ...(userData?.user === "company" && { role: '' }),
  }
  const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("required").trim(),
    lastname: yup.string().required("required").trim(),
    email: yup.string().email("invalid email").required("required").trim(),
    ...(userData?.user === "superadmin" && { companyname: yup.string().required("required").trim() }),
    image: yup
      .mixed()
      .test("fileType", "Seules les images sont autorisées", (value) => {
        if (!value) return true;
        return value && value.type.startsWith("image/");
      })
      .nullable(),
  });

  const handleFormSubmit = async (values) => {
    console.log("handleFormSubmit exec", values);
    try {
      var formDataToSend = new FormData();
      for (const key in values) {
        if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
          formDataToSend.append(key, values[key]);
        }
      }

      let response;
      if (actionType === 'create') {
        if (userData.user === "company") {
          formDataToSend.append("companyId", userData.companyId);

          response = await axios.post('http://localhost:3000/users/create-employee', formDataToSend, {
            headers: {
              'Authorization': `Bearer ${token}`    ,
                'Content-Type': 'multipart/form-data'

            }
          });
        } else if (userData.user === "superadmin") {
          response = await axios.post(`http://localhost:3000/...`, values, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          });
        }
      } else if (actionType === 'update') {
        response = await axios.put(`/api/users/`, values);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      setFieldValue("image", imageFile); // Mettez à jour la valeur de l'image avec setFieldValue
    }
  };
  const labelStyles = {
    '& .MuiInputLabel-outlined': {
      '&.Mui-focused': {
        color: 'secondary.main',
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
  };

  const role = [
    {
      value: '0',
      label: 'employee',
    },
    {
      value: '1',
      label: 'Project Manager',
    },
    {
      value: '2',
      label: 'Expert',
    },
    {
      value: '3',
      label: 'Inspector',
    }
  ];
  const status = [
    {
      value: '1',
      label: 'activate',
    },
    {
      value: '0',
      label: 'pending',
    },
  ];

  return (
    <Box width="900px" mx="auto">
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={5}
            >
              <label className="avatar-container">
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  onBlur={handleBlur}
                  value={selectedImage ? '' : undefined} // Définissez la valeur sur une chaîne vide ou undefined lorsque selectedImage est null

                  name="image"
                  error={!!touched.image && !!errors.image}
                  helperText={touched.image && errors.image}
                  variant="filled"

                />
                <div className="avatar-preview">
                  <div className="edit-overlay">
                    <PhotoCameraIcon className="edit-icon" />
                  </div>
                  {selectedImage ? (
                    <div className="image-container">
                      <img src={URL.createObjectURL(selectedImage)} alt="Profile" />
                    </div>
                  ) : (
                    <div className="image-container">
                      <Avatar sx={{ width: 150, height: 150 }}>
                        <PersonIcon sx={{ fontSize: 80 }} />
                      </Avatar>
                    </div>
                  )}
                </div>
              </label>
            </Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"

            >


              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                name="firstname"
                error={!!touched.firstname && !!errors.firstname}
                helperText={touched.firstname && errors.firstname}
                sx={{
                  gridColumn: "span 2",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
                error={!!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
                sx={{
                  gridColumn: "span 2",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}
              />

              {userData.user === "superadmin" &&
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyname}
                  name="companyname"
                  error={!!touched.companyname && !!errors.companyname}
                  helperText={touched.companyname && errors.companyname}
                  sx={{
                    gridColumn: "span 4",
                    ...labelStyles, // Appliquer les styles pour les labels ici

                  }}
                />
              }
              {userData.user === "company" && <TextField
                id="outlined-select-currency"
                variant="outlined"
                select
                label="Role"
                helperText="Please select the role "
                onChange={handleChange}
                name="role"
                defaultValue="0"
               value="0"
                sx={{
                  gridColumn: "span 4",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}
              >
                {role.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              }
              <TextField
                id="outlined-select-currency"
                variant="outlined"
                select
                label="Status"
                onChange={handleChange}
                name="status" 
                defaultValue="0"
                value="0"
                helperText="Please select the status of account "
                sx={{
                  gridColumn: "span 4",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>



              {userData.user === "superadmin" && <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="company name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
                name="company"
                error={!!touched.company && !!errors.company}
                helperText={touched.company && errors.company}
                sx={{
                  gridColumn: "span 4",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}

              />}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 4",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                sx={{
                  gridColumn: "span 4",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                sx={{
                  gridColumn: "span 4",
                  ...labelStyles, // Appliquer les styles pour les labels ici

                }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};




export default Form;
