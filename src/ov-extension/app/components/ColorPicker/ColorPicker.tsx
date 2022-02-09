import React from 'react'
import { Popover } from '../index'
import "./ColorPicker.scss"

interface ColorPickerProps {
  color: string;
}

const ColorInput = ({ color } : any)  => {
  return (
    <div className="color-input" style={{backgroundColor: color}}></div>
  )
}

const ColorComponent = ({ color } : any)  => {
  return (
    <div className="color-component">color-component</div>
  )
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color }) => {
  return (
    <Popover isOpen content={ColorComponent(color)} position="top">
      <ColorInput color={color} />
    </Popover>
  )
}
