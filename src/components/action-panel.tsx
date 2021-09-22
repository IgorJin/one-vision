import React, {FC, useState} from 'react';
import VechicleChoosePanel from './vechicle-choose-panel'

interface MainScreenProps {}

const ActionPanel: FC<MainScreenProps> = (props) => {


    return (
        <div className="action-wrapper">
           <VechicleChoosePanel />
        </div>
    );
}

export default ActionPanel;