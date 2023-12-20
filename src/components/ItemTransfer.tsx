import React, { useEffect, useState, useRef } from "react";
import { useItemTransferContext } from "../context/ItemTransferContext";
import { useInventoryContext } from "../context/InventoryContext";

import {
  Weapons,
  Shields,
  Helmet,
  Armor,
  Bracers,
  Boots,
  Amulet,
  Ring,
} from "./Items";

const ItemTransfer: React.FC = () => {
  const { TRANSFER_SLOT1, setTRANSFER_SLOT1 } = useItemTransferContext();
  const { TRANSFER_SLOT2, setTRANSFER_SLOT2 } = useItemTransferContext();

  const [transferSlot1, setTransferSlot1] = useState<any>(TRANSFER_SLOT1);

  const [transferSlot2, setTransferSlot2] = useState<any>(TRANSFER_SLOT2);

  const { SLOT1, setSLOT1 } = useInventoryContext();
  const { SLOT2, setSLOT2 } = useInventoryContext();
  const { SLOT3, setSLOT3 } = useInventoryContext();
  const { SLOT4, setSLOT4 } = useInventoryContext();
  const { SLOT5, setSLOT5 } = useInventoryContext();
  const { SLOT6, setSLOT6 } = useInventoryContext();

  const ITEM: any = [
    { ...Weapons[0] },
    { ...Weapons[1] },
    { ...Helmet[0] },
    { ...Shields[0] },
    { ...Shields[1] },
    { ...Armor[0] },
    { ...Armor[1] },
    { ...Bracers[0] },
    { ...Boots[0] },
    { ...Amulet[0] },
    { ...Ring[0] },
  ];

  const transferSlot1Ref = useRef<HTMLButtonElement>(null);
  const transferSlot2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (transferSlot1Ref.current && transferSlot1 === "empty") {
      transferSlot1Ref.current.remove();
    }
  }, [transferSlot1]);

  useEffect(() => {
    if (transferSlot2Ref.current && transferSlot2 === "empty") {
      transferSlot2Ref.current.remove();
    }
  }, [transferSlot2]);

  useEffect(() => {
    const randomInRange = () => {
      const min = 0;
      const max = 10;  // Adjust this to be 10
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    const randomInRange1 = () => {
      const min = 0;
      const max = 10;  // Adjust this to be 10
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

  const PickUp = (transferSlot: any, setTransferSlot: (val: any) => void) => {
    const slots = [SLOT1, SLOT2, SLOT3, SLOT4, SLOT5, SLOT6];
    const setSlots = [setSLOT1, setSLOT2, setSLOT3, setSLOT4, setSLOT5, setSLOT6];

    for (let i = 0; i < slots.length; i++) {
      if (slots[i] === 'empty') {
        setSlots[i](transferSlot);
        setTransferSlot('empty');
        return;
      }
    }

    console.log('Inventory is full');
  };

  useEffect(() => {
    setTransferSlot1(TRANSFER_SLOT1);
  }, [TRANSFER_SLOT1]);
  
  useEffect(() => {
    setTransferSlot2(TRANSFER_SLOT2);
  }, [TRANSFER_SLOT2]);

  // const element1: any = document.getElementById("TransferSlot1");
  // setTimeout(() => {
  //   if (transferSlot1 === "empty") {
  //     element1.remove();
  //   }
  // }, 100);
  // const element2: any = document.getElementById("TransferSlot2");
  // setTimeout(() => {
  //   if (transferSlot2 === "empty") {
  //     element2.remove();
  //   }
  // }, 100);
  let transferSlot1Obj = null;
  if (transferSlot1 && transferSlot1 !== "empty") {
    transferSlot1Obj = JSON.parse(transferSlot1);
  }
 

  let transferSlot2Obj = null;
  if (transferSlot2 && transferSlot2 !== "empty") {
    transferSlot2Obj = JSON.parse(transferSlot2);
  }
  
  let icon = transferSlot1Obj ? transferSlot1Obj.icon : null;
  let icon_1 = transferSlot2Obj ? transferSlot2Obj.icon : null;

  return (
    <>
      <div style={{cursor: "url('/assets/cursor_menu.png'),auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh"}}>
  
        <button style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "url('/assets/cursor_menu_highlight.png'),auto",
            outline: "inherit",
            margin:'1rem',
          }} ref={transferSlot1Ref} id="TransferSlot1" onClick={() => PickUp(transferSlot1, setTransferSlot1)}>
        <img src={icon} style={{margin: "1rem", width: "10rem",border: "solid 1px tan",borderRadius:'10px'}}/>
        </button>
    
        <button style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "url('/assets/cursor_menu_highlight.png'),auto",
            outline: "inherit",
            margin:'1rem',
       
            
          }} ref={transferSlot2Ref} id="TransferSlot2" onClick={() => PickUp(transferSlot2, setTransferSlot2)}>
        <img src={icon_1} style={{margin: "1rem", width: "10rem", border: "solid 1px tan",borderRadius:'10px'}}/>
        </button>
       
      </div>
    </>
  );
};

export default ItemTransfer;
