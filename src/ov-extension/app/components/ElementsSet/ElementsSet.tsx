import React from 'react'
import "./ElementsSet.scss"

interface ElementsSetProps {
  children: any; // TODO rewrite
  size: number;
}

export const ElementsSet: React.FC<ElementsSetProps> = ({ children, size }) => {
  return (
    <div className={`elements-set size-${size}`}>
      {children}
    </div>
  )
}

