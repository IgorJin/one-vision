import React, {FC, useState} from 'react';
import VechicleChoosePanel from './vechicle-choose-panel'
import Map from './map'
import { FORM_TYPES } from "../utils/constants"

interface MainScreenProps {
    type: string;
    vechicle: string | null;
    setVechicle(id: string): void; 
}

const ActionPanel: FC<MainScreenProps> = (props) => {
    const { type, vechicle, setVechicle } = props

    return (
        <div className="action-wrapper">
            {type === FORM_TYPES.location ? (
                <Map />
            ) : undefined}
            {type === FORM_TYPES.vehicle ? (
                <VechicleChoosePanel setVechicle={setVechicle} vechicle={vechicle}/>
            ) : undefined}
        </div>
    );
}

export default ActionPanel;