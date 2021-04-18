import React from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './AddAdmin.css'
import { useForm } from "react-hook-form";
const AddAdmin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
  fetch('http://localhost:5000/addAdmin', {
      method: 'POST',
      headers: {
          "content-type":"application/json"
      },
      
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(success => {
      if (success) {
        alert(` ' ${data.email} ' Added as Admin !!!!`)
    }
  })
    }
   
    return (
      <section className="dashboard-container">
        <Sidebar/>
        <div className="dashboard-area">
          <div className="section-header">
          <h1>Add a user as ADMIN</h1>
         </div>
          <div className="form-container">
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" name="email" required placeholder="Enter an email address" ref={register} />
            <button type="submit" className="brand-btn">Submit</button>
            
    </form>
    </div>
          </div>
       
        </section>
    );
};

export default AddAdmin;