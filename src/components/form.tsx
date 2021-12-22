import React, { FC, useState } from "react";
import FromItemComponent from "./form-item";
import location from "../images/location.svg";
import calendar from "../images/calendar.svg";
import card from "../images/credit-card.svg";
import truck from "../images/delivery-truck.svg";
import { FORM_TYPES, cards } from "../utils/constants"
import "./index.css";

interface FormProps {
  activeType: string
  vechicle: string | null;
  handleChoose(type: string): void;
}

const Form: FC<FormProps> = (props) => {
  const { activeType, vechicle, handleChoose } = props
  
  const prettier = {vechicle: ''}

  if (vechicle) {
    const findedCard = cards.find(c => c.id === vechicle)
    prettier.vechicle = findedCard ? `${findedCard.name}/${findedCard.price}` : ''
  }

  return (
    <div className="form">
      <div className="title">Book vehicle in second</div>
      <div>
        <FromItemComponent text="Выберите локацию" type={FORM_TYPES.location} activeType={activeType} handleChoose={handleChoose}>
          <img src={location} className="icon" alt=""/>
        </FromItemComponent>
        <FromItemComponent text="Выберите транспорт" type={FORM_TYPES.vehicle} activeType={activeType} handleChoose={handleChoose} choosed={prettier.vechicle}>
          <img src={truck} className="icon" alt=""/>
        </FromItemComponent>
        <FromItemComponent text="Выберите дату и время" type={FORM_TYPES.date} activeType={activeType} handleChoose={handleChoose}>
          <img src={calendar} className="icon" alt=""/>
        </FromItemComponent>
        <FromItemComponent text="Платежный способ" type={FORM_TYPES.payment} activeType={activeType} handleChoose={handleChoose}>
          <img src={card} className="icon" alt=""/>
        </FromItemComponent>
      </div>
    </div>
  );
};

export default Form;
