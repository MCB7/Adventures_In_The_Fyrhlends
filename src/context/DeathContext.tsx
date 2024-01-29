import React, { createContext, useContext, useState } from "react";


interface DeathAnimationContextData {
  Death: boolean;
  setDeath: (Death: boolean) => void;
  EnemyDeath: boolean;
  setEnemyDeath: (Death: boolean) => void;
}

const DeathAnimationContext = createContext<DeathAnimationContextData>({
  Death: false,
  setDeath: () => {},
  EnemyDeath: false,
  setEnemyDeath: () => {},
});

export const useDeathAnimationContext = () => useContext(DeathAnimationContext);

interface Props {
  children: React.ReactNode;
}

export const DeathAnimationProvider: React.FC<Props> = ({ children }) => {
    const [Death, setDeath] = useState(false);
    const [EnemyDeath, setEnemyDeath] = useState(false);
  return (
    <DeathAnimationContext.Provider value={{ Death, setDeath, EnemyDeath, setEnemyDeath }}>
      {children}
    </DeathAnimationContext.Provider>
  );
};