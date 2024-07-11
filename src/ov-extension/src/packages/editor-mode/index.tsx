import React, { FC, createRef, useEffect } from "react";
import BuiltInButton from "../start-button";
import EditorProvider, { EditorContext } from "../../store/editor-context";
import ToolbarPanel from "./toolbar/toolbar";
import EditorPanel from "./editor-panel";

interface EventListenerProps {
  children?: React.ReactNode;
}

const ClickListener: FC<EventListenerProps> = (): React.ReactElement | null => {
  console.log("EDITOR MODE REBUILD");

  const { isEditorModeActivated } = React.useContext(EditorContext);

  useEffect(() => {
    // TODO THIS IS INIT CLASS FOR EDITED ELEMENTS (LIKE FROM DB) move in other place 
    const items = { ...localStorage };

    Object.entries(items).forEach(item => {
      if (!document.querySelector(item[1])) return false

      document.querySelector(item[1]).classList.add(item[0])
    })
  }, [])

  const toolbarRef = createRef<HTMLDivElement>();

  if (isEditorModeActivated)
    return <BuiltInButton />;

  return (
    <>
      <EditorPanel />
      <ToolbarPanel ref={toolbarRef}/>
    </>
  );
};

const PageEditor: FC<EventListenerProps> = (): React.ReactElement | null => {
  return (
    <EditorProvider>
      <ClickListener />
    </EditorProvider>
  );
};

export default PageEditor;
