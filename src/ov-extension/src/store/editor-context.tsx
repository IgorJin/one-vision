import React, { useRef, useState } from "react";
import { STYLES_CONFIG } from '../packages/editor-mode/editor-panel/style-manager/stylesConfig'
import { NodeWrapper } from '../packages/editor-mode/lib/node-wrapper';

export interface EditorContextObject {
  editedElementRef: React.MutableRefObject<NodeWrapper | null>;
  elementRef: React.MutableRefObject<HTMLElement | null>;
  styleManagerFormRef: React.MutableRefObject<HTMLElement | null>;
  isEditorModeActivated: boolean;
  isElementEditing: boolean;
  elementSimplicity: boolean;
  setIsEditorModeActivated(b: boolean): void;
  setIsElementEditing(b: boolean): void;
  setElementSimplicity(b: boolean): void;
  handleSetElementEditing(b: boolean): void;
}

export const EditorContext = React.createContext<EditorContextObject>(null!);

const EditorProvider: React.FC = ({ children }) => {
  const [isEditorModeActivated, setIsEditorModeActivated] = useState<boolean>(false);
  const [isElementEditing, setIsElementEditing] = useState<boolean>(false);
  const [elementSimplicity, setElementSimplicity] = useState<boolean>(false);

  // refs
  const elementRef = useRef<HTMLElement | null>(null);
  const editedElementRef = useRef<NodeWrapper | null>(null);
  const styleManagerFormRef = useRef<HTMLElement | null>(null);

  function handleSetElementEditing(isEditing: boolean) {
    if (!isEditing) return setIsElementEditing(isEditing)

    if (!elementRef.current) return
    const el: HTMLElement = elementRef.current
    const editedNode = new NodeWrapper(el)

    editedNode.create()

    editedElementRef.current = editedNode

    setIsElementEditing(true)
  }

  return (
    <EditorContext.Provider
      value={{
        editedElementRef,
        elementRef,
        styleManagerFormRef,
        isEditorModeActivated,
        isElementEditing,
        elementSimplicity,
        setIsEditorModeActivated,
        setIsElementEditing,
        setElementSimplicity,
        handleSetElementEditing,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
