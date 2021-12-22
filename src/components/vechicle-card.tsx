import React, { FC, useState } from "react";
import cn from "classnames"

interface VechicleCardProps {
  src: string;
  name: string;
  capacity: string;
  size: string;
  price: string;
  isChoosen: boolean;
  id: string;
  setVechicle(id: string): void;
}

const VechicleCard: FC<VechicleCardProps> = (props) => {
  const { id, src, name, capacity, size, price, isChoosen, setVechicle } = props

  return (
    <div className={cn("card", { active: isChoosen })} key={id}>
      <div className="image">
        <img className="vehicle-icon" src={src} alt="" />
        <div className="background-circle"></div>
      </div>
      <div className="name">{name}</div>
      <div className="capacity card-subfields"><span className="field-name">Capacity:</span> {capacity} kg</div>
      <div className="size card-subfields"><span className="field-name">Size:</span> {size}ft</div>
      <button className="book-button card-subfields" onClick={() => setVechicle(id)}>Choose for {price}</button>
    </div>
  );
};

export default VechicleCard;
