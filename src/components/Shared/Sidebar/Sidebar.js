import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Sidebar.css'
const Sidebar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
   const loggedInUser = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        fetch(`https://specta-web.herokuapp.com/isAdmin?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsAdmin(true);
                }
            });
    }, []);





    return (
        <div className="sidebar">
            <div className="section-header">
                <h1>DASHBOARD</h1>
            </div>
            <ul className="bar">

                <li className=" bar-item">
                    <NavLink activeClassName="activeClassName-bar" className=" bar-link" to="/dashboard/order">
                        <i className="fas fa-shopping-cart"></i> Order
                    </NavLink>
                </li>
                <li className=" bar-item">
                    <NavLink activeClassName="activeClassName-bar" className=" bar-link" to="/dashboard/add-review">

                        <i className="fas fa-comments"></i> Review
                      </NavLink>
                </li>
                <li className=" bar-item">
                    <NavLink activeClassName="activeClassName-bar" className=" bar-link" to="/dashboard/order-list">
                        <i className="far fa-list-alt"></i> Order List
                    </NavLink>
                </li>

                {isAdmin &&
                    <li className=" bar-item">
                        <NavLink activeClassName="activeClassName-bar" className=" bar-link" to="/dashboard/manage-order">
                            <i className="fas fa-tasks"></i> Manage Order
                      </NavLink>
                    </li>
                }
                {isAdmin &&
                    <li className=" bar-item">
                        <NavLink activeClassName="activeClassName-bar" className=" bar-link" to="/dashboard/add-feature">
                            <i className="fas fa-puzzle-piece"></i> Add Feature
                      </NavLink>
                    </li>}

                {isAdmin &&
                    <li className=" bar-item">
                        <NavLink activeClassName="activeClassName-bar" className=" bar-link" to="/dashboard/add-service">
                            <i className="fab fa-servicestack"></i>  Add Service
                      </NavLink>
                    </li>
                }
                {isAdmin &&
                    <li className=" bar-item">
                        <NavLink activeClassName="activeClassName-bar" className=" bar-link" to="/dashboard/add-admin">
                            <i className="fas fa-user-plus"></i> Add Admin
                      </NavLink>
                    </li>}

            </ul>
        </div>
    );
};

export default Sidebar;