import React, {useLayoutEffect} from 'react'
import { createPortal } from 'react-dom';
import "./Popover.scss"

export const PopoverPortal: React.FC = ({children, container, element, scoutElement} : any) => {
  useLayoutEffect(()=> {
    container.appendChild(element);
    container.appendChild(scoutElement);
    return () => {
      container.removeChild(element);
      container.removeChild(scoutElement);
    }
  })

  return createPortal(children, container)
}