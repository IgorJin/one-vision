import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../store/editor-context";
import "./editor-panel.scss";
import Input from "../../components/Input/Input";

const EditorPanel = () => {
  const { isEditorModeActivated, elementInformation, setIsEditorModeActivated } = useContext(EditorContext);

  // FORM
  const [elemText, setElemText] = useState<string>("");
  const [elemFs, setElemFs] = useState<string>("");

  const changeElement = (type: any) => (e: any) => {
    const { value } = e.target

    console.log(type, value)
  }

  console.log('rebuild')
  
  const formsConfig = {
    text: [
      {
        Component: Input,
        props: {
          label: "Text",
          id: "elem-text",
          handleChange: setElemText,
          onBlur: changeElement("elem-text"),
          value: elemText,
        },
      },
      {
        Component: Input,
        props: {
          label: "Font size",
          id: "elem-font",
          handleChange: setElemFs,
          onBlur: changeElement("elem-font"),
          value: elemFs,
        },
      },
    ],
  };

  // TODO нужен один интерфейс - ТИП БЛОКА = ключ в КОНФИГЕ
  const blockFabric = (type: 'text') => (
      formsConfig[type].map(({ Component, props }, idx) => (<Component {...props} key={idx}/> ))
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
          {blockFabric('text')}
        </form>
      </div>
    </div>
  );
};

export default EditorPanel;
