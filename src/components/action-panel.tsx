import React, {FC, useState} from 'react';
import VechicleChoosePanel from './vechicle-choose-panel'
import { FORM_TYPES } from "../utils/constants"

interface MainScreenProps {
    type: string;
}

const ActionPanel: FC<MainScreenProps> = (props) => {
    const { type } = props

    return (
        <div className="action-wrapper">
            {type === FORM_TYPES.vehicle ? (
                <VechicleChoosePanel />
            ) : undefined}
        </div>
    );
}

export default ActionPanel;