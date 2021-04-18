import React, { useContext, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { SiElectron } from 'react-icons/si';
import './Navbar.css'
import { UserContext } from '../../../App';
const Navbar = () => {
    const history = useHistory();
    // const token = sessionStorage.getItem('loginToken');
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [active,setActive] = useState()
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }
    const closeMobileMenu = () => {
        setClick(false);
    }
    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.removeItem('loginToken');
    }
    const handleSignIn = () => {
            history.push('/login')
    }
    
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="logo-div"><span><SiElectron size={30}/></span> <span> Specta</span> </Link>

                 <div className="menu-icon" onClick={handleClick}>
                    {
                        click ? <i class="fas fa-times"></i> : <i class="fas fa-bars"></i>
                    }
                </div>
                <ul onClick={closeMobileMenu} className={click ? 'nav-links active' : 'nav-links'}>
                    <li  className="nav-item">
                        <NavLink className="nav-link" activeClassName="nav-link-active" exact to="/"> Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="nav-link-active" to="/dashboard/order-list"> Dashboard </NavLink>
                    </li>
                    <li className="nav-item">
                        <a onClick={()=>setActive("services")}  className={active === "services" ? "nav-link active" :"nav-link"} href="#services"> Services </a>
                    </li>
                    <li className="nav-item">
                        <Link onClick={()=>setActive("about")}  className={active === "about" ? "nav-link active" :"nav-link"} to="/about"> About Us </Link>
                    </li>

                    <li className="nav-item">
                        {
                            loggedInUser.email  ? <Link onClick={handleSignOut} className="nav-link-mobile">Sign Out</Link>
                                :
                                <Link to="/login"  className="nav-link-mobile">Sign In</Link>
                    }
                    </li>
                    
                    <li className="nav-item">
                        {
                            loggedInUser.email  ?
                                <button onClick={handleSignOut} className="nav-btn">Sign Out</button>
                                :
                                <button onClick={handleSignIn} className="nav-btn">Sign In</button>
                        }
                    
                    </li>
                   
                </ul>
            </nav>
        </>
    );
};

export default Navbar;