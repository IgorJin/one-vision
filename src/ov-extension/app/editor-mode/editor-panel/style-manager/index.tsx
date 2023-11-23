import React, { useEffect, useContext, useState } from "react";
// import StylesOptions from "./options";
import { EditorContext } from "../../../store/editor-context";
import { Input, ColorPicker } from "../../../components";
import { SECTORS_CONFIG } from './stylesConfig'

const ViewsManager = () => {
  const { elementInformation, elementRef } = useContext(EditorContext);
  
  const [styleState, styleStateSetter] = useState({} as stylesReduceType);

  const sectorsStyles = SECTORS_CONFIG.map(sector => sector.properties).flat()

  type styleType = typeof sectorsStyles[number];

  type stylesReduceType = {
    [Property in styleType]: string;
  };

  useEffect(() => {
    if (!(elementInformation && Object.keys(elementInformation).length)) return;

    const initialGeneralState = elementInformation

    styleStateSetter({ ...initialGeneralState });

  }, [elementInformation]);

  const onStyleChange = (e: any) => {
    const { name, value } = e.target;

    styleStateSetter((state) => ({ ...state, [name]: value }));
  }

  const changeElementStyle = (e: any) => {
    const { name }: { name: styleType } = e.target;

    if (!elementRef.current) return
    if (elementRef.current.style[name] === styleState[name]) return

    const generatePath = () => {
      const stack = []
      let el: any = elementRef.current!

      while(el.parentNode) {
        const siblings = el.parentNode.childNodes

        let elementIndex = 0
        let sibCount = 0

        // eslint-disable-next-line no-loop-func
        siblings.forEach((sib: any) => {
          if (sib.nodeName === el.nodeName){
            if (el === sib) elementIndex = sibCount
            sibCount++
          } 
        })

        if (el.hasAttribute('id') && el.id !== '') {
          stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
        } else if ( sibCount > 1 ) {
          stack.unshift(el.nodeName.toLowerCase() + ':nth-child(' + ++elementIndex + ')');
        } else if (el.classList.length && el.classList.toString().split(' ').join('.') !== '') {
          stack.unshift(el.nodeName.toLowerCase() + '.' + el.classList.toString().split(' ').join('.'));
        } else {
          stack.unshift(el.nodeName.toLowerCase());
        }


        el = el.parentNode
      }

      return stack.slice(1).join(' > ')
    }

    const tagPath = generatePath()

    localStorage.setItem('#123', tagPath)

    if (name in styleState) {
      elementRef.current.style[name] = styleState[name];

      console.log(elementRef.current.style.cssText)
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
    </>
  );
};

export default ViewsManager;
