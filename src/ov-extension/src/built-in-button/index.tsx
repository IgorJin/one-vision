import React from "react";
import SelectIcon from "../../images/select.png";
import { EditorContext } from "../store/editor-context";
import "./index.scss";

const BuiltInButton = () => {
  const { isActive, setIsActive } = React.useContext(EditorContext);

  return (
    <div className="built-in-button" onClick={() => setIsActive(!isActive)}>
      <div className="inner">
        <img src={SelectIcon} alt="" />
        <span>Изменить</span>
      </div>
    </div>
  );
};

export default BuiltInButton;
