import React from "react";

const DeleteCard = props => (
  <div className="artCard">
    <img className="card-img-top" src={props.image} alt={props.productName} />
    <div className="card-body">
      <h5 className="card-title">{props.productName}</h5>
      <p className="card-text">${props.price * 0.01}</p>
    </div>
    <button onClick={() => props.deleteProduct(props.productID)}>
      Delete This Product From Your Page
    </button>
  </div>
);

export default DeleteCard;
