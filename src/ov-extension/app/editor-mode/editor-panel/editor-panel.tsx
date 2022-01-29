import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../store/editor-context";
import "./editor-panel.scss";
import Input from "../../components/Input/Input";

const EditorPanel = () => {
  const { isEditorModeActivated, elementInformation, setIsEditorModeActivated } = useContext(EditorContext);

  // FORM
  const [elemText, setElemText] = useState<string>("");
  const [elemFs, setElemFs] = useState<string>("");
  console.log('rebuild')
  const formsConfig = {
    text: [
      {
        Component: Input,
        props: {
          label: "Text",
          id: "elem-text",
          handleChange: setElemText,
          value: elemText,
        },
      },
      {
        Component: Input,
        props: {
          label: "Font size",
          id: "elem-text",
          handleChange: setElemFs,
          value: elemFs,
        },
      },
    ],
  };

  // TODO нужен один интерфейс - ТИП БЛОКА = ключ в КОНФИГЕ
  type BlockTypes = {
    type: 'text',
  }
  const BlockFabric = ({ type }: BlockTypes) => (
    <React.Fragment>
      {formsConfig[type].map(({ Component, props }) => (<Component {...props} /> ))}
    </React.Fragment>
  );

  React.useEffect(() => {
    if (!(elementInformation.text && elementInformation.styles)) return 

    setElemText(elementInformation.text)
    setElemFs(`${parseFloat(elementInformation.styles.getPropertyValue('font-size'))}`)
  }, [elementInformation])

  return (
    <div className="editor-container">
      <h2 onClick={() => setIsEditorModeActivated(!isEditorModeActivated)}>
        EDITOR
      </h2>

      <div className="operations-panel">
        <form className="form">
          <BlockFabric type="text"/>
          
          <Input
            label="Font size"
            id="elem-text"
            handleChange={setElemFs}
            value={elemFs}
          />
        </form>
      </div>
    </div>
  );
};

export default EditorPanel;
