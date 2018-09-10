import React from "react";
import Payments from "../Payments/Payments";
import "./Card.css";

const Card = props => (
  <div className="card">
    <img className="card-img-top" src={props.image} alt={props.productName} />
    <div className="card-body">
      <h5 className="card-title">{props.productName}</h5>
      <p className="card-text">{props.description}</p>
      <p className="card-text">${props.price + props.platformFee}</p>
    </div>
    <Payments
      price={props.price}
      targetStripe={props.targetStripe}
      platformFee={props.platformFee}
      currentUserEmail={props.currentUserEmail}
      artistEmail={props.artistEmail}
      productName={props.productName}
      image={props.image}
      firstName={props.currentUserName}
    />
  </div>
);

export default Card;
