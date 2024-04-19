import React, { Component } from "react";
import { Col, Container, Card, Row } from "reactstrap";
import { Link } from "react-router-dom";

export default function Pricing() {
    const pricing = [
        {
            id: 1,
            title: 'Free',
            price: 0,
            features: ['1 Domains', '1 GB File upload', '2 GB Secure storage', 'Unlimited bandwidth']
        },
        {
            id: 2,
            title: 'Startups',
            price: 9,
            features: ['5 Domains', '2 GB File upload', '20 GB Secure storage', 'Unlimited bandwidth']
        },
        {
            id: 3,
            title: 'Business',
            price: 39,
            features: ['10 Domains', '5 GB File upload', '50 GB Secure storage', 'Unlimited bandwidth']
        },
        {
            id: 4,
            title: 'Premium',
            price: 99,
            features: ['50 Domains', '10 GB File upload', '200 GB Secure storage', 'Unlimited bandwidth']
        }
    ]

    return (
        <>
            {/* Start Pricing  */}
            <section className="section bg-light" id="pricing">
                <Container>
                    <Row className="justify-content-center">
                        <div className="col-12">
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title fw-semibold mb-4">Pricing Plans</h4>
                                <p className="para-desc text-muted mx-auto mb-0">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        {pricing.map((item, key) => (
                            <Col lg={3} md={6} className="col-12 mt-4 pt-2" key={key}>
                                <Card className="border-0 shadow">
                                    <div className="p-4 border-bottom border-light">
                                        <h6 className="fw-semibold mb-3 text-uppercase">{item.title}</h6>
                                        <p className="text-muted mb-0">For individuals looking for a simple Startups solution</p>

                                        <div className="d-flex my-4">
                                            <span className="price h3 fw-semibold mb-0">${item.price}</span>
                                            <span className="text-muted align-self-end mb-1">/mo</span>
                                        </div>

                                        <Link to="#" className="btn btn-primary w-100">Buy Now</Link>
                                    </div>

                                    <div className="p-4">
                                        <h6 className="mb-3">Features:</h6>
                                        <ul className="mb-0 list-unstyled">
                                            {item.features.map((subitem, subkey) => (
                                                <li className="text-muted " key={subkey}><span className={item.price < 90 && subkey > 2 ? "text-danger h5 me-1" : ' text-success h5 me-1'}><i className={item.price < 90 && subkey > 2 ? "uil uil-times-circle align-middle" : ' uil uil-check-circle align-middle'}></i></span> {subitem}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            </Col>

                        ))}

                        <div className="col text-center mt-2">
                            <p className="mt-3 mb-0 text-muted">Note: <span className="text-danger fs-5">*</span>No credit card required</p>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}