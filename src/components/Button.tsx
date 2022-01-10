import React from 'react';
import './index.scss'
import cn from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLButtonElement>{
  onClick(): void;
}

const Input: React.FC<InputProps> = ({ children, onClick, ...rest }) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return (
    <div className="input-group">
      <button className={cn("button")} onClick={handleOnClick}>{children}</button>
    </div>
  );
}

export default Input;
