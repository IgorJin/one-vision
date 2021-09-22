import React, {FC} from 'react';
import Form from "./form"
import ActionPanel from "./action-panel"

interface MainScreenProps {}

const MainScreen: FC<MainScreenProps> = (props) => {

    return (
        <div className="main">
            <Form />
            <ActionPanel />
        </div>
    );
}

export default MainScreen;