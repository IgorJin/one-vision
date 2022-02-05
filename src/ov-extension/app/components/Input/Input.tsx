import React from 'react';
import './Input.scss'
import cn from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
    handleChange(e: any): void;
}

export const Input: React.FC<InputProps> = ({ id, label, handleChange, name, ...rest }) => {

  return (
    <div className="ov-input-group">
      <label className="input-label" htmlFor={id} >{label}</label>
      <input className={cn("input-field", rest.value && "inputed")} id={id} name={name || id} {...rest} onChange={handleChange} />
    </div>
  );
}
