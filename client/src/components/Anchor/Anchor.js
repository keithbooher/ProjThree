import React from "react";

export const Anchor = (props) =>
  <a className={`${props.class}`} href={`${props.href}`}> {props.text}</a>

  ;

export default Anchor