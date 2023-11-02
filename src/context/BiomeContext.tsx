import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


interface BiomeContextData {
  biome: any;
  setbiome: (biome: any) => void;

}

const BiomeContext = createContext<BiomeContextData>({
  biome: "",
  setbiome: () => {},

});

export const useBiomeContext = () => useContext(BiomeContext);

interface Props {
  children: React.ReactNode;
}

export const BiomeProvider: React.FC<Props> = ({ children }) => {
  const [biome, setbiome] = useLocalStorage<any>("Locationbiome", "");


  return (
    <BiomeContext.Provider value={{ biome, setbiome}}>
      {children}
    </BiomeContext.Provider>
  );
};