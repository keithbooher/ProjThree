import React from "react";

export const Star = (props) =>
  <div >
        <h2>Rate This User</h2>
        <span id="star1" onClick={() => props.star(props.idOne)} className={`fa fa-star hover ${props.checked}`}></span>
        <span id="star2" onClick={() => props.star(props.idTwo)} className={`fa fa-star hover ${props.checked}`}></span>
        <span id="star3" onClick={() => props.star(props.idThree)} className={`fa fa-star hover ${props.checked}`}></span>
        <span id="star4" onClick={() => props.star(props.idFour)} className={`fa fa-star hover ${props.checked}`}></span>
        <span id="star5" onClick={() => props.star(props.idFive)} className={`fa fa-star hover ${props.checked}`}></span>
  </div>;

  export default Star;