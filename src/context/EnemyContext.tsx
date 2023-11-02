import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface EnemyContextData {
  enemy: any;
  setEnemy: (enemy: any) => void;
}

const EnemyContext = createContext<EnemyContextData>({
  enemy: "",
  setEnemy: () => {},
});

export const useEnemyContext = () => useContext(EnemyContext);

interface Props {
  children: React.ReactNode;
}

export const EnemyProvider: React.FC<Props> = ({ children }) => {
  const [enemy, setEnemy] = useLocalStorage<any>("LocationEnemy", "");

  return (
    <EnemyContext.Provider value={{ enemy, setEnemy }}>
      {children}
    </EnemyContext.Provider>
  );
};