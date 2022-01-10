import React, { FC } from "react";
import VechicleChoosePage from "../vechicle/vechicle-choose-panel";
import Map from "../location/map";
import CalendarPage from "../date/calendar";
import PaymentPage from "../payment/payment";
import { Switch, Route } from "react-router-dom";
import { FORM_TYPES } from "../../utils/constants";

interface MainScreenProps {
  vechicle: string | null;
  setVechicle(id: string): void;
  date: Date;
  setDate(date: Date): void;
  paymentInfo: string | null;
  setPaymentInfo(id: string): void;
}

const ActionPanel: FC<MainScreenProps> = (props) => {
  const { vechicle, date, paymentInfo, setPaymentInfo, setVechicle, setDate } = props;

  return (
    <div className="action-wrapper">
      <Switch>
        <Route path={`/${FORM_TYPES.location}`}>
          <Map />
        </Route>
        <Route path={`/${FORM_TYPES.vehicle}`}>
          <VechicleChoosePage setVechicle={setVechicle} vechicle={vechicle} />
        </Route>
        <Route path={`/${FORM_TYPES.date}`}>
          <CalendarPage date={date} setDate={setDate} />
        </Route>
        <Route path={`/${FORM_TYPES.payment}`}>
          <PaymentPage paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo}/>
        </Route>
      </Switch>
    </div>
  );
};

export default ActionPanel;
