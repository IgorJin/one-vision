import React from "react";

export interface EditorContextObject {
  isActive: boolean;
  setIsActive(b: boolean): void;
}

export const EditorContext = React.createContext<EditorContextObject>(null!);

const EditorProvider: React.FC = ({ children }) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  console.log({isActive})

  return (
    <EditorContext.Provider value={{ isActive, setIsActive }}>{ children }</EditorContext.Provider>
  ) 
};

export default EditorProvider;
