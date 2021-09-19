import React, {FC, useState} from 'react';
import FromItemComponent from './form-item'
import "./index.css";

interface FormProps {}

const Form: FC<FormProps> = (props) => {


    return (
        <div className="form">
            <div className="title">
                Book vehicle in second
            </div>
            <div>
                <FromItemComponent />
                <FromItemComponent />
                <FromItemComponent />
            </div>
        </div>
    );
}

export default Form;