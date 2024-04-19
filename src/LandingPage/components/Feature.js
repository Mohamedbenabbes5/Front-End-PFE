import React from "react";
import { Col, Container, Card, Row } from "reactstrap";
import { Link } from "react-router-dom";

import crackvideo from "../assets/video/crack.mp4"
import spallimage from "../assets/images/spall.png";
import bridge from "../assets/images/bridge.png";
import dam from "../assets/images/drams.png";
import road from "../assets/images/roads.png";
import monument from "../assets/images/monument.jpeg";

export default function Feature() {
    const services = [
        {
            id: 'service1',
            icon: 'check-square',
            title: "Inspect more efficiently",
            description: "Various versions have evolved over the years, sometimes by on purpose injected humour and the like."
        },
        {
            id: 'service2',
            icon: 'shield-check',
            title: "Increase safety",
            description: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est'
        },
        {
            id: 'service3',
            icon: 'cog',
            title: "Easy setup",
            description: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias'
        },
        {
            id: 'service4',
            icon: 'globe',
            title: "Collaborate remotely",
            description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled'
        }, {
            id: 'service5',
            icon: 'cloud-download',
            title: "Conduct digital inspections",
            description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain'
        }, {
            id: 'service6',
            icon: 'layer-group',
            title: "Organize your assets",
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
        },
    ]

    return (
        <>
            {/*  Services START  */}
            <section className="section" id="features">
                <Container>
                    <Row className="justify-content-center">
                        <div className="col-12">
                            <div className="section-title text-center  pb-2">
                                <h4 >Maintenez vos infrastructures de transport en condition optimale..</h4>

                                <h1 className="title mt-5">Our Features</h1>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        {services.map((item, key) => (
                            <Col lg={3} md={6} className="mt-2 pt-4" key={key}>
                                <Card className="features feature-primary feature-shadow-md shadow rounded p-4 pt-5 mb-4">
                                    <div className="icon-style mt-n80 position-relative text-center shadow rounded bg-white mb-4">
                                        <i className={"h1 mb-0 uil uil-" + item.icon}></i>
                                    </div>
                                    <div className="content">
                                        <Link to="#" className="title text-dark h4">{item.title}</Link>
                                        {/* <p className="text-muted mt-3">{item.description}</p>
                                        <Link to="#" className="text-dark title">Read More <i className="uil uil-arrow-right"></i> </Link> */}
                                    </div>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                </Container>

                {/* <Container className="mt-100 mt-60">
                    <Row>
                        <Col lg={5}>
                            <div className="section-title">
                                <h4 className="section-title mb-3 mb-lg-0">Some of the most importent <br /> things in this tools</h4>
                            </div>
                        </Col>

                        <Col lg={7}>
                            <p className="text-muted para-desc mb-0">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
                        </Col>
                    </Row>
                </Container> */}


                <div className="section-title text-center  pb-2">

                    <h1 className="title mt-5">Our Services</h1>

                </div>
                <h1 className="section-large-title  text-center ">Auto Detection with Ai</h1>



                <Container className="mt-100 mt-60">
                    <Row className="align-items-center">
                        <Col lg={6} md={6}>
                            <video className="img-fluid shadow-md rounded-md" autoPlay loop muted>
                                <source src={crackvideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Col>

                        <Col lg={6} md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div className="section-title ms-lg-5">
                                <h4 className="title mb-4">Concrete crack Detection</h4>
                                <p className="text-muted">Inspectify specializes in locating concrete defects. Our algorithms have been trained to automatically detect concrete defects including cracking, .</p>
                                <ul className="list-unstyled text-muted">
                                    <li className="mb-1"><span className="text-primary h5 me-2"><i className="uil uil-check-circle align-middle"></i></span>Detection and  Segmentaion</li>
                                    <li className="mb-1"><span className="text-primary h5 me-2"><i className="uil uil-check-circle align-middle"></i></span>Traking and identification each crack</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container className="mt-100 mt-60">
                    <Row className="align-items-center">
                        <Col lg={6} md={6} className="order-2 order-md-1 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div className="section-title me-lg-5">
                                <h4 className="title mb-4">Spalling and Corrosion Detection
                                </h4>
                                <p className="text-muted">Inspectify  Specializes in spalling detection, our algorithms have been trained to automatically detect concrete defects, including corrosion, delamination, and exposed steel reinforcement.</p>
                                <ul className="list-unstyled text-muted">
                                    <li className="mb-1"><span className="text-primary h5 me-2"><i className="uil uil-check-circle align-middle"></i></span>Detection and  Segmentaion</li>
                                    <li className="mb-1"><span className="text-primary h5 me-2"><i className="uil uil-check-circle align-middle"></i></span>Traking and identification each crack</li>
                                </ul>
                            </div>
                        </Col>

                        <Col lg={6} md={6} className="order-1 order-md-2">
                            <img src={spallimage} className="img-fluid shadow-md rounded-md" alt="" />
                        </Col>
                    </Row>
                </Container>

                <div className="section-title text-center  pb-2">

                    <h1 className="title mt-5">Use Cases</h1>
                    <p className="text-muted  mb-0 text-center ">Explore what Inspectify is capable of doing !</p>

                </div>
                <Container className="mt-5">
                    <Row>
                        <Col md={3}>
                            <img src={bridge} className="img-fluid" alt="Image 1" />
                            <h5 className="text-center">Bridges</h5>
                        </Col>
                        <Col md={3}>
                            <img src={dam} className="img-fluid" alt="Image 2" />
                            <h5 className="text-center">Dams</h5>
                        </Col>
                        <Col md={3}>
                            <img src={road} className="img-fluid" alt="Image 3" />
                            <h5 className="text-center">Roads</h5>
                        </Col> 
                        <Col md={3}>
                            <img src={monument} style={{height:"195px"}} className="img-fluid" alt="Image 3" />
                            <h5 className="text-center">historical monuments</h5>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
};