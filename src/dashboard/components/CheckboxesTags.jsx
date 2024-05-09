import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export default function CheckboxesTags({ EmployeeList, onSelectionChange ,Role}) {
    const filteredEmployees = EmployeeList.filter(employee => employee.role === Role);
    const handleSelectionChange = (event, selectedUsers) => {
        if (onSelectionChange) {
            const selectedUserIds = selectedUsers.map(user => user.id);

          onSelectionChange(selectedUserIds);
        }
      };
    
  return (
    <Autocomplete
      multiple
      onChange={handleSelectionChange}

      className="custom-autocomplete"
      id="checkboxes-tags-demo"
      options={filteredEmployees}
      disableCloseOnSelect
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`} // Afficher le nom complet de l'employé
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {`${option.firstname} ${option.lastname}`} 
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} />
      )}
    />
  );
}


