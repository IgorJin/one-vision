import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../../../store/editor-context";
import { ElementsSet, Input } from "../../../../components"
import Option from "./option"
import "./options.scss"

const AttributesOptions = () => {
  const { elementInformation, elementRef, styleManagerFormRef } = useContext(EditorContext);

  const [visibility, setVisibility] = useState(false)
  const [styleVisibility, setStyleVisibility] = useState(false)


  // styles reducer
  const [elemText, setElemText] = useState<string>("");
  const [elemFs, setElemFs] = useState<string>("");

  const styles = ['fontSize', 'fontWeight'] as const
  type stylesType = typeof styles[number]
  type stylesReducer = {
    [Property in attributesType]: string;
  }
  const initialStylesState = styles.reduce((acc, style) => ({ ...acc, [style]: ''}), {} as stylesReducer)
  const [stylesState, setStylesState] = useState(initialStylesState)

  const attributes = ['textContent'] as const
  type attributesType = typeof attributes[number]
  type attributesReducer = {
    [Property in attributesType]: string;
  }
  const initilAttributesState = attributes.reduce((acc, attribute) => ({ ...acc, [attribute]: ''}), {} as attributesReducer)
  const [attributesState, setAttributesState] = useState(initilAttributesState)

  const handleChange = (type: 'attribute' | 'style') => (e: any) => {
    const { name, value } = e.target

    if (type === 'attribute') setAttributesState({ ...attributesState, [name]: value })
    if (type === 'style') setStylesState({ ...stylesState, [name]: value })
  }

  //  start
  const changeElementAttribute = () => (field: attributesType) => {
    if (!elementRef.current) return false

    if (field in attributesState) {
      elementRef.current[field] = attributesState[field]
    }
  }
  // end

  const changeElement = (type: 'attribute' | 'style') => (field: attributesType | stylesType) => {
    if (!elementRef.current) return false

    if (type === 'attribute') {
      elementRef.current[field] = attributesState[field]
    } 
    // if (type === 'style' && styles.includes(field)) {
    //   elementRef.current.style[field] = stylesState[field]
    // }
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
          // onBlur: changeElement("textContent"),
          name: 'textContent',
          value: elemText,
        },
      },
      {
        Component: Input,
        props: {
          label: "Font size",
          id: "elem-font",
          handleChange: setElemFs,
          // onBlur: changeElement("elem-font"),
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
