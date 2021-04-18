import React from 'react';
import './TableRow.css';
import xIcon from '../../../../images/icons/x-button.png'
const TableRow = ({ data, handleDelete, handleUpdate }) => {
    const { serviceInfo,orderInfo, email, _id ,status } = data;
    const handleChange = (e) => {
        const inputInfo = {
            id: _id,
            value:e.target.value
        }
        handleUpdate(inputInfo);
    }
    return (
        <tr >
         <td>{ orderInfo.name }</td>   
         <td>{ email }</td>   
         <td>{ serviceInfo.title}</td>   
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
            <td><button className="delete-btn" onClick={()=>handleDelete(_id)} ><img src={xIcon} alt=""/></button></td>   
        </tr>
    );
};

export default TableRow;