import { NavLink } from 'react-router-dom';
import { GetContexts } from '../../../context/AuthProvider';
import './Sidebar.css'
const Sidebar = () => {
    let {user,isAdmin} = GetContexts();
    return (
        <div className="sidebar">
            <div className="section-header">
                <h1>DASHBOARD</h1>
            </div>
            <ul className="bar">
                <li className=" bar-item">
                    <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/order">
                        <i class="fas fa-shopping-cart"></i> Order
                    </NavLink>
                </li>
                <li className="bar-item">
                    <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-review">

                        <i class="fas fa-comments"></i> Review
                      </NavLink>
                </li>
                <li className=" bar-item">
                    <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/order-list">
                        <i class="far fa-list-alt"></i> Order List
                    </NavLink>
                </li>

                {isAdmin &&
                    <li className=" bar-item">
                        <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/manage-order">
                            <i class="fas fa-tasks"></i> Manage Order
                      </NavLink>
                    </li>
                }
                {isAdmin &&
                    <li className=" bar-item">
                        <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-feature">
                            <i class="fas fa-puzzle-piece"></i> Add Feature
                      </NavLink>
                    </li>}

                {isAdmin&&
                    <li className=" bar-item">
                        <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-service">
                            <i class="fab fa-servicestack"></i>  Add Service
                      </NavLink>
                    </li>
                }
                {isAdmin &&
                    <li className=" bar-item">
                        <NavLink activeClassName="active-bar" className=" bar-link" to="/dashboard/add-admin">
                            <i class="fas fa-user-plus"></i> Add Admin
                      </NavLink>
                    </li>}

            </ul>
        </div>
    );
};

export default Sidebar;