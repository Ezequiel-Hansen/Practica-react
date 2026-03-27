import React, { useState } from 'react';

export const ChangeDolar = ({ dollar, setDollar }) => {
  const [visible, setVisible] = useState(true);


  return (
    <div>
      <button onClick={()=>setVisible(!visible)}>Haz click</button>
      <label>
        1 USD = 
        <input 
          type="number"
          value={dollar}
          onChange={(e) => setDollar(Number(e.target.value))}
          style={{ display: visible ? 'inline-block' : 'none'}} 
        />
        ARS
      </label>
    </div>
  );
}
