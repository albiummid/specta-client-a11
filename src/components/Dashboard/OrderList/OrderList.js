import React, { useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import loader from '../../../images/loadingAnimation.gif'
import './OrderList.css'
import swal from 'sweetalert';
import OrderListCard from './OrderListCard/OrderListCard';
const OrderList = () => {
    const [update, setUpdate] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://specta-web.herokuapp.com/ordersByEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
    }, [user.email]);
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "If you cancel the order then,you get refund via bKash!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://specta-web.herokuapp.com/deleteOrder/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                setUpdate(!update);
                            }
                        })
                    swal("Order Cancelled Successfully !", {
                        icon: "success",
                    });
                } else {
                    swal("Your order is safe!");
                }
            });


    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-area">
                <div className="section-header">
                    <h1>Order list</h1>
                </div>
                {loading &&
                    <img style={{ width: "150px", margin: "0 auto" }} src={loader} alt="" />
                }

                {orders.length > 0 && !loading ?
                    <div className="mini-card-container">
                        {
                            orders.map(order => <OrderListCard data={order.serviceInfo} handleDelete={handleDelete} id={order._id} status={order.status} />)
                        }
                    </div>
                    :
                    <h2>
                        Your order list is empty !
                    </h2>
                }



            </div>
        </div>
    );
};

export default OrderList;