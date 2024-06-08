import { Col, Container, Row } from "reactstrap";
import { Link as Link2 } from 'react-router-dom';
import * as Icon from 'react-feather';


import React, { useState } from 'react';


import ModalVideo from "react-modal-video";
import BackgroundImage1 from "../assets/images/bg/bg.jpeg";




export default function Section() {
    const [videoModal, setVideoModal] = useState(false);

    const openModal = () => {
        setVideoModal(true);
    };
 
    return (

        <>
            <section className="bg-home d-flex align-items-center" style={{ background: `url(${BackgroundImage1})`, height: "750px" }} id="home">
                <div className="bg-overlay bg-linear-gradient-3"></div>
                <Container >
                    <Row>
                        <Col  xs={9}>
                            <div className="title-heading">
                                <h1 className="text-white mb-4 me-auto">Automatisez l'Inspection Visuelle de Vos Infrastructures en Béton grâce à l'Intelligence Artificielle </h1>
                                <p className="para-desc text-white-50">Inspectify est une plateforme web permettant d'inspecter vos infrastructures critiques d'une toute nouvelle manière</p>
                                <div className="mt-4 pt-2">
                                    <Link2 to="#" className="btn btn-primary m-1">Get Started</Link2>
                                    <Link2 to="#" data-type="youtube" data-id="yba7hPeTSjk" onClick={openModal} className="btn btn-icon btn-pills btn-primary m-1 lightbox"><Icon.Video className="icons" /></Link2><span className="text-uppercase text-white-50 small align-middle ms-2">Watch Now</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Hero End  */}

            
         
            <ModalVideo
                channel="youtube"
                isOpen={videoModal}
                videoId="yba7hPeTSjk"
                onClose={() => setVideoModal(false)}
            />

        </>
    )
}