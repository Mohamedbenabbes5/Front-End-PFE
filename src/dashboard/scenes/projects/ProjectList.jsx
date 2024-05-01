import React, { useState, useEffect } from 'react';
import SearchBar from "../../components/SearchProjectsBar";
import UiCards from "../../components/UiCards";
import { Col, Row, Container } from "reactstrap";
import axios from 'axios';
import InputFileUpload from '../../components/FileUploadButton';





const Projects = () => {
  const token = localStorage.getItem('accessToken');
  const [projects, setProjects] = useState([]);
  const fetchDamages = async () => {

    try {

      const response = await axios.get(`http://localhost:3000/project/get`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProjects(response.data)

    } catch (error) {
      console.error('Erreur lors de la récupération des projets :', error);
      // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
    }
  };

  useEffect(() => {
    fetchDamages();
  }, []);

  console.log("data", projects);

  return (
    <div>

      <SearchBar></SearchBar>

      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Row>
              {projects.map((project) => (
                <Col key={project?.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <UiCards allproject={project} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </React.Fragment>

     
    </div>
  )




}


export default Projects;