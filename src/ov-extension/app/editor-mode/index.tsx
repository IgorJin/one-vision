import React, { FC, createRef, useState, useEffect } from "react";
import BuiltInButton from "../built-in-button";
import EditorProvider, { EditorContext } from "../store/editor-context";
import { useEventListener } from "../utils/hooks";
import ToolbarPanel, { ToolbarState } from "./toolbar/toolbar";
import EditorPanel from "./editor-panel";
import "./index.scss";

interface EventListenerProps {
  children?: React.ReactNode;
}

const ClickListener: FC<EventListenerProps> = ({ children }): React.ReactElement | null => {
  const { elementRef, isEditorModeActivated, isElementEditing } = React.useContext(EditorContext);

  // console.log("EDITOR MODE REBUILD");

  useEffect(() => {
    // TODO THIS IS INIT CLASS FOR EDITED ELEMENTS (LIKE FROM DB) move in other place 
    const items = { ...localStorage };
    console.log("🚀 ~ file: index.tsx:19 ~ items:", items)
    Object.entries(items).forEach(item => {
      console.log(document.querySelector(item[1]))
      document.querySelector(item[1]).classList.add(item[0])
    })
  }, [])

  const toolbarInitialState: ToolbarState = {
    x: 0,
    y: 0,
    visibility: 0,
  };

  const [toolbarState, setToolbarState] = useState<ToolbarState>(toolbarInitialState);

  const toolbarRef = createRef<HTMLDivElement>();

  const clickHandler = (e: any) => {
    // console.log("clickHandler ", e.target);
    // (e.target as Element).classList.remove("hovered");
  };
  const mousedownHandler = (e: any) => {
    // TODO replace all any to element
    // document.querySelector(".project-container").style.pointerEvents = "none"
    // console.log("mousedown ", e.target);
    // (e.target as Element).classList.remove("hovered");
  };

  const hoverHandler = (e: any) => {
    if (e.target.closest(".toolbar-wrapper") || e.target.closest(".editor-container")) {
      console.log("HERE WE GOOO");
      return;
    }

    if (elementRef.current) {
      if (elementRef.current.classList.contains("hovered")) {
        (elementRef.current as Element).classList.remove("hovered");

        setToolbarState({
          x: 0,
          y: 0,
          visibility: 0,
        });
      }
    }
    elementRef.current = e.target;

    if (e.target) {
      const rect = e.target.getBoundingClientRect();

      setToolbarState({
        ...toolbarState,
        x: rect.left + rect.width + window.pageXOffset - 50,
        y: rect.top + window.pageYOffset,
        visibility: 1,
      });
    }

    // console.log("hoverHandler ", e.target);
    (e.target as Element).classList.add("hovered");
  };

  const outHandler = (e: any) => {
    //console.log("outHandler ", e.target);
  };

  // add listeners on events
  useEventListener("mouseover", hoverHandler, undefined, isElementEditing);
  // useEventListener("click", clickHandler, undefined, isElementEditing);
  // useEventListener("mouseout", outHandler, undefined, isElementEditing);

  if (isEditorModeActivated)
    return (
      <React.Fragment>
        {children}
        <BuiltInButton />
      </React.Fragment>
    );

  return (
    <div className="document-wrapper">
      <div className="project-container">{children}</div>
      <EditorPanel />
      <ToolbarPanel ref={toolbarRef} toolbarState={toolbarState} />
    </div>
  );
};

const ClickListenerWrapper: FC<EventListenerProps> = ({ children }): React.ReactElement | null => {
  return (
    <EditorProvider>
      <ClickListener>{children}</ClickListener>
    </EditorProvider>
  );
};

export default ClickListenerWrapper;
