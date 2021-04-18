import React, { useContext, useEffect, useState } from 'react';
import {  NavLink } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Sidebar.css'
const Sidebar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    useEffect(() => {
        fetch(`https://specta-web.herokuapp.com/isAdmin?email=${loggedInUser.email}`)
        .then(res => res.json())
            .then(data => {
                console.log(data);
            if (data) {
                setIsAdmin(true);
            }
        });  
    },[]);
       
       

    

    return (
        <div className="sidebar">
            <div className="section-header">
            <h1>DASHBOARD</h1>
            </div>
            <ul className="bar">

            <li className=" bar-item">
                    <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/order">
                        Order
                    </NavLink>
                </li>
                <li className=" bar-item">
                      <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-review">
                          Review
                      </NavLink>
                  </li>
                <li className=" bar-item">
                    <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/order-list">
                        Order List
                    </NavLink>
                </li>

                { isAdmin  &&
                    <div>
                    <li className=" bar-item">
                      <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/manage-order">
                          Manage Order
                      </NavLink>
                  </li>
                  <li className=" bar-item">
                      <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-feature">
                          Add Feature
                      </NavLink>
                  </li>
                  <li className=" bar-item">
                      <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-service">
                          Add Service
                      </NavLink>
                  </li>
                 
                  <li className=" bar-item">
                      <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-admin">
                         Add Admin
                      </NavLink>
                  </li>
                      </div>
              }
            </ul>
        </div>
    );
};

export default Sidebar;