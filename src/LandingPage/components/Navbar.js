import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as Link2, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import { NavbarBrand, NavbarToggler, NavItem, Nav, Collapse } from "reactstrap";
// Import Logo
import logo from "../assets/images/logo.png";

export default function NavbarPage() {
    const [isOpen, setMenu] = useState(true);

    useEffect(() => {
        function windowScroll() {
            const navbar = document.getElementById("navbar");
            if (navbar) {
                if (
                    document.body.scrollTop >= 50 ||
                    document.documentElement.scrollTop >= 50
                ) {
                    navbar.classList.add("nav-sticky");
                } else {
                    navbar.classList.remove("nav-sticky");
                }
            }
        }
        window.addEventListener("scroll", windowScroll);

        return () => {
            // Supprimer l'écouteur d'événements lors du démontage du composant
            window.removeEventListener("scroll", windowScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenu(!isOpen)
    };

    return (
        <nav id="navbar" className="navbar navbar-expand-lg fixed-top sticky">
            <div className="container-lg "> <NavbarToggler className="navbar-toggler" onClick={toggleMenu}>
                <Icon.Menu />
            </NavbarToggler>
                <NavbarBrand className="navbar-brand">
                    <Link to="home">
                        <img src={logo} className="logo" alt="" style={{ cursor: 'pointer' }} />
                    </Link>
                </NavbarBrand>


                <Collapse className={`navbar-collapse ${isOpen === true ? 'hidden' : 'show'}`} id="navbarSupportedContent">

                    <Nav className="navbar-nav ms-auto  mb-lg-0" id="navbar-navlist">
                        <NavItem>
                            <Link activeClass="active" spy={true} smooth={true} duration={500} to="home" className="nav-link " >Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link activeClass="active" spy={true} smooth={true} duration={500} to="features" className="nav-link " >Features</Link>
                        </NavItem>
                        <NavItem>
                            <Link activeClass="active" spy={true} smooth={true} duration={500} to="pricing" className="nav-link" >Pricing</Link>
                        </NavItem>
                        <NavItem>
                            <Link activeClass="active" spy={true} smooth={true} duration={500} to="review" className="nav-link" >Review</Link>
                        </NavItem>
                        <NavItem>
                            <Link activeClass="active" spy={true} smooth={true} duration={500} to="blog" className="nav-link" >News</Link>
                        </NavItem>
                        <NavItem>
                            <Link activeClass="active" spy={true} smooth={true} duration={500} to="contact" className="nav-link" >Contact Us</Link>
                        </NavItem>
                    </Nav>
                    <ul className="lst-inline menu-social mb-0 ps-lg-4 ms-auto ">
                        <li className="list-inline-item">
                            <Link2 to='/login' state={{ userType: 'manager' }} className='btn  btn-primary  '>Login </Link2>
                        </li>
                        <li className="list-inline-item ms-4">
                            <Link2 to='/login' state={{ userType: 'employee' }} className='nav-link text-uppercase hover-effect' > Join As Employee</Link2>
                        </li>
                    </ul>

                </Collapse>
            </div>
        </nav>

    );
}
