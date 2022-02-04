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
    const { elementRef, isElementEditing, handleSetElementEditing } = React.useContext(EditorContext);

    const {
      toolbarState: { x, y, visibility },
    } = props;

    const handleEditStartClick = () => {
      console.log("EDITORS GONNA EDIT!", elementRef.current);
      handleSetElementEditing(true)
      
    };

    const handleEditEndClick = () => {
      handleSetElementEditing(false)
    }

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
          <button onClick={handleEditStartClick}>EDIT</button>
        ) : (
          <button onClick={handleEditEndClick}>END</button>
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
