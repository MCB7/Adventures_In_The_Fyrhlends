import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import {
  Canvas,
  useThree,
  extend,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CameraHelper, Euler } from "three";
import { Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLocationContext } from "../context/LocationContext";
import { BiomeGenerator } from "./BiomeGenerator";
import BattleModal from "./BattleModal";
import GenerateEnemy from "./EnemyGenerator";
import Battle from "../components/Battle";
import BattleStage from "../components/BattleStage";
import { BattleStateContext } from "../context/BattleStateContext";
import {
  DepthOfField,
  EffectComposer,
  Noise,
  Pixelation,
} from "@react-three/postprocessing";
import { useWindowWidth } from "../hooks/useWindowWidth";
import Character from "./Character";
import CreateCharacter from "./CreateCharacter";


const Model = () => {
  const TowerModel = "/assets/Tower.gltf";
  const gltf = useLoader(GLTFLoader, TowerModel);
  return (
    <primitive
      object={gltf.scene}
      position={[38, -0.5, 39]}
      scale={0.5}
      rotate={[1, 0, 0]}
      castShadow
      receiveShadow
    />
  );
};
const City = ({ position }: { position: any }) => {
  const cityModel = "/assets/city.gltf";
  const gltf = useLoader(GLTFLoader, cityModel);
  return useMemo(
    () => (
      <primitive
        object={gltf.scene}
        position={position}
        scale={4}
        rotate={[1, 0, 0]}
        castShadow
        receiveShadow
      />
    ),
    [gltf.scene, position]
  );
};
const MultipleCities = () => {
  return (
    <>
      <City position={[38.5, 0.25, 38.5]} />
    </>
  );
};

const Clouds = () => {
  const cloudTextures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const texture1 = loader.load("/assets/cloud.png");
    const texture2 = loader.load("/assets/cloud1.png");
    const texture3 = loader.load("/assets/cloud2.png");
    return [texture1, texture2, texture3];
  }, []);

  const clouds = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    const matrix = new THREE.Matrix4().makeTranslation(0.1, 0, 0.1);
    clouds.current.forEach((cloud) => {
      cloud.applyMatrix4(matrix);
      if (cloud.position.x > 100) cloud.position.x = -100;
      if (cloud.position.z > 100) cloud.position.z = -100;
    });
  });

  const createCloud = (texture: THREE.Texture) => {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.25,
      depthTest: true,
      depthWrite: false,
    });
    const cloud = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);
    cloud.position.x = Math.random() * 200 - 100;
    cloud.position.y = Math.random() * 50 - 55;
    cloud.position.z = Math.random() * 200 - 100;
    cloud.rotation.x = -Math.PI / 2;
    cloud.scale.set(0.75, 1, 0.75);
    return cloud;
  };

  useEffect(() => {
    // Use the three textures to create different clouds, generating 10 clouds per texture
    const newClouds = [
      ...Array.from({ length: 10 }, () => createCloud(cloudTextures[0])),
      ...Array.from({ length: 1 }, () => createCloud(cloudTextures[1])),
      ...Array.from({ length: 10 }, () => createCloud(cloudTextures[2])),
    ];
    clouds.current = newClouds;
  }, [cloudTextures]);

  return (
    <group>
      {clouds.current.map((cloud, index) => (
        <primitive key={index} object={cloud} />
      ))}
    </group>
  );
};

const texture = new THREE.TextureLoader().load("/assets/bird.png");

const Bird = ({ position }: { position: any }) => {
  const birdRef: any = useRef();
  // Generate a random offset for each bird
  const offsetX = Math.random() * 10;
  const offsetY = Math.random() * 10;

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const radius = 25;
    const angle = elapsedTime * 0.5; // Adjust the speed of movement

    // Calculate the unique position for each bird
    const x = Math.cos(angle + offsetX) * radius + position.x;
    const z = (Math.sin((angle + offsetY) * 3) * radius) / 3 + position.z; // Adjust the shape of the figure-eight

    birdRef.current.position.x = x;
    birdRef.current.position.y = 25;
    birdRef.current.position.z = z;

    // Calculate the rotation to face the direction of movement
    const rotationAngle = Math.atan2(position.x - x, position.z - z);
    birdRef.current.rotation.y = rotationAngle;

    // Calculate the quaternion rotation to face a certain direction
    const targetDirection = new THREE.Vector3(0, 0, 1); // Set the target direction vector
    const currentDirection = new THREE.Vector3(
      Math.sin(rotationAngle),
      0,
      -Math.PI / 2
    ); // Calculate the current direction vector based on the rotation angle
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      currentDirection,
      targetDirection
    );
    birdRef.current.quaternion.copy(quaternion);

    // Flap the wings
    const wingAngle = (Math.sin(elapsedTime * 10) * Math.PI) / 5; // Adjust the wing flapping speed and angle
    birdRef.current.rotation.z += wingAngle;

    // Constrain the roll and flip of the sprite
    birdRef.current.rotation.x = THREE.MathUtils.clamp(
      birdRef.current.rotation.x,
      -Math.PI / 4,
      Math.PI / 4
    );
    birdRef.current.rotation.z = THREE.MathUtils.clamp(
      birdRef.current.rotation.z,
      -Math.PI / 4,
      Math.PI / 4
    );
  });
  return (
    <mesh ref={birdRef} rotation={[0, 0, 0]} scale={0.45}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        color="brown"
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
};

const Tree = React.memo((props: any) => {
  // Load the sprite texture
  const spriteMap = useLoader(THREE.TextureLoader, "/assets/Forest_Tree.png");
  const material = useMemo(() => {
    return new THREE.SpriteMaterial({ map: spriteMap, color: "#627c2a" });
  }, [spriteMap]);

  // Create sprite
  const sprite = useMemo(() => {
    return new THREE.Sprite(material);
  }, [material]);

  // Scale the sprite
  sprite.scale.set(0.75, 1.25, 2);

  return <primitive object={sprite} {...props} />;
});

const Forest = React.memo(
  ({
    numberOfTrees,
    areaSize,
    position,
  }: {
    numberOfTrees: any;
    areaSize: any;
    position: any;
  }) => {
    const trees = useMemo(() => {
      const tempTrees = [];
      for (let i = 0; i < numberOfTrees; i++) {
        const angle = (i / (numberOfTrees / 2)) * Math.PI; // Calculate the angle at which the tree will be placed.
        const radius = (Math.sqrt(Math.random()) * areaSize) / 2; // Calculate the radius at which the tree will be placed.
        const x = radius * Math.cos(angle); // Calculate the x position of the tree.
        const y = 0.75;
        const z = radius * Math.sin(angle); // Calculate the z position of the tree.
        tempTrees.push(<Tree position={[x, y, z]} key={i} />);
      }
      return tempTrees;
    }, [numberOfTrees, areaSize]);

    return <group position={position}>{trees}</group>;
  }
);

// Define a Tree component
const Fern = (props: any) => {
  const spriteMaps = useMemo(
    () => [
      useLoader(THREE.TextureLoader, "/assets/Forest_Tree.png"),
      useLoader(THREE.TextureLoader, "/assets/tree_1.png"),
      useLoader(
        THREE.TextureLoader,
        "/assets/hjm-randomized_forbs_02-alpha_0.png"
      ),
    ],
    []
  );

  // Generate and store a random index using useState
  const [randomIndex] = useState(() =>
    Math.floor(Math.random() * spriteMaps.length)
  );

  const spriteMap = spriteMaps[randomIndex];
  const material = useMemo(
    () => new THREE.SpriteMaterial({ map: spriteMap, color: "#627c2a" }),
    [spriteMap]
  );

  // Create sprite
  const sprite = useMemo(() => {
    const spr = new THREE.Sprite(material);
    spr.scale.set(0.5, 0.75, 2.25);
    return spr;
  }, [material]);

  return <primitive object={sprite} {...props} />;
};

const Ferns = ({
  numberOfTrees,
  areaSize,
  position,
}: {
  numberOfTrees: any;
  areaSize: any;
  position: any;
}) => {
  const ferns = useMemo(() => {
    const tempTrees = [];
    for (let i = 0; i < numberOfTrees; i++) {
      const angle = (i / (numberOfTrees / 2)) * Math.PI; // Calculate the angle at which the tree will be placed.
      const radius = (Math.sqrt(Math.random()) * areaSize) / 2; // Calculate the radius at which the tree will be placed.
      const x = radius * Math.cos(angle); // Calculate the x position of the tree.
      const y = 0.75;
      const z = radius * Math.sin(angle); // Calculate the z position of the tree.
      tempTrees.push(<Fern position={[x, y, z]} key={i} />);
    }
    return tempTrees;
  }, [numberOfTrees, areaSize]);

  return <group position={position}>{ferns}</group>;
};

const PlaneWithTexture = () => {
  const texture1 = useMemo(() => {
    const texture = new THREE.TextureLoader().load("/assets/texture_map.jpg");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  }, []);

  const bumpMap = useMemo(() => {
    const texture = new THREE.TextureLoader().load("/assets/bump1Map3.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  }, []);

  const displacementMap = useMemo(() => {
    const texture = new THREE.TextureLoader().load(
      "/assets/displacement_map.jpg"
    );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#d4bfa4",
        map: texture1,
        bumpMap: bumpMap,
        bumpScale: 12,
        displacementMap: displacementMap,
        displacementScale: 8,
      }),
    [texture1, bumpMap, displacementMap]
  );
  const geometry = useMemo(() => new THREE.BoxGeometry(115, 5, 115), []);
  const boardLoader = useMemo(() => new THREE.TextureLoader(), []);
  const board = useMemo(
    () => boardLoader.load("/assets/BOARD.jpg"),
    [boardLoader]
  );
  const material1 = useMemo(
    () => new THREE.MeshBasicMaterial({ map: board, color: "darkgrey" }),
    [board]
  );
  return (
    <group>
      <mesh
        receiveShadow
        castShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        material={material}
      >
        <planeGeometry attach="geometry" args={[100, 100, 20, 25]} />
        <meshPhongMaterial
          color={"#d4bfa4"}
          map={texture1}
          bumpMap={bumpMap}
          bumpScale={12}
          displacementMap={displacementMap}
          displacementScale={8}
        />
      </mesh>

      <mesh position={[0, -2.8, 0]} material={material1}>
        <primitive attach="geometry" color={"#51371b"} object={geometry} />
      </mesh>
    </group>
  );
};

extend({ OrbitControls });

const CameraControls = () => {
  const { camera, gl } = useThree();
  const controlsRef: any = useRef();
  const windowWidth = useWindowWidth();
  const cameraHelper = new CameraHelper(camera);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
      cameraHelper.update();
    }
  });

  useEffect(() => {
    controlsRef.current = new OrbitControls(camera, gl.domElement);
    controlsRef.current.enableZoom = true; // Disable zooming
    controlsRef.current.enableRotate = true;
    controlsRef.current.minPolarAngle = -1; // Minimum angle from the y-axis (ground)
    controlsRef.current.maxPolarAngle = 1; // Maximum angle from the y-axis (sky)
    controlsRef.current.minAzimuthAngle = -10; // Minimum azimuth angle (left)
    controlsRef.current.maxAzimuthAngle = 10; // Maximum azimuth angle (right)
    controlsRef.current.enablePan = true;
    controlsRef.current.enableDolly = true; // Enable panning
    controlsRef.current.enableDamping = true; // Enable damping for smooth movement
    controlsRef.current.dampingFactor = 0.08; // Adjust the damping factor for desired effect
    controlsRef.current.maxDistance = 200; // Remove the maximum distance limit
    controlsRef.current.minDistance = 50;
    THREE.MathUtils.degToRad(75);

    if (windowWidth <= 768) {
      // Assuming 768px is the breakpoint for mobile devices
      // Enable rotation with single touch and panning with double touch
      controlsRef.current.mouseButtons = {
        ONE: THREE.MOUSE.ROTATE,
        TWO: THREE.MOUSE.PAN,
      };
    } else {
      // Enable panning with mouse drag
      controlsRef.current.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      };
    }

    return () => {
      controlsRef.current.dispose();
    };
  }, [camera, gl.domElement]);

  return null; // Return null as we don't want this component to render any visible elements
};

const Camera = () => {
  const { camera } = useThree();
  return <primitive object={camera} position={[700, 250, 100]} />;
};

const ConfirmationModal = ({
  position,
  onConfirm,
  onCancel,
}: {
  position: any;
  onConfirm: any;
  onCancel: any;
}) => {
  const { camera } = useThree();
  const groupRef: any = useRef();

  useFrame(() => {
    groupRef.current.lookAt(camera.position);
  });

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
              Venture forth?
            </div>
            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "3em",
              }}
            >
              <button onClick={onConfirm}>Yes</button>
              <button onClick={onCancel}>No</button>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const GridSquare = ({
  position,
  color,
  onClick,
  onDoubleClick,
  isRayIntersectionEnabled,
}: {
  position: any;
  color: any;
  onClick: any;
  onDoubleClick: any;
  isRayIntersectionEnabled: any;
}) => {
  const meshRef: any = useRef();
  const lineSegmentsRef: any = useRef(); // Ref to store the lineSegments object
  const { mouse, camera } = useThree();

  useFrame(() => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(meshRef.current!);

    if (intersects.length > 0 && isRayIntersectionEnabled) {
      // Mouse is hovering over the square
      meshRef.current!.material.color.set("#228B22");
      meshRef.current!.material.opacity = 0.25;
      meshRef.current!.material.transparent = true;
      meshRef.current!.material.wireframe = false;

      // Create lime green outline using lineSegments if not already present
      if (!lineSegmentsRef.current) {
        const edgesGeometry = new THREE.EdgesGeometry(
          meshRef.current!.geometry
        );
        const lineMaterial = new THREE.LineBasicMaterial({ color: "#228B22" });
        const lineSegments = new THREE.LineSegments(
          edgesGeometry,
          lineMaterial
        );
        lineSegments.name = "lineSegments"; // Set a name for easy access
        meshRef.current!.add(lineSegments);
        lineSegmentsRef.current = lineSegments; // Store the lineSegments object in the ref
      }
    } else {
      // Mouse is not hovering over the square or ray intersection is disabled
      meshRef.current!.material.color.set(color);
      meshRef.current!.material.opacity = 0.005;
      meshRef.current!.material.transparent = true;
      meshRef.current!.material.wireframe = false;
      meshRef.current!.remove(lineSegmentsRef.current);
      lineSegmentsRef.current = null; // Reset the lineSegments ref

      // Remove lime green outline if present
      if (lineSegmentsRef.current) {
        meshRef.current!.remove(lineSegmentsRef.current);
        lineSegmentsRef.current = null; // Reset the lineSegments ref
      }
    }
  });

  return (
    <group position={position} castShadow receiveShadow>
      <mesh
        receiveShadow
        ref={meshRef}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial
          color={color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.005}
          wireframe={false}
        />
      </mesh>
    </group>
  );
};

const Grid = () => {
  const { LocationX, LocationY, setLocationX, setLocationY } =
    useLocationContext();
  const rotation = new Euler(-Math.PI * 0.5, 0, 0);
  const [orbPosition, setOrbPosition] = useState<[number, number, number]>([
    LocationX,
    LocationY,
    -2,
  ]);
  const [doubleClickIndex, setDoubleClickIndex] = useState<any>(null);
  const [isRayIntersectionEnabled, setIsRayIntersectionEnabled] =
    useState(true);
  const [selectedGridSquare, setSelectedGridSquare] = useState<
    [number, number] | null
  >(null);
  const [eventNum, setEventNum] = useState<any>(3);
  const [showBattleEvent, setShowBattleEvent] = useState<any>(null);
  const [showScenarioEvent, setShowScenarioEvent] = useState<boolean>();
  const { setInfo } = useContext<any>(BattleStateContext);

  useEffect(() => {
    console.log("Selected GridSquare: X:", LocationX, "Y:", LocationY);
    console.log("THE SCENE NUMBER IS ", showBattleEvent);
    console.log("THE SCENE NUMBER IS ", showScenarioEvent);
  }, [LocationX, LocationY, eventNum, showBattleEvent]);

  const GenerateEvents = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    switch (randomNumber) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      default:
        return null;
    }
  };

  const handleGridSquareClick = (
    rowIndex: number,
    colIndex: number,
    event: React.PointerEvent
  ) => {
    const newPosition = [colIndex * 5 + 2.5, rowIndex * 5 + 2.5, -2];

    if (event.detail === 1) {
      // Single click action
      setDoubleClickIndex(null);
      setIsRayIntersectionEnabled(true);
      setSelectedGridSquare(null); // Reset the selected grid square
    } else if (event.detail === 2) {
      // Double click action
      if (
        newPosition[0] !== orbPosition[0] ||
        newPosition[1] !== orbPosition[1] ||
        newPosition[2] !== orbPosition[2]
      ) {
        setDoubleClickIndex([rowIndex, colIndex]);
        setIsRayIntersectionEnabled(false);
        setSelectedGridSquare([rowIndex, colIndex]); // Set the selected grid square
      }
    }

    const mediaQuery = window.matchMedia(
      "(max-width: 768px) and (orientation: landscape)"
    );
    if (event.pointerType === "touch" || mediaQuery.matches) {
      // Double click action for mobile devices
      if (
        newPosition[0] !== orbPosition[0] ||
        newPosition[1] !== orbPosition[1] ||
        newPosition[2] !== orbPosition[2]
      ) {
        setDoubleClickIndex([rowIndex, colIndex]);
        setIsRayIntersectionEnabled(false);
        setSelectedGridSquare([rowIndex, colIndex]); // Set the selected grid square
      }
    }

    const isInvalidPosition =
      (newPosition[0] === 72.5 && newPosition[1] === 2.5) ||
      (newPosition[0] === 77.5 && newPosition[1] === 2.5) ||
      (newPosition[0] === 82.5 && newPosition[1] === 2.5) ||
      (newPosition[0] === 87.5 && newPosition[1] === 2.5) ||
      (newPosition[0] === 87.5 && newPosition[1] === 7.5) ||
      (newPosition[0] === 82.5 && newPosition[1] === 7.5) ||
      (newPosition[0] === 77.5 && newPosition[1] === 7.5);

    if (isInvalidPosition) {
      setDoubleClickIndex(null);
    }
  };

  // Our helper function that uses the supercover line algorithm
  function countIntersectedSquares(start: any, end: any) {
    let dx = Math.abs(end[0] - start[0]);
    let dy = Math.abs(end[1] - start[1]);
    let sx = start[0] < end[0] ? 1 : -1;
    let sy = start[1] < end[1] ? 1 : -1;

    let x = start[0];
    let y = start[1];
    let squares = new Set();

    squares.add(`[${Math.floor(x)}, ${Math.floor(y)}]`);

    // parallel to x
    if (dy <= dx) {
      let p = 2 * dy - dx;
      for (let i = 0; i <= dx; i++) {
        x += sx;
        if (p < 0) {
          squares.add(`[${Math.floor(x)}, ${Math.floor(y)}]`);
          p += 2 * dy;
        } else {
          y += sy;
          squares.add(`[${Math.floor(x)}, ${Math.floor(y)}]`);
          p += 2 * dy - 2 * dx;
        }
      }
    } else {
      // parallel to y
      let p = 2 * dx - dy;
      for (let i = 0; i <= dy; i++) {
        y += sy;
        if (p < 0) {
          squares.add(`[${Math.floor(x)}, ${Math.floor(y)}]`);
          p += 2 * dx;
        } else {
          x += sx;
          squares.add(`[${Math.floor(x)}, ${Math.floor(y)}]`);
          p += 2 * dx - 2 * dy;
        }
      }
    }
    return squares.size;
  }

  const handleConfirm = () => {
    if (doubleClickIndex) {
      const newPosition: any = [
        doubleClickIndex[1] * 5 + 2.5,
        doubleClickIndex[0] * 5 + 2.5,
        -2,
      ];

      if (
        newPosition[0] !== orbPosition[0] ||
        newPosition[1] !== orbPosition[1] ||
        newPosition[2] !== orbPosition[2]
      ) {
        setOrbPosition(newPosition);
        const intersectedSquares = countIntersectedSquares(
          orbPosition,
          newPosition
        );
        const HoursTraveled = intersectedSquares * 3.4286;
        const HoursTraveledRounded = Math.floor(HoursTraveled);
        console.log(HoursTraveledRounded);
        setLocationX(newPosition[0]);
        setLocationY(newPosition[1]);

        if (selectedGridSquare) {
          setEventNum(GenerateEvents());
          console.log("The Event Number is", eventNum);
          if (eventNum === 1) {
            setShowBattleEvent(true);
          } else if (eventNum === 2) {
            setShowScenarioEvent(true);
          } else null;
        }
      }

      setDoubleClickIndex(null);
      setIsRayIntersectionEnabled(true);
      setSelectedGridSquare(null); // Reset the selected grid square
    }
  };

  const handleCancel = () => {
    setIsRayIntersectionEnabled(true);
    setSelectedGridSquare(null); // Reset the selected grid square
    setDoubleClickIndex(null);
  };

  const handleInfoFromBattleModal = (info: any) => {
    setInfo(info);
  };

  const handleBattleModalToggleState = (info: any) => {
    setShowBattleEvent(info);
  };

  return (
    <group position={[-50, 5, 50]} rotation={rotation}>
      {Array.from({ length: 20 }).map((_, rowIndex) =>
        Array.from({ length: 20 }).map((_, colIndex) => (
          <GridSquare
            key={`${rowIndex}-${colIndex}`}
            position={[colIndex * 5 + 2.5, rowIndex * 5 + 2.5, -2]}
            color={
              selectedGridSquare &&
              selectedGridSquare[0] === rowIndex &&
              selectedGridSquare[1] === colIndex
                ? "lime" // Set the color to lime green if the grid square is selected
                : "forestgreen"
            }
            onClick={(event: React.PointerEvent) =>
              handleGridSquareClick(rowIndex, colIndex, event)
            }
            onDoubleClick={handleConfirm}
            isRayIntersectionEnabled={
              isRayIntersectionEnabled && !selectedGridSquare
            } // Disable ray intersection when a grid square is selected
          />
        ))
      )}
      {selectedGridSquare && (
        <ConfirmationModal
          position={[selectedGridSquare[0], selectedGridSquare[1]]}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <PlayerMapIcon position={orbPosition} />
      {showBattleEvent ? (
        <BattleModal
          position={[[LocationX, LocationY]]}
          onInfoSentUp={handleInfoFromBattleModal}
          BattleModalToggleState={handleBattleModalToggleState}
        />
      ) : null}
    </group>
  );
};

const PlayerMapIcon = ({
  position,
}: {
  position: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [material, setMaterial] = useState<THREE.Material>(
    new THREE.MeshPhysicalMaterial({ color: "green" })
  );
  const [geometry, setGeometry] = useState<THREE.BufferGeometry>(
    new THREE.SphereGeometry(0.5, 32, 32)
  );
  const lineSegmentsRef = useRef<THREE.LineSegments | null>(null); // Ref to store the lineSegments object

  useFrame(() => {
    if (meshRef.current) {
      const targetPosition = new THREE.Vector3(...position);
      if (!hasMoved) {
        meshRef.current.position.set(...position);
        setHasMoved(true);
      } else if (meshRef.current.position.distanceTo(targetPosition) < 1) {
        meshRef.current.position.set(...position);
        // Change to box geometry and wireframe material when destination is reached
        setGeometry(new THREE.BoxGeometry(5, 5, 5));
        setMaterial(
          new THREE.MeshBasicMaterial({
            color: "#228B22",
            opacity: 0.25,
            transparent: true,
          })
        );
        meshRef.current.scale.set(1, 1, 1); // Reset scale to original size
      } else {
        meshRef.current.position.lerp(targetPosition, 0.08);
        meshRef.current.scale.set(0.1, 0.1, 0); // Set scale to 0.25 of original size
        setMaterial(
          new THREE.MeshBasicMaterial({
            color: "#228B22",
            opacity: 1,
            transparent: true,
          })
        );
      }
    }
  });

  // Add the outline when the geometry is updated
  useEffect(() => {
    if (meshRef.current && geometry instanceof THREE.BoxGeometry) {
      // Create lime green outline using lineSegments if not already present
      if (!lineSegmentsRef.current) {
        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: "#228B22" });
        const lineSegments = new THREE.LineSegments(
          edgesGeometry,
          lineMaterial
        );
        lineSegments.name = "lineSegments"; // Set a name for easy access
        meshRef.current.add(lineSegments);
        lineSegmentsRef.current = lineSegments; // Store the lineSegments object in the ref
      }
    }
  }, [geometry]);

  return <mesh ref={meshRef} material={material} geometry={geometry} />;
};

const App = () => {
  const { info } = useContext(BattleStateContext);
  const [isReady, setIsReady] = useState(false);
  const [, setLoadingTime] = useState<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  // const [showBattle, setShowBattle] = useState(info);
  const startTime = useRef<number>(0);
  const { LocationX, LocationY } = useLocationContext();
  const rotation = new THREE.Euler(-Math.PI * 0.5, 0, 0);

  const SetBackground = () => {
    const { scene } = useThree();
    useEffect(() => {
      scene.background = new THREE.Color("#a4c8ff"); // replace with your desired color or texture
    }, [scene]);
    return null;
  };

  // Use useCallback to memoize the toggleGrid function
  const toggleGrid = useCallback(() => {
    setShowGrid((prevShowGrid) => !prevShowGrid);
  }, []);
  const toggleCharacterSheet = useCallback(() => {
    setShowCharacter((prevShowCharacter) => !prevShowCharacter);
  }, []);
  const toggleCreateCharacterSheet = useCallback(() => {
    setShowCreateCharacter((prevShowCreateCharacter) => !prevShowCreateCharacter);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      startTime.current = performance.now();
      const delay = 2000; // Replace with your desired loading time in milliseconds

      const progressInterval = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress + 0.5);
      }, 20);

      // Perform your actual loading logic here
      // For example, fetching data from an API or loading external resources
      await new Promise((resolve) => setTimeout(resolve, delay));

      const endTime = performance.now();
      const calculatedLoadingTime = endTime - startTime.current;
      setLoadingTime(calculatedLoadingTime);
      clearInterval(progressInterval);
      setIsReady(true);
      setTimeout(() => {
        setShowCanvas(true);
      }, 100);
    };

    loadData();
  }, [isReady]);

  const forestPositions = useMemo(() => [[-13, 0.2, 25]], []);
  const forestPositions1 = useMemo(() => [[-7, 0.5, 25]], []);
  const forestPositions2 = useMemo(() => [[10, 0.5, 25]], []);
  const shrubPositions = useMemo(() => [[15, 0, -10]], []);
  const shrubPositions1 = useMemo(() => [[15, 0, 5]], []);

  const birdPositions = [
    { x: -10, z: 5 },
    { x: 20, z: -15 },
    { x: -5, z: -30 },
    { x: 30, z: 10 },
    { x: -25, z: -5 },
  ];

  const MemoizedBird = React.memo(Bird);
  const MemoizedFerns = React.memo(Ferns);

  const resetLoading = () => {
    // setIsReady(false);
    setShowCanvas(false);
    setTimeout(() => {
      setShowCanvas(true);
    }, 250);
  };

  const forestComponents = useMemo(() => {
    return forestPositions.map((pos, index) => (
      <>
        <Forest numberOfTrees={4000} areaSize={52} position={pos} key={index} />
      </>
    ));
  }, [forestPositions]);

  const forestComponents1 = useMemo(() => {
    return forestPositions1.map((pos, index) => (
      <>
        <Forest numberOfTrees={1500} areaSize={52} position={pos} key={index} />
      </>
    ));
  }, [forestPositions1]);
  const forestComponents2 = useMemo(() => {
    return forestPositions2.map((pos, index) => (
      <>
        <Forest numberOfTrees={1500} areaSize={39} position={pos} key={index} />
      </>
    ));
  }, [forestPositions2]);

  const WoodlandComponents = useMemo(() => {
    return shrubPositions.map((pos, index) => (
      <>
        <MemoizedFerns
          numberOfTrees={800}
          areaSize={40}
          position={pos}
          key={index}
        />
      </>
    ));
  }, [shrubPositions]);
  const WoodlandComponents1 = useMemo(() => {
    return shrubPositions1.map((pos, index) => (
      <>
        <MemoizedFerns
          numberOfTrees={900}
          areaSize={40}
          position={pos}
          key={index}
        />
      </>
    ));
  }, [shrubPositions1]);

  return (
    <>
      {!isReady ? (
        <div>
          <h2>Loading...</h2>
          <div
            style={{ width: "50vw", height: "10px", backgroundColor: "#DDD" }}
          >
            <div
              style={{
                width: `${loadingProgress}%`,
                height: "100%",
                backgroundColor: "#000",
              }}
            />
          </div>
        </div>
      ) : info ? (
        <>
            <BattleStage  />
          <Battle onClose={resetLoading} />
    
        </>
      ) : (
        <Canvas
          style={{
            width: "50vw",
            height: "50vh",
            borderRadius: "10px",
            background: "linear-gradient(#77ccf7, #aedbf2)",
            backgroundColor: "skyblue",
            opacity: showCanvas ? 1 : 0,
            transition: "opacity .25s ease-in, filter 1s ease-in",
            filter: showCanvas
              ? "blur(0px) contrast(112%) Sepia(0.25) brightness(1.12)"
              : "blur(25px) contrast(2) Sepia(100%) brightness(2)",
          }}
          shadows
          gl={{ alpha: true }}
          camera={{ position: [0, 10, 10], fov: 20 }}
        >
          <SetBackground />
          <fog attach="fog" args={["#77ccf7", 50, 375]} />
          <CameraControls />
          <Camera />
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[10, 50, 10]}
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
          {showGrid && <Grid />}
          <PlaneWithTexture />
          {birdPositions.map((position, index) => (
            <MemoizedBird key={index} position={position} />
          ))}

          <Clouds />
          <Suspense fallback={null}>
            <Model />
            <MultipleCities />
          </Suspense>
          <group position={[-50, 5, 50]} rotation={rotation}>
            <PlayerMapIcon position={[LocationX, LocationY, -2]} />
          </group>
          <BiomeGenerator />
          <GenerateEnemy />
          <EffectComposer>
            <DepthOfField
              focusDistance={0.04}
              focalLength={0.02}
              bokehScale={1.55}
              height={300}
            />
            <Pixelation granularity={2} />
            <Noise opacity={0.01} />
          </EffectComposer>

          {forestComponents}
          {forestComponents1}
          {forestComponents2}
          {WoodlandComponents}
          {WoodlandComponents1}
        </Canvas>
      )}
      <button onClick={toggleGrid}>{showGrid ? "Close" : "Travel"}</button>
      <button onClick={toggleCreateCharacterSheet}>{showCreateCharacter ? "Close" : "Character Creation"}</button>
      <button onClick={toggleCharacterSheet}>{showCharacter ? "Close" : "Character"}</button>
      {showCreateCharacter && <CreateCharacter /> }
      {showCharacter && <Character /> }
    </>
  );
};
export default App;
