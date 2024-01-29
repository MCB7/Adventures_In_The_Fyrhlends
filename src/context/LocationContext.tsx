import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface LocationContextData {
    LocationX: number;
    setLocationX: (LocationX: number) => void;
    LocationY: number;
    setLocationY: (LocationY: number) => void;
  
}

//during character creation choosing background will determine starting location
const LocationContext = createContext<LocationContextData>({
    LocationX:87.5,
    setLocationX: () => {},
    LocationY:12.5,
    setLocationY: () => {},

});

export const useLocationContext = () => useContext(LocationContext);



interface Props {
  children: React.ReactNode;
}

export const LocationContextProvider: React.FC<Props> = ({ children }) => {
  const [LocationX, setLocationX] = useLocalStorage<number>("LocationLocationX", 0);
  const [LocationY, setLocationY] = useLocalStorage<number>("LocationLocationY", 0);


  return (
    <LocationContext.Provider value={{ LocationX, setLocationX, LocationY, setLocationY}}>
      {children}
    </LocationContext.Provider>
  );
};