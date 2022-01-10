import React, { FC } from "react";
import FromItemComponent from "./form-item";
import location from "../../images/location.svg"; //TODO to svg
import calendar from "../../images/calendar.svg";
import card from "../../images/credit-card.svg";
import truck from "../../images/delivery-truck.svg";
import Button from '../Button'
import { FORM_TYPES, cards } from "../../utils/constants"
import "../index.scss";

interface FormProps {
  vechicle: string | null;
  date: Date;
  paymentInfo: string | null;
}

const Form: FC<FormProps> = (props) => {
  const { vechicle, date, paymentInfo } = props
  
  const prettier = {vechicle: '', date: '', paymentInfo: ''} // TODO rewrite

  if (vechicle) {
    const findedCard = cards.find(c => c.id === vechicle)
    prettier.vechicle = findedCard ? `${findedCard.name}/${findedCard.price}` : ''
  }

  if (date) {
    prettier.date = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
  }

  if (paymentInfo) {
    prettier.paymentInfo = paymentInfo
  }

  const submitClick = () => {
    alert(Object.entries(prettier).join('; '))
  }

  return (
    <div className="form">
      <div className="title">Доставка элитными автомобилями</div>
      <div className="sections">
        <FromItemComponent text="Выберите локацию" type={FORM_TYPES.location}>
          <img src={location} className="icon" alt=""/>
        </FromItemComponent>
        <FromItemComponent text="Выберите транспорт" type={FORM_TYPES.vehicle} choosed={prettier.vechicle}>
          <img src={truck} className="icon" alt=""/>
        </FromItemComponent>
        <FromItemComponent text="Выберите дату и время" type={FORM_TYPES.date} choosed={prettier.date}>
          <img src={calendar} className="icon" alt=""/>
        </FromItemComponent>
        <FromItemComponent text="Платежный способ" type={FORM_TYPES.payment} choosed={prettier.paymentInfo}>
          <img src={card} className="icon" alt=""/>
        </FromItemComponent>
      </div>

      <Button onClick={submitClick}>Отправить</Button>
    </div>
  );
};

export default Form;
