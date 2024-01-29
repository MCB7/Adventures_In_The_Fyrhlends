import React, { useEffect, useRef, useCallback, useState } from "react";
import { Canvas} from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useHitAnimationContext } from "../context/HitAnimationContext";
import { useBlockAnimationContext } from "../context/BlockAnimationContext";
import { useHurtAnimationContext } from "../context/HurtAnimationContext";
import { useDeathAnimationContext } from "../context/DeathContext";
import { useEnemyHitAnimationContext } from "../context/EnemyHitAnimationContext";
import { useEnemyHurtAnimationContext } from "../context/EnemyHurtContext";
import { useEnemyBlockAnimationContext } from "../context/EnemyBlockAnimationContext";
import BloodParticles from "./BloodParticles";
import { EffectComposer, Pixelation, Noise, ToneMapping, DepthOfField} from '@react-three/postprocessing';
import * as THREE from "three";
import StageEnvironment from './stageEnvironment'
import StageEnvironment_001 from './stageEnvironment_001'
import { useBiomeContext } from "../context/BiomeContext";


const Battle: React.FC = () => {

  const PlayerModel = () => {
    const groupRef: any = useRef();
    const { nodes, animations }: any = useGLTF("/assets/actiontest_01.gltf");
    const { actions, names }: any = useAnimations(animations, groupRef);
    const { hit, setHit } = useHitAnimationContext();
    const { BlockAnim, setBlockAnim } = useBlockAnimationContext();
    const { Hurt, setHurt } = useHurtAnimationContext();
    const {Death} = useDeathAnimationContext();

    const [hitAnim, setHitAnim] = useState<number>(9);
    const hitTimeoutRef : any = useRef();
    const blockAnimTimeoutRef : any = useRef();
    const hurtTimeoutRef : any = useRef();

    function randomNumber(): number {
      return Math.random() < 0.5 ? 9 : 10;
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setHitAnim(randomNumber());
      }, 1500);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    const playAnimation = useCallback(() => {
      (Object.values(actions) as THREE.AnimationAction[]).forEach((action) => {
        action.clampWhenFinished = true;
      });

      if (hit === true) {
        if (!actions[names[hitAnim]].isRunning() || actions[names[hitAnim]].time > 0.5) {
          setBlockAnim(false);
          actions[names[8]].stop();
          actions[names[2]].stop();
          actions[names[0]].stop();
          actions[names[hitAnim]]
            .setDuration(actions[names[1]]._clip.duration / 1.65)
            .play();
            clearTimeout(hitTimeoutRef.current);
            hitTimeoutRef.current = setTimeout(() => {
              setHit(false);
            }, 475);
          }
        } else {
          clearTimeout(hitTimeoutRef.current);
        

      } if (hit === false) {
        if (!actions[names[8]].isRunning() || actions[names[8]].time > 0.5) {
          actions[names[9]].stop();
          actions[names[10]].stop();
          actions[names[8]].play();
        }
      }
    
      if (BlockAnim === true) {
        if (!actions[names[2]].isRunning() || actions[names[2]].time > 0.5) {
          actions[names[2]].play();
          actions[names[0]].play();
          clearTimeout(blockAnimTimeoutRef.current);
          blockAnimTimeoutRef.current = setTimeout(() => {
            actions[names[2]].stop();
          }, 525);
        }
      } else {
        clearTimeout(blockAnimTimeoutRef.current);
      }
        
       if (BlockAnim === false) {
        if (!actions[names[0]].isRunning() || actions[names[0]].time > 0.5) {
          actions[names[0]].stop();
        }
      }
    
      if (Hurt === true && hit === false) {
        if (!actions[names[6]].isRunning() || actions[names[6]].time > 0.5) {
          actions[names[6]].fadeOut(0.5).play();
        
          clearTimeout(hurtTimeoutRef.current);
          hurtTimeoutRef.current = setTimeout(() => {
            setHurt(false);
            actions[names[6]].stop();
          }, 500);
        }
      }
    
      if (BlockAnim === true && Hurt === true) {
        if (!actions[names[1]].isRunning() || actions[names[1]].time > 0.5) {
          actions[names[1]].play();
          setTimeout(() => {
            actions[names[1]].stop();
          }, 500);
        }
      }
if (Death === true ) {
    
  actions[names[1]].stop();
  actions[names[6]].stop();
  actions[names[7]].stop();
  actions[names[8]].stop();
  const action = actions[names[5]];
  const action_1 = actions[names[12]];
  action.setLoop(THREE.LoopOnce); // This sets the animation to only play once
  action.clampWhenFinished = true; // This makes the animation stop on the last frame
  action.setDuration(actions[names[1]]._clip.duration / .25).play();
  setTimeout(() => {
    action_1.crossFadeTo(0.05).play();
    
  }, 1000);
}


    }, [actions, hit, BlockAnim, Hurt]);


    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      if (hit === true) {
        timeoutId = setTimeout(() => setHit(false), 475);
      }
      return () => clearTimeout(timeoutId);
    }, [hit]);


    // EQUIPMENT
    const gltf = useGLTF("/assets/sword_iron.gltf");
    const stickNode : any = gltf.scene.children.find(
      (child) => child.name === "Cube"
    );

    const Shield_gltf = useGLTF("/assets/TestShield_1.gltf");
    const shieldNode : any = Shield_gltf.scene.children.find(
      (child) => child.name === "Shield"
    );
    const Helmet_gltf = useGLTF("/assets/Helmet.gltf");
    const helmetNode : any = Helmet_gltf.scene.children.find(
      (child) => child.name === "Helmet"
    );
    const Torso_gltf = useGLTF("/assets/chestarmor.gltf");
    const chestNode : any = Torso_gltf.scene.children.find(
      (child) => child.name === "ChestArmor"
    );

    const SwordArmShoulder_gltf = useGLTF("/assets/SwordArmShoulder.gltf");
    const SwordArmShoulderNode : any = SwordArmShoulder_gltf.scene.children.find(
      (child) => child.name === "SwordArmShoulder"
    );

    const SwordArmBicep_gltf = useGLTF("/assets/SwordArmBicep.gltf");
    const SwordArmBicepNode : any = SwordArmBicep_gltf.scene.children.find(
      (child) => child.name === "SwordArmBicep"
    );
    const SwordArmForearm_gltf = useGLTF("/assets/SwordArmForearm.gltf");
    const SwordArmForearmNode : any = SwordArmForearm_gltf.scene.children.find(
      (child) => child.name === "SwordArmForearm"
    );



    useEffect(() => {
      if (nodes.Cylinder && stickNode) {
        const parent = nodes.Cylinder.parent;
        parent.remove(nodes.Cylinder);
        if (parent) {
          parent.remove(nodes.Cylinder);
     
          // Adjust the position and orientation of the Stick node
          stickNode.position.set(
            nodes.Cylinder.position.x,
            nodes.Cylinder.position.y,
            nodes.Cylinder.position.z
          );
          stickNode.rotation.set(
            nodes.Cylinder.rotation.x,
            nodes.Cylinder.rotation.y,
            nodes.Cylinder.rotation.z
          );
          stickNode.rotation.x += 1.25;
          stickNode.rotation.y += 0.25;
          stickNode.position.z += -0.5;
     
          parent.add(stickNode);
        }
      }
        if (nodes.shieldhold && shieldNode) {
          const parent = nodes.shieldhold.parent;
          parent.remove(nodes.shieldhold);

            shieldNode.position.set(
              nodes.shieldhold.position.x,
              nodes.shieldhold.position.y,
              nodes.shieldhold.position.z
            );
            shieldNode.rotation.set(
              nodes.shieldhold.rotation.x,
              nodes.shieldhold.rotation.y,
              nodes.shieldhold.rotation.z
            );
  
          parent.add(shieldNode);
          console.log('shield',shieldNode)
      }

      if (nodes.Headwear && helmetNode) {
        const parent = nodes.Headwear.parent;
        parent.remove(nodes.Headwear);
        
        helmetNode.position.set(
          nodes.Headwear.position.x,
          nodes.Headwear.position.y,
          nodes.Headwear.position.z
        );
        helmetNode.rotation.set(
          nodes.Headwear.rotation.x,
          nodes.Headwear.rotation.y,
          nodes.Headwear.rotation.z
        );

  
        parent.add(helmetNode);
      }

        if (nodes.ChestArmor && chestNode) {
          const parent = nodes.ChestArmor.parent;
          const parent_1 = nodes.torso.parent;
         
          parent.remove(nodes.ChestArmor);
          parent_1.remove(nodes.torso);
  
          // Adjust the position and orientation of the Stick node
          chestNode.position.set(
            nodes.ChestArmor.position.x,
            nodes.ChestArmor.position.y,
            nodes.ChestArmor.position.z
          );
          chestNode.scale.set(
            nodes.ChestArmor.scale.x,
            nodes.ChestArmor.scale.y,
            nodes.ChestArmor.scale.z
          );
          chestNode.rotation.set(
            nodes.ChestArmor.rotation.x,
            nodes.ChestArmor.rotation.y,
            nodes.ChestArmor.rotation.z
          );
         
          parent.add(chestNode);
        }

        if (nodes.SwordArmShoulder && SwordArmShoulderNode) {
          const parent = nodes.SwordArmShoulder.parent;
          console.log(parent)
          parent.remove(nodes.SwordArmShoulder);
    
                // Adjust the position and orientation of the Stick node
                SwordArmShoulderNode.position.set(
                  nodes.SwordArmShoulder.position.x,
                  nodes.SwordArmShoulder.position.y,
                  nodes.SwordArmShoulder.position.z
                );
                SwordArmShoulderNode.scale.set(
                  nodes.SwordArmShoulder.scale.x,
                  nodes.SwordArmShoulder.scale.y,
                  nodes.SwordArmShoulder.scale.z
                );
                SwordArmShoulderNode.rotation.set(
                  nodes.SwordArmShoulder.rotation.x,
                  nodes.SwordArmShoulder.rotation.y,
                  nodes.SwordArmShoulder.rotation.z
                );
               
                parent.add(SwordArmShoulderNode);
              }
    
              if (nodes.SwordArmBicep && SwordArmBicepNode) {
                const parent = nodes.SwordArmBicep.parent;
                console.log(parent)
                parent.remove(nodes.SwordArmBicep);
          
                      // Adjust the position and orientation of the Stick node
                      SwordArmBicepNode.position.set(
                        nodes.SwordArmBicep.position.x,
                        nodes.SwordArmBicep.position.y,
                        nodes.SwordArmBicep.position.z
                      );
                      SwordArmBicepNode.scale.set(
                        nodes.SwordArmBicep.scale.x,
                        nodes.SwordArmBicep.scale.y,
                        nodes.SwordArmBicep.scale.z
                      );
                      SwordArmBicepNode.rotation.set(
                        nodes.SwordArmBicep.rotation.x,
                        nodes.SwordArmBicep.rotation.y,
                        nodes.SwordArmBicep.rotation.z
                      );
                     
                      parent.add(SwordArmBicepNode);
                }
                    if (nodes.SwordArmForearm && SwordArmForearmNode) {
                      const parent = nodes.SwordArmForearm.parent;
                      parent.remove(nodes.SwordArmForearm);
                      
                
                            // Adjust the position and orientation of the Stick node
                            SwordArmForearmNode.position.set(
                              nodes.SwordArmForearm.position.x,
                              nodes.SwordArmForearm.position.y,
                              nodes.SwordArmForearm.position.z
                            );
                            SwordArmForearmNode.scale.set(
                              nodes.SwordArmForearm.scale.x,
                              nodes.SwordArmForearm.scale.y,
                              nodes.SwordArmForearm.scale.z
                            );
                            SwordArmForearmNode.rotation.set(
                              nodes.SwordArmForearm.rotation.x,
                              nodes.SwordArmForearm.rotation.y,
                              nodes.SwordArmForearm.rotation.z
                            );
                           
                            parent.add(SwordArmForearmNode);
                          }                    
          

  }, [nodes.SwordArmBicep ,nodes.Cylinder, nodes.shieldhold, nodes.Headwear, nodes.torso,nodes.UpperSwordArm, nodes.SwordArmShoulder,nodes.SwordArmForearm, SwordArmForearmNode, stickNode, shieldNode, helmetNode, chestNode, SwordArmShoulderNode, SwordArmBicepNode]);
    const weaponColor: any = "red";

    useEffect(() => {
      if (nodes.Cube) {
        // ensure the Cylinder node exists
        nodes.Cube.material = nodes.Cube.material.clone(); // clone the material

        if (weaponColor === "green") {
          nodes.Cube.material.color.set("green");
        } else if (weaponColor === "blue") {
          nodes.Cube.material.color.set("blue");
        }
      }

      // Rest of your useEffect code...
    }, [weaponColor]); // Add weaponColor as a dependency to the useEffect hook

    // useEffect(() => {
    //   if (stickNode) {
    //     stickNode.material = stickNode.material.clone(); // clone the material
    //     stickNode.material.map = texture; // apply the texture
    //   }
    //  }, [stickNode]);


    /// <> <> <> PLACEMENT OF MODEL ON STAGE <> <> <>
    useEffect(() => {
      playAnimation();
      groupRef.current.position.set(-0.35, -0.35, 4.25);
      groupRef.current.rotation.set(0, 1.5, 0);
    }, [playAnimation]);
   
    return (
      <group ref={groupRef}>
        <primitive object={nodes.Scene} />
        <group position={[0, 0, 1]} rotation={[1.5, 0.1, -0.5]}>
          {Hurt && !hit && !BlockAnim && (
            <BloodParticles position={[-0.2, -0.75, -0.6]} />
          )}
        </group>
      </group>
    );
  };
  const EnemyModel = () => {
    const groupRef: any = useRef();
    const { nodes, animations }: any = useGLTF("/assets/actiontestENEMY_01.gltf");
    const { actions, names }: any = useAnimations(animations, groupRef);
    const { Enemyhit, setEnemyHit } = useEnemyHitAnimationContext();
    const { EnemyBlockAnim, setEnemyBlockAnim } =useEnemyBlockAnimationContext();
    const { EnemyHurt, setEnemyHurt } = useEnemyHurtAnimationContext();
    const [hitAnim, setHitAnim] = useState<number>(9);

    const {EnemyDeath} = useDeathAnimationContext();

    function randomNumber(): number {
      return Math.random() < 0.5 ? 9 : 10;
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setHitAnim(randomNumber());
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    const playAnimation = useCallback(() => {
      (Object.values(actions) as THREE.AnimationAction[]).forEach((action) => {
        action.clampWhenFinished = true;
      });
      

      if (Enemyhit === true) {
        setEnemyBlockAnim(false);
        actions[names[8]].stop();
        actions[names[2]].stop();
        actions[names[0]].stop();
        actions[names[hitAnim]]
          .setDuration(actions[names[1]]._clip.duration / 1.65)
          .play();
        setTimeout(() => {
          setEnemyHit(false);
        }, 400);
      } else if (Enemyhit === false) {
        actions[names[9]].stop();
        actions[names[10]].stop();
        actions[names[8]].play();
      }

      if (EnemyBlockAnim === true) {
        actions[names[2]].play();
        actions[names[0]].play();
        setTimeout(() => {
          actions[names[2]].stop();
        }, 525);
      }

      if (EnemyHurt === true) {
        actions[names[6]].play();
        setTimeout(() => {
          setEnemyHurt(false);
        }, 700);
      } else if (EnemyHurt === false) {
        actions[names[6]].stop();
      }

      if (EnemyBlockAnim === true || EnemyHurt === true) {
        actions[names[1]].play();
        setTimeout(() => {
          actions[names[1]].stop();
        }, 500);
      }
   

    if (EnemyDeath === true) { 
      actions[names[1]].stop();
      actions[names[6]].stop();
      actions[names[7]].stop();
      actions[names[8]].stop();
      const action = actions[names[11]];
      action.setLoop(THREE.LoopOnce); // This sets the animation to only play once
      action.clampWhenFinished = true; // This makes the animation stop on the last frame
      action.setDuration(actions[names[1]]._clip.duration / .5).play();
    }
  }, [actions, Enemyhit, EnemyBlockAnim, EnemyHurt]);


  

    useEffect(() => {
      playAnimation();
      groupRef.current.position.set(0.35, -0.35, 4.25);
      groupRef.current.rotation.set(0, 1.5, 0);
    }, [playAnimation]);


    return (
      <group ref={groupRef}>
        <primitive object={nodes.Scene} />
        <group position={[-1, 0, -1]} rotation={[0, -0.35, 0]}>
          {EnemyHurt && !Enemyhit && !EnemyBlockAnim && (
            <BloodParticles position={[0, 0, 0]} />
          )}
        </group>
      </group>
    );
  };

  const [showCanvas, setShowCanvas] = useState(false);
  const resetLoading = () => {
    setTimeout(() => {
      setShowCanvas(true);
    }, 250);
  };
  useEffect(()=>{[showCanvas]})
  resetLoading();

  
  const { biome, setbiome } = useBiomeContext();
    console.log("Type:", biome.Type);
  return (
    <>
            <div style={{
          opacity: showCanvas ? 1 : 0,
          transition: "opacity 1.25s ease-in, filter 1s ease-in",
          filter: showCanvas
          ? "blur(0px)brightness(100%)"
          : "blur(25px)brightness(200%)",
          backgroundImage: showCanvas 
          ? "url('/assets/map_bg2.png')"
          : "url('/assets/map_bg.png')",
          backgroundSize: '100% 100%', // or '100% 100%' for non-uniform scaling
          backgroundRepeat:'no-repeat',
          display:"flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100vh', // ensure the container takes the full viewport height
          cursor: showCanvas ?  "url('/assets/cursor_menu.png'), auto" :  "url('/assets/cursor-loading.png'), auto"
   
      }}>
  <Canvas performance={{ min: 0.5, max: 1, debounce: 200 }}
  style={{
    width: "50vw",
    height: "50vh",
    borderRadius: "1rem",
    border: "double 3px tan",
    background: "black",
    opacity: showCanvas ? 1 : 0,
    transition: "opacity .25s ease-in, filter .25s ease-in",
    filter: showCanvas
      ? "blur(0px) contrast(100%) Sepia(0.25) brightness(1)"
      : "blur(25px) contrast(2) Sepia(100%) brightness(0)",
  }}
>

<>
      {biome.Type === 'Mire' ? <StageEnvironment /> : null}
      {biome.Type === 'Forest' ? <StageEnvironment_001 /> : null}
    </>
<fog attach="fog" args={['#676f65', 0.001, 18]} />
  <EffectComposer>
    <Noise opacity={0.01} />
    <Pixelation granularity={2} />
    <ambientLight intensity={1} />
  <directionalLight
            position={[1, 10, 10]}
            intensity={.5}
            castShadow
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.001}
          />
    <DepthOfField
              focusDistance={0.08}
              focalLength={0.2}
              bokehScale={1.75}
              height={300}
            />
    <PlayerModel />
    <EnemyModel />

    
    <ToneMapping middleGrey={0.1} maxLuminance={38} />

  </EffectComposer>
</Canvas>
</div>
    </>
  );
};

export default Battle;
