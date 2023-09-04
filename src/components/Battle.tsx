import React, { useEffect, useState } from "react";
import { useStatsContext } from "../context/StatsContext";
import { useEquipmentContext } from "../context/EquipmentContext";

const Battle: React.FC = () => {
  const { strength, dexterity } = useStatsContext();
  const { Weapon } = useEquipmentContext();
  const [CharacterLowDamage, setCharacterLowDamage] = useState<any>(0);
  const [CharacterHighDamage, setCharacterHighDamage] = useState<any>(0);

  useEffect(() => {
    if (Weapon != 'empty') {
      const parsedWeapon = JSON.parse(Weapon);
      setCharacterLowDamage(parsedWeapon.lowDamage);
      setCharacterHighDamage(parsedWeapon.highDamage);
    }
  }, [Weapon, CharacterLowDamage, CharacterHighDamage]);

  const DamageRoll = () => {
    const strengthBonus = strength > 16 ? strength - 16 : 0;
    const strengthPenalty = strength < 7 ? 7 - strength : 0;
    let randomDamage = Math.floor(Math.random() * (CharacterHighDamage - CharacterLowDamage + 2)) / CharacterLowDamage;
    console.log("initial Damage:",randomDamage)
    randomDamage += strengthBonus;
    console.log('Strength Bonus:', strengthBonus);
    randomDamage -= strengthPenalty;
    console.log('Strength Penalty:', strengthPenalty);
    randomDamage = Math.max(1, randomDamage);
    if (randomDamage != null) {
 
      console.log('DAMAGE:', randomDamage);
    }
    return randomDamage;
  };

  const HitRoll = () => {
    const dexterityBonus = dexterity > 16 ? dexterity - 16 : 0;
    const dexterityPenalty = dexterity < 7 ? 7 - dexterity : 0;
    const roll = Math.floor(Math.random() * 20) + 1 + dexterityBonus - dexterityPenalty;
    console.log(roll);
    if (roll > 15) {
      console.log('HIT');
      const damage = DamageRoll();
      if (roll === 20) {
        let CritDamage = damage * 2
        console.log('Critical Hit!');
        console.log("Critical Damage:", CritDamage)
      }
    } else if (roll < 15) {
      console.log('MISSED');
      // Run your logic for roll below 15
    } else if (roll === 1) {
      console.log('CRITICAL FAILURE');
      // Run your logic for roll 1
    }
  }

  return (
    <>
      <button onClick={HitRoll}>hit Roll</button>

    </>
  );
};

export default Battle;
