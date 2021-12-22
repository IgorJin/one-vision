import React, { FC, useState } from "react";
import arrow from "../images/right-arrow.svg";
import "./index.css";
import cn from "classnames"

interface FormItemProps {
  text: string;
  children: JSX.Element[] | JSX.Element;
  handleChoose(type: string): void;
  type: string;
  activeType: string;
  choosed?: string;
}

const FormItem: FC<FormItemProps> = (props) => {
  const { children, text, type, activeType, choosed, handleChoose } = props;

  const chooseCurrentTab = () => {
    handleChoose(type)
  }

  return (
    <div className={cn("form-item", { active: type ===  activeType })} onClick={chooseCurrentTab}>
      <div className="icon-wrapper">{children}</div>
      <div className="flex">
        <div className="title">{text}</div>
        {choosed ? <div className="value">{choosed}</div> : undefined}
      </div>
      <div className="arrow">
        <img src={arrow} className="icon" alt=""/>
      </div>
    </div>
  );
};

export default FormItem;
