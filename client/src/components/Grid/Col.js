import React from "react";

export const Col = ({ size, offset, children }) => {

  let colSize = size.split(" ").map(size => "col-" + size).join(" ")
  let colOffset = offset ?
                  offset.split(" ").map(size => `col-${size.split('-')[0]}-offset-${size.split('-')[1]}`).join(" ")
                  : '';
  let classes = colSize + ' ' + colOffset
  return(
    <div className={classes}>
      {children}
    </div>
  )
}