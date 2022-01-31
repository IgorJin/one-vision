import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../../../store/editor-context";
import { ElementsSet, Input } from "../../../../components"
import "./options.scss"

const AttributesOptions = () => {
  const { elementInformation, elementRef, styleManagerFormRef } = useContext(EditorContext);

  // FORM
  const [elemText, setElemText] = useState<string>("");
  const [elemFs, setElemFs] = useState<string>("");

  const [visibility, setVisibility] = useState(false)
  const [styleVisibility, setStyleVisibility] = useState(false)

  const changeElement = (type: any) => (e: any) => {
    const { value } = e.target

    console.log(type, value)
    // 1. format form state
    // 2. change element

    if (!elementRef.current) return false

    if (type === 'elem-text')
      elementRef.current.textContent = value
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
  const blockFabric = (type: 'text'): JSX.Element[] => (
      formsConfig[type].map(({ Component, props }, idx) => (<Component {...props} key={idx}/> ))
  );

  const handleTitleClick = () => {
    setVisibility(!visibility)
  }

  React.useEffect(() => {
    if (!(elementInformation.text && elementInformation.styles)) return 

    setElemText(elementInformation.text)
    setElemFs(`${parseFloat(elementInformation.styles.getPropertyValue('font-size'))}`)
  }, [elementInformation])

  return (
    <React.Fragment>
      <div className="edit-options">
        <div className="edit-options__title" onClick={handleTitleClick}>Attributes</div>

        {visibility && (<div className="edit-options__body">{blockFabric('text')}</div>)}
      </div>

      <div className="edit-options">
        <div className="edit-options__title" onClick={() => setStyleVisibility(!styleVisibility)}>Style Options</div>

        {styleVisibility && (<div className="edit-options__body">
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
    </React.Fragment>
  );
};

export default AttributesOptions;
