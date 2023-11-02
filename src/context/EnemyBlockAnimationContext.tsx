import React, { createContext, useContext, useState } from "react";


interface EnemyBlockAnimationContextData {
  EnemyBlockAnim: boolean;
  setEnemyBlockAnim: (block: boolean) => void;
}

const EnemyBlockAnimationContext = createContext<EnemyBlockAnimationContextData>({
  EnemyBlockAnim: false,
  setEnemyBlockAnim: () => {},
});

export const useEnemyBlockAnimationContext = () => useContext(EnemyBlockAnimationContext);

interface Props {
  children: React.ReactNode;
}

export const EnemyBlockAnimationProvider: React.FC<Props> = ({ children }) => {
    const [EnemyBlockAnim, setEnemyBlockAnim] = useState(false);
  return (
    <EnemyBlockAnimationContext.Provider value={{ EnemyBlockAnim, setEnemyBlockAnim }}>
      {children}
    </EnemyBlockAnimationContext.Provider>
  );
};