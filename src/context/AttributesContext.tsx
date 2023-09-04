import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AttributesContextData {
  damage: any;
  defense: any;
  hitpoints: any;
  endurancepoints:any;
  actionpoints: any;
  disease: any;
  hunger: any;
  temp: any;
  sleep: any;
  thirst: any;
  reputation: any;
  alignment: any;
  setAttributes: (Attributes: Attributes) => void;
}

interface Attributes {
    damage: any;
    defense: any;
    hitpoints: any;
    endurancepoints:any;
    actionpoints: any;
    disease: any;
    hunger: any;
    temp: any;
    sleep: any;
    thirst: any;
    reputation: any;
    alignment: any;
}

const AttributesContext = createContext<AttributesContextData>({
    damage: 0,
    defense: 0,
    hitpoints: 100,
    endurancepoints: 100,
    actionpoints: 100,
    disease: "none",
    hunger: 0,
    temp: 98,
    sleep: 100,
    thirst: 0,
    reputation: 0,
    alignment: {law: 0, chaos: 0, Good: 0,  Evil: 0},
    setAttributes: () => {},
});

export const useAttributesContext = () => useContext(AttributesContext);

interface Props {
  children: React.ReactNode;
}

export const AttributesProvider: React.FC<Props> = ({ children }) => {
  const [Attributes, setAttributes] = useLocalStorage<Attributes>("Attributes", {
    damage: 0,
    defense: 0,
    hitpoints: 100,
    endurancepoints: 100,
    actionpoints: 100,
    disease: "none",
    hunger: 0,
    temp: 98,
    sleep: 100,
    thirst: 0,
    reputation: 0,
    alignment: {law: 0, chaos: 0, Good: 0,  Evil: 0},
  });

  return (
    <AttributesContext.Provider value={{ ...Attributes, setAttributes }}>
      {children}
    </AttributesContext.Provider>
  );
};
