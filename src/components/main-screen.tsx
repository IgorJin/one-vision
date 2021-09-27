import React, {FC, useState} from 'react';
import Form from "./form"
import ActionPanel from "./action-panel"
import { FORM_TYPES } from "../utils/constants"

interface MainScreenProps {}

const MainScreen: FC<MainScreenProps> = (props) => {
    const [activeType, setActiveType] = useState(FORM_TYPES.vehicle)
    
    const handleChoose = (type: string) => {
        setActiveType(type)
    }   

    return (
        <div className="main">
            <Form handleChoose={handleChoose} activeType={activeType}/>
            <ActionPanel type={activeType}/>
        </div>
    );
}

export default MainScreen;