import React, {FC, useState} from 'react';
import location from '../images/location.svg'
import arrow from '../images/right-arrow.svg'
import "./index.css";

interface FormItemProps {}

const FormItem: FC<FormItemProps> = (props) => {


    return (
        <div className="form-item">
            <div className="icon-wrapper">
                <img src={location} className="icon"/>
            </div>
            <div className="title">
                Choose localtion
            </div>
            <div className="value">

            </div>
            <div className="arrow">
                <img src={arrow} className="icon"/>
            </div>
        </div>
    );
}

export default FormItem;