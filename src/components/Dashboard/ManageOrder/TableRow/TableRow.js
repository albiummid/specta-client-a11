import React from 'react';
import './TableRow.css';
import check from '../../../../images/icons/check.png'
const TableRow = ({ data, handleDelete, handleUpdate, id }) => {
    const { serviceInfo, orderInfo, email, _id, status } = data;
    const handleChange = (e) => {
        const inputInfo = {
            id: _id,
            value: e.target.value
        }
        handleUpdate(inputInfo);
    }
    return (
        <tr >
            <td>{id}</td>
            <td>{orderInfo.name}</td>
            <td className='s-none'>{email}</td>
            <td>{serviceInfo.title}</td>
            <td>
                <select onChange={handleChange} >
                    <option value={status}>{status}</option>
                    {
                        status !== "Processing" &&
                        <option value="Proccessing" >Proccessing</option>
                    }
                    {
                        status !== "Done" &&
                        <option value="Done" >Done</option>

                    }
                    {
                        status !== "Pending" &&
                        <option value="Pending" >Pending</option>

                    }


                </select>
            </td>
            <td><button className="delete-btn" onClick={() => handleDelete(_id)} ><img src={check} alt="" /></button></td>
        </tr>
    );
};

export default TableRow;