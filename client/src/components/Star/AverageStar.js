import React from "react";

export const AverageStar = (props) =>
  <div >
        <span id={`averageStar1`} className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`averageStar2`} className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`averageStar3`} className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`averageStar4`}  className={`fa fa-star hover ${props.checked}`}></span>
        <span id={`averageStar5`}  className={`fa fa-star hover ${props.checked}`}></span>
  
  </div>;

  export default AverageStar;