import React, {useState } from "react";

const Enemy: React.FC<{ HP: any, EP: any, AP: any }> = ({ HP, EP, AP }) => {
  const [Health, setHealth] = useState<any>();
  const [Endurance, setEndurance] = useState<any>();
  const [Action, setAction] = useState<any>();

  setHealth(HP);
  setEndurance(EP);
  setAction(AP);

  return (
    <>
      Health : {Health}
      Endurance : {Endurance}
      Action : {Action}
    </>
  );
};

export default Enemy;