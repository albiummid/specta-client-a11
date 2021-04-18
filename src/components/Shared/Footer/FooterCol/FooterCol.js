import React from 'react';
import { Link } from 'react-router-dom';
import './FooterCol.css'
const FooterCol = ({data}) => {
    const { link1, link2, link3, link4,link5, name1, name2, name3, name4 ,name5 } = data;
    return (
        <div className="footer-col">
            <ul>
            <li  > <Link to={link1}> {name1} </Link> </li>
            <li  > <Link to={link2}> {name2} </Link> </li>
            <li  > <Link to={link3}> {name3} </Link> </li>
            <li  > <Link to={link4}> {name4} </Link> </li>
            <li  > <Link to={link5}> {name5} </Link> </li>
            </ul>
        </div>
    );
};

export default FooterCol;