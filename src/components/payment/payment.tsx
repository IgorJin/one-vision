import React, { FC, useReducer, useState, useEffect } from "react";
import Input from "../Input";
import "./payment.scss";
import cn from "classnames";

interface PaymentChoosePanelProps {
  paymentInfo: string | null;
  setPaymentInfo(id: string): void;
}

enum CardActionEnum {
  NUMBER = "NUMBER",
  MONTH = "MONTH",
  YEAR = "YEAR",
  NAME = "NAME",
  CCV = "CCV",
}

interface CardAction {
  type: CardActionEnum;
  payload: string;
}

interface CardState {
  number: string;
  month: string;
  year: string;
  name: string;
  ccv: string;
}

const PaymentPanel: FC<PaymentChoosePanelProps> = (props) => {
  const { paymentInfo, setPaymentInfo } = props;

  const cardReducer = (state: CardState, action: CardAction) => {
    const { type, payload } = action;
    const key = type.toLowerCase();

    return { ...state, [key]: payload };
  };

  const initialState: CardState = {
    number: "",
    month: "",
    year: "",
    name: "",
    ccv: "",
  };

  const [state, dispatch] = useReducer(cardReducer, initialState);
  const [isFocusCvv, setIsFocusCvv] = useState<boolean>(false);

  const handleChangeValue = (type: CardActionEnum, payload: string) =>
    dispatch({ type, payload });

  function getDisplayCardNumber(numberInput: any) {
    const placeholder = "****************";
    const newPlaceholder = placeholder.substr(numberInput.length);

    return numberInput.concat("", newPlaceholder).match(/.{1,4}/g);
  }

  const cardName = state.name.length < 1 ? "Name" : state.name;
  const cardNumber = getDisplayCardNumber(state.number);
  const cardCode = state.ccv.length < 1 ? "***" : state.ccv;
  const cardDate =
    state.month.length < 1 && state.year.length < 1
      ? "00/00"
      : `${state.month}/${state.year}`;
      
  useEffect(() => {
    setPaymentInfo(state.number);
  }, [setPaymentInfo, state.number]);

  return (
    <div className="payment">
      <h2 className="header__title">Выберите способ оплаты</h2>

      <div className="body">
        <div className={cn("payment-panel", isFocusCvv && "show-back")}>
          <div className="payment-card payment-card--front">
            <div className="payment-card__number">
              <span className="numberSection">{cardNumber[0]}</span>
              <span className="numberSection">{cardNumber[1]}</span>
              <span className="numberSection">{cardNumber[2]}</span>
              <span className="numberSection">{cardNumber[3]}</span>
            </div>
            <div className="payment-card__expiry-date">{cardDate}</div>
            <div className="payment-card__owner">{cardName}</div>
          </div>
          <div className="payment-card payment-card--back">
            <div className="payment-card__strip"></div>
            <div className="payment-card__signature"></div>
            <div className="payment-card__ccv">{cardCode}</div>
          </div>
        </div>
        {/* TODO to map */}
        <div className="payment-html-form">
          <form action="">
            <Input
              type="text"
              id="ccnum"
              name="cardnumber"
              placeholder="1111-2222-3333-4444"
              label="Номер карты"
              minLength={12}
              maxLength={19}
              value={state.number}
              handleChange={(v: string) =>
                handleChangeValue(CardActionEnum.NUMBER, v)
              }
            />
            <Input
              type="text"
              id="expmonth"
              name="expmonth"
              placeholder="00"
              label="Месяц истечения"
              value={state.month}
              handleChange={(v: string) =>
                handleChangeValue(CardActionEnum.MONTH, v)
              }
            />
            <Input
              type="text"
              id="expyear"
              name="expyear"
              placeholder="00"
              label="Год истечения"
              value={state.year}
              handleChange={(v: string) =>
                handleChangeValue(CardActionEnum.YEAR, v)
              }
            />
            <Input
              type="text"
              id="cname"
              name="cardname"
              placeholder="John More Doe"
              autoComplete="on"
              label="Имя"
              value={state.name}
              handleChange={(v: string) =>
                handleChangeValue(CardActionEnum.NAME, v)
              }
            />
            <Input
              type="text"
              id="ccv"
              name="ccv"
              placeholder="123"
              label="CCV"
              value={state.ccv}
              handleChange={(v: string) =>
                handleChangeValue(CardActionEnum.CCV, v)
              }
              onFocus={() => setIsFocusCvv(true)}
              onBlur={() => setIsFocusCvv(false)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPanel;
