import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SelectInfrastructure = ({ onUpdate, triggerValidation }) => {
  const [infrastructurelist, setInfrastructurelist] = useState([]);
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);
  const [errors, setErrors] = useState(null);

  // Fonction pour récupérer les infrastructures depuis le backend
  const fetchInfrastructure = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://localhost:3000/get/all-infrastructures", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching infrastructure names:", error);
      return [];
    }
  };
  useEffect(() => {
    if (selectedInfrastructure && selectedInfrastructure.id != null) {
      onUpdate("infrastructue", selectedInfrastructure, true);
    }
    else {
      const newErrors = "selecting Infrastructure is required";
      setErrors(newErrors);     
       onUpdate("infrastructue", selectedInfrastructure, false);
    }
  }, [selectedInfrastructure]);


  useEffect(() => {
    const fetchNames = async () => {
      const infrastructures = await fetchInfrastructure();
      setInfrastructurelist(infrastructures); // Mettre à jour le tableau des infrastructures
    };
    fetchNames();
  }, []);

  const handleInfrastructureChange = (event, value) => {
    if (value) {
      // Lorsque l'utilisateur sélectionne une infrastructure, enregistrer l'ID
      setSelectedInfrastructure({ "id": value.id });
    }
  };


  return (
    <div className="text-center">
      <h5>Select Infrastructure</h5>
      <p className="text-muted">Search and select the name of the infrastructure.</p>
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
