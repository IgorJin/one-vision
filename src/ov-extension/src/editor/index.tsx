import React, { FC, useRef, useEffect } from "react";
import BuiltInButton from "../built-in-button";
import EditorProvider, { EditorContext } from "../store/editor-context";
import { useEventListener } from "../utils/hooks"
import "./index.scss";

interface EventListenerProps {
  children?: React.ReactNode;
}

const ClickListener: FC<EventListenerProps> = ({
  children,
}): React.ReactElement | null => {
  const { isActive, setIsActive } = React.useContext(EditorContext);

  const clickHandler = (e: any) => {
    console.log('clickHandler ', e.target);
    (e.target as Element).classList.remove("hovered");
  };

  const hoverHandler = (e: Event) => {
    console.log('hoverHandler ', e.target);
    (e.target as Element).classList.add("hovered");
    (e.target as Element).setAttribute("contenteditable", "true");
  };

  const rightClickHandler = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    console.log('rightClickHandler ', e.target);
    (e.target as Element).classList.remove("hovered");
  };

  // add listeners on events
  useEventListener('click', clickHandler)
  
  useEventListener('mouseover', hoverHandler)

  useEventListener('contextmenu', rightClickHandler)

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
    </div>
  );
};

const ClickListenerWrapper: FC<EventListenerProps> = ({
  children,
}): React.ReactElement | null => {
  return (
    <EditorProvider>
      <ClickListener>
        {children}
      </ClickListener>
    </EditorProvider>
  );
};

export default ClickListenerWrapper;
