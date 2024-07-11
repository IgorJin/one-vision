import React, { useContext, useEffect } from "react";
import { EditorContext } from "../../../store/editor-context";
import StylesManager from './style-manager'
import "./editor-panel.scss";

const EditorPanel = () => {
  const { isEditorModeActivated, setIsEditorModeActivated } = useContext(EditorContext);

  return (
    <div className="editor-container">
      <div className="control-panel">
        <span>&#8617;</span>
        <span>&#8618;</span>
        <span onClick={() => setIsEditorModeActivated(!isEditorModeActivated)}>&#10005;</span>
      </div>

      <div className="views-panel">
        <StylesManager />
      </div>
    </div>
  );
};

export default EditorPanel;
