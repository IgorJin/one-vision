import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../store/editor-context";
import "./editor-panel.scss";
import StyleManager from "./style-manager";

const EditorPanel = () => {
  const { isEditorModeActivated, setIsEditorModeActivated } = useContext(EditorContext);


  return (
    <div className="editor-container">
      <h2 onClick={() => setIsEditorModeActivated(!isEditorModeActivated)}>
        EDITOR
      </h2>

      <StyleManager />
    </div>
  );
};

export default EditorPanel;
