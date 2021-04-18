import React from 'react';
import './PricingCard.css'
const PricingCard = ({ data, handleClick }) => {
    const { title, price, image, subType, speed, realIp, opticFiber, bdix, router, _id } = data;
    return (
        <div className="pricing-card">
            <h2> {title} </h2>
            <div className="price-div">
                <h2>৳</h2> <h1> {price} </h1>
            </div>
            <p>{subType}</p>

            <img src={`data:image/png;base64,${image.img}`} alt="" />
            <h2> {speed} Mbps </h2>
            <div className="feature-div">
                {
                    realIp === "Yes" ? <i class="far fa-check-circle"></i> :
                        <i class="far fa-times-circle"></i>
                }
                <h4>Real IP : <span className="value">  {realIp}  </span></h4>
            </div>

            <div className="feature-div">
                {
                    opticFiber === "Yes" ? <i class="far fa-check-circle"></i> :
                        <i class="far fa-times-circle"></i>
                }
                <h4>Optic Fiber Connection : <span className="value">  {opticFiber}  </span></h4>
            </div>
            <div className="feature-div">
                {
                    bdix === "Yes" ? <i class="far fa-check-circle"></i> :
                        <i class="far fa-times-circle"></i>
                }
                <h4>BDIX Connection Support : <span className="value">  {bdix}  </span></h4>
            </div>
            <div className="feature-div">
                {
                    router === "Yes" ? <i class="far fa-check-circle"></i> :
                        <i class="far fa-times-circle"></i>
                }
                <h4>Router with Connection: <span className="value">  {router}  </span></h4>
            </div>
            <button onClick={() => handleClick(_id)} className="brand-btn"> Get Started </button>

        </div>
    );
};

export default PricingCard;