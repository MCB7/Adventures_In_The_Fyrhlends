import React, {useState, useEffect} from "react";
import { useInventoryContext } from "../context/InventoryContext";
import { useEquipmentContext } from "../context/EquipmentContext";

const Inventory: React.FC = () => {

  const { SLOT1, setSLOT1 } = useInventoryContext();
  const { SLOT2, setSLOT2 } = useInventoryContext();
  const { SLOT3, setSLOT3 } = useInventoryContext();
  const { SLOT4, setSLOT4 } = useInventoryContext();
  const { SLOT5, setSLOT5 } = useInventoryContext();
  const { SLOT6, setSLOT6 } = useInventoryContext();

  const { Helmet, setHelmet } = useEquipmentContext();
  const { Armor, setArmor } = useEquipmentContext();
  const { Shield, setShield } = useEquipmentContext();
  const { Weapon, setWeapon} = useEquipmentContext();
  const { Bracers, setBracers } = useEquipmentContext();
  const { Boots, setBoots } = useEquipmentContext();
  const { Ring, setRing } = useEquipmentContext();
  const { Amulet, setAmulet} = useEquipmentContext();

const [equip, setEquip] = useState<any>({
  type: "",
  name: "",
  description: "",
  defense: "",
  weight: "",
  special: null,
  icon: "",
  image: ""
});

const [SelectedSlot, setSelected_Slot] = useState<any>('');
const [SLOTnum, setSLOTnum] = useState<any>('')

useEffect(()=> {
  const el_SLOT1: any = document.getElementById("InventorySLOT1");
  if (SLOT1 === "empty"){el_SLOT1.style.display = 'none';}
  else if  (SLOT1 != "empty"){el_SLOT1.style.display = 'block';}

  const el_SLOT2: any = document.getElementById("InventorySLOT2");
  if (SLOT2 === "empty"){el_SLOT2.style.display = 'none';}
  else if  (SLOT2 != "empty"){el_SLOT2.style.display = 'block';}

  const el_SLOT3: any = document.getElementById("InventorySLOT3");
  if (SLOT3 === "empty"){el_SLOT3.style.display = 'none';}
  else if  (SLOT3 != "empty"){el_SLOT3.style.display = 'block';}

  const el_SLOT4: any = document.getElementById("InventorySLOT4");
  if (SLOT4 === "empty"){el_SLOT4.style.display = 'none';}
  else if  (SLOT4 != "empty"){el_SLOT4.style.display = 'block';}

  const el_SLOT5: any = document.getElementById("InventorySLOT5");
  if (SLOT5 === "empty"){el_SLOT5.style.display = 'none';}
  else if  (SLOT5 != "empty"){el_SLOT5.style.display = 'block';}

  const el_SLOT6: any = document.getElementById("InventorySLOT6");
  if (SLOT6 === "empty"){el_SLOT6.style.display = 'none';}
  else if  (SLOT6 != "empty"){el_SLOT6.style.display = 'block';}
},[SLOT1, SLOT2, SLOT3, SLOT4, SLOT5, SLOT6])

const EquipItem = () => {
  const parsedObject = JSON.parse(equip);
  const parsedSLOT = JSON.parse(SelectedSlot)


  if (parsedObject.type === 'Helmet' && Helmet === 'empty' && parsedSLOT.type ==='Helmet' && SLOTnum === 'SLOT1' ) {
    setHelmet(equip);
    setSLOT1('empty')
  } else if (parsedObject.type === "Armor" && Armor === 'empty' && parsedSLOT.type ==='Armor' && SLOTnum === 'SLOT1') {
    setArmor(equip);
    setSLOT1('empty')
  } else if (parsedObject.type === "Shield" && Shield === 'empty' && parsedSLOT.type ==='Shield' && SLOTnum === 'SLOT1') {
    setShield(equip);
    setSLOT1('empty')
  } else if (parsedObject.type === "Weapon" && Weapon === 'empty' && parsedSLOT.type ==='Weapon' && SLOTnum === 'SLOT1') {
    setWeapon(equip);
    setSLOT1('empty')
  } else if (parsedObject.type=== "Bracers" && Bracers === 'empty' && parsedSLOT.type ==='Bracers' && SLOTnum === 'SLOT1') {
    setBracers(equip);
    setSLOT1('empty')
  } else if (parsedObject.type === "Boots" && Boots === 'empty'  && parsedSLOT.type ==='Boots' && SLOTnum === 'SLOT1') {
    setBoots(equip);
    setSLOT1('empty')
  } else if (parsedObject.type === "Ring" && Ring === 'empty' && parsedSLOT.type ==='Ring' && SLOTnum === 'SLOT1') {
    setRing(equip);
    setSLOT1('empty')
  } else if (parsedObject.type === "Amulet" && Amulet === 'empty' && parsedSLOT.type ==='Amulet' && SLOTnum === 'SLOT1') {
    setAmulet(equip);
    setSLOT1('empty')
  } else {
    console.log('unequip item first');

  } 

  if (parsedObject.type === 'Helmet' && Helmet === 'empty' && parsedSLOT.type ==='Helmet' && SLOTnum === 'SLOT2') {
    setHelmet(equip);
    setSLOT2('empty')
    
  } else if (parsedObject.type === "Armor" && Armor === 'empty' && parsedSLOT.type ==='Armor' && SLOTnum === 'SLOT2') {
    setArmor(equip);
    setSLOT2('empty')
  } else if (parsedObject.type === "Shield" && Shield === 'empty' && parsedSLOT.type ==='Shield' && SLOTnum === 'SLOT2') {
    setShield(equip);
    setSLOT2('empty')
  } else if (parsedObject.type === "Weapon" && Weapon === 'empty' && parsedSLOT.type ==='Weapon' && SLOTnum === 'SLOT2') {
    setWeapon(equip);
    setSLOT2('empty')
  } else if (parsedObject.type=== "Bracers" && Bracers === 'empty' && parsedSLOT.type ==='Bracers' && SLOTnum === 'SLOT2') {
    setBracers(equip);
    setSLOT2('empty')
  } else if (parsedObject.type === "Boots" && Boots === 'empty' && parsedSLOT.type ==='Boots' && SLOTnum === 'SLOT2') {
    setBoots(equip);
    setSLOT2('empty')
  } else if (parsedObject.type === "Ring" && Ring === 'empty' && parsedSLOT.type ==='Ring' && SLOTnum === 'SLOT2') {
    setRing(equip);
    setSLOT2('empty')
  } else if (parsedObject.type === "Amulet" && Amulet === 'empty' && parsedSLOT.type ==='Amulet' && SLOTnum === 'SLOT2') {
    setAmulet(equip);
    setSLOT2('empty')
  } else {
    console.log('unequip item first');

  } 


  if (parsedObject.type === 'Helmet' && Helmet === 'empty' && parsedSLOT.type ==='Helmet' && SLOTnum === 'SLOT3' ) {
    setHelmet(equip);
    setSLOT3('empty')
    
  } else if (parsedObject.type === "Armor" && Armor === 'empty' && parsedSLOT.type ==='Armor' && SLOTnum === 'SLOT3') {
    setArmor(equip);
    setSLOT3('empty')
  } else if (parsedObject.type === "Shield" && Shield === 'empty' && parsedSLOT.type ==='Shield' && SLOTnum === 'SLOT3') {
    setShield(equip);
    setSLOT3('empty')
  } else if (parsedObject.type === "Weapon" && Weapon === 'empty' && parsedSLOT.type ==='Weapon' && SLOTnum === 'SLOT3') {
    setWeapon(equip);
    setSLOT3('empty')
  } else if (parsedObject.type=== "Bracers" && Bracers === 'empty' && parsedSLOT.type ==='Bracers' && SLOTnum === 'SLOT3') {
    setBracers(equip);
    setSLOT3('empty')
  } else if (parsedObject.type === "Boots" && Boots === 'empty' && parsedSLOT.type ==='Boots' && SLOTnum === 'SLOT3') {
    setBoots(equip);
    setSLOT3('empty')
  } else if (parsedObject.type === "Ring" && Ring === 'empty' && parsedSLOT.type ==='Ring' && SLOTnum === 'SLOT3') {
    setRing(equip);
    setSLOT3('empty')
  } else if (parsedObject.type === "Amulet" && Amulet === 'empty' && parsedSLOT.type ==='Amulet' && SLOTnum === 'SLOT3') {
    setAmulet(equip);
    setSLOT3('empty')
  } else {
    console.log('unequip item first');

  } 
  if (parsedObject.type === 'Helmet' && Helmet === 'empty' && parsedSLOT.type ==='Helmet' && SLOTnum === 'SLOT4') {
    setHelmet(equip);
    setSLOT4('empty')
    
  } else if (parsedObject.type === "Armor" && Armor === 'empty' && parsedSLOT.type ==='Armor' && SLOTnum === 'SLOT4') {
    setArmor(equip);
    setSLOT4('empty')
  } else if (parsedObject.type === "Shield" && Shield === 'empty' && parsedSLOT.type ==='Shield' && SLOTnum === 'SLOT4') {
    setShield(equip);
    setSLOT4('empty')
  } else if (parsedObject.type === "Weapon" && Weapon === 'empty' && parsedSLOT.type ==='Weapon' && SLOTnum === 'SLOT4') {
    setWeapon(equip);
    setSLOT4('empty')
  } else if (parsedObject.type=== "Bracers" && Bracers === 'empty' && parsedSLOT.type ==='Bracers' && SLOTnum === 'SLOT4') {
    setBracers(equip);
    setSLOT4('empty')
  } else if (parsedObject.type === "Boots" && Boots === 'empty' && parsedSLOT.type ==='Boots' && SLOTnum === 'SLOT4') {
    setBoots(equip);
    setSLOT4('empty')
  } else if (parsedObject.type === "Ring" && Ring === 'empty' && parsedSLOT.type ==='Ring' && SLOTnum === 'SLOT4') {
    setRing(equip);
    setSLOT4('empty')
  } else if (parsedObject.type === "Amulet" && Amulet === 'empty' && parsedSLOT.type ==='Amulet' && SLOTnum === 'SLOT4') {
    setAmulet(equip);
    setSLOT4('empty')
  } else {
    console.log('unequip item first');

  } 

  if (parsedObject.type === 'Helmet' && Helmet === 'empty' && parsedSLOT.type ==='Helmet' && SLOTnum === 'SLOT5') {
    setHelmet(equip);
    setSLOT5('empty')
    
  } else if (parsedObject.type === "Armor" && Armor === 'empty' && parsedSLOT.type ==='Armor'  && SLOTnum === 'SLOT5') {
    setArmor(equip);
    setSLOT5('empty')
  } else if (parsedObject.type === "Shield" && Shield === 'empty' && parsedSLOT.type ==='Shield'  && SLOTnum === 'SLOT5') {
    setShield(equip);
    setSLOT5('empty')
  } else if (parsedObject.type === "Weapon" && Weapon === 'empty' && parsedSLOT.type ==='Weapon'  && SLOTnum === 'SLOT5') {
    setWeapon(equip);
    setSLOT5('empty')
  } else if (parsedObject.type=== "Bracers" && Bracers === 'empty' && parsedSLOT.type ==='Bracers'  && SLOTnum === 'SLOT5') {
    setBracers(equip);
    setSLOT5('empty')
  } else if (parsedObject.type === "Boots" && Boots === 'empty' && parsedSLOT.type ==='Boots'  && SLOTnum === 'SLOT5') {
    setBoots(equip);
    setSLOT5('empty')
  } else if (parsedObject.type === "Ring" && Ring === 'empty' && parsedSLOT.type ==='Ring'  && SLOTnum === 'SLOT5') {
    setRing(equip);
    setSLOT5('empty')
  } else if (parsedObject.type === "Amulet" && Amulet === 'empty' && parsedSLOT.type ==='Amulet'  && SLOTnum === 'SLOT5') {
    setAmulet(equip);
    setSLOT5('empty')
  } else {
    console.log('unequip item first');

  } 

  if (parsedObject.type === 'Helmet' && Helmet === 'empty' && parsedSLOT.type ==='Helmet'  && SLOTnum === 'SLOT6') {
    setHelmet(equip);
    setSLOT6('empty')
    
  } else if (parsedObject.type === "Armor" && Armor === 'empty' && parsedSLOT.type ==='Armor' && SLOTnum === 'SLOT6' ) {
    setArmor(equip);
    setSLOT6('empty')
  } else if (parsedObject.type === "Shield" && Shield === 'empty' && parsedSLOT.type ==='Shield' && SLOTnum === 'SLOT6' ) {
    setShield(equip);
    setSLOT6('empty')
  } else if (parsedObject.type === "Weapon" && Weapon === 'empty' && parsedSLOT.type ==='Weapon' && SLOTnum === 'SLOT6') {
    setWeapon(equip);
    setSLOT6('empty')
  } else if (parsedObject.type=== "Bracers" && Bracers === 'empty' && parsedSLOT.type ==='Bracers' && SLOTnum === 'SLOT6') {
    setBracers(equip);
    setSLOT6('empty')
  } else if (parsedObject.type === "Boots" && Boots === 'empty' && parsedSLOT.type ==='Boots' && SLOTnum === 'SLOT6') {
    setBoots(equip);
    setSLOT6('empty')
  } else if (parsedObject.type === "Ring" && Ring === 'empty' && parsedSLOT.type ==='Ring' && SLOTnum === 'SLOT6') {
    setRing(equip);
    setSLOT6('empty')
  } else if (parsedObject.type === "Amulet" && Amulet === 'empty' && parsedSLOT.type ==='Amulet' && SLOTnum === 'SLOT6') {
    setAmulet(equip);
    setSLOT6('empty')
  } else {
    console.log('unequip item first');

  } 
}
  
const SetEquip_SetSetSelection_1 = () => {
  setEquip(SLOT1); 
  setSelected_Slot(SLOT1)
  setSLOTnum('SLOT1')
}
const SetEquip_SetSetSelection_2 = () => {
  setEquip(SLOT2); 
  setSelected_Slot(SLOT2)
  setSLOTnum('SLOT2')
}

const SetEquip_SetSetSelection_3 = () => {
  setEquip(SLOT3); 
  setSelected_Slot(SLOT3)
  setSLOTnum('SLOT3')
}

const SetEquip_SetSetSelection_4 = () => {
  setEquip(SLOT4); 
  setSelected_Slot(SLOT4)
  setSLOTnum('SLOT4')
}

const SetEquip_SetSetSelection_5 = () => {
  setEquip(SLOT5); 
  setSelected_Slot(SLOT5)
  setSLOTnum('SLOT5')
}

const SetEquip_SetSetSelection_6 = () => {
  setEquip(SLOT6); 
  setSelected_Slot(SLOT6)
  setSLOTnum('SLOT6')
}

const dropItem = () => {
  switch(SLOTnum) {
    case 'SLOT1': setSLOT1('empty'); break;
    case 'SLOT2': setSLOT2('empty'); break;
    case 'SLOT3': setSLOT3('empty'); break;
    case 'SLOT4': setSLOT4('empty'); break;
    case 'SLOT5': setSLOT5('empty'); break;
    case 'SLOT6': setSLOT6('empty'); break;
    default: console.log('Invalid Slot');
  }
};

  return (
    <>
    <h4>INVENTORY</h4>
    <div>

      <button onClick={()=>EquipItem()}>Equip Item</button>
      <button onClick={dropItem}>Drop Item</button>
      
      <p>SLOT1: {SLOT1}</p>
      <button onClick={SetEquip_SetSetSelection_1} id="InventorySLOT1">Select SLOT1</button>
      <p>SLOT2: {SLOT2}</p>
      <button onClick={SetEquip_SetSetSelection_2} id="InventorySLOT2">Select SLOT2</button>
      <p>SLOT3: {SLOT3}</p>
      <button onClick={SetEquip_SetSetSelection_3} id="InventorySLOT3">Select SLOT3</button>
      <p>SLOT4: {SLOT4}</p>
      <button onClick={SetEquip_SetSetSelection_4} id="InventorySLOT4">Select SLOT4</button>
      <p>SLOT5: {SLOT5}</p>
      <button onClick={SetEquip_SetSetSelection_5} id="InventorySLOT5">Select SLOT5</button>
      <p>SLOT6: {SLOT6}</p>
      <button onClick={SetEquip_SetSetSelection_6} id="InventorySLOT6">Select SLOT6</button>
    
    </div>
    </>
  );
};

export default Inventory;