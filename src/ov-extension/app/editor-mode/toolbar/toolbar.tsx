import React, { forwardRef, createRef, useState, useEffect } from "react";
import { useEventListener } from "../../utils/hooks";
import { EditorContext } from "../../store/editor-context";
import "./index.scss";

interface ToolbarPanelProps {
  ref: React.RefObject<HTMLDivElement>;
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

    const toolbarInitialState: ToolbarState = {
      x: 0,
      y: 0,
      visibility: 0,
    };

    const [isMouseUp, setIsMouseUp] = useState(false)
    const moveButtonRef = createRef<HTMLButtonElement>();
  const [toolbarState, setToolbarState] = useState<ToolbarState>(toolbarInitialState);


    // TODO separate
  const getTooltipCoordinates = (rect: any) => {
    const TOOLBAR_HEIGHT = 21;
    const EDITOR_WIDTH = 270;
    const TOOLBAR_WIDTH = 150;
    const INNER_WIDTH = window.innerWidth - EDITOR_WIDTH
    // 1
    if (rect.height > window.innerHeight && rect.y < TOOLBAR_HEIGHT) {
      if (rect.right > INNER_WIDTH) return { x: rect.x + TOOLBAR_WIDTH + window.screenX, y: window.scrollY ? window.scrollY : rect.y };
      else return { x: rect.right, y: window.scrollY ? window.scrollY : rect.y }
    }
    // 2
    if (rect.right > INNER_WIDTH) return { x: rect.x + TOOLBAR_WIDTH + window.screenX, y: rect.top + window.scrollY - TOOLBAR_HEIGHT };
    // 3
    if (rect.y < TOOLBAR_HEIGHT && rect.bottom + TOOLBAR_HEIGHT <= window.innerHeight) {
      return {
        x: rect.left + rect.width - window.scrollX,
        y: rect.bottom + window.scrollY,
      };
    }
    // 4
    return {
      x: rect.left + rect.width + window.scrollX,
      y: rect.top + window.scrollY - TOOLBAR_HEIGHT,
    };
  }

  const hoverHandler = (e: Event) => {
    const target = e.target as HTMLElement

    if (!target || target.closest(".toolbar-wrapper") || target.closest(".editor-container")) {
      return;
    }

    if (elementRef.current) {
      if (elementRef.current.classList.contains("hovered")) {
        (elementRef.current as Element).classList.remove("hovered");

        setToolbarState({
          x: 0,
          y: 0,
          visibility: 0,
        });
      }
    }

    elementRef.current = target;

    const rect = target.getBoundingClientRect();

    setToolbarState({
      ...toolbarState,
      visibility: 1,
      ...getTooltipCoordinates(rect),
    });

    target.classList.add("hovered");
  };

  const scrollHandler = (e: Event) => {
    if (elementRef.current) {
      if (elementRef.current.classList.contains("hovered")) {
        window.requestAnimationFrame(() => {
          const rect = elementRef.current!.getBoundingClientRect();

          setToolbarState({
            ...toolbarState,
            visibility: 1,
            ...getTooltipCoordinates(rect),
          });
        });
      }
    }
  }

  // add listeners on events
  useEventListener("mouseover", hoverHandler, undefined, isElementEditing);
  useEventListener("scroll", scrollHandler, undefined, isElementEditing);

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
          left: toolbarState.x,
          top: toolbarState.y,
          visibility: toolbarState.visibility ? "visible" : "hidden",
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
