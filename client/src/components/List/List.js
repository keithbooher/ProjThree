import React from "react";

const ListItem = props =>
  <li className={`${props.class} list-group-item`}>
    {props.children}
  </li>;

  export default ListItem;