import React, { useState, useContext, useRef } from "react";
import "./options.scss"

interface OptionTemplateProps {
  children: any;
  visibility: boolean;
  setVisibility(b: boolean): void;
  title: string;
}

const OptionTemplate: React.FC<OptionTemplateProps> = ({ children, visibility, setVisibility, title }) => {
  return (
      <div className="edit-options">
        <div className="edit-options__title" onClick={() => setVisibility(!visibility)}>{title}</div>

        {visibility && (
          <div className="edit-options__body">
            {children}
          </div>
        )}
      </div>
  );
};

export default OptionTemplate;
