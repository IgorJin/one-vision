import React, { useState, useContext, useRef } from "react";
import { EditorContext } from "../../../../store/editor-context";
import { ElementsSet, Input } from "../../../../components"
import Option from "./option"
import { camelToKebab } from "../../../../utils/helpers"
import "./options.scss"

const AttributesOptions = () => {
  const { elementInformation, elementRef, styleManagerFormRef } = useContext(EditorContext);

  const [visibility, setVisibility] = useState(true)
  const [styleVisibility, setStyleVisibility] = useState(false)


  const styles = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'] as const
  type stylesType = typeof styles[number]
  type stylesReducer = {
    [Property in stylesType]: string;
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

  
  const changeElementAttribute = (e: any) => {
    const { name }:{ name : attributesType } = e.target

    if (!elementRef.current) return false

    if (name in attributesState) {
      elementRef.current[name] = attributesState[name]
    }
  }

  const changeElementStyle = (e: any) => {
    const { name }:{ name : stylesType } = e.target

    if (!elementRef.current) return false

    if (name in stylesState) {
      elementRef.current.style[name] = stylesState[name]
    }
  }
  

  // IN DA FUTURE
  //  start 
  // const changeElement = (type: 'attribute' | 'style') => (field: newAttr | newStyle) => {
  //   if (!elementRef.current) return false

  //   if (type === 'attribute' && attributes.includes(field) && field.type === 'attr') {
  //     elementRef.current[field] = attributesState[field]
  //   } 
  //   if (type === 'style' && styles.includes(field) && field.type === 'style') {
  //     elementRef.current.style[field] = stylesState[field]
  //   }
  // }
  // end

  const onAttributeChange = handleChange('attribute')
  const onStyleChange = handleChange('style')

  console.log('rebuild')
  
  const formsConfig = {
    text: [
      {
        Component: Input,
        props: {
          label: "Text",
          id: "textContent",
          handleChange: onAttributeChange,
          onBlur: changeElementAttribute,
          value: attributesState.textContent,
        },
      },
      // {
      //   Component: Input,
      //   props: {
      //     label: "Font size",
      //     id: "elem-font",
      //     handleChange: onStyleChange,
      //     onBlur: changeElementStyle("fontSize"),
      //     name: "fontSize",
      //     value: stylesState.fontSize,
      //   },
      // },
    ],
  };

  // TODO нужен один интерфейс - ТИП БЛОКА = ключ в КОНФИГЕ
  type fabricType = keyof typeof formsConfig
  const blockFabric = (type: fabricType): JSX.Element[] => (
      formsConfig[type].map(({ Component, props }, idx) => (<Component {...props} key={idx}/> ))
  );

  React.useEffect(() => {
    if (!(elementInformation.text && elementInformation.styles)) return 

    setAttributesState({ ...attributesState, textContent: elementInformation.text })
    for (const attribute of attributes) {}

    for (const style of styles) {
      setStylesState({ ...stylesState, [style]: `${parseFloat(elementInformation.styles.getPropertyValue(camelToKebab(style)))}` }) 
    }
  }, [elementInformation])

  return (
    <React.Fragment>
      {/* ATTRIBUTES */}
      <Option title="Attributes" visibility={visibility} setVisibility={setVisibility}>
        {blockFabric('text')}
      </Option>
      {/* STYLE */}
      <Option title="Style Options" visibility={styleVisibility} setVisibility={setStyleVisibility}>
        <ElementsSet size={2}>
          <Input label="fontSize" id="fontSize" handleChange={onStyleChange} onBlur={changeElementStyle} value={stylesState.fontSize}/>
          <Input label="fontWeight" id="fontWeight" handleChange={onStyleChange} onBlur={changeElementStyle} value={stylesState.fontWeight}/>
        </ElementsSet>
        <ElementsSet size={2}>
          <Input label="lineHeight" id="lineHeight" handleChange={onStyleChange} onBlur={changeElementStyle} value={stylesState.lineHeight}/>
          <Input label="letterSpacing" id="letterSpacing" handleChange={onStyleChange} onBlur={changeElementStyle} value={stylesState.letterSpacing}/>
        </ElementsSet>
        <ElementsSet size={2}>
          
        </ElementsSet>
      </Option>
      {/* SHAPE */}
    </React.Fragment>
  );
};

export default AttributesOptions;
