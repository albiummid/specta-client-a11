import React, { useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './OrderList.css'
import swal from 'sweetalert';
import OrderListCard from './OrderListCard/OrderListCard';
import { GetContexts } from '../../../context/AuthProvider';
import Loading from '../../Loading/Loading';
const OrderList = () => {
    const [update, setUpdate] = useState(false);
    const {user,isAdmin} = GetContexts();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://specta-web.herokuapp.com/ordersByEmail?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
    }, [update]);
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
                    <Loading/>
                }

                {orders.length > 0 &&
                    <div className="mini-card-container">
                        {
                            orders.map(order => <OrderListCard data={order.serviceInfo} handleDelete={handleDelete} id={order._id} status={order.status} />)
                        }
                    </div>
                }
                {!loading && !orders.length > 0 &&
                    <h2>
                        Your order list is empty !
                    </h2>
                }



            </div>
        </div>
    );
};

export default OrderList;