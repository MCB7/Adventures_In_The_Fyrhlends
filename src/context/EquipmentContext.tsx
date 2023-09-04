import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface EquipmentContextData {
    Helmet: string;
    setHelmet: (Helmet: string) => void;
    Armor: string;
    setArmor: (Armor: string) => void;
    Shield : string
    setShield: (Shield: string) => void;
    Weapon : string 
    setWeapon: ( Weapon: string) => void;
    Bracers : string
    setBracers: (Bracers: string) => void;
    Boots : string 
    setBoots: (Boots: string) => void;
    Ring : string
    setRing: (Ring : string) => void;
    Amulet : string
    setAmulet: (Amulet : string ) => void;

}

const EquipmentContext = createContext<EquipmentContextData>({
    Helmet:"empty",
    setHelmet: () => {},
    Armor: "empty",
    setArmor: () => {},
    Shield: "empty",
    setShield: () => {},
    Weapon:"empty",
    setWeapon: () => {},
    Bracers: "empty",
    setBracers: () => {},
    Boots: "empty",
    setBoots: () => {},
    Ring: "empty",
    setRing: () => {},
    Amulet: "empty",
    setAmulet: () => {}


});

export const useEquipmentContext = () => useContext(EquipmentContext);


interface Props {
  children: React.ReactNode;
}

export const EquipmentProvider: React.FC<Props> = ({ children }) => {
  const [Helmet, setHelmet] = useLocalStorage<string>("EquipmentHelmet", "empty");
  const [Armor, setArmor] = useLocalStorage<string>("EquipmentArmor", "empty");
  const [Shield, setShield] = useLocalStorage<string>("EquipmentShield", "empty");
  const [Weapon, setWeapon] = useLocalStorage<string>("EquipmentWeapon", "empty");
  const [Bracers, setBracers] = useLocalStorage<string>("EquipmentBracers", "empty");
  const [Boots, setBoots] = useLocalStorage<string>("EquipmentBoots", "empty");
  const [Ring, setRing] = useLocalStorage<string>("EquipmentRing", "empty");
  const [Amulet, setAmulet] = useLocalStorage<string>("EquipmentAmulet", "empty");


  return (
    <EquipmentContext.Provider value={{ Helmet, setHelmet, Armor, setArmor, Shield, setShield, Weapon, setWeapon, Bracers, setBracers, Boots, setBoots, Ring, setRing, Amulet, setAmulet}}>
      {children}
    </EquipmentContext.Provider>
  );
};