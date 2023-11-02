import React, { createContext, useContext, useState } from "react";


interface BlockAnimationContextData {
  BlockAnim: boolean;
  setBlockAnim: (block: boolean) => void;
}

const BlockAnimationContext = createContext<BlockAnimationContextData>({
  BlockAnim: false,
  setBlockAnim: () => {},
});

export const useBlockAnimationContext = () => useContext(BlockAnimationContext);

interface Props {
  children: React.ReactNode;
}

export const BlockAnimationProvider: React.FC<Props> = ({ children }) => {
    const [BlockAnim, setBlockAnim] = useState(false);
  return (
    <BlockAnimationContext.Provider value={{ BlockAnim, setBlockAnim }}>
      {children}
    </BlockAnimationContext.Provider>
  );
};