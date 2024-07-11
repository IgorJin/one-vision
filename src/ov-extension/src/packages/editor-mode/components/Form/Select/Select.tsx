import React, { useState } from 'react';
import './Select.scss'
import cn from 'classnames'

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
// }

const Select: React.FC = () => {
  // const onChangeHandler = (e: any) => {
  //   handleChange(e.target.value || '')
  // }

  const [checked, setchecked] = useState(false)

  const handleSelect = () => {
    setchecked(!checked)
  }

  const options = [{name: 'Cream', value: '1', checked: true}, {name: 'Toast', value: '5'}]

  return (
    <div className="select-box">
      <div className="select-box__current">
        {options.map((option, idx) => (
          <div className="select-box__value" onClick={handleSelect} key={idx}>
            <input type="radio" className="select-box__input" id={`${idx}`} value={option.value} name={option.name} checked={option.checked} /> 
              <p className="select-box__input-text">{option.name}</p> 
          </div>
        ))}
        <img src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true" className="select-box__icon" />
      </div>
      <ul className="select-box__list">
        {options.map((option, idx) => (
          <li key={idx}>
            <label htmlFor="index" className="select-box__option">{option.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
