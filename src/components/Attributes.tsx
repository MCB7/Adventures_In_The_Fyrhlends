import React, { useEffect, useState } from "react";

import { useEquipmentContext } from "../context/EquipmentContext";
import { useAttributesContext } from "../context/AttributesContext";

const Attributes: React.FC = () => {
const {defense,hitpoints,endurancepoints,actionpoints,disease,hunger,temp,sleep,thirst,reputation} = useAttributesContext();
//const { strength, dexterity, constitution, wisdom, intelligence, charisma } = useStatsContext();
const { Weapon} = useEquipmentContext();

const [CharacterLowDamage, setCharacterLowDamage] = useState<any>(0);
const [CharacterHighDamage, setCharacterHighDamage] = useState<any>(0);

//HP -= damage>defense ? (damage) : (damage/defense)

useEffect(()=> {
    if (Weapon != 'empty') {
const parsedWeapon = JSON.parse(Weapon);
setCharacterLowDamage(parsedWeapon.lowDamage),
setCharacterHighDamage(parsedWeapon.highDamage)
    }


}, [Weapon, CharacterLowDamage, CharacterHighDamage])




  return (
<>
<h4>ATTRIBUTES</h4>
<p>Damage:{CharacterLowDamage}-{CharacterHighDamage}</p>

<br/>
<p>Defense:{defense} </p>
<br/>
<p>Health:{hitpoints} </p>
<br/>
<p>Endurance:{endurancepoints} </p>
<br/>
<p>Action Points:{actionpoints} </p>
<br/>
<p>Disease:{disease} </p>
<br/>
<p>Hunger:{hunger} </p>
<br/>
<p>Temp:{temp} </p>
<br/>
<p>Sleep:{sleep} </p>
<br/>
<p>Thirst:{thirst} </p>
<br/>
<p>Reputation:{reputation} </p>
<br/>
{/* <p>alignment:{[alignment]} </p>
<br/> */}
</>
  );
};

export default Attributes;