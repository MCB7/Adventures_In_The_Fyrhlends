import React, {useState, useEffect} from "react";
import { useEquipmentContext } from "../context/EquipmentContext";
import { useInventoryContext } from "../context/InventoryContext";

const Equipment: React.FC = () => {

  const {Helmet, setHelmet,Armor,setArmor,Shield,setShield,Weapon,setWeapon,Bracers,setBracers,Boots,setBoots,Ring,setRing,Amulet,setAmulet} = useEquipmentContext();
  const {SLOT1, setSLOT1, SLOT2, setSLOT2, SLOT3,setSLOT3, SLOT4,setSLOT4,SLOT5,setSLOT5,SLOT6,setSLOT6} = useInventoryContext();

  const [equippedHelmet, SetEquippedHelmet] = useState<any>({})
  const [equippedArmor, SetEquippedArmor] = useState<any>({})
  const [equippedShield, SetEquippedShield] = useState<any>({})
  const [equippedWeapon, SetEquippedWeapon] = useState<any>({})
  const [equippedBracers, setEquippedBracers] = useState<any>({})
  const [equippedBoots, setEquippedBoots] = useState<any>({})
  const [equippedRing, setEquippedRing] = useState<any>({})
  const [equippedAmulet, setEquippedAmulet]  = useState<any>({})

  const Unequip_Helmet = () => {

    if (SLOT1 === "empty") {
    setSLOT1(Helmet)
    setHelmet('empty')
    SetEquippedHelmet('empty')
    } else if (SLOT2 === "empty") {
    setSLOT2(Helmet)
    setHelmet('empty')
    } else if (SLOT3 === "empty") {
    setSLOT3(Helmet)
    setHelmet('empty')
    } else if (SLOT4 === "empty") {
    setSLOT4(Helmet)
    setHelmet('empty')
    } else if (SLOT5 === "empty") {
    setSLOT5(Helmet)
    setHelmet('empty')
    } else if (SLOT6 === "empty") {
    setSLOT6(Helmet)
    setHelmet('empty')
      }else {console.log('Inventory full')}
  
    } 
  const Unequip_Armor = () => {

    if (SLOT1 === "empty") {
      setSLOT1(Armor)
      setArmor('empty')
    } else if (SLOT2 === "empty") {
      setSLOT2(Armor)
      setArmor('empty')
    } else if (SLOT3 === "empty") {
      setSLOT3(Armor)
      setArmor('empty')
    } else if (SLOT4 === "empty") {
      setSLOT4(Armor)
      setArmor('empty')
    } else if (SLOT5 === "empty") {
      setSLOT5(Armor)
      setArmor('empty')
    } else if (SLOT6 === "empty") {
      setSLOT6(Armor)
      setArmor('empty')
      }else {console.log('Inventory full')} 
  
    }
  const Unequip_Shield = () => {

      if (SLOT1 === "empty") {
        setSLOT1(Shield)
        setShield('empty')
      } else if (SLOT2 === "empty") {
        setSLOT2(Shield)
        setShield('empty')
      } else if (SLOT3 === "empty") {
        setSLOT3(Shield)
        setShield('empty')
      } else if (SLOT4 === "empty") {
        setSLOT4(Shield)
        setShield('empty')
      } else if (SLOT5 === "empty") {
        setSLOT5(Shield)
        setShield('empty')
      } else if (SLOT6 === "empty") {
        setSLOT6(Shield)
        setShield('empty')
        }else {console.log('Inventory full')} 
    
    }
  const Unequip_Bracers = () => {

        if (SLOT1 === "empty") {
          setSLOT1(Bracers)
          setBracers('empty')
        } else if (SLOT2 === "empty") {
          setSLOT2(Bracers)
          setBracers('empty')
        } else if (SLOT3 === "empty") {
          setSLOT3(Bracers)
          setBracers('empty')
        } else if (SLOT4 === "empty") {
          setSLOT4(Bracers)
          setBracers('empty')
        } else if (SLOT5 === "empty") {
          setSLOT5(Bracers)
          setBracers('empty')
        } else if (SLOT6 === "empty") {
          setSLOT6(Bracers)
          setBracers('empty')
          }else {console.log('Inventory full')} 
      
    }     
  const Unequip_Weapon = () => {

        if (SLOT1 === "empty") {
          setSLOT1(Weapon)
          setWeapon('empty')
        } else if (SLOT2 === "empty") {
          setSLOT2(Weapon)
          setWeapon('empty')
        } else if (SLOT3 === "empty") {
          setSLOT3(Weapon)
          setWeapon('empty')
        } else if (SLOT4 === "empty") {
          setSLOT4(Weapon)
          setWeapon('empty')
        } else if (SLOT5 === "empty") {
          setSLOT5(Weapon)
          setWeapon('empty')
        } else if (SLOT6 === "empty") {
          setSLOT6(Weapon)
          setWeapon('empty')
          }else {console.log('Inventory full')} 
      
    }
  const Unequip_Boots = () => {

          if (SLOT1 === "empty") {
            setSLOT1(Boots)
            setBoots('empty')
          } else if (SLOT2 === "empty") {
            setSLOT2(Boots)
            setBoots('empty')
          } else if (SLOT3 === "empty") {
            setSLOT3(Boots)
            setBoots('empty')
          } else if (SLOT4 === "empty") {
            setSLOT4(Boots)
            setBoots('empty')
          } else if (SLOT5 === "empty") {
            setSLOT5(Boots)
            setBoots('empty')
          } else if (SLOT6 === "empty") {
            setSLOT6(Boots)
            setBoots('empty')
            }else {console.log('Inventory full')} 
        
    }
  const Unequip_Ring = () => {

            if (SLOT1 === "empty") {
              setSLOT1(Ring)
              setRing('empty')
            } else if (SLOT2 === "empty") {
              setSLOT2(Ring)
              setRing('empty')
            } else if (SLOT3 === "empty") {
              setSLOT3(Ring)
              setRing('empty')
            } else if (SLOT4 === "empty") {
              setSLOT4(Ring)
              setRing('empty')
            } else if (SLOT5 === "empty") {
              setSLOT5(Ring)
              setRing('empty')
            } else if (SLOT6 === "empty") {
              setSLOT6(Ring)
              setRing('empty')
              }else {console.log('Inventory full')} 
          
    }
  const Unequip_Amulet = () => {

              if (SLOT1 === "empty") {
                setSLOT1(Amulet)
                setAmulet('empty')
              } else if (SLOT2 === "empty") {
                setSLOT2(Amulet)
                setAmulet('empty')
              } else if (SLOT3 === "empty") {
                setSLOT3(Amulet)
                setAmulet('empty')
              } else if (SLOT4 === "empty") {
                setSLOT4(Amulet)
                setAmulet('empty')
              } else if (SLOT5 === "empty") {
                setSLOT5(Amulet)
                setAmulet('empty')
              } else if (SLOT6 === "empty") {
                setSLOT6(Amulet)
                setAmulet('empty')
                }else {console.log('Inventory full')} 
            
    }    
    
  


  useEffect(()=>{ 
  if (Helmet != "empty") {
  const parsedHelmet = JSON.parse(Helmet);
  SetEquippedHelmet(parsedHelmet);
  } else {  SetEquippedHelmet("empty");}
  if (Armor != "empty") {
    const parsedArmor = JSON.parse(Armor);
    SetEquippedArmor(parsedArmor);
    }else { SetEquippedArmor("empty");}
  if (Shield != "empty"){
      const parsedShield = JSON.parse(Shield);
      SetEquippedShield(parsedShield);
      }else { SetEquippedShield("empty");}
  if (Weapon != "empty") {
  const parsedWeapon = JSON.parse(Weapon);
  SetEquippedWeapon(parsedWeapon);
  }else { SetEquippedWeapon("empty");}
  if (Bracers != "empty"){
    const parsedBracers = JSON.parse(Bracers);
    setEquippedBracers(parsedBracers);
    }else { setEquippedBracers("empty");}
  if (Boots != "empty"){
    const parsedBoots = JSON.parse(Boots);
    setEquippedBoots(parsedBoots);
    }else { setEquippedBoots("empty");}
  if (Ring != "empty"){
      const parsedRing = JSON.parse(Ring);
      setEquippedRing(parsedRing);
      } else { setEquippedRing("empty");}
  if (Amulet != "empty"){
      const parsedAmulet= JSON.parse(Amulet);
      setEquippedAmulet(parsedAmulet);
      } else { setEquippedAmulet("empty");}
      
      const el_helmet: any = document.getElementById("EquipmentSlotHelmet");
      if (Helmet === "empty"){el_helmet.style.display = 'none';}
      else if  (Helmet != "empty"){el_helmet.style.display = 'block';}

      const el_armor: any = document.getElementById("EquipmentSlotArmor");
      if (Armor === "empty"){el_armor.style.display = 'none';}
      else if  (Armor != "empty"){el_armor.style.display = 'block';}

      
      const el_shield: any = document.getElementById("EquipmentSlotShield");
      if (Shield === "empty"){el_shield.style.display = 'none';}
      else if  (Shield != "empty"){el_shield.style.display = 'block';}

      const el_weapon: any = document.getElementById("EquipmentSlotWeapon");
      if (Weapon === "empty"){el_weapon.style.display = 'none';}
      else if  (Weapon != "empty"){el_weapon.style.display = 'block';}

      const el_bracers: any = document.getElementById("EquipmentSlotBracers");
      if (Bracers === "empty"){el_bracers.style.display = 'none';}
      else if  (Bracers != "empty"){el_bracers.style.display = 'block';}

      const el_boots: any = document.getElementById("EquipmentSlotBoots");
      if (Boots === "empty"){el_boots.style.display = 'none';}
      else if  (Boots != "empty"){el_boots.style.display = 'block';}

      const el_ring: any = document.getElementById("EquipmentSlotRing");
      if (Ring === "empty"){el_ring.style.display = 'none';}
      else if  (Ring != "empty"){el_ring.style.display = 'block';}

      const el_amulet: any = document.getElementById("EquipmentSlotAmulet");
      if (Amulet === "empty"){el_amulet.style.display = 'none';}
      else if  (Amulet != "empty"){el_amulet.style.display = 'block';}

  },[Helmet, Armor, Shield, Weapon, Bracers, Boots, Ring, Amulet])
  




  return (
  <>
    <div>
    <h4>EQUIPMENT</h4>
      <p>helmet: {equippedHelmet.name}</p>
      <button onClick={Unequip_Helmet} id='EquipmentSlotHelmet'>Unequip</button>
      <p>armor: {equippedArmor.name}</p>
      <button onClick={Unequip_Armor} id='EquipmentSlotArmor'>Unequip</button>
      <p>shield: {equippedShield.name}</p>
      <button onClick={Unequip_Shield} id='EquipmentSlotShield'>Unequip</button>
      <p>weapon: {equippedWeapon.name}</p>
      <button onClick={Unequip_Weapon } id='EquipmentSlotWeapon'>Unequip</button>
      <p>bracers: {equippedBracers.name}</p>
      <button onClick={Unequip_Bracers} id='EquipmentSlotBracers'>Unequip</button>
      <p>boots: {equippedBoots.name}</p>
      <button onClick={Unequip_Boots} id='EquipmentSlotBoots'>Unequip</button>
      <p>ring: {equippedRing.name}</p>
      <button onClick={Unequip_Ring} id='EquipmentSlotRing'>Unequip</button>
      <p>amulet: {equippedAmulet.name}</p>
      <button onClick={Unequip_Amulet}id='EquipmentSlotAmulet'>Unequip</button>
    </div>
  </>
  );
  
};

export default Equipment;