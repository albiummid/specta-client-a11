import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './Order.css';
import { UserContext } from '../../../App';
import ProcessPayment from './ProcessPayment/ProcessPayment';
import swal from 'sweetalert';
const Order = () => {
    const history = useHistory();
    const [orderInfo, setOrderInfo] = useState(null);
    const { id } = useParams();
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const [service, setService] = useState({});
    useEffect(() => {
        if (id) {
            fetch(`https://specta-web.herokuapp.com/serviceById/${id}`)
                .then(res => res.json())
                .then(data => setService(data));
        }

    }, []);


    const handlePaymentSuccess = (paymentId) => {
        if (orderInfo) {
            const orderDetails = {
                serviceInfo: service,
                orderInfo,
                orderTime: new Date(),
                paymentId, status: "Pending",
                email: loggedInUser.email,
            };


            fetch('https://specta-web.herokuapp.com/addOrder', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },

                body: JSON.stringify(orderDetails)
            })
                .then(response => response.json())
                .then(success => {
                    if (success) {
                        swal("Order Successfully completed !", {
                            icon: "success",
                        });

                        history.push('/dashboard/order-list')
                    }
                })
        }
        else {
            alert('Please Complete Your Information')
        }
    }

    const handleChange = (e) => {
        const order = { ...orderInfo };
        order[e.target.name] = e.target.value;
        setOrderInfo(order);
    }
    return (
        <section className="dashboard-container">
            <Sidebar />

            {
                id ?
                    <div className="dashboard-area">
                        <div className="section-header">
                            <h1>Place Order</h1>
                        </div>
                        <div className="section-header">
                            <h2>Package: {service.title}</h2>
                            <spna>{service.price} ৳ /</spna><span>month</span>
                        </div>
                        <div className="form-container">
                            <form >

                                <input onChange={handleChange} type="text" name="name" required placeholder="Your Name" />
                                <input onChange={handleChange} type="text" value={loggedInUser?.email} name="email" required placeholder="Your Email" disabled />
                                <input onChange={handleChange} type="text" name="phone" required placeholder="Your Phone" />
                                <input onChange={handleChange} type="text" name="address" required placeholder="Your Address" /><br />


                            </form>
                            <div className="payment">
                                <ProcessPayment handlePaymentSuccess={handlePaymentSuccess} />
                            </div>

                        </div>
                    </div>
                    :
                    <div className="dashboard-area">
                        <div className="section-header">
                            <h1>Please Select a service Package</h1></div>
                    </div>
            }
        </section>
    );
};

export default Order;