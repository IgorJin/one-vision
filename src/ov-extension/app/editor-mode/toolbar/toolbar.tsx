import React, { forwardRef } from "react";
import { EditorContext } from "../../store/editor-context";
import "./index.scss";

interface ToolbarButtonProps {
  ref: React.RefObject<HTMLDivElement>;
  toolbarState: ToolbarState;
}

export interface ToolbarState {
  x: number;
  y: number;
  visibility: number;
}

const ToolbarButton = forwardRef<HTMLDivElement, ToolbarButtonProps>(
  (props, ref): React.ReactElement => {
    const { elementRef, isElementEditing, isElementSimple, setIsElementSimple, setIsElementEditing } = React.useContext(EditorContext);

    const {
      toolbarState: { x, y, visibility },
    } = props;

    const handleEditStartClick = () => {
      console.log("EDITORS GONNA EDIT!", elementRef.current);
      const el: HTMLElement | null = elementRef.current

      if (!el) return 

      const simplicityCeck = (el: HTMLElement): boolean => el.children.length === 0

      setIsElementSimple(simplicityCeck(el))
      setIsElementEditing(true)
    };

    const handleEditEndClick = () => {
      setIsElementEditing(false)
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

export default ToolbarButton;
