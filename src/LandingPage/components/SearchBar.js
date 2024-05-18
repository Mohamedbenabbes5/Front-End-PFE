import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';


export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");


  const fetchData = async (value) => {
    try {
      const response = await axios.get("http://localhost:3000/users/get-allmanager");
      const results = response.data.AllManager
    console.log("results", results);
      setResults(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    
      <input
        placeholder="select manager name "
        value={input}
        className="form-control"
        onChange={(e) => handleChange(e.target.value)}
      />
   
  );
};
