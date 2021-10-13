import React, { useEffect, useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link'
import { useHistory, useParams } from 'react-router';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './Order.css';
import ProcessPayment from './ProcessPayment/ProcessPayment';
import swal from 'sweetalert';
import { GetContexts } from '../../../context/AuthProvider';
const Order = () => {
    const history = useHistory();
    const [orderInfo, setOrderInfo] = useState(null);
    const { id } = useParams();
    const { user } = GetContexts();
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
                email: user?.email,
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
        <div className="dashboard-container">
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
                                <input onChange={handleChange} type="text" value={user?.email} name="email" required placeholder="Your Email" disabled />
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
                            <h1>Please Select a service Package</h1>
                            <NavLink smooth to='/#services'>
                                Let's Choose a package?
                            </NavLink>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Order;