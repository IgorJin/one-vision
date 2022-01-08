import React from 'react';
import './index.scss'
import cn from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
    handleChange(v: string): void;
}

const Input: React.FC<InputProps> = ({ id, label, handleChange, ...rest }) => {
  const onChangeHandler = (e: any) => {
    const { value } = e.target

    handleChange(value || '')
  }

  return (
    <div className="input-group">
      <input className={cn("input-field", rest.value && "inputed")} id={id} {...rest} onChange={onChangeHandler} />
      <label className="input-label" htmlFor={id} >{label}</label>
    </div>
  );
}

export default Input;
