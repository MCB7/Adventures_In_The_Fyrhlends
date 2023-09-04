import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface LocationContextData {
    LocationX: number;
    setLocationX: (LocationX: number) => void;
    LocationY: number;
    setLocationY: (LocationY: number) => void;

}
const LocationContext = createContext<LocationContextData>({
    LocationX:0,
    setLocationX: () => {},
    LocationY:0,
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