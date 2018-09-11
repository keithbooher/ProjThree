import React from "react";
import Payments from "../Payments/Payments";
import "./Card.css";

const Card = props => (
  <div className="artCard">
    <img onClick={() => props.enlargeImage(props.id)} className={`card-img-top images${props.id} firstImage`} src={props.image} alt={props.productName} />

    <div className={`myModal${props.id} modal `} >
      {/* The Close Button  */}
      <span onClick={() => props.shrinkImage(props.id)} className="close">&times;</span>

      {/* Modal Content (The Image) */}
      <img className={`modal-content img${props.id}`} src="" />

      {/* Modal Caption (Image Text)  */}
      <div className={`caption${props.id} captions`}></div>
    </div>


    <div className="card-body">
      <h5 className="card-title">{props.productName}</h5>
      <p className="card-text">${props.price + props.platformFee}</p>      
      <p className="card-text">{props.description}</p>
      <a href={`/artist/${props.artistID}`}>{props.artistName}</a>    
      <p className="card-text">Quantity: {props.quantity}</p>        
    </div>
    {props.sold ? "SOLD OUT" :     
    <Payments
      price={props.price}
      targetStripe={props.targetStripe}
      platformFee={props.platformFee}
      currentUserEmail={props.currentUserEmail}
      artistEmail={props.artistEmail}
      productName={props.productName}
      productID={props.productID}
      image={props.image}
      firstName={props.currentUserName}
    />}

  </div>
);

export default Card;
