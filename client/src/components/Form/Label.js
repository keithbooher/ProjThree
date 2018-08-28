import React from 'react';

export const Label = props => (
  <label htmlFor={props.htmlFor} {...props}>{props.children}</label>
)