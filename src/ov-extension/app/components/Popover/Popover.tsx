import React, {useRef, forwardRef} from 'react'
import { PopoverPortal } from './PopoverPortal'
import "./Popover.scss"

interface PopoverProps {
  children: any;
  isOpen: boolean;
  content: any;
  position: any;
}

const PopoverInternal = forwardRef<HTMLElement, PopoverProps>(
  (
    { children, isOpen, content, position }, externalRef
  ) => {
  
  const prevIsOpen = useRef(false)
  
  const renderPopover = () => {
    if (!isOpen) return null
    return (
      <PopoverPortal >
        {content}
      </PopoverPortal>
    )
  }
 
  return (
    <>
    {children}
    {renderPopover()}
    </>
  )
})


//  USAGE

{/* <Popover
  isOpen={isPopoverOpen}
  positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
  content={<div>Hi! I'm popover content.</div>}
>
  <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
    Click me!
  </div>
</Popover>; */}


export { PopoverInternal }