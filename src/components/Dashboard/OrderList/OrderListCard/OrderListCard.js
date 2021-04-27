import React from 'react';
import './OrderListCard.css'
const OrderListCard = ({ data, status, handleDelete, id,serial}) => {
    const { title, price, subType, speed, realIp, opticFiber, router } = data;
    return (
        <div className="order-list-card">
            <div className="order-header">
                <h3>Package: {title}</h3>
                <p className={status}>{ status }</p>
            </div>
            <div className="order-info">
            <div><span> Charge : {price} ৳
</span><span>/ {subType}</span></div>
            <p>Speed: <span>{ speed }</span> Mbps </p>
            <p>Real Ip: <span>{ realIp }</span> </p>
            <p>Optic Fiber Connection: <span>{ opticFiber }</span> </p>
            <p>Router with Connection : <span>{ router }</span> </p>
            </div>
            <button onClick={()=>handleDelete(id)} className="brand-btn">Cancel</button>
            
        </div>
    );
};

export default OrderListCard;