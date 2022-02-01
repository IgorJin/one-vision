import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../../../store/editor-context";
import { ElementsSet, Input } from "../../../../components"
import Option from "./option"
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

  React.useEffect(() => {
    if (!(elementInformation.text && elementInformation.styles)) return 

    setElemText(elementInformation.text)
    setElemFs(`${parseFloat(elementInformation.styles.getPropertyValue('font-size'))}`)
  }, [elementInformation])

  return (
    <React.Fragment>
      <Option title="Attributes" visibility={visibility} setVisibility={setVisibility}>
        {blockFabric('text')}
      </Option>

      <Option title="Style Options" visibility={styleVisibility} setVisibility={setStyleVisibility}>
        <ElementsSet size={2}>
          <Input label="Font family" id="f-family" handleChange={() => {}}/>
          <Input label="Font size" id="f-size" handleChange={() => {}}/>
        </ElementsSet>
      </Option>
    </React.Fragment>
  );
};

export default AttributesOptions;
