import React, { createContext, useContext, useState } from "react";


interface EnemyHitAnimationContextData {
  Enemyhit: boolean;
  setEnemyHit: (Enemyhit: boolean) => void;
}

const EnemyHitAnimationContext = createContext<EnemyHitAnimationContextData>({
  Enemyhit: false,
  setEnemyHit: () => {},
});

export const useEnemyHitAnimationContext = () => useContext(EnemyHitAnimationContext);

interface Props {
  children: React.ReactNode;
}

export const EnemyHitAnimationProvider: React.FC<Props> = ({ children }) => {
    const [Enemyhit, setEnemyHit] = useState(false);
  return (
    <EnemyHitAnimationContext.Provider value={{ Enemyhit, setEnemyHit }}>
      {children}
    </EnemyHitAnimationContext.Provider>
  );
};