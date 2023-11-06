import React, { useRef, useState } from "react";
import { STYLES_CONFIG } from '../editor-mode/editor-panel/style-manager/stylesConfig'

export interface EditorContextObject {
  elementRef: React.MutableRefObject<HTMLElement | null>;
  styleManagerFormRef: React.MutableRefObject<HTMLElement | null>;
  isEditorModeActivated: boolean;
  isElementEditing: boolean;
  elementSimplicity: boolean;
  elementInformation: any;
  setIsEditorModeActivated(b: boolean): void;
  setIsElementEditing(b: boolean): void;
  setElementSimplicity(b: boolean): void;
  setElementInformation(i: any): void;
  handleSetElementEditing(b: boolean): void;
}

export const EditorContext = React.createContext<EditorContextObject>(null!);

const EditorProvider: React.FC = ({ children }) => {
  const [isEditorModeActivated, setIsEditorModeActivated] = useState<boolean>(false);
  const [isElementEditing, setIsElementEditing] = useState<boolean>(false);
  const [elementSimplicity, setElementSimplicity] = useState<boolean>(false);
  const [elementInformation, setElementInformation] = useState<any>({})

  // refs
  const elementRef = useRef<HTMLElement | null>(null);
  const styleManagerFormRef = useRef<HTMLElement | null>(null);

  function handleSetElementEditing(isEditing: boolean) {
    if (!isEditing) return setIsElementEditing(isEditing)

    if (!elementRef.current) return
    const el: HTMLElement = elementRef.current

    // get styles
    const elementStyles: Record<string, any> = window.getComputedStyle(el, null)

    const allStyles = Object.keys(STYLES_CONFIG)

    const textContent: string = el.textContent || ''

    // maybe do it in context 
    styleManagerFormRef.current?.querySelector('input')?.focus()

    for (let i = 0; i < el.attributes.length; i++) console.log(el.attributes[i])

    setElementInformation(allStyles.reduce((acc, style) => ({ ...acc, [style]: elementStyles[style] }), {}))
    setElementSimplicity(el.childElementCount === 0)
    setIsElementEditing(true)
  }

  return (
    <EditorContext.Provider
      value={{
        elementRef,
        styleManagerFormRef,
        isEditorModeActivated,
        isElementEditing,
        elementSimplicity,
        elementInformation,
        setIsEditorModeActivated,
        setIsElementEditing,
        setElementSimplicity,
        setElementInformation,
        handleSetElementEditing,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
