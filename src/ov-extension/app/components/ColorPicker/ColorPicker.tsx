import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import { ChromePicker } from "react-color";
import "./ColorPicker.scss";

interface ColorPickerProps {
  color: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["top", "bottom", "left", "right"]} // preferred positions by priority
      content={<div>Hi! I'm popover content.</div>}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div>
    </Popover>
  );
};
