import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo({ label, onSelectionChange, employeesList }) {
  const roles =  ['employee', 'inspector','expert', 'project manager' ];
  const decodedToken = localStorage.getItem('decodedToken');
  const userData = JSON.parse(decodedToken).user;

  const employeeId = userData.employeeId; // Récupération de l'id de l'utilisateur connecté
  let filteredEmployeesList=employeesList
  // Filtrer la liste des employés pour exclure l'utilisateur connecté
  if (employeeId !== null && employeeId !== undefined) {
    console.log("employees id exist");
    filteredEmployeesList = employeesList.filter(employee => employee.id !== employeeId);
  }

  const handleSelectionChange = (event, selectedUser) => {
    if (selectedUser) {
      onSelectionChange(selectedUser.id);
    } else {
      onSelectionChange(null); // Pour effacer la sélection, si nécessaire
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 520 }}>
      <Autocomplete
        id="free-solo-demo"
        options={filteredEmployeesList}
        getOptionLabel={(option) => `${option.firstname} ${option.lastname} (${roles[option.role]})`} // Afficher le nom complet de l'employé
        onChange={handleSelectionChange}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Stack>
  );
}
