import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './AddFeature.css'
import swal from 'sweetalert';
import { useHistory } from 'react-router';
const AddFeature = () => {
  const [file, setFile] = useState(null);
  const { register, handleSubmit } = useForm();
  const [demo, setDemo] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    if (loggedInUser.isAdmin === 'false') {
      history.replace('/');
    }
    if (loggedInUser.email === 'admin-demo@specta.com') {
      setDemo(true);
      swal("Sorry!", "You are a demo admin,this feature is not available for you.", "warning");
    }
  }, []);

  const onSubmit = data => {
    if (demo) {
      swal("Sorry!", "You are a demo admin", "warning");
    }
    else {
      const formData = new FormData()
      formData.append('file', file);
      formData.append('subject', data.subject);
      formData.append('details', data.details);

      fetch('https://specta-web.herokuapp.com/addAFeature', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(success => {
          if (success) {
            swal("Good job!", "A new features added!", "success");
          }
        })
        .catch(error => {
          swal("Error!", `${error}`, "error");
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
          <h1>Add A Feature</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="subject" required placeholder="Enter a title of the feaure" ref={register} />

            <textarea cols="6" rows="4" type="text" name="details" required placeholder="Describe the feature" ref={register} />

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

export default AddFeature;