import React, { useState, useEffect } from 'react';
import SearchBar from "../../components/SearchProjectsBar";
import UiCards from "../projects/ProjectCard";
import { Col, Row, Container } from "reactstrap";
import axios from 'axios';
import InputFileUpload from '../../components/FileUploadButton';
import { useLocation, useNavigate } from 'react-router-dom';
import TransitionAlerts from '../../components/TransitionAlerts';
import InfrastrauctureCard from './InfrastrauctureCard';





const Infrastructures = () => {
  const token = localStorage.getItem('accessToken');
  const [dataInfrastructures, setdataInfrastructures] = useState([]);

  const location = useLocation();

  // Vérifiez si le message de succès est passé en tant que state lors de la navigation
  const successCreation = location.state?.successCreation;

  const fetchInfrastructures = async () => {

    try {
      console.log("fetching infrast");
      const response = await axios.get(`http://localhost:3000/infrastructure/getall`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setdataInfrastructures(response.data.infrastructures)
      console.log(response.data.infrastructures);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets :', error);
      // Vous pouvez rediriger vers une page d'erreur ou afficher un message d'erreur
    }
  };

  useEffect(() => {
    // Lors du premier rendu, si successCreation est présent, afficher l'alerte de succès
    fetchInfrastructures()
    // Nettoyer le timer lors du démontage du composant
  }, []);

  console.log("STATE data ", dataInfrastructures);

  return (
    <div>

      <SearchBar></SearchBar>
      <div style={{ marginLeft: "20px" }}>
        {successCreation && (

          <TransitionAlerts
            sx={{}}
            type={"success"}
            message={successCreation}
            onClose={() => { }}
            variant={"filled"}
          />
        )}
        </div>
      <React.Fragment>
        <div className="page-content">

          <Container fluid={true}>
            <Row>

              {dataInfrastructures.map((infrastructure) => (
                <Col key={infrastructure?.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <InfrastrauctureCard data={infrastructure} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </React.Fragment>


    </div>
  )




}


export default Infrastructures;