import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './AddFeature.css'
const AddFeature = () => {
    const [file, setFile] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
  const formData = new FormData()
        formData.append('file', file);
        formData.append('subject', data.subject);
        formData.append('details', data.details);

  fetch('http://localhost:5000/addAFeature', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(success => {
      if (success) {
        alert("data uploaded !!!!")
    }
  })
  .catch(error => {
    console.error(error)
  })
    }
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }
 console.log(file);
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-area">
          <div className="section-header">
            <h1>Add A Feature</h1>
          </div>
          <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="subject" required placeholder="Enter a title of the feaure" ref={register} />
   
            <textarea cols="6" rows="4" type="text" name="details" required  placeholder="Describe the feature" ref={register} />
   
            <input onChange={handleFileChange} type="file"  />

            <button type="submit" className="brand-btn">Submit</button>
        </form>
          </div>
        </div>
          
       </div>
    );
};

export default AddFeature;