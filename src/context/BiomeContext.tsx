import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface BiomeContextData {
  biome: any;
  setbiome: (biome: any) => void;
  fauna: any;
  setfauna: (fauna : any) => void;
}

const BiomeContext = createContext<BiomeContextData>({
  biome: "",
  setbiome: () => {},
  fauna:"",
  setfauna: () => {},
});

export const useLocationContext = () => useContext(BiomeContext);

interface Props {
  children: React.ReactNode;
}

export const BiomeProvider: React.FC<Props> = ({ children }) => {
  const [biome, setbiome] = useLocalStorage<string>("Locationbiome", "");
  const [fauna, setfauna] = useLocalStorage<string>("Locationfauna", "");

  return (
    <BiomeContext.Provider value={{ biome, setbiome, fauna, setfauna }}>
      {children}
    </BiomeContext.Provider>
  );
};