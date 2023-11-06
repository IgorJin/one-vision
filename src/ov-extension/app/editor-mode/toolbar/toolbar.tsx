import React, { forwardRef } from "react";
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

    const generateCursor = (element: any) => {
      // element
      // document.querySelectorAll
    }

    const handleEditClick = (state: boolean) => {
      if (state) console.log("EDITORS GONNA EDIT!", elementRef.current, elementRef.current?.parentElement);
      generateCursor(elementRef.current)
      handleSetElementEditing(state);
    };

    return (
      <div
        className="toolbar-wrapper"
        ref={ref}
        style={{
          left: x,
          top: y,
          visibility: visibility ? "visible" : "hidden",
        }}
      >
        {!isElementEditing ? (
          <button onClick={() => handleEditClick(true)}>EDIT</button>
        ) : (
          <button onClick={() => handleEditClick(false)}>END</button>
        )}

        <button>MOVE</button>
        <button>DUPLICATE</button>
        <button>PARENT</button>
        <div className="toolbar-wrapper__button"></div>
      </div>
    );
  }
);

export default ToolbarPanel;
