import React, { FC, useState } from "react";
import arrow from "../images/right-arrow.svg";
import "./index.css";

interface FormItemProps {
  text: string;
  children: JSX.Element[] | JSX.Element;
}

const FormItem: FC<FormItemProps> = (props) => {
  const { children, text } = props;

  return (
    <div className="form-item">
      <div className="icon-wrapper">{children}</div>
      <div className="title">{text}</div>
      <div className="value"></div>
      <div className="arrow">
        <img src={arrow} className="icon" />
      </div>
    </div>
  );
};

export default FormItem;
