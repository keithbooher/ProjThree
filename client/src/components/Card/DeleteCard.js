import React from 'react';
import Payments from '../../components/Navs/Payments';


const DeleteCard = props => (
    <div className="card">
        <img className="card-img-top" src={props.image} alt={props.productName}></img>
        <div className="card-body">
            <h5 className="card-title">{props.productName}</h5>
            <p className="card-text">${props.price * .01}</p>
        </div>
        <button onClick={() => props.deleteProduct(props.productID)}>Delete This Product From Your Page</button>
    </div>
);


export default DeleteCard;