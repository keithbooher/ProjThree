import React from "react";

export const FormBtn = props => {
  let classes = 'btn ';
  switch(props.type){
    case 'primary':
      classes += 'btn-primary';
    break;
    case 'success':
      classes += 'btn-success';
    break;
    case 'info':
      classes += 'btn-info';
    break;
    case 'warning':
      classes += 'btn-warning';
    break;
    case 'danger':
      classes += 'btn-danger';
    break;
    case 'link':
      classes += 'btn-link';
    break;
    case 'default':
      classes += 'btn-default';
    break;
    default:
    break;
  }
  classes += ' ' + props.additional
  //use prop addClass to add any additional classes
  return (
    <button {...props} className={classes}>
      {props.children}
    </button>
  )
}