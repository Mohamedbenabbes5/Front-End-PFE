import React from "react";
import { Col, Container, Card, Row, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import Blo1Image from "../assets/images/blog/1.jpg";
import Blo2Image from "../assets/images/blog/2.jpg";
import Blo3Image from "../assets/images/blog/3.jpg";


export default function News() {
    return (
        <>
            {/* Start Blog  */}
            <section className="section bg-light" id="blog">
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Latest News</h4>
                                <p className="text-muted para-desc mb-0 mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4} md={6} className="mt-4 pt-2">
                            <Card className="blog blog-primary shadow rounded overflow-hidden border-0">
                                <div className="blog-image position-relative overflow-hidden">
                                    <img src={Blo1Image} className="img-fluid" alt="" />
                                </div>

                                <CardBody className="content p-0">
                                    <div className="p-4">
                                        <Link to="#" className="h5 title text-dark d-block mb-0">Building Your Corporate Identity from Motos</Link>
                                        <p className="text-muted mt-2 mb-0">The most well-known dummy text is the 'Lorem Ipsum', in the 16th century.</p>

                                        <div className="mt-3">
                                            <Link to="#" className="link text-dark">Read More <i className="uil uil-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={4} md={6} className="mt-4 pt-2">
                            <Card className="blog blog-primary shadow rounded overflow-hidden border-0">
                                <div className="blog-image position-relative overflow-hidden">
                                    <img src={Blo2Image} className="img-fluid" alt="" />
                                </div>

                                <CardBody className="content p-0">
                                    <div className="p-4">
                                        <Link to="#" className="h5 title text-dark d-block mb-0">The Dark Side of Overnight Success</Link>
                                        <p className="text-muted mt-2 mb-0">The most well-known dummy text is the 'Lorem Ipsum', in the 16th century.</p>

                                        <div className="mt-3">
                                            <Link to="#" className="link text-dark">Read More <i className="uil uil-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={4} md={6} className="mt-4 pt-2">
                            <Card className="blog blog-primary shadow rounded overflow-hidden border-0">
                                <div className="blog-image position-relative overflow-hidden">
                                    <img src={Blo3Image} className="img-fluid" alt="" />
                                </div>

                                <CardBody className="content p-0">
                                    <div className="p-4">
                                        <Link to="#" className="h5 title text-dark d-block mb-0">The Right Hand of Business IT World</Link>
                                        <p className="text-muted mt-2 mb-0">The most well-known dummy text is the 'Lorem Ipsum', in the 16th century.</p>

                                        <div className="mt-3">
                                            <Link to="#" className="link text-dark">Read More <i className="uil uil-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* End Blog  */}
        </>
    )
}