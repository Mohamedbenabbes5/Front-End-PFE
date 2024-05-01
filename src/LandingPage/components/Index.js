import React from "react";

import Navbar from "./Navbar";
import Pricing from "./Pricing";
import Review from "./Review";
import News from "./News";
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