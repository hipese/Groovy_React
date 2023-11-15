import React, { useState } from 'react';
import style from "./SpinButton.module.css"

const SpinButton = ({ id }) => {
    const [value, setValue] = useState(0);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <input id={id} className={style.inputStyle} type="number" value={value} onChange={handleChange} min="0" max="15" />
    );
  };

export default SpinButton;