import React from "react";

const UnorderedListItem = props =>
  <ul className={`${props.class} list-group-item`}>
    {props.children}
  </ul>;

  export default UnorderedListItem;