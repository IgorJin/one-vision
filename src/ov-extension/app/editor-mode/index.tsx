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
      if (!document.querySelector(item[1])) return false

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

  const getTooltipCoordinates = (rect: any) => {
    const TOOLBAR_HEIGHT = 21;
    const EDITOR_WIDTH = 270;
    const TOOLBAR_WIDTH = 150;
    const INNER_WIDTH = window.innerWidth - EDITOR_WIDTH
    // 1
    if (rect.height > window.innerHeight && rect.y < TOOLBAR_HEIGHT) {
      console.log("1. so high", rect.right > INNER_WIDTH);
      if (rect.right > INNER_WIDTH) return { x: rect.x + TOOLBAR_WIDTH + window.screenX, y: window.scrollY ? window.scrollY : rect.y };
      else return { x: rect.right, y: window.scrollY ? window.scrollY : rect.y }
    }
    // 2
    if (rect.right > INNER_WIDTH) return { x: rect.x + TOOLBAR_WIDTH + window.screenX, y: rect.top + window.scrollY - TOOLBAR_HEIGHT };
    // 3
    if (rect.y < TOOLBAR_HEIGHT && rect.bottom + TOOLBAR_HEIGHT <= window.innerHeight) {
      console.log("on bottom");

      return {
        x: rect.left + rect.width - window.scrollX,
        y: rect.bottom + window.scrollY,
      };
    }
    // 4
    console.log("on top default");
    return {
      x: rect.left + rect.width + window.scrollX,
      y: rect.top + window.scrollY - TOOLBAR_HEIGHT,
    };
  }

  const hoverHandler = (e: Event) => {
    const target = e.target as HTMLElement

    if (!target || target.closest(".toolbar-wrapper") || target.closest(".editor-container")) {
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

    elementRef.current = target;

    const rect = target.getBoundingClientRect();

    setToolbarState({
      ...toolbarState,
      visibility: 1,
      ...getTooltipCoordinates(rect),
    });

    target.classList.add("hovered");
  };

  const scrollHandler = (e: Event) => {
    if (elementRef.current) {
      if (elementRef.current.classList.contains("hovered")) {
        window.requestAnimationFrame(() => {
          const rect = elementRef.current!.getBoundingClientRect();

          setToolbarState({
            ...toolbarState,
            visibility: 1,
            ...getTooltipCoordinates(rect),
          });
        });
      }
    }
  }

  const outHandler = (e: any) => {
    //console.log("outHandler ", e.target);
  };

  // add listeners on events
  useEventListener("mouseover", hoverHandler, undefined, isElementEditing);
  useEventListener("scroll", scrollHandler, undefined, isElementEditing);
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
