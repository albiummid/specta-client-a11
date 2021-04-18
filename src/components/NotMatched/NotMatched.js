import React from 'react';
import { Link } from 'react-router-dom';
import './NotMatched.css';

const NotMatched = () => {
    
    return (
        <div className="error-container">
            <div class="not-found parallax">
            <div class="sky-bg"></div>
            <div class="wave-7"></div>
            <div class="wave-6"></div>
            <Link to="/" class="wave-island" >
                    <img src="http://res.cloudinary.com/andrewhani/image/upload/v1524501929/404/island.svg" alt="Island"/>
                </Link>
            <div class="wave-5"></div>
            <div class="wave-lost wrp">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            <div class="wave-4"></div>
            <div class="wave-boat">
                <img class="boat" src="http://res.cloudinary.com/andrewhani/image/upload/v1524501894/404/boat.svg" alt="Boat"/>
            </div>
            <div class="wave-3"></div>
            <div class="wave-2"></div>
            <div class="wave-1"></div>
            <div class="wave-message">
                <p>Your're lost</p>
                <p>Click on the island to return</p>
            </div>
        </div>
        </div>
    );
};

export default NotMatched;