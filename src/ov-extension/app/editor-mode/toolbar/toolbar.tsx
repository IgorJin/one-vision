import React, { forwardRef } from "react";
import { EditorContext } from "../../store/editor-context";
import "./index.scss";

interface ToolbarPanelProps {
  ref: React.RefObject<HTMLDivElement>;
  toolbarState: ToolbarState;
}

export interface ToolbarState {
  x: number;
  y: number;
  visibility: number;
}

const ToolbarPanel = forwardRef<HTMLDivElement, ToolbarPanelProps>(
  (props, ref): React.ReactElement => {
    const { elementRef, styleManagerFormRef, isElementEditing, elementSimplicity, setElementSimplicity, setIsElementEditing, setElementInformation } = React.useContext(EditorContext);

    const {
      toolbarState: { x, y, visibility },
    } = props;

    const handleEditStartClick = () => {
      console.log("EDITORS GONNA EDIT!", elementRef.current);
      const el: HTMLElement | null = elementRef.current

      if (!el) return 

      const simplicityCheck = (el: HTMLElement): boolean => el.childElementCount === 0

      // get styles
      const elementStyles: CSSStyleDeclaration = window.getComputedStyle(el, null)
      const textContent: string = el.textContent || ''

      // maybe do it in context 
      styleManagerFormRef.current?.querySelector('input')?.focus()

      console.log(el.attributes)

      for (const attr in el.attributes) console.log(attr)

      setElementInformation({ text: textContent, styles: elementStyles})
      setElementSimplicity(simplicityCheck(el))
      setIsElementEditing(true)
    };

    const handleEditEndClick = () => {
      setIsElementEditing(false)
    }

    return (
      <div
        className="toolbar-wrapper"
        ref={ref}
        style={{
          left: x,
          top: y,
          visibility: visibility ? "visible" : "hidden",
        }}
      >
        {!isElementEditing ? (
          <button onClick={handleEditStartClick}>EDIT</button>
        ) : (
          <button onClick={handleEditEndClick}>END</button>
        )}
        
        <button>MOVE</button>
        <button>DUPLICATE</button>
        <button>PARENT</button>
        <div className="toolbar-wrapper__button"></div>
      </div>
    );
  }
);

export default ToolbarPanel;
