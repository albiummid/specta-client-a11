import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './OrderList.css'
import OrderListCard from './OrderListCard/OrderListCard';
const OrderList = () => {
    const [update, setUpdate] = useState(false);
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/ordersByEmail?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [update]);
    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/deleteOrder/${id}`, {
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
                <div className="mini-card-container">
                    {
                        orders.map(order => <OrderListCard data={order.serviceInfo} handleDelete={handleDelete} id={order._id} status={order.status} />)
                    }
                </div>
           </div>
        </div>
    );
};

export default OrderList;