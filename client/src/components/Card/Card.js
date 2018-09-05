import React from 'react';


const Card = props => (
    <div className="card" style="">
        <img className="card-img-top" src="..." alt="Card image cap"></img>
        <div className="card-body">
            <h5 className="card-title">{props.productName}</h5>
            <p className="card-text">{props.price}</p>
            <div>{props.children}</div>
        </div>
    </div>
);


export default Card;