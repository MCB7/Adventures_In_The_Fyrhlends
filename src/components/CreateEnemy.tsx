import { useLocalStorage } from "../hooks/useLocalStorage";
import { ForestFauna } from "./Fauna";

const CreateEnemy = () => {
  const [enemy, setEnemy] = useLocalStorage("enemy", {});

  const createEnemy = () => {
    const randomIndex = Math.floor(Math.random() * ForestFauna.length);
    const randomEnemy = ForestFauna[randomIndex];
    setEnemy(randomEnemy);
  };

  return (
    <div>
      <button onClick={createEnemy}>Create Enemy</button>
      
    </div>
  );
};

export default CreateEnemy;