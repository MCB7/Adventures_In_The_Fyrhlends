import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface StatsContextData {
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
  setStats: (stats: Stats) => void;
}

interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
}

const StatsContext = createContext<StatsContextData>({
  strength: 0,
  dexterity: 0,
  constitution: 0,
  wisdom: 0,
  intelligence: 0,
  charisma: 0,
  setStats: () => {},
});

export const useStatsContext = () => useContext(StatsContext);

interface Props {
  children: React.ReactNode;
}

export const StatsProvider: React.FC<Props> = ({ children }) => {
  const [stats, setStats] = useLocalStorage<Stats>("stats", {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    wisdom: 0,
    intelligence: 0,
    charisma: 0,
  });

  return (
    <StatsContext.Provider value={{ ...stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};
