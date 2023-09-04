import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface EnemyAttributesContextData {
    name: string;
    HP: number;
    EP: number;
    AP: number;
    lowDam: number;
    HighDam: number;
    description: string;
    defense: number;
    ThreatRating: string;
  setEnemyAttributes: (EnemyAttributes: EnemyAttributes) => void;
}

interface EnemyAttributes {
    name: string;
    HP: number;
    EP: number;
    AP: number;
    lowDam: number;
    HighDam: number;
    description: string;
    defense: number;
    ThreatRating: string;
}

const EnemyAttributesContext = createContext<EnemyAttributesContextData>({
    name: "Forest Bandit",
    HP: 100,
    EP: 100,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "a mud covered man in a camouflage of leaves, twigs, and bird droppings. He's holding a cruel looking cudgel and a rotting wooden shield ",
    defense: 10,
    ThreatRating: "low",
    setEnemyAttributes: () => {},
});

export const useAttributesContext = () => useContext(EnemyAttributesContext);

interface Props {
  children: React.ReactNode;
}

export const AttributesProvider: React.FC<Props> = ({ children }) => {
  const [EnemyAttributes, setEnemyAttributes] = useLocalStorage<EnemyAttributes>("Attributes", {
    name: "Forest Bandit",
    HP: 100,
    EP: 100,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "a mud covered man in a camouflage of leaves, twigs, and bird droppings. He's holding a cruel looking cudgel and a rotting wooden shield ",
    defense: 10,
    ThreatRating: "low",
  });

  return (
    <EnemyAttributesContext.Provider value={{ ...EnemyAttributes, setEnemyAttributes }}>
      {children}
    </EnemyAttributesContext.Provider>
  );
};
