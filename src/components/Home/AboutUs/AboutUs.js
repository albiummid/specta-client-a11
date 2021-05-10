import React from 'react';
import './AboutUs.css'
import about from '../../../images/about.jpg';
import Map from '../../Map/Map';
const AboutUs = () => {
    return (
        <section id="about">
            <div className="section-header">
                <h1>About Us</h1>
            </div>
            <div className="about-container">
                <div className="section-header">
                    <h1>We Are Awesome !</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus magni ipsum nostrum earum eos libero ratione maiores illum recusandae itaque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eius odio eligendi, corrupti saepe laudantium possimus! Praesentium architecto nostrum .</p>
                </div>
                <div className=""><img className="about-img" src={about} alt=""/></div>
                <div className=""><h2 style={{ textAlign: 'center' }}>Our Coverage area</h2> <br />
                    <div className="map-container"> 
                    <Map /></div>
                    </div>
               
            </div>
        </section>
    );
};

export default AboutUs;