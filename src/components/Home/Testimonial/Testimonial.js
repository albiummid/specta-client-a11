import React, { useEffect, useState } from 'react';
import './Testimonial.css'
import TestimonialCard from './TestimonialCard/TestimonialCard';
const Testimonial = () => {
    const [reviewData, setReviewData] = useState([]);
    useEffect(() => {
        fetch('https://specta-web.herokuapp.com/reviews')
            .then(res => res.json())
        .then(data => setReviewData(data))
        
    },[])
    console.log(reviewData);
    return (
        <section id="testimonial" >
            <div className="section-header">
                <h1> Testimonials </h1>
                <h3>Join Our Happy Customers</h3>
            </div>
            <div className="std-card-container">
                {
                    reviewData.map(data => <TestimonialCard data={data} /> )
                }
            </div>
        </section>
    );
};

export default Testimonial;