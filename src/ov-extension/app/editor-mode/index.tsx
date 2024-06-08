import React, { FC, createRef, useEffect } from "react";
import BuiltInButton from "../ActivasionButton";
import EditorProvider, { EditorContext } from "../store/editor-context";
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

  // const clickHandler = (e: any) => {
  //   // console.log("clickHandler ", e.target);
  //   // (e.target as Element).classList.remove("hovered");
  // };
  // const mousedownHandler = (e: any) => {
  //   // TODO replace all any to element
  //   // document.querySelector(".project-container").style.pointerEvents = "none"
  //   // console.log("mousedown ", e.target);
  //   // (e.target as Element).classList.remove("hovered");
  // };

  
  // useEventListener("mouseout", outHandler, undefined, isElementEditing);

  // DRAG AND DROP
  // useEffect(() => {
  //   if (toolbarRef!.current) {
  //     toolbarRef.current.addEventListener('dragstart', handleDragStart);
  //     toolbarRef.current.addEventListener('dragend', handleDragEnd);
  //   }

  //   return ()
  // }, [toolbarRef])

  if (isEditorModeActivated)
    return (
      <>
        <BuiltInButton />
      </>
    );

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
