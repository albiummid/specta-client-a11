import React, { useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './ManageOrder.css'
import TableRow from "./TableRow/TableRow";
import loader from '../../../images/infinity_loop_-_logo.gif'
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import { GetContexts } from '../../../context/AuthProvider';

const ManageOrder = () => {
    const [update, setUpdate] = useState(false)
    const [allOrders, setAllOrders] = useState([]);
    const [demo, setDemo] = useState(false);
    const { user } = GetContexts();
    const history = useHistory();
    useEffect(() => {
        if (user.email === 'admin-demo@specta.com') {
            setDemo(true);
        }
    }, []);

    useEffect(() => {
        fetch('https://specta-web.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, [update]);
    const handleDelete = (id) => {
        if (user?.email === 'admin-demo@specta.com') {
            toast.error("You are a demo admin,you can't");
        }
        swal({
            title: "connection done?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (demo) {
                        swal("Sorry!", "You are a demo admin", "warning");
                    }
                    else {
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
                    }
                } else {
                    swal("Your order is safe!");
                }
            });



    }
    const handleUpdate = (updatedData) => {
        const { id, value } = updatedData;
        fetch(`https://specta-web.herokuapp.com/updateOrder/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status: value })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    swal("Order status updated !", {
                        icon: "success",
                    });
                    setUpdate(!update);

                }
            })

    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-area">
                <div className="section-header">
                    <h1>Manage Order</h1>
                </div>

                {allOrders.length === 0 ?
                    <img style={{ width: "150px" }} src={loader} alt="" /> :
                    <table className="table-container">
                        <thead>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th className='s-none'>Email</th>
                            <th>Service</th>
                            <th> Status </th>
                            <th> Action</th>
                        </thead>
                        <tbody>
                            {
                                allOrders.map((data, index) => <TableRow serial={allOrders.length} id={index + 1} key={index + 1} data={data} handleDelete={handleDelete} handleUpdate={handleUpdate} ></TableRow>)
                            }
                        </tbody>
                    </table>

                }


            </div>
        </div>
    );
};

export default ManageOrder;