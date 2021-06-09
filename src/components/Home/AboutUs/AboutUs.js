import React from 'react';
import './AboutUs.css'
import about from '../../../images/about.jpg';
import Google_Map from '../../Map/Google_Map';
const AboutUs = () => {
    return (
        <section id="about">
            <div className="section-header">
                <h1>About Us</h1>
            </div>
            <div className="about-container">
                <div className="title_bar">
                    <h1>We Are Awesome !</h1>
                    <p>We provide high-speed internet and with real IPs that are not shared by another workstation or computer. This makes our internet perfect for streaming and entertainment applications, such as streaming Netflix and High Definition (HD) content. We value your opinion and this why we want you to give us a call today.</p>
                    <img className="about-img" src={about} alt="" />
                </div>
                <div className=""><h2 style={{ textAlign: 'center' }}>Our Coverage area</h2> <br />
                    <div className="map-container">
                        <Google_Map />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;