import React, {useEffect, useState } from "react";
import { useItemTransferContext } from "../context/ItemTransferContext";
import { useInventoryContext } from "../context/InventoryContext";

import { Weapons, Shields, Helmet, Armor, Bracers, Boots, Amulet, Ring } from "./Items";


const ItemTransfer: React.FC = () => {

    const { TRANSFER_SLOT1 , setTRANSFER_SLOT1 } = useItemTransferContext();
    const { TRANSFER_SLOT2 , setTRANSFER_SLOT2 } = useItemTransferContext();

    const [transferSlot1, setTransferSlot1] = useState<any>( TRANSFER_SLOT1)
    
    const [transferSlot2, setTransferSlot2] = useState<any>( TRANSFER_SLOT2)

    const { SLOT1, setSLOT1 } = useInventoryContext();
    const { SLOT2, setSLOT2 } = useInventoryContext();
    const { SLOT3, setSLOT3 } = useInventoryContext();
    const { SLOT4, setSLOT4 } = useInventoryContext();
    const { SLOT5, setSLOT5 } = useInventoryContext();
    const { SLOT6, setSLOT6 } = useInventoryContext();

  const ITEM: any = [{ ...Weapons[0] }, { ...Weapons[1] }, {...Helmet[0] },{...Shields[0]}, {...Shields[1]}, {...Armor[0]}, {...Armor[1]}, {...Bracers[0]}, {...Boots[0]}, {...Amulet[0]}, {...Ring[0]}];

  useEffect(() => {
    const randomInRange = () => {
      const min = 0;
      const max = 11;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    const randomInRange1 = () => {
      const min = 0;
      const max = 11;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    const updateTransferSlot1 = () => {
      const newRandomNumber = randomInRange();
      setTRANSFER_SLOT1(JSON.stringify(ITEM[newRandomNumber]));
      setTransferSlot1(TRANSFER_SLOT1); // Update the local state
 
    };
  
    const updateTransferSlot2 = () => {
      const newRandomNumber1 = randomInRange1();
      setTRANSFER_SLOT2(JSON.stringify(ITEM[newRandomNumber1]));
      setTransferSlot2(TRANSFER_SLOT2); // Update the local state
    
    };
  
    updateTransferSlot1();
    updateTransferSlot2();
  }, []);




  const PickUp_1 = () => {
    if (SLOT1 === "empty") {
      setSLOT1(transferSlot1);
      setTransferSlot1("empty");
    } else if (SLOT2 === "empty") {
      setSLOT2(transferSlot1);
      setTransferSlot1("empty");
    } else if (SLOT3 === "empty") {
      setSLOT3(transferSlot1);
      setTransferSlot1("empty");
    } else if (SLOT4 === "empty") {
      setSLOT4(transferSlot1);
      setTransferSlot1("empty");
    } else if (SLOT5 === "empty") {
      setSLOT5(transferSlot1);
      setTransferSlot1("empty");
    } else if (SLOT6 === "empty") {
      setSLOT6(transferSlot1);
      setTransferSlot1("empty");
    } else {
      console.log("Inventory is full");
    }
  };
  const PickUp_2 = () => {
    if (SLOT1 === "empty") {
      setSLOT1(transferSlot2);
      setTransferSlot2("empty");
    } else if (SLOT2 === "empty") {
      setSLOT2(transferSlot2);
      setTransferSlot2("empty");
    } else if (SLOT3 === "empty") {
      setSLOT3(transferSlot2);
      setTransferSlot2("empty");
    } else if (SLOT4 === "empty") {
      setSLOT4(transferSlot2);
      setTransferSlot2("empty");
    } else if (SLOT5 === "empty") {
      setSLOT5(transferSlot2);
      setTransferSlot2("empty");
    } else if (SLOT6 === "empty") {
      setSLOT6(transferSlot2);
      setTransferSlot2("empty");
    } else {
      console.log("Inventory is full");
    }
  };

  const element1: any = document.getElementById("TransferSlot1");
  setTimeout(() => {
    if (transferSlot1 === "empty") {
      element1.remove();
    }
  }, 100);
  const element2: any = document.getElementById("TransferSlot2");
  setTimeout(() => {
    if (transferSlot2 === "empty") {
      element2.remove();
    }
  }, 100);

  return (
    <>
    <h4>LOOT</h4>
    <div>
      <p >ITEM:{transferSlot1} </p>
<button id="TransferSlot1" onClick = {() => PickUp_1()}>Pick up</button>
      <p>ITEM:{transferSlot2} </p>
<button id="TransferSlot2" onClick = {() => PickUp_2()}>Pick up</button>
    </div>

   

<div>

</div>
</>
  );
};

export default ItemTransfer;