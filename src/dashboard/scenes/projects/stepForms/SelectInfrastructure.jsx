import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SelectInfrastructure = ({ onUpdate }) => {
  const [infrastructurelist, setInfrastructurelist] = useState([]);
  const [errors, setErrors] = useState(null);

  // Fonction pour récupérer les infrastructures depuis le backend
  const fetchInfrastructure = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://localhost:3000/infrastructure/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.infrastructures;
    } catch (error) {
      console.error("Error fetching infrastructure names:", error);
      return [];
    }
  };


  useEffect(() => {
    const fetchNames = async () => {
      const infrastructures = await fetchInfrastructure();
      setInfrastructurelist(infrastructures); // Mettre à jour le tableau des infrastructures
      console.log(infrastructures);
    };
    fetchNames();
  }, []);

  const handleInfrastructureChange = (event, value) => {
    if (value) {
      setErrors(null);   
      onUpdate("infrastructureID", value.id, true);

    }
    else {
      const newErrors = "selecting Infrastructure is required";
      onUpdate("infrastructureID", null, false);
      setErrors(newErrors);   
    }
  };


  return (
    <div >
      <h5 className="text-center"> Select Infrastructure</h5>
      <p className="text-muted text-center">Search and select the name of the infrastructure.</p>
      <Autocomplete
        className="custom-autocomplete"
        options={infrastructurelist} // Les infrastructures à afficher
        getOptionLabel={(option) => option.name} // Afficher seulement le nom
        onChange={handleInfrastructureChange} // Gérer le changement
        renderInput={(params) => <TextField {...params} label="Infrastructure Name" variant="outlined" />}
      />
         {errors && <span className="text-danger">{errors}</span>}

    </div>
  );
};

export default SelectInfrastructure;
