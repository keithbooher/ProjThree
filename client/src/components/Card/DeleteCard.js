import React from "react";

const DeleteCard = props => (
  <div className="artCard">
    <img className="card-img-top" src={props.image} alt={props.productName} />
    <div className="card-body">
      <h5 className="card-title">{props.productName}</h5>
      <p className="card-text">${props.price * 0.01}</p>
    </div>
    <button
      className="submit btn"
      onClick={() => props.deleteProduct(props.productID)}
    >
      Delete
    </button>
  </div>
);

export default DeleteCard;
