import React, {FC, useState} from 'react';
import VechicleChoosePage from './vechicle-choose-panel'
import Map from './map'
import CalendarPage from './calendar'
import PaymentPage from './payment'
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { FORM_TYPES } from '../utils/constants'

interface MainScreenProps {
    vechicle: string | null;
    setVechicle(id: string): void; 
    date: Date;
    setDate(date: Date): void;
}

const ActionPanel: FC<MainScreenProps> = (props) => {
    const {vechicle, date, setVechicle, setDate } = props
    
    return (
        <div className="action-wrapper">
            <Switch>
                <Route path={`/${FORM_TYPES.location}`}>
                    <Map />
                </Route>  
                <Route path={`/${FORM_TYPES.vehicle}`}>
                    <VechicleChoosePage setVechicle={setVechicle} vechicle={vechicle}/>
                </Route> 
                <Route path={`/${FORM_TYPES.date}`}>
                    <CalendarPage date={date} setDate={setDate}/>
                </Route> 
                <Route path={`/${FORM_TYPES.payment}`}>
                    <PaymentPage />
                </Route>  
            </Switch>
        </div>
    );
}

export default ActionPanel;