import React, { FC, useState } from "react";
import Card from './vechicle-card'
import { cards } from '../utils/constants' 

interface VechicleChoosePanelProps {
  setVechicle(id: string): void; 
  vechicle: string | null;
}

const VechicleChoosePanel: FC<VechicleChoosePanelProps> = (props) => {
  const {setVechicle, vechicle} = props
  
  return (
    <React.Fragment>
      <h2 className="title">Choose vecicle</h2>

      <div className="card-wrapper">
        {cards.map((card) => (
          <Card 
            src={card.src}
            name={card.name}
            capacity={card.capacity}
            size={card.size}
            price={card.price}
            isChoosen={vechicle === card.id}
            id={card.id}
            setVechicle={setVechicle}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default VechicleChoosePanel;
