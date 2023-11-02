import React, { useEffect, useMemo } from "react";
import { useBiomeContext } from "../context/BiomeContext";
import { useEnemyContext } from "../context/EnemyContext";
import { generateFauna } from "./Fauna";
import { useAttributesContext } from "../context/AttributesContext";
import { useEnemyStatsContext } from "../context/EnemyStatsContext";

const GenerateEnemy: React.FC = () => {
  const { biome } = useBiomeContext();
  const { enemy, setEnemy } = useEnemyContext();
  const { hitpoints, endurancepoints, actionpoints } = useAttributesContext();

  const { setEnemyStats } = useEnemyStatsContext();

  const simulateRollDice = () => {
    const roll = () => Math.floor(Math.random() * 20) + 1;
    const rolls = [roll(), roll(), roll(), roll(), roll(), roll()];
    const sum = rolls.reduce((acc, curr) => acc + curr, 0);
    const stats : any = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      wisdom: 0,
      intelligence: 0,
      charisma: 0,
    };
    for (let i = 0; i < sum; i++) {
      const statKeys = Object.keys(stats);
      const randomIndex = Math.floor(Math.random() * statKeys.length);
      const randomStat = statKeys[randomIndex];
      if (stats[randomStat] < 18) {
        stats[randomStat]++;
      }
    }
    setEnemyStats(stats);
  };

  const { ForestFauna, MireFauna, MountainFauna, FoothillFauna } = useMemo(
    () => generateFauna(hitpoints, endurancepoints, actionpoints),
    [hitpoints, endurancepoints, actionpoints]
  );

  const chosenEnemy = useMemo(() => {
    const selectedEnemies = [...ForestFauna, ...MountainFauna, ...MireFauna, ...FoothillFauna].filter(
      (enemy) =>
        enemy.ThreatRating === biome.ThreatRating && enemy.Type === biome.Type
    );
    return selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];
  }, [biome, ForestFauna, MountainFauna, MireFauna, FoothillFauna]);

  useEffect(() => {
    setEnemy(chosenEnemy);
    simulateRollDice();
    console.log(enemy.name)
  }, [chosenEnemy]);

  return null;
    
};

export default GenerateEnemy;