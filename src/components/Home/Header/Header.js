import React from 'react';
import './Header.css'
import topbanner from '../../../images/topbanner.png'
const Header = () => {
    return (
        <main className="main">
            <div className="intro">
                <h1>Boost Up Your Internet Experiance with Us</h1>
                <br />
                <h2>Our philosophy is to empower our users to bring passion to their life.</h2>
                <a href='#services'>
                    <button className="brand-btn">Get Started Now</button>
                </a>

            </div>
            <div className="top-banner">
                <img src={topbanner} alt="" />
            </div>
        </main>
    );
};

export default Header;