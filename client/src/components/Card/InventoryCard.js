import React from "react";
import Payments from "../Payments/Payments";
import "./Card.css";

const InventoryCard = props => (
  <div className="artCard">
    <img className="card-img-top" src={props.image} alt={props.productName} />
    <div className="card-body">
      <h5 className="card-title">{props.productName}</h5>
      <p className="card-text">${props.price + props.platformFee}</p>      
      <p className="card-text">{props.description}</p>
      <a href={`/artist/${props.artistID}`}>{props.artistName}</a>    
      <form className="postForm">
        <div className="form-group">
            <label htmlFor="description">Quantity: </label>
            <input
            value={props.quantity}
            onChange= {props.handleInputChange}            
            type="integer"
            className="form-control bg-white"
            id="quantity"
            name="quantity"
            placeholder={props.quantity}
            />
        </div>
        <button
            type="submit"
            className="btn btn-primary submitBtn"
            onClick={() => props.handleFormSubmit(props.productID)}
        >
            Submit
        </button>
        <div className={props.alertQuantity}>
            <p>Please enter quantity</p>
        </div>
    </form>      
    </div>

  </div>

// <div className="artCard">
// <img className="card-img-top" src={product.data.img} alt={product.data.productName} />
// <div className="card-body">
//     <h5 className="card-title">{product.data.productName}</h5>
//     <p className="card-text">${product.data.price + product.data.platformFee}</p>      
//     <p className="card-text">{product.data.description}</p>
//     {/* <p className="card-text">Quantity: {props.quantity}</p>         */}
//     <form className="postForm">
//         <div className="form-group">
//             <label htmlFor="description">Quantity: </label>
//             <input
//             value={this.state.quantity}
//             onChange={this.handleInputChange}
//             type="integer"
//             className="form-control bg-white"
//             id="quantity"
//             name="quantity"
//             placeholder={product.data.quantity}
//             />
//         </div>
//         <button
//             type="submit"
//             className="btn btn-primary submitBtn"
//             onClick={this.handleFormSubmit}
//         >
//             Submit
//         </button>
//         <div className={this.state.alertQuantity}>
//             <p>Please enter quantity</p>
//         </div>
//     </form>
// </div>
// </div>
);

export default InventoryCard;
