import React from 'react';

export const FormGroup = props => (
  <div className='form-group' {...props}>
    {props.children}
  </div>
)