import React from "react";

export const AverageStar = (props) =>
  <div >
        <span id={`${props.name}averageStar1`} className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`${props.name}averageStar2`} className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`${props.name}averageStar3`} className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`${props.name}averageStar4`}  className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`${props.name}averageStar5`}  className={`fa fa-star hover ${props.checked}`}></span>
  
  </div>;

  export default AverageStar;