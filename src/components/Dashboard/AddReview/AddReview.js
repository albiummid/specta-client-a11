import React, { useContext, useState } from 'react';
import './AddReview.css'
import { useForm } from "react-hook-form";
import Sidebar from '../../Shared/Sidebar/Sidebar';
const AddReview = () => {
 const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const [file, setFile] = useState(null);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
  const formData = new FormData()
        formData.append('file', file);
        formData.append('name', data.name);
        formData.append('location', data.location);
        formData.append('comment', data.comment);

  fetch('https://specta-web.herokuapp.com/addReview', {
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
    return (
      <div className="dashboard-container">
        <Sidebar/>
        <div className="dashboard-area">
          <div className="section-header">
          <h1>Give a Review as Feedback</h1>
          </div>
          <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" defaultValue={loggedInUser.name} name="name" required placeholder="name" ref={register} />

            <input type="text" name="location" required placeholder="location" ref={register} />
 
            <textarea cols="15" rows="4" type="text" name="comment" required  placeholder="comment" ref={register} />

            <input onChange={handleFileChange} type="file"  />

            <button type="submit" className="brand-btn">Submit</button>
                
        </form>
          </div>
             </div>
       </div>
    );
};

export default AddReview;