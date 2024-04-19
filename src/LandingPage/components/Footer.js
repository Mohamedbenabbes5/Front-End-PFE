import React, { useState, useEffect } from 'react';
import { Col, Container, Card, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import { Link as Link2 } from 'react-scroll';
import * as Icon from 'react-feather';
import Logo from "../assets/images/logo2.png";

export default function Footer() {

        const [arrow, setArrow] = useState(false);

        const handleScroll = () => {
            if (
                document.body.scrollTop >= 500 ||
                document.documentElement.scrollTop >= 500
            ) {
                setArrow(true);
            } else {
                setArrow(false);
            }
        };
        useEffect(() => {
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);


        return (
            <>
                {/* Back to top */}
                <Link2 to="home" style={{ display: arrow === true ? 'block' : 'none' }} id="back-to-top" className="back-to-top rounded-pill fs-5"><Icon.ArrowUp className="fea icon-sm icons align-middle" /></Link2>
                {/* Back to top  */}

                {/* Footer Start  */}
                <footer className="bg-footer">
                    <Container>
                        <Row className="justify-content-center">
                            <div className="col-12">
                                <div className="footer-py-60 text-center">
                                    <Row className="py-5">
                                        <Col md={4} >
                                            <Card className="border-0 text-center features feature-primary bg-transparent">
                                                <div className="feature-icon text-center mx-auto">
                                                    <i className="uil uil-phone rounded h4 mb-0"></i>
                                                </div>
                                                <div className="content mt-4">
                                                    <h5 className="footer-head">Phone</h5>
                                                    <p className="text-muted">Start working with Motos that can provide everything</p>
                                                    <Link to="tel:+152534-468-854" className="text-foot">+152 534-468-854</Link>
                                                </div>
                                            </Card>
                                        </Col>

                                        <Col md={4} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                            <Card className="border-0 text-center features feature-primary bg-transparent">
                                                <div className="feature-icon text-center mx-auto">
                                                    <i className="uil uil-envelope rounded h4 mb-0"></i>
                                                </div>
                                                <div className="content mt-4">
                                                    <h5 className="footer-head">Email</h5>
                                                    <p className="text-muted">Start working with Motos that can provide everything</p>
                                                    <Link to="mailto:contact@example.com" className="text-foot">contact@example.com</Link>
                                                </div>
                                            </Card>
                                        </Col>

                                        <Col md={4} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                            <Card className="border-0 text-center features feature-primary bg-transparent">
                                                <div className="feature-icon text-center mx-auto">
                                                    <i className="uil uil-map-marker rounded h4 mb-0"></i>
                                                </div>
                                                <div className="content mt-4">
                                                    <h5 className="footer-head">Location</h5>
                                                    <p className="text-muted">C/54 Northwest Freeway, Suite 558, <br />Houston, USA 485</p>
                                                    <Link to="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                                                        data-type="iframe" className="video-play-icon text-foot lightbox">View on Google map</Link>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Row>
                    </Container>

                    <div className="footer-py-30 footer-bar bg-footer">
                        <Container className="text-center">
                            <Row className="align-items-center justify-content-between">
                                <Col lg={3} md={2} sm={3}>
                                    <div className="text-sm-start">
                                        <Link to="#" className="logo-footer">
                                            <img src={Logo} alt="" style={{width: '50px'}}/>
                                        </Link>
                                    </div>
                                </Col>

                                <Col lg={6} md={6} sm={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <ul className="list-unstyled footer-list terms-service mb-0">
                                        <li className="list-inline-item mb-0"><Link to="#" className="text-foot me-2">Privacy</Link></li>
                                        <li className="list-inline-item mb-0"><Link to="#" className="text-foot me-2">Terms</Link></li>
                                        <li className="list-inline-item mb-0"><Link to="#" className="text-foot me-2">FAQs</Link></li>
                                        <li className="list-inline-item mb-0"><Link to="#" className="text-foot">Contact</Link></li>
                                    </ul>
                                </Col>

                                <Col lg={3} md={4} sm={3} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <div className="text-sm-end">
                                        <p className="mb-0 text-foot">© {(new Date().getFullYear())}{" "} </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </footer>
                {/* Footer End  */}
            </>
        )
    
};