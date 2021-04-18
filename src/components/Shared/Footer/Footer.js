import React, { useEffect, useState } from 'react';
import './Footer.css'
import { SiElectron } from 'react-icons/si';
import FooterCol from './FooterCol/FooterCol';


const Footer = () => {
    const [footer, setFooter] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/footer')
            .then(res => res.json())
        .then(data => setFooter(data))
    },[]);
    return (
        <footer className="footer">
            <div className="brand-info">
                <span><SiElectron size={80}/></span>
                <h1>S P E C T A</h1>

            </div>
            <div className="link-div">
                {
                    footer.map(data=><FooterCol data={data} />)
                }
            </div>
            <p className="footer-end">Copyright @
            albi - {(new Date()).getFullYear()} All Rights Reserved</p>
        </footer>
    );
};

export default Footer;