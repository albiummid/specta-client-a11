import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SiElectron } from 'react-icons/si';
import './Navbar.css'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import firebase from "firebase/app";
import { UserContext } from '../../../App';
const Navbar = () => {
    const [userData, setUserData] = useContext(UserContext);
    const history = useHistory();
    const [active, setActive] = useState()
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }
    const closeMobileMenu = () => {
        setClick(false);
    }
    const handleSignOut = () => {
        sessionStorage.removeItem('user');
        firebase.auth().signOut();
        window.location.reload();
    }
    const handleSignIn = () => {
        history.push('/login')
    }

    return (
        <>
            <nav className="navbar">
                <NavLink smooth to="/" className="logo-div"><span><SiElectron size={30} /></span> <span> Specta</span> </NavLink>

                <div className="menu-icon" onClick={handleClick}>
                    {
                        click ? <i class="fas fa-times"></i> : <i class="fas fa-bars"></i>
                    }
                </div>
                <ul onClick={closeMobileMenu} className={click ? 'nav-links active' : 'nav-links'}>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="nav-link-active" exact smooth to="/"> Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="nav-link-active" smooth to="/dashboard/order-list"> Dashboard </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink smooth to='/#services' onClick={() => setActive("services")} className={active === "services" ? "nav-link active" : "nav-link"} > Services </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink onClick={() => setActive("about")} className={active === "about" ? "nav-link active" : "nav-link"} smooth to="/#about"> About Us </NavLink>
                    </li>


                    {
                        userData?.name &&
                        <li className="nav-item">
                            <p className="nav-link user-name">
                                {userData.name}
                            </p>
                        </li>

                    }
                    <li className="nav-item">
                        {
                            userData?.email ? <NavLink smooth to='/' onClick={handleSignOut} className="nav-link-mobile">Sign Out</NavLink>
                                :
                                <NavLink smooth to="/login" className="nav-link-mobile">Sign In</NavLink>
                        }
                    </li>

                    <li className="nav-item">
                        {
                            userData?.email ?
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