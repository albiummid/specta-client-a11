import React, { useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './ManageOrder.css'
import TableRow from "./TableRow/TableRow";
import loader from '../../../images/infinity_loop_-_logo.gif'
const ManageOrder = () => {
    const [update, setUpdate] = useState(false)
    const [allOrders, setAllOrders] = useState([]);
    useEffect(() => {
        fetch('https://specta-web.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => setAllOrders(data))
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
                    alert("Book Information Updated !");
                    setUpdate(!update);

                }
            })

    }

    return (
        <section className="dashboard-container">
            <Sidebar />
            <div className="dashboard-area">
                <div className="section-header">
                    <h1>Manage Order</h1>
                </div>

                {allOrders.length === 0 ?
                    <img style={{ width: "150px" }} src={loader} alt="" /> :
                    <table className="table-container">
                        <thead>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Service</th>
                            <th> Status </th>
                            <th> Action</th>
                        </thead>
                        <tbody>
                            {
                                allOrders.map((data) => <TableRow serial={allOrders.length} data={data} handleDelete={handleDelete} handleUpdate={handleUpdate} ></TableRow>)
                            }
                        </tbody>
                    </table>

                }


            </div>
        </section>
    );
};

export default ManageOrder;