import React from "react";
import SelectIcon from "../../images/select.png";
import { EditorContext } from "../store/editor-context";
import "./index.scss";

const BuiltInButton = () => {
  const { isEditorModeActivated, setIsEditorModeActivated } = React.useContext(EditorContext);

  return (
    <div
      className="built-in-button"
      onClick={() => setIsEditorModeActivated(!isEditorModeActivated)}
    >
      <div className="inner">
        <img src={SelectIcon} alt="" />
        <span>Изменить</span>
      </div>
    </div>
  );
};

export default BuiltInButton;
