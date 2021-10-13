import React, { useEffect, useState } from 'react';
import './Features.css'
import FeaturesCard from './FeaturesCard/FeaturesCard';

const Features = () => {
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        fetch('https://specta-web.herokuapp.com/features')
            .then(res => res.json())
            .then(data => setFeatures(data))
    }, []);
    return (
        <section id="features" className="features">
            <div className="section-header">
                <h1>Why Choose Us</h1>
                <p>We all have an internet horror story - expiring introductory rates,slow service,requires add-ons,bill creep,and awful customer service.THere has to be a better way</p>
            </div>
            <div className="mini-card-container">
                {
                    features.map(feature => <FeaturesCard feature={feature} key={feature._id} />)
                }
            </div>
        </section>
    );
};

export default Features;