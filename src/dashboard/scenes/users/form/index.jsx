import { Box, Button, TextField, Avatar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CountrySelect from "../../../components/CountrySelect";
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState, useEffect } from "react";
import TransitionAlerts from "../../../../LandingPage/components/TransitionAlerts";
import CircularProgress from '@material-ui/core/CircularProgress';
import defaultmanagerImage from "../../../../public/assets/manager.png";
import defaultemployeeImage from "../../../../public/assets/employee.jpg";
const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const actionType = location.state?.actionType;


  console.log("action", actionType);
  const decodedToken = localStorage.getItem('decodedToken');
  const token = localStorage.getItem('accessToken');
  const [selectedImage, setSelectedImage] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null); // Contient le type de message et le message lui-même sous forme d'objet {type, message}
  const [loading, setLoading] = useState(false);
  const [oldUserData, setOldUserData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // État pour suivre si les données ont été chargées ou non
  const profileImagesPath = 'http://localhost:3000/uploads/profileImages/';



  let userData = JSON.parse(decodedToken).user;

  const fallbackSrc = userData.user === 'employee' ? defaultemployeeImage : (userData.user === 'manager' ? defaultmanagerImage : null);

  useEffect(() => {
    // Vérifiez si location.state est défini
    if (location.state?.profileData) {
      // Utilisez les données de location.state pour initialiser la variable
      const { firstname, lastname, email, phone, address, companyname } = location.state?.profileData;
      console.log(" location.state?.oldUserData", location.state?.profileData.address);
      setOldUserData({
        firstname: firstname || '',
        lastname: lastname || '',
        email: email || '',
        phone: phone || '',
        address: address || '',
        companyname: companyname || '',
      });

    }
    setDataLoaded(true); // Indiquer que les données ont été chargées
    console.log("dataLoaded", dataLoaded);

  }, [location.state]); // Assurez-vous de spécifier location.state dans les dépendances du useEffect
  console.log("dataLoaded", dataLoaded);
  const newUserData = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    manager: '',
    status: '',
    ...(userData?.user === "superAdmin" && { companyname: '' }),
    ...(userData?.user === "manager" && { role: '' }),
  }
  const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("required").trim(),
    lastname: yup.string().required("required").trim(),
    email: yup.string().email("invalid email").required("required").trim(),
    ...(userData?.user === "superAdmin" && { companyname: yup.string().required("required").trim() }),
    image: yup
      .mixed()
      .test("fileType", "Seules les images sont autorisées", (value) => {
        if (!value) return true;
        return value.type && value.type.startsWith("image/");
      })
      .nullable(),

  });

  const handleFormSubmit = async (values) => {
    console.log("handleFormSubmit exec", values);
    setAlertInfo('')
    setLoading(true);
    var formDataToSend = new FormData();
    for (const key in values) {
      if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
        formDataToSend.append(key, values[key]);
      }
    }

    var response;
    if (actionType === 'create') {
      if (userData.user === 'manager') {
        try {
          formDataToSend.append("managerId", userData.managerId);
          response = await axios.post(`http://localhost:3000/users/create-employee`, formDataToSend, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          navigate(`/dashboard/employees`, { state: { successCreation: response.data.message } });
        }

        catch (error) {
          setAlertInfo(error.response.data.error)
        }
        finally {
          setLoading(false); // Arrêter le chargement
        }
      }
      else if (userData.user === 'superAdmin') {
        try {
          response = await axios.post(`http://localhost:3000/users/create-manager`, formDataToSend, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          navigate(`/dashboard/companies`, { state: { successCreation: response.data.message } });
        }

        catch (error) {
          setAlertInfo(error.response.data.error)
        }
        finally {
          setLoading(false); // Arrêter le chargement
        }
      }
    }

    else if (actionType === 'update') {
      if (userData.user === 'manager') {
        try {
          formDataToSend.append("id", userData.managerId);
          response = await axios.post(`http://localhost:3000/users/update-manager`, formDataToSend, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          navigate(`/dashboard/profile`, { state: { successCreation: response.data.message } });
        }

        catch (error) {
          setAlertInfo(error.response.data.error)
        }
        finally {
          setLoading(false); // Arrêter le chargement
        }
      }
      else if (userData.user === 'employee') {
        try {
          formDataToSend.append("id", userData.employeeId);

          response = await axios.post(`http://localhost:3000/users/update-employee`, formDataToSend, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          navigate(`/dashboard/profile`, { state: { successCreation: response.data.message } });

        }

        catch (error) {
          setAlertInfo(error.response.data.error)
        }
        finally {
          setLoading(false); // Arrêter le chargement
        }
      }
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
        fontSize: '20px',
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
      label: 'Inspector',
    },
    {
      value: '2',
      label: 'Expert',
    },
    {
      value: '3',
      label: 'Project Manager',
    }
  ];
  const status = [
    {
      value: '2',
      label: 'activate',
    },
    {
      value: '0',
      label: 'pending',
    },
    {
      value: '1',
      label: 'suspended',
    },
  ];
  console.log("dataLoaded", dataLoaded);

  return (
    <Box width="900px" mx="auto" > {/* Ajout de mb={4} pour une marge en bas */}
      {dataLoaded && ( // Conditionner le rendu du composant Formik lorsque les données sont chargées

        <Formik
          initialValues={oldUserData || newUserData}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        // Ajout de marginBottom directement sur le formulaire

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
            <Box mt={4}>
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
                      ) : actionType === "update" ? (
                        <div className="image-container">
                          <img src={profileImagesPath + "/" + userData.profileImage} alt="Profile"

                            onError={(e) => { e.target.src = fallbackSrc }}

                          />
                        </div>
                      ) : <Avatar sx={{ width: 150, height: 150 }}>
                        <PersonIcon sx={{ fontSize: 80 }} />
                      </Avatar>

                      }
                    </div>
                  </label>
                </Box>
                {alertInfo && (
                  <div >
                    <TransitionAlerts
                      type={"error"}
                      message={alertInfo}
                      onClose={() => { }}
                      variant={"filled"}

                    />
                  </div>

                )}
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
                  {actionType === "update" &&

                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      disabled
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

                    />}
                  {
                    actionType === "create" &&
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
                    />}
                  {(userData.user === "superAdmin" || (userData.user === "manager" && actionType === "update")) &&
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
                  {(userData.user === "manager" && actionType === "create") && <TextField
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
                  {actionType === "create" &&
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
                  }




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
                <Box mt={4} textAlign="right"> {/* Ajout de marge en haut pour espacer du formulaire */}
                  {loading && (
                    <CircularProgress
                      style={{ marginRight: "10px", color: 'green' }}
                      disableShrink
                      className="CircularProgress"
                    />
                  )}

                  {
                    actionType === "create" ? (
                      userData?.user === "superAdmin" ? (
                        <Button type="submit" color="secondary" variant="contained">
                          Create Manager
                        </Button>
                      ) : userData?.user === "manager" ? (
                        <Button type="submit" color="secondary" variant="contained">
                          Create New Employee
                        </Button>
                      ) : null
                    ) : actionType === "update" ? (
                      <Button type="submit" color="secondary" variant="contained">
                        Update
                      </Button>
                    ) : null
                  }




                </Box>
              </form>
            </Box>

          )}

        </Formik>
      )}
    </Box>
  );
};




export default Form;
