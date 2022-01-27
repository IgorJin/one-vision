import React, { useState, useContext} from "react";
import { EditorContext } from "../../store/editor-context";
import "./editor-panel.scss"
import Input from "../../components/Input"

const EditorPanel = () => {

  const {
    isEditorModeActivated,
    setIsEditorModeActivated,
  } = useContext(EditorContext);

  const [elemText, setElemText] = useState<string>('')

  return (
    <div
      className="editor-container"
    >
      <h2 onClick={() => setIsEditorModeActivated(!isEditorModeActivated)}>EDITOR</h2>

      <div className="operations-panel">
        <form className="form">
          <Input label="Text" id="elem-text" handleChange={setElemText} value={elemText}/>
        </form>
      </div>
    </div>
  );
};

export default EditorPanel;
