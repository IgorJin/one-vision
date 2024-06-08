import React, { forwardRef, createRef, useState, useEffect } from "react";
import { useEventListener } from "../../utils/hooks";
import { EditorContext } from "../../store/editor-context";
import "./index.scss";

interface ToolbarPanelProps {
  ref: React.RefObject<HTMLDivElement>;
  toolbarState: ToolbarState;
}

export interface ToolbarState {
  x: number;
  y: number;
  visibility: number;
}

const ToolbarPanel = forwardRef<HTMLDivElement, ToolbarPanelProps>(
  (props, ref): React.ReactElement => {
    const { 
      elementRef, 
      isElementEditing, 
      handleSetElementEditing 
    } = React.useContext(EditorContext);

    const {
      toolbarState: { x, y, visibility },
    } = props;

    const [isMouseUp, setIsMouseUp] = useState(false)
    const moveButtonRef = createRef<HTMLButtonElement>();

    const generateCursor = (element: any) => {
      // element
      // document.querySelectorAll
    }

    const handleEditClick = (state: boolean) => {
      if (state) console.log("EDITORS GONNA EDIT!", elementRef.current, elementRef.current?.parentElement);
      generateCursor(elementRef.current)
      handleSetElementEditing(state);
    };

    const mouseUpHandler = () => {
      setIsMouseUp(false)
      console.log('END')
    }

    const handleDragStart = (evt: Event) => {
      // evt.preventDefault();
      console.log('START', moveButtonRef)
      setIsMouseUp(true)

      function onMouseMove(event: any) {

        const moveELem = moveButtonRef.current
        console.log("🚀 ~ onMouseMove ~ moveELem:", moveELem)

        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        console.log("🚀 ~ onMouseMove ~ elemBelow:", elemBelow)

        if (!elemBelow) return;
      }

      document.addEventListener('mouseup', onMouseMove);

      return false;
    }
  
    const handleDragEnd = (evt: Event) => {
      
  
      console.log('END')
    }

    // useEffect(() => {
    //   if (moveButtonRef.current) {
    //     moveButtonRef.current.addEventListener()
    //   }
    // }, [moveButtonRef])
    // useEventListener('dragover', mouseUpHandler, moveButtonRef)
    // useEventListener('dragstart', handleDragStart, moveButtonRef)
    useEventListener('mousedown', handleDragStart, moveButtonRef)
    useEventListener('mouseup', handleDragStart, moveButtonRef)
    useEventListener('drop', () => console.log("Drag operation finished"), moveButtonRef)
    // document.addEventListener('mouseup', mouseUpHandler);


    return (
      <div
        className="toolbar-wrapper"
        ref={ref}
        style={{
          left: x,
          top: y,
          visibility: visibility ? "visible" : "hidden",
          transform: `translateX(-100%)`,
        }}
      >
        {!isElementEditing ? (
          <button onClick={() => handleEditClick(true)}>GO</button>
        ) : (
          <button onClick={() => handleEditClick(false)}>END</button>
        )}

        <button ref={ moveButtonRef } draggable="true" id="move">M</button>
        <button>DUB</button>
        <button>PAR</button>
        <div className="toolbar-wrapper__button"></div>
      </div>
    );
  }
);

export default ToolbarPanel;
