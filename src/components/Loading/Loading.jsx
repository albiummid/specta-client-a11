import React from 'react';
import loader from '../../images/loadingAnimation.gif';

const Loading = () => {
    return (
        <div style={{display:"grid",placeItems:'center',height:'100vh',width:'100%'}}>
            <img style={{ width: "150px", margin: "0 auto" }} src={loader} alt="" />
        </div>
    );
};

export default Loading;