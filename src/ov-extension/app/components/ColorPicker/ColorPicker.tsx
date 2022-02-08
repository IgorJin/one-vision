import React from 'react'
import "./ColorPicker.scss"

interface ColorPickerProps {
  size: number;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ size }) => {
  return (
    <div className={`color-picker size-${size}`}>
    </div>
  )
}

