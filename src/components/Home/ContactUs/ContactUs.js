import React from 'react';
import './ContactUs.css'
import emailjs from 'emailjs-com';
import swal from 'sweetalert';
const ContactUs = () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_vp1bxr9', 'template_al7ex9l', e.target, 'user_f4Q4w652L2ya4ymbYdO4H')
            .then((result) => {
                swal("Great!", "Your Messsage send successfully", "success");
                e.target.reset();
            }, (error) => {
                swal("Sorry!", `${error}`, "error");
            })
            .catch(error => swal("Sorry!", `${error}`, "error"));
    }
    return (
        <section id="contactUs">
            <div className="section-header">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-container">
                <form onSubmit={sendEmail}>
                    <div className="info">
                        <input type="text" defaultValue={loggedInUser?.name} name="from_name" placeholder="Your Name" required />
                        <input type="email" defaultValue={loggedInUser?.email} name="reply_to" placeholder="Your email" required />
                    </div>
                    <input type="text" name="subject" placeholder="Subject" required />
                    <textarea type="message" name="message" placeholder="Your Message" required />
                    <button type="submit" className="brand-btn"> Send </button>
                </form>

            </div>

        </section>
    );
};

export default ContactUs;