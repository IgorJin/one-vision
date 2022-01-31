import React, { useRef, useState } from "react";

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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
