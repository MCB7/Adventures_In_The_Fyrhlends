import React, { useEffect, useRef, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useHitAnimationContext } from "../context/HitAnimationContext";
import { useBlockAnimationContext } from "../context/BlockAnimationContext";
import { useHurtAnimationContext } from "../context/HurtAnimationContext";
import { useEnemyHitAnimationContext } from "../context/EnemyHitAnimationContext";
import { useEnemyHurtAnimationContext } from "../context/EnemyHurtContext";
import { useEnemyBlockAnimationContext } from "../context/EnemyBlockAnimationContext";
import BloodParticles from "./BloodParticles";
import { EffectComposer, Pixelation, Noise, ToneMapping, DepthOfField} from '@react-three/postprocessing';
import * as THREE from "three";
import StageEnvironment from './stageEnvironment'

const Battle: React.FC = () => {

  const PlayerModel = () => {
    const groupRef: any = useRef();
    const { nodes, animations }: any = useGLTF("/assets/actiontest-s.gltf");
    const { actions, names }: any = useAnimations(animations, groupRef);
    const { hit, setHit } = useHitAnimationContext();
    const { BlockAnim, setBlockAnim } = useBlockAnimationContext();
    const { Hurt, setHurt } = useHurtAnimationContext();
    const [hitAnim, setHitAnim] = useState<number>(9);

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
        setBlockAnim(false);
        actions[names[8]].stop();
        actions[names[2]].stop();
        actions[names[0]].stop();
        actions[names[hitAnim]]
          .setDuration(actions[names[1]]._clip.duration / 1.65)
          .play();
        setTimeout(() => {
          setHit(false);
        }, 475
        );
      } else if (hit === false) {
        actions[names[9]].stop();
        actions[names[10]].stop();
        actions[names[8]].play();
      }
      if (BlockAnim === true) {
        actions[names[2]].play();
        actions[names[0]].play();
        setTimeout(() => {
          actions[names[2]].stop();
        }, 525);
      } else if (BlockAnim === false) {
        actions[names[0]].stop();
      }

      if (Hurt === true && hit === false) {
        actions[names[6]].fadeOut(0.5).play();
        setTimeout(() => {
          setHurt(false);
          actions[names[6]].stop();
        }, 500);
      }

      if (BlockAnim === true && Hurt === true) {
        actions[names[1]].play();
        setTimeout(() => {
          actions[names[1]].stop();
        }, 500);
      }
    }, [actions, hit, BlockAnim, Hurt]);

    // Inside your component
    const gltf = useGLTF("/assets/TestStick2.gltf");
    const stickNode : any = gltf.scene.children.find(
      (child) => child.name === "Cube"
    );

    useEffect(() => {
      if (nodes.Cylinder && stickNode) {
        const parent = nodes.Cylinder.parent;
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
    }, [nodes.Cylinder, stickNode]);
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
    const { nodes, animations }: any = useGLTF("/assets/actiontestENEMY.gltf");
    const { actions, names }: any = useAnimations(animations, groupRef);
    const { Enemyhit, setEnemyHit } = useEnemyHitAnimationContext();
    const { EnemyBlockAnim, setEnemyBlockAnim } =
      useEnemyBlockAnimationContext();
    const { EnemyHurt, setEnemyHurt } = useEnemyHurtAnimationContext();
    const [hitAnim, setHitAnim] = useState<number>(9);

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
  resetLoading();

  return (
    <>
  <Canvas
  style={{
    width: "50vw",
    height: "50vh",
    borderRadius: "10px",
    background: "linear-gradient(#DCDCDC, #708090)",
    opacity: showCanvas ? 1 : 0,
    transition: "opacity .25s ease-in, filter .25s ease-in",
    filter: showCanvas
      ? "blur(0px) contrast(100%) Sepia(0.25) brightness(1)"
      : "blur(25px) contrast(2) Sepia(100%) brightness(0)",
  }}
>
  <EffectComposer>
    <Noise opacity={0.01} />
    <Pixelation granularity={3} />
    <ambientLight intensity={1} />
  <directionalLight
            position={[10, 10, 10]}
            intensity={1}
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
    <StageEnvironment/>
    <ToneMapping middleGrey={0.1} maxLuminance={38} />
  </EffectComposer>
</Canvas>
    </>
  );
};

export default Battle;
