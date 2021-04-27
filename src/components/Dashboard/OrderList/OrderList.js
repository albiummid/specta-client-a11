import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import loader from '../../../images/infinity_loop_-_logo.gif'
import './OrderList.css'
import OrderListCard from './OrderListCard/OrderListCard';
const OrderList = () => {
    const [update, setUpdate] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`https://specta-web.herokuapp.com/ordersByEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [update]);
    const handleDelete = (id) => {
        fetch(`https://specta-web.herokuapp.com/deleteOrder/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Order Cancelled Successfully ! ");
                    setUpdate(!update);
                }
            })
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-area">
                <div className="section-header">
                    <h1>Order list</h1>
                </div>
                {orders.length === 0 ?
                    <img style={{ width: "90%", margin: "0 auto" }} src={loader} alt="" />
                    :
                    <div className="mini-card-container">
                    {
                        orders.map(order => <OrderListCard data={order.serviceInfo} handleDelete={handleDelete} id={order._id}  status={order.status} />)
                    }
                </div>

                }
              
            </div>
        </div>
    );
};

export default OrderList;