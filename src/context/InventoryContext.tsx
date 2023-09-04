import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface InventoryContextData {
  SLOT1: any;
    setSLOT1: (SLOT1: any) => void;
  SLOT2: any;
    setSLOT2: (SLOT2: any) => void;
  SLOT3: any;
    setSLOT3: (SLOT1: any) => void;
  SLOT4: any;
    setSLOT4: (SLOT2: any) => void;
  SLOT5: any;
    setSLOT5: (SLOT1: any) => void;
  SLOT6: any;
    setSLOT6: (SLOT2: any) => void;

}

const InventoryContext = createContext<InventoryContextData>({
    SLOT1: "empty",
    setSLOT1: () => {},
    SLOT2: "empty",
    setSLOT2: () => {},
    SLOT3: "empty",
    setSLOT3: () => {},
    SLOT4: "empty",
    setSLOT4: () => {},
    SLOT5: "empty",
    setSLOT5: () => {},
    SLOT6: "empty",
    setSLOT6: () => {},
});

export const useInventoryContext = () => useContext(InventoryContext);


interface Props {
  children: React.ReactNode;
}

export const InventoryProvider: React.FC<Props> = ({ children }) => {
  const [SLOT1, setSLOT1] = useLocalStorage<any>("InventorySLOT1", "empty");
  const [SLOT2, setSLOT2] = useLocalStorage<any>("InventorySLOT2", "empty");
  const [SLOT3, setSLOT3] = useLocalStorage<any>("InventorySLOT3", "empty");
  const [SLOT4, setSLOT4] = useLocalStorage<any>("InventorySLOT4", "empty");
  const [SLOT5, setSLOT5] = useLocalStorage<any>("InventorySLOT5", "empty");
  const [SLOT6, setSLOT6] = useLocalStorage<any>("InventorySLOT6", "empty");

  return (
    <InventoryContext.Provider value={{ SLOT1, setSLOT1, SLOT2, setSLOT2, SLOT3, setSLOT3, SLOT4, setSLOT4, SLOT5, setSLOT5, SLOT6, setSLOT6 }}>
      {children}
    </InventoryContext.Provider>
  );
};