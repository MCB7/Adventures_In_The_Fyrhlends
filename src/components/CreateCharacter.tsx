import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useStatsContext } from "../context/StatsContext";

const CreateCharacter: React.FC = () => {
  const { name, setName } = useCharacterContext();
  const { setStats } = useStatsContext();

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
    setStats(stats);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRollDice = () => {
    simulateRollDice();
  };

  return (
    <>
      <div>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>

      <div>
        <button onClick={handleRollDice}>Roll Dice</button>
      </div>
    </>
  );
};

export default CreateCharacter;