import React, {useEffect, useState } from 'react';
import './AddReview.css'
import { useForm } from "react-hook-form";
import Sidebar from '../../Shared/Sidebar/Sidebar';
import swal from 'sweetalert';
import { GetContexts } from '../../../context/AuthProvider';
const AddReview = () => {

  const {user} = GetContexts();
  const [file, setFile] = useState(null);
  const { register, handleSubmit } = useForm();
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    if (user?.email === 'admin-demo@specta.com') {
      setDemo(true);
    }
  }, [user?.email]);
  const onSubmit = data => {
    if (demo) {
      swal("Sorry!", "You are a demo admin,you can't give a review", "warning");
    }
    else {
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
            swal("Good job!", "Your review is on the site", "success");
          }
        })
        .catch(error => {
          swal("Sorry!", `${error}`, "error");
        })
    }
  }
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  }
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-area">
        <div className="section-header">
          <h1>Give a Review as Feedback</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" defaultValue={user?.name} name="name" required placeholder="name" ref={register} />

            <input type="text" name="location" required placeholder="location" ref={register} />

            <textarea cols="15" rows="4" type="text" name="comment" required placeholder="comment" ref={register} />

            <input onChange={handleFileChange} type="file" />

            <div className="btn_div">
              <button type="submit" className="brand-btn">Submit</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;