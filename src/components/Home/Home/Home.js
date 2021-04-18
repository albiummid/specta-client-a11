import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import ContactUs from '../ContactUs/ContactUs';
import Features from '../Features/Features';
import Header from '../Header/Header';
import Service from '../Service/Service';
import Testimonial from '../Testimonial/Testimonial';
import './Home.css'
const Home = () => {
    return (
        <div className="home-container">
            <Header />
            <Service />
            <Features />
            <Testimonial />
            <AboutUs />
            <ContactUs/>
        </div>
    );
};

export default Home;