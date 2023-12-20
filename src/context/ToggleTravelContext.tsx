import React, { createContext, useContext, useState } from "react";


interface ToggleTravelContextData {
  ToggleTravel: boolean;
  setToggleTravel: (ToggleTravel: boolean) => void;
}

const ToggleTravelContext = createContext<ToggleTravelContextData>({
  ToggleTravel: false,
  setToggleTravel: () => {},
});

export const useToggleTravelContext = () => useContext(ToggleTravelContext);

interface Props {
  children: React.ReactNode;
}

export const ToggleTravelProvider: React.FC<Props> = ({ children }) => {
    const [ToggleTravel, setToggleTravel] = useState(false);
  return (
    <ToggleTravelContext.Provider value={{ ToggleTravel, setToggleTravel }}>
      {children}
    </ToggleTravelContext.Provider>
  );
};