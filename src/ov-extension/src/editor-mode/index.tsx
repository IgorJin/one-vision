import React, {
  FC,
  useRef,
  createRef,
  useEffect,
  useState,
  useReducer,
} from "react";
import BuiltInButton from "../built-in-button";
import EditorProvider, { EditorContext } from "../store/editor-context";
import { useEventListener } from "../utils/hooks";
import ToolbarButton, { ToolbarState } from "./toolbar/toolbar";
import "./index.scss";

interface EventListenerProps {
  children?: React.ReactNode;
}

const ClickListener: FC<EventListenerProps> = ({
  children,
}): React.ReactElement | null => {
  const { isActive, setIsActive } = React.useContext(EditorContext);

  const toolbarInitialState: ToolbarState = {
    x: 0,
    y: 0,
    visibility: 0,
  };

  const [toolbarState, setToolbarState] =
    useState<ToolbarState>(toolbarInitialState);

  const elementRef = useRef<HTMLElement | null>(null);
  const toolbarRef = createRef<HTMLDivElement>();

  const clickHandler = (e: any) => {
    console.log("clickHandler ", e.target);
    // (e.target as Element).classList.remove("hovered");
  };
  const mousedownHandler = (e: any) => {
    // TODO replace all any to element
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    // document.querySelector(".project-container").style.pointerEvents = "none"
    console.log("mousedown ", e.target);
    // (e.target as Element).classList.remove("hovered");
  };

  const hoverHandler = (e: any) => {
    if (e.target.classList.contains("toolbar-wrapper")) {
      console.log("HERE WE GOOO");
      return;
    }

    console.log("ref.current ===>  ", elementRef.current);
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

    console.log("hoverHandler ", e.target);
    (e.target as Element).classList.add("hovered");
  };

  const outHandler = (e: any) => {
    console.log("outHandler ", e.target);
  };

  // add listeners on events
  useEventListener("mouseover", hoverHandler);

  useEventListener("click", clickHandler);

  useEventListener("mouseout", outHandler);

  // useEventListener('mousedown', mousedownHandler)

  if (isActive)
    return (
      <React.Fragment>
        {children}
        <BuiltInButton />
      </React.Fragment>
    );

  return (
    <div className="document-wrapper">
      <div className="project-container">{children}</div>
      <div className="editor-container" onClick={() => setIsActive(!isActive)}>
        EDITOR
      </div>
      <ToolbarButton ref={toolbarRef} toolbarState={toolbarState} />
    </div>
  );
};

const ClickListenerWrapper: FC<EventListenerProps> = ({
  children,
}): React.ReactElement | null => {
  return (
    <EditorProvider>
      <ClickListener>{children}</ClickListener>
    </EditorProvider>
  );
};

export default ClickListenerWrapper;
