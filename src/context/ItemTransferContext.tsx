import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ItemTransferContextData {
    TRANSFER_SLOT1: string;
    setTRANSFER_SLOT1: (SLOT1: string) => void;
    TRANSFER_SLOT2: string;
    setTRANSFER_SLOT2: (SLOT2: string) => void;

}
const ItemTransferContext = createContext<ItemTransferContextData>({
    TRANSFER_SLOT1: "",
    setTRANSFER_SLOT1: () => {},
    TRANSFER_SLOT2: "",
    setTRANSFER_SLOT2: () => {},

});

export const useItemTransferContext = () => useContext(ItemTransferContext);


interface Props {
  children: React.ReactNode;
}

export const ItemTransferProvider: React.FC<Props> = ({ children }) => {
  const [TRANSFER_SLOT1, setTRANSFER_SLOT1] = useLocalStorage<string>("ItemTransferSLOT1", "");
  const [TRANSFER_SLOT2, setTRANSFER_SLOT2] = useLocalStorage<string>("ItemTransferSLOT2", "");


  return (
    <ItemTransferContext.Provider value={{ TRANSFER_SLOT1, setTRANSFER_SLOT1, TRANSFER_SLOT2, setTRANSFER_SLOT2}}>
      {children}
    </ItemTransferContext.Provider>
  );
};