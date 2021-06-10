import React, { useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './AddAdmin.css'
import { useForm } from "react-hook-form";
import swal from 'sweetalert'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router';
const AddAdmin = () => {
  const history = useHistory();
  const [demo, setDemo] = useState(false);
  const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    if (loggedInUser.isAdmin === 'false') {
      history.replace('/');
    }
    if (loggedInUser.email === 'admin-demo@specta.com') {
      setDemo(true);
      swal("Sorry!", "You are a demo admin,this feature is not available for you.", "warning");
    }
  }, [loggedInUser?.email]);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    if (!demo) {
      fetch('https://specta-web.herokuapp.com/addAdmin', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },

        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(success => {
          if (success) {
            alert(` ' ${data.email} ' Added as Admin !!!!`)
          }
        });
    }
    else {
      toast.error("You are a demo admin,you can't");
    }
  }

  return (
    <section className="dashboard-container">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Sidebar />
      <div className="dashboard-area">
        <div className="section-header">
          <h1>Make a user ADMIN</h1>
        </div>
        <div className="form-container">

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" name="email" required placeholder="Enter an email address" ref={register} />
            <div className="btn_div">
              <button type="submit" className="brand-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>

    </section>
  );
};

export default AddAdmin;