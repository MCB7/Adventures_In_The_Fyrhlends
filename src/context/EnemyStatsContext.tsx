import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface EnemyStatsContextData {
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
  setEnemyStats: (Enemystats: EnemyStats) => void;
}

interface EnemyStats {
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
}

const EnemyStatsContext = createContext<EnemyStatsContextData>({
  strength: 0,
  dexterity: 0,
  constitution: 0,
  wisdom: 0,
  intelligence: 0,
  charisma: 0,
  setEnemyStats: () => {},
});

export const useEnemyStatsContext = () => useContext(EnemyStatsContext);

interface Props {
  children: React.ReactNode;
}

export const EnemyStatsProvider: React.FC<Props> = ({ children }) => {
  const [Enemystats, setEnemyStats] = useLocalStorage<EnemyStats>("Enemystats", {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    wisdom: 0,
    intelligence: 0,
    charisma: 0,
  });

  return (
    <EnemyStatsContext.Provider value={{ ...Enemystats, setEnemyStats }}>
      {children}
    </EnemyStatsContext.Provider>
  );
};
