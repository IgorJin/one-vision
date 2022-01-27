import React, { useRef } from "react";

export interface EditorContextObject {
  elementRef: React.MutableRefObject<HTMLElement | null>;
  isEditorModeActivated: boolean;
  isElementEditing: boolean;
  isElementSimple: boolean;
  setIsEditorModeActivated(b: boolean): void;
  setIsElementEditing(b: boolean): void;
  setIsElementSimple(b: boolean): void;
}

export const EditorContext = React.createContext<EditorContextObject>(null!);

const EditorProvider: React.FC = ({ children }) => {
  const [isEditorModeActivated, setIsEditorModeActivated] = React.useState<boolean>(false);
  const [isElementEditing, setIsElementEditing] = React.useState<boolean>(false);
  const [isElementSimple, setIsElementSimple] = React.useState<boolean>(false);

  const elementRef = useRef<HTMLElement | null>(null);

  return (
    <EditorContext.Provider
      value={{
        elementRef,
        isEditorModeActivated,
        isElementEditing,
        isElementSimple,
        setIsEditorModeActivated,
        setIsElementEditing,
        setIsElementSimple,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
