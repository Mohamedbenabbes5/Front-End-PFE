import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SelectInfrastructure = ({ onUpdate }) => {
  const [infrastructurelist, setInfrastructurelist] = useState([]);
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);

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
    const fetchNames = async () => {
      const infrastructures = await fetchInfrastructure();
      setInfrastructurelist(infrastructures); // Mettre à jour le tableau des infrastructures
    };
    fetchNames();
  }, []);

  useEffect(() => {
    if (selectedInfrastructure) {
      onUpdate(selectedInfrastructure); // Passez la valeur mise à jour si non-null
    }
  }, [selectedInfrastructure]); // L'effet ne se déclenche que lorsque selectedInfrastructure change
  
  const handleInfrastructureChange = (event,value) => {
    if (value) {
      // Lorsque l'utilisateur sélectionne une infrastructure, enregistrer l'ID
      setSelectedInfrastructure({"id":value.id});
      onUpdate(selectedInfrastructure);
    }
  };
  

console.log("SelectedInfrastructure",selectedInfrastructure)
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
    </div>
  );
};

export default SelectInfrastructure;
