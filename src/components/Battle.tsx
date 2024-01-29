import React, { useEffect, useState, useContext, useMemo } from "react";
import { useStatsContext } from "../context/StatsContext";
import { useAttributesContext } from "../context/AttributesContext";
import { useEquipmentContext } from "../context/EquipmentContext";
import { useEnemyContext } from "../context/EnemyContext";
import ItemTransfer from "./ItemTransfer";
import { BattleStateContext } from "../context/BattleStateContext";
import { useHitAnimationContext } from "../context/HitAnimationContext";
import { useBlockAnimationContext } from "../context/BlockAnimationContext";
import { useHurtAnimationContext } from "../context/HurtAnimationContext";
import { useEnemyHitAnimationContext } from "../context/EnemyHitAnimationContext";
import { useEnemyBlockAnimationContext } from "../context/EnemyBlockAnimationContext";
import { useEnemyHurtAnimationContext } from "../context/EnemyHurtContext";
import { useEnemyStatsContext } from "../context/EnemyStatsContext";
import { useDeathAnimationContext } from "../context/DeathContext";
type BattleProps = {
  onClose: () => void;
};

const Battle: React.FC<BattleProps> = (props) => {
  const { strength, dexterity } = useStatsContext();
  const { enemyStrength, enemyDexterity } = useEnemyStatsContext();
  const { hitpoints, endurancepoints, actionpoints } = useAttributesContext();
  const { enemy } = useEnemyContext();
  const { Weapon } = useEquipmentContext();
  const [EnemyLowDamage, setEnemyLowDamage] = useState<any>(0);
  const [EnemyHighDamage, setEnemyHighDamage] = useState<any>(0);
  const [CharacterLowDamage, setCharacterLowDamage] = useState<any>(1);
  const [CharacterHighDamage, setCharacterHighDamage] = useState<any>(3);

  const [HP, setHP] = useState(hitpoints);
  const [AP, setAP] = useState(endurancepoints);
  const [EP, setEP] = useState(actionpoints);

  const [EnemyHP, setEnemyHP] = useState(enemy.HP);
  const [EnemyAP, setEnemyAP] = useState(enemy.AP);
  const [EnemyEP, setEnemyEP] = useState(enemy.EP);
  const [EnemyBlock, setEnemyBlock] = useState(false);
  const [Block, setBlock] = useState(false);
  const [hitCount, setHitCount] = useState(0);
  const { setHit } = useHitAnimationContext();
  const { setBlockAnim } = useBlockAnimationContext();
  const { setHurt } = useHurtAnimationContext();
  const { setEnemyHit } = useEnemyHitAnimationContext();
  const { setEnemyBlockAnim } = useEnemyBlockAnimationContext();
  const { setEnemyHurt } = useEnemyHurtAnimationContext();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {setDeath} = useDeathAnimationContext();
  const {setEnemyDeath} = useDeathAnimationContext();
  // const [isEnemyButtonDisabled, setIsEnemyButtonDisabled] = useState(false);

  useEffect(() => {
    if (Weapon != "empty") {
      const parsedWeapon = JSON.parse(Weapon);
      setCharacterLowDamage(parsedWeapon.lowDamage);
      setCharacterHighDamage(parsedWeapon.highDamage);
    }
  }, [Weapon, CharacterLowDamage, CharacterHighDamage]);
  const DamageRoll = useMemo(() => {
    return () => {
      const strengthBonus = strength > 16 ? strength - 16 : 0;
      const strengthPenalty = strength < 7 ? 7 - strength : 0;
      let randomDamage =
        Math.floor(
          Math.random() * (CharacterHighDamage - CharacterLowDamage + 2)
        ) / CharacterLowDamage;
      randomDamage += strengthBonus;
      randomDamage -= strengthPenalty;
      randomDamage = Math.max(1, randomDamage);
      return randomDamage;
    };
   }, [strength, CharacterLowDamage, CharacterHighDamage]);

   const [isAttacking, setIsAttacking] = useState(false);

   const HitRoll = () => {
    if (isAttacking) {
    // If the attack animation is currently playing, do nothing
    return;
    }
   
    setIsAttacking(true);
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 700);
    setBlock(false);
    setHit(true);
    
   
    if (AP <= 0) {
    console.log("Not enough AP to hit");
    setHit(false);
    setIsAttacking(false);
    return;
    }
   
    const dexterityBonus = dexterity > 16 ? dexterity - 16 : 0;
    const dexterityPenalty = dexterity < 7 ? 7 - dexterity : 0;
    const apCost = dexterity > 16 ? 5 * (1 - (dexterity - 16) * 0.05) : 5 + (7 - dexterity) * 0.05 * 5;
   
    // When the attack animation is done, set isAttacking back to false
    setTimeout(() => setIsAttacking(false), 100);
   
    setAP((prevAP: number) => Math.max(0, prevAP - apCost));
   
    const roll =
    Math.floor(Math.random() * 20) + 1 + dexterityBonus - dexterityPenalty;
   
    const isHit = roll > 10;
    const isCriticalFailure = roll === 1;
    const isCriticalHit = roll === 20;
   
    if (isHit || isCriticalFailure || isCriticalHit) {
    const damageMultiplier = isCriticalHit ? 2 : 1;
    const damage = DamageRoll() * damageMultiplier;
   
    if (isHit) {
     setAP((prevAP: number) => Math.max(0, prevAP + apCost));
     setHitCount((prevCount) => prevCount + 1);
     setEnemyHurt(true);
     setFlashEnemyHealth(true);
     setTimeout(() => setFlashEnemyHealth(false), 500);
   
     setIsButtonDisabled(true);
     setTimeout(() => setIsButtonDisabled(false), 900);
    }
   
    updateEnemyState(damage);
    } else if (roll < 15) {
    // Run your logic for roll below 15
    }
   };
   
  

  useEffect(() => {}, [isButtonDisabled]);

  const updateEnemyState = (damage: number) => {
    if (EnemyBlock && EnemyEP > 0 && EnemyEP >= damage) {
      setEnemyEP((prevEP: number) => Math.max(0, prevEP - damage));
      setEnemyAP((prevAP: number) => Math.max(0, prevAP - 5));
      setFlashEnemyHealth(false);
      setFlashEnemyEndurance(true);
      setTimeout(() => setFlashEnemyEndurance(false), 500);

      if (EnemyEP - damage <= 0) {
        setEnemyBlock(false);
      }
    } else if (!EnemyBlock) {
      setEnemyHP((prevHP: number) => Math.max(0, prevHP - damage));
    }
  };
  // AP regeneration
  useEffect(() => {
    const timer = setInterval(() => {
      setAP((prevAP: number) => {
        let regenAmount = 10;
        if (dexterity > 16) {
          regenAmount += dexterity - 16;
        }
        // Ensure AP does not exceed its initial value
        return Math.min(actionpoints, prevAP + regenAmount);
      });
    }, 1000); // regenerate AP every second

    // cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [AP, dexterity, actionpoints]); // add actionpoints to dependency array

  useEffect(() => {
    let isMounted = true;

    if (enemy !== null) {
      const StringEnemy = JSON.stringify(enemy);
      const parsedEnemy = JSON.parse(StringEnemy);

      if (!isNaN(parsedEnemy.lowDam) && !isNaN(parsedEnemy.HighDam)) {
        if (isMounted) {
          setEnemyLowDamage(parsedEnemy.lowDam);
          setEnemyHighDamage(parsedEnemy.HighDam);
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [enemy]);

const EnemyDamageRoll = useMemo(() => {
 return () => {
  const strengthBonus = enemyStrength > 16 ? enemyStrength - 16 : 0;
  const strengthPenalty = enemyStrength < 7 ? 7 - enemyStrength : 0;
  let randomDamage =
    Math.floor(
      Math.random() * (EnemyHighDamage - EnemyLowDamage + 2)
    ) / EnemyLowDamage;
  randomDamage += strengthBonus;
  randomDamage -= strengthPenalty;
  randomDamage = Math.max(1, randomDamage);

  return randomDamage;
 };
}, [enemyStrength, EnemyLowDamage, EnemyHighDamage]);

  const EnemyHitRoll = () => {
  
    if (EnemyHP === 0) {
      return;
    }

    if (EnemyAP <= 0) {
      console.log("Not enough AP to hit");
      return;
    }
    setEnemyHit(true);
    const dexterityBonus = enemyDexterity > 16 ? enemyDexterity - 16 : 0;
    const dexterityPenalty = enemyDexterity < 7 ? 7 - enemyDexterity : 0;
    const apCost = enemyDexterity > 16 ? 5 * (1 - (enemyDexterity - 16) * 0.05) : 5 + (7 - enemyDexterity) * 0.05 * 5;
    setEnemyAP((prevAP: number) => Math.max(0, prevAP - apCost));
    setEnemyBlock(false);

    const roll =
      Math.floor(Math.random() * 20) + 1 + dexterityBonus - dexterityPenalty;

    const isHit = roll > 10 && roll !== 20 && roll !== 1;
    const isCriticalHit = roll === 20;
    const isCriticalFailure = roll === 1;

    if (isHit || isCriticalHit || isCriticalFailure) {
      const damageMultiplier = isCriticalHit ? 2 : 1;
      const damage = EnemyDamageRoll() * damageMultiplier;
      setEnemyAP((prevAP: number) => Math.max(0, prevAP + apCost));
      // console.log(
      //   isHit ? "HIT" : isCriticalHit ? "CRITICAL HIT" : "CRITICAL FAILURE"
      // );
      // console.log("Damage:", damage);
      setHurt(true);
      setFlashHealth(true);
      setTimeout(() => setFlashHealth(false), 500);

      updatePlayerState(damage);
    } else if (roll < 10) {
      setEnemyAP((prevAP: number) => Math.max(0, prevAP - apCost));
    }
  };

  const updatePlayerState = (damage: number) => {
    if (Block && EP > 0) {
      setEP((prevEP: number) => Math.max(0, prevEP - damage));
      setEnemyAP((prevAP: number) => Math.max(0, prevAP - 5));
      setFlashHealth(false);
      setFlashEndurance(true);
      setTimeout(() => setFlashEndurance(false), 500);
      if (EP - damage <= 0) {
        setBlock(false);
      }
    } else {
      setHP((prevHP: number) => Math.max(0, prevHP - damage));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setEnemyAP((prevAP: number) => {
        let regenAmount = 10;

        // Ensure AP does not exceed its initial value
        return Math.min(enemy.AP, prevAP + regenAmount);
      });
    }, 1000); // regenerate AP every second

    // cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [EnemyAP, enemy.AP]); // add actionpoints to dependency array

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    const randomNumber = getRandomInt(2, 6);
    if (hitCount > randomNumber && EnemyEP !== 0) {
      setEnemyBlock(true);
      setEnemyBlockAnim(true);
      const randomTime = getRandomInt(1000, 4000);
      const toggleTimer = setTimeout(() => {
        setEnemyBlock(false);
        setHitCount(0);
      }, randomTime);
      // console.log(hitCount);
      return () => {
        clearTimeout(toggleTimer);
      };
    }
  }, [hitCount, EnemyBlock]);

  useEffect(() => {
    setHP(hitpoints);
    setAP(endurancepoints);
    setEP(actionpoints);
    setEnemyHP(enemy.HP);
    setEnemyAP(enemy.AP);
    setEnemyEP(enemy.EP);
  }, [hitpoints, endurancepoints, actionpoints, enemy.HP, enemy.AP, enemy.EP]);

  const [isFightSelected, setIsFightSelected] = useState(false);
  const [Cursor, setCursor] = useState(false)

  useEffect(() => {
    if (!isFightSelected) {
      // User has selected "FIGHT", start the delay
      setTimeout(() => {
        setIsFightSelected(true)
     
      }, 4000); // Replace 2000 with the desired delay in milliseconds
      setTimeout(() => {
        setCursor(true)
     
      }, 2000); // Replace 2000 with the desired delay in milliseconds
    }
  }, [isFightSelected]);

  useEffect(() => {
    if (EnemyHighDamage && EnemyLowDamage) {
      const interval = setInterval(() => {
        if (EnemyAP > 0 && EnemyBlock !== true && EnemyHP > 0 && isFightSelected != false) {
          EnemyHitRoll();
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [EnemyHighDamage, EnemyLowDamage, EnemyAP, EnemyBlock, isFightSelected]);

  const toggleBlock = () => {
    if (EP != 0) {
      setBlock(!Block);
    }
  };

  if (Block === true) {
    setBlockAnim(true);
  } else if (EP === 0) {
    setBlockAnim(false);
  }

  const [shouldShowItemTransfer, setShowItemTransfer] = useState(false);

  useEffect(() => {
    if (EnemyHP === 0) {
      setEnemyDeath(true)
      setTimeout(()=>{
        setShowItemTransfer(true);
        setIsOpen(true)
        setEnemyDeath(false);},4000)
   
    }
  }, [EnemyHP]);

  useEffect(() => {
    if (HP === 0) {
    setDeath(true)
    }
  }, [HP]);

  const [isOpen, setIsOpen] = useState(true);
  const { setInfo } = useContext<any>(BattleStateContext);

  const handleClose = () => {
    setIsOpen(false);
    setShowItemTransfer(false);
    setInfo(false);
    props.onClose();
  };

  const itemTransferStyles: React.CSSProperties = {
    position: "fixed",
    width:"51vw",
    height:"51vh",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundImage: "url('/assets/loot_BG.png')",
    backgroundSize: '100% 100%', // or '100% 100%' for non-uniform scaling
    backgroundRepeat:'no-repeat',
    borderRadius: "1rem",
    
    zIndex: "9999",
    backgroundPosition: 'center',
    border: "10px solid transparent",
    
    borderImage: "url(/assets/border_IMG.png) 20 round"

  };

  const closeButtonStyles: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  };

  useEffect(() => {
    document.documentElement.style.fontSize = "0.80vw";
  }, []);

  const [flashHealth, setFlashHealth] = useState(false);
  const flashHealthStyle = {
    filter:
      "saturate(200%) brightness(200%) drop-shadow(.12rem .12rem .25rem red)",
    transition: "filter 0.25s ease",
  };

  const [flashEndurance, setFlashEndurance] = useState(false);
  const flashEnduranceStyle = {
    filter:
      "saturate(200%) brightness(200%) drop-shadow(.12rem .12rem .25rem lime)",
    transition: "filter 0.25s ease",
  };

  const [flashEnemyHealth, setFlashEnemyHealth] = useState(false);
  const flashEnemyHealthStyle = {
    filter:
      "saturate(200%) brightness(200%) drop-shadow(.12rem .12rem .25rem red)",
    transition: "filter 0.25s ease",
  };

  const [flashEnemyEndurance, setFlashEnemyEndurance] = useState(false);
  const flashEnemyEnduranceStyle = {
    filter:
      "saturate(200%) brightness(200%) drop-shadow(.12rem .12rem .25rem lime)",
    transition: "filter 0.25s ease",
  };

  const [showCanvas, setShowCanvas] = useState(false);
  const resetLoading = () => {
    setTimeout(() => {
      setShowCanvas(true);
    }, 250);
  };
  resetLoading();



  return (
    <>
      {shouldShowItemTransfer && isOpen ? (
        <div style={itemTransferStyles}>
          <button style={closeButtonStyles} onClick={handleClose}>
            X
          </button>
          <ItemTransfer />
        </div>
      ) : (
        <>
               <div style={{
          opacity: showCanvas ? 1 : 0,
          transition: "opacity 1.25s ease-in, filter 1s ease-in",
          filter: showCanvas
          ? "blur(0px)brightness(100%)"
          : "blur(25px)brightness(-100%)",
          display:"flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: '15%',
          left:'50%',
      }}>
          <div
            id="UI"
            style={{
              width: "49vw",
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.80vw",
              position: "absolute",
              top: 0,
              margin: ".25rem",
              
            }}
          >
            <section
              id="player"
              style={{
                background: "url(assets/bar-BG.png)",
                height: "auto",
                width: `26.5rem`,
                borderRadius: "1rem",
                margin: "1rem",
                border: "double 3px tan",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                style={{
                  margin: ".5rem",
                  marginTop: ".5rem",
                  border: "inset 2px orange",
                  borderRadius: "10rem",
                  backgroundImage:
                    "linear-gradient(0deg, rgba(214,109,0,1) 0%, rgba(255,115,18,1) 9%, rgba(255,125,58,1) 16%, rgba(251,168,114,1) 27%, rgba(239,237,187,1) 46%, rgba(254,238,176,1) 53%, rgba(240,174,118,1) 66%, rgba(246,146,98,1) 73%, rgba(255,119,58,1) 96%, rgba(255,152,0,1) 100%)",
                  width: `${(AP / actionpoints) * 25}rem`,
                  height: ".2rem",
                  color: "rgba(0, 0, 0, 0.01)",
                  transition: "filter 0.25s ease, width .10s ease",
                }}
              >
                {AP}
              </div>
              <div
                style={{
                  ...(flashHealth ? flashHealthStyle : {}),
                  backgroundImage:
                    "linear-gradient(0deg, rgba(232,79,79,1) 4%, rgba(233,74,74,1) 9%, rgba(233,74,74,1) 14%, rgba(231,72,72,1) 21%, rgba(230,71,71,1) 25%, rgba(229,70,70,1) 28%, rgba(233,71,71,1) 32%, rgba(234,71,71,1) 35%, rgba(237,72,72,1) 38%, rgba(232,74,74,1) 45%, rgba(241,87,87,1) 52%, rgba(231,77,77,1) 58%, rgba(218,61,61,1) 66%, rgba(204,45,45,1) 75%, rgba(197,38,38,1) 81%, rgba(187,28,28,1) 85%, rgba(177,18,18,1) 93%, rgba(163,4,4,1) 100%)",
                  width: `${(HP / hitpoints) * 25}rem`,
                  border: "inset 2px red",
                  transition: "filter 0.25s ease, width .10s ease",
                  margin: ".5rem",
                  height: ".2rem",
                  color: "rgba(0, 0, 0, 0.01)",
                  borderRadius: "10rem",
                }}
              >
                {HP}
              </div>

              <div
                style={{
                  ...(flashEndurance ? flashEnduranceStyle : {}),
                  margin: ".5rem",
                  borderRadius: "10rem",
                  backgroundImage: `linear-gradient(0deg, rgba(31,115,133,1) 0%, rgba(77,213,142,1) 41%, rgba(81,221,143,1) 46%, rgba(87,233,144,1) 50%, rgba(68,210,163,1) 52%, rgba(73,205,141,1) 53%, rgba(68,195,140,1) 55%, rgba(63,184,139,1) 60%, rgba(59,174,138,1) 65%, rgba(55,166,137,1) 70%, rgba(51,158,136,1) 75%, rgba(45,145,135,1) 80%, rgba(39,133,134,1) 85%, rgba(35,123,133,1) 90%, rgba(22,95,132,1) 100%)`,
                  width: `${(EP / endurancepoints) * 25}rem`,
                  height: ".2rem",
                  border: "inset 2px seagreen",
                  color: "rgba(0, 0, 0, 0)",
                  transition: "filter 0.25s ease, width .10s ease",
                }}
              >
                {EP}
              </div>
            </section>
            <section
              id="enemy"
              style={{
                background: "url(assets/bar-BG.png)",
                height: "auto",
                width: `26.5rem`,
                borderRadius: "1rem",
                margin: "1rem",
                border: "double 3px tan",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                transform: "scaleX(-1)",
              }}
            >
              <div
                style={{
                  margin: ".5rem",
                  borderRadius: "10rem",
                  backgroundImage: `linear-gradient(0deg, rgba(214,109,0,1) 0%, rgba(255,115,18,1) 9%, rgba(255,125,58,1) 16%, rgba(251,168,114,1) 27%, rgba(239,237,187,1) 46%, rgba(254,238,176,1) 53%, rgba(240,174,118,1) 66%, rgba(246,146,98,1) 73%, rgba(255,119,58,1) 96%, rgba(255,152,0,1) 100%)`,
                  border: "inset 2px orange",
                  width: `${(EnemyAP / enemy.AP) * 25}rem`,
                  height: ".2rem",
                  color: "rgba(0, 0, 0, 0)",
                  transition: "filter 0.25s ease, width .10s ease",
                }}
              >
                {EnemyAP}
              </div>
              <div
                style={{
                  ...(flashEnemyHealth ? flashEnemyHealthStyle : {}),
                  margin: ".5rem",
                  borderRadius: "10rem",
                  backgroundImage: `linear-gradient(0deg, rgba(232,79,79,1) 4%, rgba(233,74,74,1) 9%, rgba(233,74,74,1) 14%, rgba(231,72,72,1) 21%, rgba(230,71,71,1) 25%, rgba(229,70,70,1) 28%, rgba(233,71,71,1) 32%, rgba(234,71,71,1) 35%, rgba(237,72,72,1) 38%, rgba(232,74,74,1) 45%, rgba(241,87,87,1) 52%, rgba(231,77,77,1) 58%, rgba(218,61,61,1) 66%, rgba(204,45,45,1) 75%, rgba(197,38,38,1) 81%, rgba(187,28,28,1) 85%, rgba(177,18,18,1) 93%, rgba(163,4,4,1) 100%)`,
                  width: `${(EnemyHP / enemy.HP) * 25}rem`,
                  border: "inset 2px red",
                  height: ".2rem",
                  color: "rgba(0, 0, 0, 0)",
                  transition: "filter 0.25s ease, width .10s ease",
                }}
              >
                {EnemyHP}
              </div>
              {EnemyEP > 0 && (
                <div
                  style={{
                    ...(flashEnemyEndurance ? flashEnemyEnduranceStyle : {}),
                    margin: ".5rem",
                    borderRadius: "10rem",
                    backgroundImage: `linear-gradient(0deg, rgba(31,115,133,1) 0%, rgba(77,213,142,1) 41%, rgba(81,221,143,1) 46%, rgba(87,233,144,1) 50%, rgba(68,210,163,1) 52%, rgba(73,205,141,1) 53%, rgba(68,195,140,1) 55%, rgba(63,184,139,1) 60%, rgba(59,174,138,1) 65%, rgba(55,166,137,1) 70%, rgba(51,158,136,1) 75%, rgba(45,145,135,1) 80%, rgba(39,133,134,1) 85%, rgba(35,123,133,1) 90%, rgba(22,95,132,1) 100%)`,
                    width: `${(EnemyEP / enemy.EP) * 25}rem`,
                    border: "outset 2px seagreen",
                    height: ".2rem",
                    color: "rgba(0, 0, 0, 0)",
                  }}
                >
                  {EnemyEP}
                </div>
                
              )}
            </section>

            <button
              style={{
                border: "none",
                width: "25vw",
                height: "50vh",
                backgroundColor: "red",
                position: "absolute",
                top: "0",
                opacity: "0",
                right: "0",
                cursor: Cursor ? "url('/assets/cursor-attack.png'),crosshair" : "url('/assets/cursor-loading.png'),crosshair",
              }}
              id="HitRollButton"
              onClick={() => {
                isButtonDisabled ? undefined : HitRoll();
              }}
            >
              Hit
            </button>

            <button
              style={{
                border: "none",
                width: "25vw",
                height: "50vh",
                backgroundColor: "blue",
                position: "absolute",
                top: "0",
                opacity: "0",
                left: "0",
                cursor: Cursor ? "url('/assets/cursor-block.png'),crosshair" : "url('/assets/cursor-loading.png'),crosshair",
              }}
              onPointerDown={toggleBlock}
            >
              Block
            </button>
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default Battle;
