import React, {FC, useState} from 'react';
import Form from "./form"
import ActionPanel from "./action-panel"

interface MainScreenProps {}

const MainScreen: FC<MainScreenProps> = (props) => {
    const [vechicle, setVechicle] = useState<string | null>(null)
    const [date, setDate] = useState<Date>(new Date())

    return (
        <div className="main">
            <Form vechicle={vechicle} date={date}/>
            <ActionPanel 
                date={date} 
                vechicle={vechicle} 
                setDate={setDate}
                setVechicle={setVechicle} 
            />
        </div>
    );
}

export default MainScreen;