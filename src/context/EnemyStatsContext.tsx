import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface EnemyStatsContextData {
  enemyStrength: number;
  enemyDexterity: number;
  enemyConstitution: number;
  enemyWisdom: number;
  enemyIntelligence: number;
  enemyCharisma: number;
  setEnemyStats: (Enemystats: EnemyStats) => void;
}

interface EnemyStats {
  enemyStrength: number;
  enemyDexterity: number;
  enemyConstitution: number;
  enemyWisdom: number;
  enemyIntelligence: number;
  enemyCharisma: number;
}

const EnemyStatsContext = createContext<EnemyStatsContextData>({
  enemyStrength: 0,
  enemyDexterity: 0,
  enemyConstitution: 0,
  enemyWisdom: 0,
  enemyIntelligence: 0,
  enemyCharisma: 0,
  setEnemyStats: () => {},
});

export const useEnemyStatsContext = () => useContext(EnemyStatsContext);

interface Props {
  children: React.ReactNode;
}

export const EnemyStatsProvider: React.FC<Props> = ({ children }) => {
  const [Enemystats, setEnemyStats] = useLocalStorage<EnemyStats>("Enemystats", {
    enemyStrength: 0,
    enemyDexterity: 0,
    enemyConstitution: 0,
    enemyWisdom: 0,
    enemyIntelligence: 0,
    enemyCharisma: 0,
  });

  return (
    <EnemyStatsContext.Provider value={{ ...Enemystats, setEnemyStats }}>
      {children}
    </EnemyStatsContext.Provider>
  );
};
