import React, { useEffect, useState } from 'react';
import './Service.css'
import PricingCard from './PricingCard/PricingCard';
import loader from '../../../images/infinity_loop_-_logo.gif'
import { useHistory } from 'react-router';

const Service = () => {
    const history = useHistory();
    const [serviceData, setServiceData] = useState([]);
    useEffect(() => {
        fetch("https://specta-web.herokuapp.com/services")
            .then(res => res.json())
            .then(data => setServiceData(data))
    });
    const handleClick = (id) => {
        const url = `/dashboard/order/${id}`;
        history.push(url);

    }
    return (
        <section id="services">
            <div className="section-header">
                <h1>
                    Our Service Packages
                </h1>
                <p>
                    Our Packages are true mone saver . Just Choose your own desire !
                </p>
            </div>
            {
                serviceData.length === 0 ?
                    <img style={{ width: "90%", margin: "0 auto" }} src={loader} alt="" />
                    :
                    <div className="std-card-container">
                        {
                            serviceData.map(data => <PricingCard data={data} handleClick={handleClick} />)
                        }
                    </div>
            }


        </section>
    );
};

export default Service;