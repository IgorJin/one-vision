import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../../../store/editor-context";
import { ElementsSet, Input } from "../../../../components"
import "./options.scss"

const StylesOptions = () => {
  const { elementInformation, elementRef, styleManagerFormRef } = useContext(EditorContext);

  // FORM
  const [elemText, setElemText] = useState<string>("");
  const [elemFs, setElemFs] = useState<string>("");

  const [visibility, setVisibility] = useState(false)

  React.useEffect(() => {
    if (!(elementInformation.text && elementInformation.styles)) return 

    setElemText(elementInformation.text)
    setElemFs(`${parseFloat(elementInformation.styles.getPropertyValue('font-size'))}`)
  }, [elementInformation])

  return (
    <div className="edit-options">
      <div className="edit-options__title" onClick={() => setVisibility(prev => !prev)}>Style Options</div>

      {visibility && (<div className="edit-options__body">
        <div className="input-pair">
          <ElementsSet size={2}>
            <>
            <Input label="Font family" id="f-family" handleChange={() => {}}/>
            <Input label="Font size" id="f-size" handleChange={() => {}}/>
            </>
          </ElementsSet>
        </div>
      </div>)}
    </div>
  );
};

export {};
