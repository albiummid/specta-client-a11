import React, { useContext } from 'react';
import './ContactUs.css'
import contactImg from '../../../images/contact.jpg'
import { UserContext } from '../../../App';
const ContactUs = () => {
   const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    return (
        <section id="contactUs">
            <div className="section-header">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-container">
                <div className="contact-img">
                    <img src={contactImg} alt="" />
                </div>
                <form action="">
                    <input type="text" defaultValue={loggedInUser?.name} placeholder="Your Name" required />
                    <input type="email" defaultValue={loggedInUser?.email} placeholder="Your email" required />
                    <textarea type="message" placeholder="Your Message" required />
                    <button className="brand-btn"> Submit </button>
                </form>
               
            </div>

        </section>
    );
};

export default ContactUs;