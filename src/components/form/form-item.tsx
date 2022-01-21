import React, { FC, useState } from "react";
import arrow from "../../images/right-arrow.svg";
import { Link, useRouteMatch } from "react-router-dom";
import "../index.scss";
import cn from "classnames";

interface FormItemProps {
  text: string;
  children: JSX.Element[] | JSX.Element;
  type: string;
  choosed?: string;
}

const FormItem: FC<FormItemProps> = (props) => {
  const { children, text, type, choosed } = props;

  const match = useRouteMatch();

  return (
    <Link to={type} className="link">
      <div className={cn("form-item", { active: type === match.url })}>
        <div className="icon-wrapper">{children}</div>
        <div className="flex">
          <div className="title">{text}</div>
          {choosed ? <div className="value">{choosed}</div> : undefined}
        </div>
        <div className="arrow">
          <img src={arrow} className="icon" alt="" />
        </div>
      </div>
    </Link>
  );
};

export default FormItem;
