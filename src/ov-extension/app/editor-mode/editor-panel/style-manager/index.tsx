import React, { useEffect, useContext, useState } from "react";
// import StylesOptions from "./options";
import { EditorContext } from "../../../store/editor-context";
import { Input, ColorPicker } from "../../../components";
import { SECTORS_CONFIG, STYLES_CONFIG } from './stylesConfig'

const ViewsManager = () => {
  const { elementInformation, elementRef } = useContext(EditorContext);
  
  const [styleState, styleStateSetter] = useState({} as stylesReduceType);
  console.log("🚀 ~ file: index.tsx:23 ~ ViewsManager ~ styleState:", styleState)

  const sectorsStyles = SECTORS_CONFIG.map(sector => sector.properties).flat()

  type styleType = typeof sectorsStyles[number];

  type stylesReduceType = {
    [Property in styleType]: string;
  };


  useEffect(() => {
    if (!(elementInformation && Object.keys(elementInformation).length)) return;

    const initialGeneralState = elementInformation

    console.log("🚀 ~ file: index.tsx:21 ~ ViewsManager ~ initialState:", initialGeneralState)

    styleStateSetter({ ...initialGeneralState });

  }, [elementInformation]);

  const onStyleChange = (e: any) => {
    const { name, value } = e.target;

    styleStateSetter((state) => ({ ...state, [name]: value }));
  }

  const changeElementStyle = (e: any) => {
    const { name }: { name: styleType } = e.target;

    if (!elementRef.current) return false;

    if (name in styleState) {
      elementRef.current.style[name] = styleState[name];
    }
  };

  return (
    <>
      ({ SECTORS_CONFIG.map(({ name, properties }) => (
        <>
          <h3>{name}</h3>
          {properties.map(style => <Input
            label={style}
            id={style}
            handleChange={onStyleChange}
            onBlur={changeElementStyle}
            value={styleState[style]}
          />)}
        </>
      )) })
      {/* <h3>General</h3> 
      {general.map(style => <Input
        label={style}
        id={style}
        handleChange={onStyleChange}
        onBlur={changeElementStyle}
        value={styleState[style]}
      />)}*/}

      {/* <StyleSection title="General" /> */}
    </>
  );
};

export default ViewsManager;
