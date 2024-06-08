import React, { FC, createRef, useState, useEffect } from "react";
import BuiltInButton from "../ActivasionButton";
import EditorProvider, { EditorContext } from "../store/editor-context";
import { useEventListener } from "../utils/hooks";
import ToolbarPanel, { ToolbarState } from "./toolbar/toolbar";
import EditorPanel from "./editor-panel";

interface EventListenerProps {
  children?: React.ReactNode;
}

const ClickListener: FC<EventListenerProps> = (): React.ReactElement | null => {
  console.log("EDITOR MODE REBUILD");

  const { elementRef, isEditorModeActivated, isElementEditing } = React.useContext(EditorContext);
  console.log("🚀 ~ isEditorModeActivated:", isEditorModeActivated)


  useEffect(() => {
    // TODO THIS IS INIT CLASS FOR EDITED ELEMENTS (LIKE FROM DB) move in other place 
    const items = { ...localStorage };

    Object.entries(items).forEach(item => {
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

  // TODO separate
  const getTooltipCoordinates = (rect: any) => {
    const TOOLBAR_HEIGHT = 21;
    const EDITOR_WIDTH = 270;
    const TOOLBAR_WIDTH = 150;
    const INNER_WIDTH = window.innerWidth - EDITOR_WIDTH
    // 1
    if (rect.height > window.innerHeight && rect.y < TOOLBAR_HEIGHT) {
      if (rect.right > INNER_WIDTH) return { x: rect.x + TOOLBAR_WIDTH + window.screenX, y: window.scrollY ? window.scrollY : rect.y };
      else return { x: rect.right, y: window.scrollY ? window.scrollY : rect.y }
    }
    // 2
    if (rect.right > INNER_WIDTH) return { x: rect.x + TOOLBAR_WIDTH + window.screenX, y: rect.top + window.scrollY - TOOLBAR_HEIGHT };
    // 3
    if (rect.y < TOOLBAR_HEIGHT && rect.bottom + TOOLBAR_HEIGHT <= window.innerHeight) {
      return {
        x: rect.left + rect.width - window.scrollX,
        y: rect.bottom + window.scrollY,
      };
    }
    // 4
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
      <ToolbarPanel ref={toolbarRef} toolbarState={toolbarState} />
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
