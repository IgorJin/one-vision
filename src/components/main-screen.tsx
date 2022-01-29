import React, { FC, useState } from "react";
import Form from "./form/form";
import ActionPanel from "./action-panel/action-panel";

interface MainScreenProps {}

const MainScreen: FC<MainScreenProps> = (props) => {
  const [vechicle, setVechicle] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [paymentInfo, setPaymentInfo] = useState<string | null>(null);
  return (
    <div className="main">
      <Form vechicle={vechicle} date={date} paymentInfo={paymentInfo} />

      <ActionPanel
        date={date}
        vechicle={vechicle}
        setDate={setDate}
        setVechicle={setVechicle}
        paymentInfo={paymentInfo}
        setPaymentInfo={setPaymentInfo}
      />

    </div>
  );
};

export default MainScreen;
