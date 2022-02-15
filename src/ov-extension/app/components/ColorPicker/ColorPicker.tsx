import React, { useState } from "react"
import { Popover } from "react-tiny-popover"
import { ChromePicker } from "react-color"
import "./ColorPicker.scss"

interface ColorPickerProps {
  color: string
  //TODO add types from library
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, ...rest }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [ncolor, setcolor] = useState("")

  const ColorPicker = <ChromePicker color={ncolor} onChangeComplete={({ hex }) => setcolor(hex)} />

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["top", "bottom"]}
      containerClassName="popover-container"
      containerStyle={{ zIndex: "999999" }}
      content={ColorPicker}
      {...rest}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div>
    </Popover>
  )
}
