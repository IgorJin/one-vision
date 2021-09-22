import React, { FC, useState } from "react";
import audi from "../images/vehicles/audi.png";
import cabr from "../images/vehicles/cabr.png";

interface VechicleChoosePanelProps {}

const VechicleChoosePanel: FC<VechicleChoosePanelProps> = (props) => {
  return (
    <React.Fragment>
      <h2 className="title">Choose vecicle</h2>
      <div className="card-wrapper">
        <div className="card">
            <div className="image">
                <img className="vehicle-icon" src={audi} alt="" />
                <div className="background-circle"></div>
            </div>
            <div className="name">Audi</div>
            <div className="capacity">500 kg</div>
            <div className="size">5ft</div>
            <div className="book-button">Starting from 150</div>
        </div>
        <div className="card">
            <div className="image">
                <img className="vehicle-icon" src={cabr} alt="" />
                <div className="background-circle"></div>
            </div>
            <div className="name">Audi cabrio</div>
            <div className="capacity">250 kg</div>
            <div className="size">8ft</div>
            <div className="book-button">Starting from 350</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VechicleChoosePanel;
