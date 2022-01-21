import React, { forwardRef } from "react";
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
    
    const {
      toolbarState: { x, y, visibility },
    } = props;

    const handleToolbarClick = () => {
      console.log("EDITORS GONNA EDIT!");
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
        onClick={handleToolbarClick}
      >
        <div className="toolbar-wrapper__button"></div>
      </div>
    );
  }
);

export default ToolbarButton;
