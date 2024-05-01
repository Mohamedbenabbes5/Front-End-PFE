import { Box, Button, TextField, useTheme, Avatar } from "@mui/material";
import { tokens } from "../../../theme";
import { useState } from 'react';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person'; // Importez l'icône Person par défaut

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      setFieldValue("image", imageFile); // Mettez à jour la valeur de l'image avec setFieldValue
    }
  };

  return (
    <Box width="900px"
      mx="auto"
    >


      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue // Ajoutez cette fonction pour mettre à jour la valeur de l'image

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
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="admin name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.admin}
                name="admin"
                error={!!touched.admin && !!errors.admin}
                helperText={touched.admin && errors.admin}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required").trim(),
  lastName: yup.string().required("required").trim(),
  email: yup.string().email("invalid email").required("required").trim(),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required").trim(),
  address: yup.string().required("required").trim(),
  admin: yup.string().required("required").trim(),
  image: yup
  .mixed()
  .test("fileType", "Seules les images sont autorisées", (value) => {
    if (!value) return true; // Permettre une valeur nulle (pas de fichier sélectionné)
    return value && value.type.startsWith("image/"); // Vérifier si le type de fichier commence par "image/"
  })
  .test("videoType", "Seules les vidéos ne sont pas autorisées", (value) => {
    if (!value) return true; // Permettre une valeur nulle (pas de fichier sélectionné)
    return !value.type.startsWith("video/"); // Vérifier si le type de fichier ne commence pas par "video/"
  })
  .nullable(),
});
const initialValues = {
  firstName: "",
  lastName: "",
  admin: "",
  email: "",
  contact: "",
  address: "",
  image: null,
};

export default Form;
