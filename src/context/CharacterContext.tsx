import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CharacterContextData {
  name: string;
  setName: (name: string) => void;
}

const CharacterContext = createContext<CharacterContextData>({
  name: "",
  setName: () => {},
});

export const useCharacterContext = () => useContext(CharacterContext);

interface Props {
  children: React.ReactNode;
}

export const CharacterProvider: React.FC<Props> = ({ children }) => {
  const [name, setName] = useLocalStorage<string>("characterName", "");

  return (
    <CharacterContext.Provider value={{ name, setName }}>
      {children}
    </CharacterContext.Provider>
  );
};