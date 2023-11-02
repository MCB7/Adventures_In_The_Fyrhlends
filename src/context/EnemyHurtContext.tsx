import React, { createContext, useContext, useState } from "react";


interface EnemyHurtAnimationContextData {
  EnemyHurt: boolean;
  setEnemyHurt: (EnemyHurt: boolean) => void;
}

const EnemyHurtAnimationContext = createContext<EnemyHurtAnimationContextData>({
  EnemyHurt: false,
  setEnemyHurt: () => {},
});

export const useEnemyHurtAnimationContext = () => useContext(EnemyHurtAnimationContext);

interface Props {
  children: React.ReactNode;
}

export const EnemyHurtAnimationProvider: React.FC<Props> = ({ children }) => {
    const [EnemyHurt, setEnemyHurt] = useState(false);
  return (
    <EnemyHurtAnimationContext.Provider value={{ EnemyHurt, setEnemyHurt }}>
      {children}
    </EnemyHurtAnimationContext.Provider>
  );
};