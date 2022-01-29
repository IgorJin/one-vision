import React, { useRef, useState } from "react";

export interface EditorContextObject {
  elementRef: React.MutableRefObject<HTMLElement | null>;
  isEditorModeActivated: boolean;
  isElementEditing: boolean;
  isElementSimple: boolean;
  elementInformation: any;
  setIsEditorModeActivated(b: boolean): void;
  setIsElementEditing(b: boolean): void;
  setIsElementSimple(b: boolean): void;
  setElementInformation(i: any): void;
}

export const EditorContext = React.createContext<EditorContextObject>(null!);

const EditorProvider: React.FC = ({ children }) => {
  const [isEditorModeActivated, setIsEditorModeActivated] = useState<boolean>(false);
  const [isElementEditing, setIsElementEditing] = useState<boolean>(false);
  const [isElementSimple, setIsElementSimple] = useState<boolean>(false);
  const [elementInformation, setElementInformation] = useState<any>({})


  const elementRef = useRef<HTMLElement | null>(null);

  return (
    <EditorContext.Provider
      value={{
        elementRef,
        isEditorModeActivated,
        isElementEditing,
        isElementSimple,
        elementInformation,
        setIsEditorModeActivated,
        setIsElementEditing,
        setIsElementSimple,
        setElementInformation,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
