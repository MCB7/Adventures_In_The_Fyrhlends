import React, { useRef, useState} from "react";
import { useStatsContext } from "../context/StatsContext";
import {useThree,useFrame} from "@react-three/fiber";
import { useEnemyStatsContext } from "../context/EnemyStatsContext";
import { useBattleStateContext } from "../context/BattleStateContext";
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
  const { enemyDexterity: enemyDexterity } = useEnemyStatsContext();
  const { setInfo } = useBattleStateContext();

  const { camera } = useThree();
  const groupRef: any = useRef();

  useFrame(() => {
    groupRef.current.lookAt(camera.position);
  });

  const handleBattleClick = () => {
    const info : any = true;
    setInfo(info)
    onInfoSentUp(info);
    BattleModalToggleState(false);
  };

  const handleFleeClick = () => {
    const escapeChance = 25 + (playerDexterity - enemyDexterity) * 0.05;
    const success = Math.random() <= escapeChance;
    return console.log(success)
  };

  const [buttonFightHighlight, setButtonFightHighlight] = useState(true)
  const [buttonFleeHighlight, setButtonFleeHighlight] = useState(true)

  const modalStyle: React.CSSProperties = {
    width: "75vw",
    height: "65vh",
    backgroundColor: "black",
    backgroundImage: "url('/assets/BattleModalBG.png')",
    backgroundSize: "100%, 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    alignSelf:"center",
    zIndex: 9999,
    cursor:"url('/assets/cursor_menu.png'),auto"

  };

  const contentStyle: React.CSSProperties = {
    margin: "auto",
    cursor:"url('/assets/cursor_menu.png'),auto"
  };

  const questionStyle: React.CSSProperties = {
    fontSize: "4em",
    color: "tan",
    padding: ".75em",
    filter: "drop-shadow(0 0 0.75rem crimson)",
    cursor:"url('/assets/cursor_menu.png'),auto",
    fontFamily: 'VersalFilled-y1r3',
    textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    textAlign:'center'
  };


  const ButtonStyle_1: React.CSSProperties = {
    cursor:"url('/assets/cursor_menu_highlight.png'),auto",
    backgroundImage: buttonFightHighlight
    ? "url('/assets/battleButtonBG.png')"
    : "url('/assets/battleButtonBGHighlight.png')",
    backgroundSize:'cover',
    fontFamily: 'VersalFilled-y1r3',
    fontSize: ".75em",
    borderRadius:'10px',
    border: buttonFightHighlight
    ? "double tan 3px"
    : 'solid #ffb04c 1px',
    textAlign: 'center',
    color: buttonFightHighlight
    ? 'tan'
    : '#ffb04c',
    width:'3em',
    textShadow:buttonFightHighlight
    ? '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    : '-1px -1px 0 orange, 1px -1px 0 orange, -1px 1px 0 orange, 1px 1px 0 orange',
    
    filter: buttonFightHighlight
      ? "drop-shadow(0 0 0 #ffb04c) brightness(100%)saturate(100%)"
      : "drop-shadow(0 0 .5rem #ffb04c) brightness(110%)saturate(110%) ",
      transition: "all 5ms ease-out",

  };
  const ButtonStyle_2: React.CSSProperties = {
    cursor:"url('/assets/cursor_menu_highlight.png'),auto",
    backgroundImage: buttonFleeHighlight
    ? "url('/assets/battleButtonBG.png')"
    : "url('/assets/battleButtonBGHighlight.png')",
    backgroundSize:'cover',
    fontFamily: 'VersalFilled-y1r3',
    fontSize: ".75em",
    borderRadius:'10px',
    border: buttonFleeHighlight
    ? "double tan 3px"
    : 'solid red 1px',
    textAlign: 'center',
    color: buttonFleeHighlight
    ? 'tan'
    : 'red',
    width:'3em',
    textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    filter: buttonFleeHighlight
      ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)"
      : "drop-shadow(0 0 .5rem #CC5500) brightness(110%)saturate(110%) ",
      transition: "all 5ms ease-out",

  };

  return (
    <group ref={groupRef} position={position}>
      <Html>

        <div className="confirmation-modal" style={modalStyle}>
          <div className="modal-content" style={contentStyle}>
            <div className="question" style={questionStyle}>
              Ambush< span style={{fontFamily:"Lucida Handwriting"}}>!</span>
              <p style={{fontFamily:"Garamond", fontSize:"1rem"}}>an albino humanoid, covered in sores and lychen. Hunched over the creature is shaking with rage and hatred </p>
            </div>
            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "3em",
              }}
            >
              <button style={ButtonStyle_1}onPointerEnter={() => {setButtonFightHighlight(false);}}onPointerLeave={() => {setButtonFightHighlight(true);}} onClick={handleBattleClick}>Fight</button>
              <button style={ButtonStyle_2}onPointerEnter={() => {setButtonFleeHighlight(false);}}onPointerLeave={() => {setButtonFleeHighlight(true);}} onClick={handleFleeClick}>Flee</button>
            </div>
          </div>
        </div>
   
      </Html>
    </group>
  );
};

export default BattleModal;
