import React, { useRef } from "react";
import { useStatsContext } from "../context/StatsContext";
import {useThree,useFrame} from "@react-three/fiber";
import { useEnemyStatsContext } from "../context/EnemyStatsContext";
import { Html } from "@react-three/drei";

//THIS HAS TO BE WITHIN THE THREEJS MAP LIKE THE 'VENTURE FORTH?"
//MODAL

const BattleModal: React.FC<any> = ({
  position,
  onInfoSentUp,
  BattleModalToggleState,
}: {
  position: any;
  onInfoSentUp: any;
  BattleModalToggleState: any;
}) => {

  const { dexterity: playerDexterity } = useStatsContext();
  const { dexterity: enemyDexterity } = useEnemyStatsContext();

  const { camera } = useThree();
  const groupRef: any = useRef();

  useFrame(() => {
    groupRef.current.lookAt(camera.position);
  });

  const handleBattleClick = () => {
    const info = true;
    onInfoSentUp(info);
    BattleModalToggleState(false);
  };

  const handleFleeClick = () => {
    const escapeChance = 25 + (playerDexterity - enemyDexterity) * 0.05;
    const success = Math.random() <= escapeChance;
    return console.log(success)
  };



  const modalStyle: React.CSSProperties = {
    width: "50vw",
    height: "50vh",
    padding: "1em",
    backgroundColor: "whitesmoke",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    zIndex: 9999,
  };

  const contentStyle: React.CSSProperties = {
    margin: "auto",
  };

  const questionStyle: React.CSSProperties = {
    fontSize: "2em",
    color: "darkgray",
    padding: "1em",
  };

  return (
    <group ref={groupRef} position={position}>
      <Html>
        <div className="confirmation-modal" style={modalStyle}>
          <div className="modal-content" style={contentStyle}>
            <div className="question" style={questionStyle}>
              Battle Modal
            </div>
            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "3em",
              }}
            >
              <button onClick={handleBattleClick}>Battle</button>
              <button onClick={handleFleeClick}>Flee</button>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default BattleModal;
