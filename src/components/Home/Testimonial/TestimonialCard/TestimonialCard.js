import React from 'react';
import './TestimonialCard.css'
import start from '../../../../images/icons/coat-start.png'
import end from '../../../../images/icons/quoat-end.png'
const TestimonialCard = ({data}) => {
    const { comment, image, name, location } = data;
    return (
        <div className="testimonial-card">
            <div className="review-user">
                <div className="review-image">
                <img src={`data:image/png;base64,${image.img}`} alt="" />
                </div>
                <h4> {name} </h4>
                <small> {location} </small>
            </div>
            <div className="review-info">
                <img id="start" src={start} alt="" />
                <p>
                    {comment}
                </p>
                <img id="end" src={end} alt=""/>
            </div>
            
        </div>
    );
};

export default TestimonialCard;