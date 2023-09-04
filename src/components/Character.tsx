//NAME
 // = name 
 // = nickname
//STATS
    // = strength 
    // = dexterity
    // = constitution
    // = wisdom
    // = intelligence
    // = charisma
    // = hitpoints - HEALTH
    // = actionpoints - ACTIONS
    // = endurancepoints -BLOCKING
    // = temp
    // = hunger
    // = health
        // - disease
        //- maimed
        // - scars
        // - enviromental

    // = sleep
    // = thirst
    // = reputation
            // - general
            // - faction1
            // - faction2
            // - faction3
            // - etc...
    // = alignment 
            // - chaos
            // - order
            // - good
            // - evil

//INVENTORY

    // = weapon 
    // = armor 
    // = shield
    // = helmet
    // = ring 1
     // = ring 2
    // = amulet
    // = boots
    // = bracers

//LOCATION

// = coordinates 
// = danger level
// = territory claim

//APPEARANCE

// = model
// = potrait

import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useStatsContext } from "../context/StatsContext";
//import { useEquipmentContext } from "../context/EquipmentContext";
import Inventory from './Inventory'
import Equipment from './Equipment'
import Attributes from "./Attributes";

const Character: React.FC = () => {
  const { name } = useCharacterContext();
  const { strength, dexterity, constitution, wisdom, intelligence, charisma } = useStatsContext();

  //const { Helmet, setHelmet, Armor, setArmor, Shield, setShield, Weapon, setWeapon, Bracers, setBracers, Boots, setBoots,  Ring, setRing, Amulet, setAmulet} = useEquipmentContext();

  
  
  
  
  return (
    <>
    <h4>STATS</h4>
    <div>
      <p>Name: {name}</p>
    </div>

<div>
<p>Strength: {strength}</p>
<p>Dexterity: {dexterity}</p>
<p>Constitution: {constitution}</p>
<p>Wisdom: {wisdom}</p>
<p>Intelligence: {intelligence}</p>
<p>Charisma: {charisma}</p>
</div>

<Attributes/>
<Equipment/>
<Inventory/>


</>


  );
};

export default Character;