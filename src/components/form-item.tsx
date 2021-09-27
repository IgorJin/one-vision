import React, { FC, useState } from "react";
import arrow from "../images/right-arrow.svg";
import "./index.css";
import cn from "classnames"

interface FormItemProps {
  text: string;
  children: JSX.Element[] | JSX.Element;
  handleChoose(type: string): void;
  type: string;
  activeType: string
}

const FormItem: FC<FormItemProps> = (props) => {
  const { children, text, type, activeType, handleChoose } = props;

  const chooseCurrentTab = () => {
    handleChoose(type)
  }

  return (
    <div className={cn("form-item", { active: type ===  activeType })} onClick={chooseCurrentTab}>
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
