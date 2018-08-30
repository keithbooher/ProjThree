import React from "react";

const UnorderedListItem = props =>
  <ul className="list-group-item">
    {props.children}
  </ul>;

  export default UnorderedListItem;