import React, {FC} from 'react';
import Form from "./form"
import VehicleChoose from "./vechicle-choose"

interface MainScreenProps {}

const MainScreen: FC<MainScreenProps> = (props) => {

    return (
        <div className="main">
            <Form />
            <VehicleChoose />
        </div>
    );
}

export default MainScreen;