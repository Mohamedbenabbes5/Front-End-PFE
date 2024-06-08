import React from "react";

import Navbar from "./Navbar";

import Contact from "./Contact";
import Footer from "./Footer";
import Feature from "./Feature";
import Section  from "./Section";

export default function Index() {  


    return (
        <>

            <Navbar />
            <Section></Section>
            <Feature />     
            <Contact />
            <Footer />
        
        </>
    )
};