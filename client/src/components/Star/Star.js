import React from "react";

export const Star = props => (
  <div>
    <h2 className="userRatingTitle">Rate Artist</h2>
    <span
      id="star1"
      onClick={() => props.star(props.idOne)}
      className={`fa fa-star hover ${props.checked}`}
    />
    <span
      id="star2"
      onClick={() => props.star(props.idTwo)}
      className={`fa fa-star hover ${props.checked}`}
    />
    <span
      id="star3"
      onClick={() => props.star(props.idThree)}
      className={`fa fa-star hover ${props.checked}`}
    />
    <span
      id="star4"
      onClick={() => props.star(props.idFour)}
      className={`fa fa-star hover ${props.checked}`}
    />
    <span
      id="star5"
      onClick={() => props.star(props.idFive)}
      className={`fa fa-star hover ${props.checked}`}
    />
  </div>
);

export default Star;
