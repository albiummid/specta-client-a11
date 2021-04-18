import React from 'react';
import './FeaturesCard.css'
const FeaturesCard = ({ feature }) => {
    const { icon, subject, details } = feature;
    return (
        <div className="features-card">
            <div>
            <img  src={`data:image/png;base64,${icon.img}`} alt="" />
            </div>
      
            <h2>{subject}</h2>
            <p>{ details }</p>
       
        </div>
    );
};

export default FeaturesCard;