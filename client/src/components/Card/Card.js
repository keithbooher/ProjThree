import React from 'react';
import Payments from '../../components/Navs/Payments';


const Card = props => (
    <div className="card">
        <img className="card-img-top" src={props.image} alt={props.productName}></img>
        <div className="card-body">
            <h5 className="card-title">{props.productName}</h5>
            <p className="card-text">${props.price * .01}</p>
        </div>
        <a href={`/checkout/${props.productID}`}>Buy This Item</a>
        <Payments price={props.price} targetStripe={props.targetStripe} platformFee={props.platformFee} artistEmail={props.artistEmail} currentUserEmail={props.currentUserEmail}/>
    </div>
);


export default Card;