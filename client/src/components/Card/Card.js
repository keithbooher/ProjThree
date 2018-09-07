import React from 'react';
import Payments from '../../components/Navs/Payments';


const Card = props => (
    <div className="card">
        <img className="card-img-top" src={props.image} alt={props.productName}></img>
        <div className="card-body">
            <h5 className="card-title">{props.productName}</h5>
            <p className="card-text">${props.price * .01}</p>
        </div>
        <Payments 
        price={props.price} 
        targetStripe={props.targetStripe} 
        platformFee={props.platformFee} 
        currentUserEmail={props.currentUserEmail} 
        artistEmail={props.artistEmail} 
        currentUserEmail={props.currentUserEmail} 
        productName={props.productName}
        image={props.image}        
        />
    </div>
);


export default Card;