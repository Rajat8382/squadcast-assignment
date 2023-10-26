import React from 'react';
import './styles.css';

function CustomInput(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={`input ${props.className}`}
    />
  );
}

CustomInput.defaultProps = {
    type: 'text',
    value: '',
    placeholder: 'Enter text',
    onChange: () => {},
  };

export default CustomInput;