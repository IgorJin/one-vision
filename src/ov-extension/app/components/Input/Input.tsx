import React from 'react';
import './Input.scss'
import cn from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
    handleChange(v: string): void;
}

const Input: React.FC<InputProps> = ({ id, label, handleChange, ...rest }) => {
  const onChangeHandler = (e: any) => {
    handleChange(e.target.value || '')
  }

  return (
    <div className="input-group">
      <label className="input-label" htmlFor={id} >{label}</label>
      <input className={cn("input-field", rest.value && "inputed")} id={id} {...rest} onChange={onChangeHandler} />
    </div>
  );
}

export default Input;
