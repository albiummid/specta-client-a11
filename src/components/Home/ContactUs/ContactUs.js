import React, { useContext } from 'react';
import './ContactUs.css'
import contactImg from '../../../images/contact.jpg'
import emailjs from 'emailjs-com';
const ContactUs = () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    function sendEmail(e) {
        e.preventDefault();
        console.log(e.target);
    
        emailjs.sendForm('service_vp1bxr9', 'template_al7ex9l', e.target, 'user_f4Q4w652L2ya4ymbYdO4H')
            .then((result) => {
                console.log(result);
              alert("Your message submitted")
          }, (error) => {
              alert("Message sending failed!")
          });
      }
    return (
        <section id="contactUs">
            <div className="section-header">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-container">
                <div className="contact-img">
                    <img src={contactImg} alt="" />
                </div>
                <form onSubmit={sendEmail}>
                    <input type="text" defaultValue={loggedInUser?.name} name="from_name" placeholder="Your Name" required />
                    <input type="email" defaultValue={loggedInUser?.email} name="reply_to" placeholder="Your email" required />
                    <textarea type="message" name="message" placeholder="Your Message" required />
                    <button type="submit" className="brand-btn"> Submit </button>
                </form>
               
            </div>

        </section>
    );
};

export default ContactUs;