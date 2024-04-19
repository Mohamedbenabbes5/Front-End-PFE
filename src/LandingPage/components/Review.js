import React from "react";
import TinySlider from "tiny-slider-react";
import { Col, Container, Row } from "reactstrap";

import avatar1 from "../assets/images/client/01.jpg";
import avatar2 from "../assets/images/client/02.jpg";
import avatar3 from "../assets/images/client/03.jpg";
import avatar4 from "../assets/images/client/04.jpg";
import avatar5 from "../assets/images/client/05.jpg";

import Map from "../assets/images/map.png";
import 'tiny-slider/dist/tiny-slider.css';

const settings = {
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 12,
    responsive: {
        992: {
            items: 3
        },

        767: {
            items: 2
        },

        320: {
            items: 1
        },
    },
};

export default function Review() {
    const review = [
        {
            id: '1',
            profile: avatar1,
            name: 'Calvin Carlo',
            designation: "Manager",
            description: "According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero Launch your campaign and benefit from our expertise."
        },
        {
            id: '2',
            profile: avatar2,
            name: 'Christa Smith',
            designation: "Manager",
            description: "According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero Launch your campaign and benefit from our expertise."
        }, {
            id: '3',
            profile: avatar3,
            name: 'Jemina CLone',
            designation: "Manager",
            description: "According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero Launch your campaign and benefit from our expertise."
        }, {
            id: '4',
            profile: avatar4,
            name: 'Smith Vodka',
            designation: "Manager",
            description: "According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero Launch your campaign and benefit from our expertise."
        },
        {
            id: '5',
            profile: avatar5,
            name: 'Cristino Murfi',
            designation: "Manager",
            description: "According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero Launch your campaign and benefit from our expertise."
        },
    ]

    return (
        <>
            {/* Review Start  */}
            <section className="section" id="review">
                <Container>
                    <Row className="justify-content-center">
                        <div className="col-12">
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Happy Client's</h4>
                                <p className="text-muted para-desc mx-auto mb-0">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap5 html page.</p>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        <div className="col-12 mt-4">
                            <div className="tiny-three-item">
                                <TinySlider settings={settings} className="tiny-slide">
                                    {review.map((el, index) => (
                                        <div className="customer-testi m-1" key={index}>
                                            <div className="content p-3 shadow rounded bg-white position-relative">
                                                <ul className="list-unstyled mb-0 text-warning">
                                                    <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                    <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                    <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                    <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                    <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                </ul>
                                                <p className="text-muted mt-2">" According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero Launch your campaign and benefit from our expertise. "</p>
                                            </div>
                                            <div className="text-center mt-3">
                                                <img src={el.profile} className="avatar avatar-small rounded shadow" alt="" />
                                                <p className="text-primary mt-3 mb-0">{el.name} <small className="text-muted d-block ms-2">{el.designation}</small></p>
                                            </div>
                                        </div>
                                    ))}
                                </TinySlider>
                            </div>
                        </div>
                    </Row>
                </Container>

                <Container className="mt-100 mt-60">
                    <div className="py-5 px-4 bg-soft-primary rounded-lg" style={{
                        background: `url('${Map}') center center`
                    }}>
                        <Row className="justify-content-center">
                            <div className="col-12">
                                <div className="section-title text-center mb-4 pb-2">
                                    <h4 className="title mb-4">Subscribe our Newsletter</h4>
                                    <p className="text-muted mx-auto para-desc mb-0">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap5 html page.</p>
                                </div>
                            </div>

                            <Col lg={8}>
                                <div className="text-center subcribe-form mt-4 pt-2">
                                    <form>
                                        <div className="form-group mb-0">
                                            <input type="email" id="email2" name="email" className="rounded-pill" placeholder="Your Email Id" />
                                            <button type="submit" className="btn btn-pills btn-primary">Subscribe Now</button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>

            </section>
        </>
    )
}
