import React, { useState } from 'react';
import SearchBar from "../../components/SearchProjectsBar";
import UiCards from "../../components/UiCards";
const Projects = () => {
  const [projects, setProjects] = useState([
    { id: 1, status:"completed",subtitle:"Bridge " ,title: 'Project 1', description: 'Description frrrrrrrrrrrrrrrrrrrrrror Project 1', image: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg' },
    { id: 2, status:"completed",subtitle:"Bridge " ,title: 'Project 2', description: 'Description forrrrrrrrrrrrrrrrrrrrrr Project 2',    image: 'https://www.bft-international.com/imgs/1/5/5/9/2/0/7/03_05_abb02-72d2cfb2f8936038.jpeg' },
    { id: 3, status:"incompleted",subtitle:"Bridge " ,title: 'Project 3', description: 'Description for rrrrrrrrrrrrrrrrrrrrrrrrrrrProjectProjectrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrProjectrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrProject 3ereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyy',    image: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg' },
    { id: 4, status:"completed",subtitle:"Bridge " ,title: 'Projecylt 4', description: 'Description frrrrrrrrrrrrrrrrrrrrrrrrror Project 4',    image: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg' },
    { id: 14, status:"incompleted",subtitle:"Bridge " ,title: 'Project yl1', description: 'Description rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrfor P;roject 1',    image: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg' },
    { id: 12, status:"completed",subtitle:"Bridge " ,title: 'Projeyct 2', description: 'Description foryk Project 2',    image: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg' },
    { id: 37, status:"incompleted",subtitle:"Bridge " ,title: 'Projlyect 3k', description: 'Description rkfor Project 3',    image: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg' },
    { id: 47, status:"incompleted",subtitle:"Bridge " ,title: 'Proje-ct u4', description: 'Description rk-for Project 4',    image: 'https://civildigital.com/wp-content/uploads/2015/08/Prestresed-I-girders.jpg' }
    // Ajoutez d'autres projets au besoin
  ]);
    return (
        <div>
          <SearchBar></SearchBar>
          <UiCards projects={projects} />

        


        </div>
    )




}


export default Projects;