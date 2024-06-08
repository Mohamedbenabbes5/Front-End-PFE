import React, { useState, useEffect } from 'react';
import SearchBar from "../../components/SearchProjectsBar";
import { Col, Row, Container } from "reactstrap";
import axios from 'axios';
import ProjectCard from './ProjectCard';

import TransitionAlerts from '../../components/TransitionAlerts';




const Projects = () => {
  const token = localStorage.getItem('accessToken');
  const [projects, setProjects] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null);

  const handleAlert = (alert) => {
    if (alert.type === "success") {
      window.location.reload();
    }
    setAlertInfo(alert);

  };
  const fetchData = async () => {

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
    fetchData();
  }, []);

  console.log("data", projects);

  return (
    <div>

      <SearchBar></SearchBar>

      <React.Fragment>
        <div className="page-content">
          {alertInfo && (

            <TransitionAlerts
              sx={{}}
              type={alertInfo.type}
              message={alertInfo.message}
              onClose={() => { }}
              variant={"filled"}
            />
          )}
          <Container fluid={true}>
            <Row>
              {projects.map((project) => (
                <Col key={project?.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <ProjectCard data={project} onAlert={handleAlert} />
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