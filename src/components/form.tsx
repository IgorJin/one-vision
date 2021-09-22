import React, { FC, useState } from "react";
import FromItemComponent from "./form-item";
import location from "../images/location.svg";
import calendar from "../images/calendar.svg";
import card from "../images/credit-card.svg";
import truck from "../images/delivery-truck.svg";
import "./index.css";

interface FormProps {}

const Form: FC<FormProps> = (props) => {
  return (
    <div className="form">
      <div className="title">Book vehicle in second</div>
      <div>
        <FromItemComponent text="Выберите локацию">
          <img src={location} className="icon" />
        </FromItemComponent>
        <FromItemComponent text="Выберите транспорт">
          <img src={truck} className="icon" />
        </FromItemComponent>
        <FromItemComponent text="Выберите дату и время">
          <img src={calendar} className="icon" />
        </FromItemComponent>
        <FromItemComponent text="Платежный способ">
          <img src={card} className="icon" />
        </FromItemComponent>
      </div>
    </div>
  );
};

export default Form;
