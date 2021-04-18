import React, { useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './ManageOrder.css'
import TableRow from "./TableRow/TableRow";
const ManageOrder = () => {
    const [update,setUpdate] = useState(false)
    const [allOrders, setAllOrders] = useState([]);
    console.log(allOrders);
    useEffect(() => {
        fetch('https://specta-web.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, [update]);
    console.log(allOrders);
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
            body: JSON.stringify({status:value})
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
                                allOrders.map((data, index) => <TableRow key={index + 1} name={data.orderInfo.name} email={data.email} service={data.serviceInfo.title} status={data.status} handleDelete={handleDelete} id={data._id } handleUpdate={handleUpdate} ></TableRow>)
                            }
                        </tbody>
                    </table>
          
            </div>
        </section>
    );
};

export default ManageOrder;