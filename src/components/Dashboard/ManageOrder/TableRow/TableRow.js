import React from 'react';
import './TableRow.css';
import xIcon from '../../../../images/icons/x-button.png'
const TableRow = ({ name, email, service, status, handleDelete, id, handleUpdate }) => {
    const handleChange = (e) => {
        const inputInfo = {
            id: id,
            value:e.target.value
        }
        handleUpdate(inputInfo);
    }
    return (
        <tr >
         <td>{ name }</td>   
         <td>{ email }</td>   
         <td>{ service}</td>   
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
            <td><button className="delete-btn" onClick={()=>handleDelete(id)} ><img src={xIcon} alt=""/></button></td>   
        </tr>
    );
};

export default TableRow;