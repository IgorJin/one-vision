import React, { useRef, forwardRef } from "react";
import "./Popover.scss";

interface PopoverProps {
  children: any;
  isOpen: boolean;
  content: any;
  position: any;
}

const PopoverInternal = forwardRef<HTMLElement, PopoverProps>(
  ({ children, isOpen, content, position }, externalRef) => {

    return (
      <div className="popover">
        {children}
        {isOpen && <div className="popover__portal">{content}</div>}
      </div>
    );
  }
);

//  USAGE
{
  /* <Popover
  isOpen={isPopoverOpen}
  positions={'top'} // preferred positions by priority
  content={<div>Hi! I'm popover content.</div>}
>
  <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
    Click me!
  </div>
</Popover>; */
}

export { PopoverInternal };
