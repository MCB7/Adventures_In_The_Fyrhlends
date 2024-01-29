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
} from "@react-three/postprocessing";
import { useWindowWidth } from "../hooks/useWindowWidth";
import Character from "./Character";
import CreateCharacter from "./CreateCharacter";
import CircularProgress from "./CircularProgress";
import { useToggleTravelContext } from "../context/ToggleTravelContext";
import { useLocalStorage } from "../hooks/useLocalStorage";


const Model = () => {
  const TowerModel = "/assets/Tower.gltf";
  const gltf = useLoader(GLTFLoader, TowerModel);
  return (
    <primitive
      object={gltf.scene}
      position={[38, -0.5, 39]}
      scale={[0.5, 0.75, 0.5]}
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
        scale={[3, 2, 5]}
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
      <City position={[38.75, 0.15, 38.75]} />
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
        <primitive key={`cloud-${index}`} object={cloud} />
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
  const greenShades = ["#4d7945", "#456b3e", "#486f3f", "#476f3e", "#446b3c"];
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * greenShades.length);

  // Select a random color from the greenShades array
  const color = greenShades[randomIndex];

  const material = useMemo(() => {
    return new THREE.SpriteMaterial({ map: spriteMap, color: color });
  }, [spriteMap, color]);

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
  const greenShades = ["#4d7945", "#456b3e", "#486f3f", "#476f3e", "#446b3c"];
  // Generate a random index
  const randomIndex_color = Math.floor(Math.random() * greenShades.length);

  // Select a random color from the greenShades array
  const color = greenShades[randomIndex_color];

  const material = useMemo(() => {
    return new THREE.SpriteMaterial({ map: spriteMap, color: color });
  }, [spriteMap, color]);

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
        color: "#c3c2ab",
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
    () => boardLoader.load("/assets/bar-BG.png"),
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
  const [cameraPosition, setCameraPosition] = useLocalStorage<[number, number, number]>("CameraPosition", [700, 250, 100]);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
      cameraHelper.update();
      setCameraPosition([controlsRef.current.object.position.x, controlsRef.current.object.position.y, controlsRef.current.object.position.z]);
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
  const [cameraPosition] = useLocalStorage<[number, number, number]>("CameraPosition", [700, 250, 100]);
 
  useEffect(() => {
    camera.position.set(...cameraPosition);
  }, [cameraPosition]);
  
  return <primitive object={camera} />;
};
const ConfirmationModal = ({
  isActive,
  setIsActive,
  position,
  onConfirm,
  onCancel,
}: {
  isActive: any
  setIsActive: any;
  position: any;
  onConfirm: any;
  onCancel: any;
}) => {
  const { camera } = useThree();
  const groupRef: any = useRef();
  const [buttonYesHighlight, setButtonYesHighlight] = useState(true);
  const [buttonNoHighlight, setButtonNoHighlight] = useState(true);
  const [isActive_1, setIsActive_1] = useState(false);

  useEffect (()=>{setIsActive_1(isActive)},[ setIsActive])

  useFrame(() => {
    groupRef.current.lookAt(camera.position);
  });


  const modalStyle: React.CSSProperties = {
    width: "75vw",
    height: "65vh",
    backgroundImage: "url('/assets/TravelModalBG.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    zIndex: 9999,
    cursor: "url('/assets/cursor_menu.png'),auto",
    opacity: isActive_1 ? 1 : 0,
    filter: isActive_1 ? 'blur(0) sepia(0%) brightness(1)' : 'blur(10px) sepia(50%) brightness(1.1)',
    transition : "all 0.25s ease-in-out"
  };

  const contentStyle: React.CSSProperties = {
    margin: "auto",
    cursor: "url('/assets/cursor_menu.png'),auto",
  };

  const questionStyle: React.CSSProperties = {
    fontSize: "4em",
    color: "whitesmoke",
    padding: "1em",
    filter: "drop-shadow(0 0 1rem purple)",
    cursor: "url('/assets/cursor_menu.png'),auto",
    textShadow:
      "-1px -1px 0 #2d1b4a, 1px -1px 0 #2d1b4a, -1px 1px 0 #2d1b4a, 1px 1px 0 #2d1b4a",
  };
  const ButtonStyle_1: React.CSSProperties = {
    cursor: "url('/assets/cursor_menu_highlight.png'),auto",
    backgroundImage: buttonYesHighlight
      ? "url('/assets/YesBG.png')"
      : "url('/assets/YesBG_highlight.png')",
    backgroundSize: "cover",
    backgroundPosition: "100%, 100%",
    fontFamily: "VersalFilled-y1r3",
    fontSize: ".75em",
    borderRadius: "10px",
    border: buttonYesHighlight ? "double #2d1b4a 3px" : "solid orange 1px",
    textAlign: "center",
    color: buttonYesHighlight ? "#2d1b4a" : "#ffe7a1",
    width: "3em",
    textShadow: buttonYesHighlight
      ? "-1px -1px 0 whitesmoke, 1px -1px 0 whitesmoke, -1px 1px 0 whitesmoke, 1px 1px 0 whitesmoke"
      : "-1px -1px 0 orange, 1px -1px 0 orange, -1px 1px 0 orange, 1px 1px 0 orange",

    filter: buttonYesHighlight
      ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)"
      : "drop-shadow(0 0 .5rem #CC5500) brightness(110%)saturate(110%) ",

  };
  const ButtonStyle_2: React.CSSProperties = {
    cursor: "url('/assets/cursor_menu_highlight.png'),auto",
    backgroundImage: buttonNoHighlight
      ? "url('/assets/YesBG.png')"
      : "url('/assets/YesBG_highlight.png')",
    backgroundSize: "cover",
    backgroundPosition: "100%, 100%",
    fontFamily: "VersalFilled-y1r3",
    fontSize: ".75em",
    borderRadius: "10px",
    border: buttonNoHighlight ? "double #2d1b4a 3px" : "solid orange 1px",
    textAlign: "center",
    color: buttonNoHighlight ? "#2d1b4a" : "#ffe7a1",
    width: "3em",
    textShadow: buttonNoHighlight
      ? "-1px -1px 0 whitesmoke, 1px -1px 0 whitesmoke, -1px 1px 0 whitesmoke, 1px 1px 0 whitesmoke"
      : "-1px -1px 0 orange, 1px -1px 0 orange, -1px 1px 0 orange, 1px 1px 0 orange",

    filter: buttonNoHighlight
      ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)"
      : "drop-shadow(0 0 .5rem #CC5500) brightness(110%)saturate(110%) ",

  };

  return (
    <group ref={groupRef} position={position}>
      <Html>
        <div className="confirmation-modal" style={modalStyle}>
          <div className="modal-content" style={contentStyle}>
            <div className="question" style={questionStyle}>
              <div style={{ fontFamily: "VersalFilled-y1r3" }}>
                Venture forth< span style={{fontFamily:"Lucida Handwriting"}}>?</span>
              </div>
            </div>
            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "3em",
              }}
              
            >
              <button
                style={ButtonStyle_1}
                onPointerEnter={() => {
                  setButtonYesHighlight(false);
                }}
                onPointerLeave={() => {
                  setButtonYesHighlight(true);
                }}
                onClick={onConfirm}
              >
                Yes
              </button>
              <button
                style={ButtonStyle_2}
                onPointerEnter={() => {
                  setButtonNoHighlight(false);
                }}
                onPointerLeave={() => {
                  setButtonNoHighlight(true);
                }}
                onClick={onCancel}
              >
                No
              </button>
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

const Grid = ({ selectedGridSquare, setSelectedGridSquare, showBattleEvent, setShowBattleEvent  } : {selectedGridSquare : any, setSelectedGridSquare : any, showBattleEvent : any, setShowBattleEvent : any }) => {
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
 
  const [eventNum, setEventNum] = useState<any>(3);
  const [showScenarioEvent, setShowScenarioEvent] = useState<boolean>();
  const { setInfo } = useContext<any>(BattleStateContext);
  const { ToggleTravel, setToggleTravel } = useToggleTravelContext();
  const [isActive, setIsActive] = useState(true); // Add this line

  useEffect(() => {
    console.log("Selected GridSquare: X:", LocationX, "Y:", LocationY);
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

    if (event.detail === 2) {

      setDoubleClickIndex(null);
      setIsRayIntersectionEnabled(true);
      setSelectedGridSquare(null); // Reset the selected grid square
    } else if (event.detail === 1) {

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

      setOrbPosition(newPosition);
      setIsActive(true);
      const intersectedSquares = countIntersectedSquares(
        orbPosition,
        newPosition
      );
      const HoursTraveled = intersectedSquares * 3.4286;
      const HoursTraveledRounded = Math.floor(HoursTraveled);
      console.log("Hours Traveled:", HoursTraveledRounded);
      setLocationX(newPosition[0]);
      setLocationY(newPosition[1]);

      setDoubleClickIndex(null);
      setIsRayIntersectionEnabled(true);
      setSelectedGridSquare(null); // Reset the selected grid square

      // The following code will be executed after the state has been updated
      setEventNum((prevEventNum: any) => {
        console.log("The Event Number is", prevEventNum);
        if (prevEventNum === 1) {
          setShowBattleEvent(true);
        } else if (prevEventNum === 2) {
          setShowScenarioEvent(true);
        } else null;

        // Generate a new event number for the next time
        return GenerateEvents();
      });

      setDoubleClickIndex(null);
      setIsRayIntersectionEnabled(true);
      setSelectedGridSquare(null); // Reset the selected grid square
      const newToggleTravelValue = !ToggleTravel;
      setToggleTravel(newToggleTravelValue);
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
      {ToggleTravel &&
        Array.from({ length: 20 }).map((_, rowIndex) =>
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
        isActive={isActive}
        setIsActive={setIsActive}
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
  const [loadingTime, setLoadingTime] = useState<any>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const { ToggleTravel, setToggleTravel } = useToggleTravelContext();
  const startTime = useRef<number>(0);
  const { LocationX, LocationY } = useLocationContext();
  const rotation = new THREE.Euler(-Math.PI * 0.5, 0, 0);
  const [selectedGridSquare, setSelectedGridSquare] = useState<[number, number] | null>(null);
  const [showBattleEvent, setShowBattleEvent] = useState<boolean>(false);
  const [isBattleReady, setIsBattleReady] = useState(false);

  const SetBackground = () => {
    const { scene } = useThree();
    useEffect(() => {
      scene.background = new THREE.Color("#a4c8ff"); // replace with your desired color or texture
    }, [scene]);
    return null;
  };

  // Use useCallback to memoize the toggleGrid function
  const toggleTravel = useCallback(() => {
    const newToggleTravelValue = !ToggleTravel;
    setToggleTravel(newToggleTravelValue);
  }, [ToggleTravel]);


  useEffect(() => {
    const loadData = async () => {
      startTime.current = performance.now();
      const delay = 3300; // Replace with your desired loading time in milliseconds

      const progressInterval = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress + 0.5);
      }, 14);

      // Perform your actual loading logic here
      // For example, fetching data from an API or loading external resources
      await new Promise((resolve) => setTimeout(resolve, delay));

      const endTime = performance.now();
      const calculatedLoadingTime = endTime - startTime.current;
      setLoadingTime(calculatedLoadingTime);
      clearInterval(progressInterval);
      setIsReady(true);
      console.log();
      if (loadingTime >= 2000) {
        setShowCanvas(true);
      }
    };
    if (showCanvas === true) {
      setShowCanvas(false);
    }
    loadData();
  }, [isReady]);

  useEffect(() => {
    if (showBattleEvent) { // Assuming showBattleEvent is triggered when User selects "fight"
      setIsBattleReady(false); // Set isBattleReady to false to show the loader
      const delay = 2000; // Set your desired loading time in milliseconds
      setTimeout(() => {
        setIsBattleReady(true); // Set isBattleReady to true to show the Battle and BattleStage components
      }, delay);
    }
  }, [showBattleEvent]); // This effect depends on the showBattleEvent state

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
    setLoadingProgress(0);
    setLoadingTime(0);
    setIsReady(false);
    setShowCanvas(false);
  };

  const forestComponents = useMemo(() => {
    return forestPositions.map((pos, index) => (
      <>
        <Forest
          key={`forest-${index}`}
          numberOfTrees={4000}
          areaSize={52}
          position={pos}
        />
      </>
    ));
  }, [forestPositions]);

  const forestComponents1 = useMemo(() => {
    return forestPositions1.map((pos, index) => (
      <>
        <Forest
          key={`forest1-${index}`}
          numberOfTrees={1500}
          areaSize={52}
          position={pos}
        />
      </>
    ));
  }, [forestPositions1]);
  const forestComponents2 = useMemo(() => {
    return forestPositions2.map((pos, index) => (
      <>
        <Forest
          key={`forest2-${index}`}
          numberOfTrees={1500}
          areaSize={39}
          position={pos}
        />
      </>
    ));
  }, [forestPositions2]);

  const WoodlandComponents = useMemo(() => {
    return shrubPositions.map((pos, index) => (
      <>
        <MemoizedFerns
          key={`shrub-${index}`}
          numberOfTrees={800}
          areaSize={40}
          position={pos}
        />
      </>
    ));
  }, [shrubPositions]);
  const WoodlandComponents1 = useMemo(() => {
    return shrubPositions1.map((pos, index) => (
      <>
        <MemoizedFerns
          key={`shrub1-${index}`}
          numberOfTrees={900}
          areaSize={40}
          position={pos}
        />
      </>
    ));
  }, [shrubPositions1]);

  const [cursorStyle, setCursorStyle] = useState(
    "url('/assets/cursor.png'),crosshair"
  );

  return (
    <>
      <style>
        {`
      @font-face {
        font-family: 'VersalFilled-y1r3';
        src: url('assets/VersalFilled-y1r3.ttf') format('opentype');
      }
    
    `}
      </style>
      {!isReady ? (
        <div
          style={{
            backgroundImage: "url('/assets/map_bg.png')",
            backgroundSize: "100% 100%", // or '100% 100%' for non-uniform scaling
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // ensure the container takes the full viewport height
            cursor: "url('/assets/cursor-loading.png'),auto",
       
          }}
        >
          <CircularProgress progress={loadingProgress} />
        </div>
      ) : info ? (
        <>
          <BattleStage />
          <Battle onClose={resetLoading} />
        </>
      ) : (
        <div
          onPointerDown={() =>
            setCursorStyle("url('/assets/cursor-click.png'),crosshair")
          }
          onPointerUp={() =>
            setCursorStyle("url('/assets/cursor.png'),crosshair")
          }
          onClick={() => {
            setCursorStyle("url('/assets/cursor-click.png'),auto");
            setTimeout(() => {
              setCursorStyle("url('/assets/cursor.png'),auto");
            }, 1);
          }}
          style={{
            cursor: "url('/assets/cursor_menu.png'),auto",
            opacity: showCanvas ? 1 : 0,
            transition: "opacity 1s ease-in, filter 1s ease-in",
            filter: showCanvas
              ? "blur(0px)brightness(100%)"
              : "blur(25px)brightness(200%)",
            backgroundImage: showCanvas
              ? "url('/assets/map_bg2.png')"
              : "url('/assets/map_bg.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "7%",
              backgroundImage:'url(/assets/button_Menu_BG.png)',
              backgroundSize: '100% auto',
              backgroundRepeat: 'repeat-y',
              padding:'.25rem',
              margin:'.5rem',
              borderRadius:'1rem',
              border: '3px double transparent',
              boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.25)',
              opacity: showCanvas ? 1 : 0,
              transition: "opacity 2s ease-out",
           
         
            }}
          >
            <button
              style={{
                background: "none",
                textDecoration: "none",
                border: "none",
                cursor: "url('/assets/cursor_menu.png'),auto",
                pointerEvents: selectedGridSquare || showBattleEvent ? 'none' : 'auto',
                filter: showCanvas
                ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)"
                : "drop-shadow(0 0 .5rem #CC5500) brightness(200%)saturate(200%)",
                transition: "filter 2s ease-out",
                transitionDelay: '.50s'

              }}
            >
              <img
                src="/assets/fast_travel_button.png"
                onClick={toggleTravel}
                alt="Toggle Grid"
                style={{
                  transition: "opacity .25s ease-out, filter 1s ease-out",
                  width: "100%",
                  filter: ToggleTravel
                    ? "drop-shadow(0 0 .5rem #CC5500) brightness(200%)saturate(200%)"
                    : "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)",

                  cursor: "url('/assets/cursor_menu_highlight.png'),auto",
                }}
              />
            </button>
            <button
              style={{
                background: "none",
                textDecoration: "none",
                border: "none",
                cursor: "url('/assets/cursor_menu.png'),auto",
                filter: showCanvas
                ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)"
                : "drop-shadow(0 0 .5rem #CC5500) brightness(200%)saturate(200%)",
                transition: "filter 2s ease-in-out",
                transitionDelay: '.50s'
              }}
            >
              <img
                src="/assets/camp_button.png"
                alt=""
                style={{
                  transition: "opacity 1.25s ease-in, filter .75s ease-in",
                  width: "100%",
                  opacity: showCanvas ? 1 : 0,
                  cursor: "url('/assets/cursor_menu_highlight.png'),auto",
                }}
              />
            </button>
            <button
              style={{
                background: "none",
                textDecoration: "none",
                border: "none",
                cursor: "url('/assets/cursor_menu.png'),auto",
                filter: showCanvas
                ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)"
                : "drop-shadow(0 0 .5rem #CC5500) brightness(200%)saturate(200%)",
                transition: "filter 2s ease-out",
                transitionDelay: '.50s'
              }}
            >
              <img
                src="/assets/inventory_button.png"
                alt=""
                style={{
                  transition: "opacity 1.25s ease-in, filter .75s ease-in",
                  maxWidth: "100%",
                  opacity: showCanvas ? 1 : 0,
                  cursor: "url('/assets/cursor_menu_highlight.png'),auto",
                }}
              />
            </button>
            <button
              style={{
                background: "none",
                textDecoration: "none",
                border: "none",
                cursor: "url('/assets/cursor_menu.png'),auto",
                filter: showCanvas
                ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%) "
                : "drop-shadow(0 0 .5rem #CC5500) brightness(200%)saturate(200%)",
                transition: "filter 2s ease-out",
                transitionDelay: '.50s'
              }}
            >
              <img
                src="/assets/journal_button.png"
                alt=""
                style={{
                  transition: "opacity 1.25s ease-in, filter .75s ease-in",
                  maxWidth: "100%",
                  opacity: showCanvas ? 1 : 0,
                  cursor: "url('/assets/cursor_menu_highlight.png'),auto",
                }}
              />
            </button>
            <button
              style={{
                background: "none",
                textDecoration: "none",
                border: "none",
                cursor: "url('/assets/cursor_menu.png'),auto",
                filter: showCanvas
                ? "drop-shadow(0 0 0 #CC5500) brightness(100%)saturate(100%)"
                : "drop-shadow(0 0 .5rem #CC5500) brightness(200%)saturate(200%)",
                transition: "filter 2s ease-out",
                transitionDelay: '.50s'
              }}
            >
              <img
                src="/assets/character_button.png"
                alt=""
                style={{
                  transition: "opacity 1.25s ease-in, filter .75s ease-in",
                  maxWidth: "100%",
                  opacity: showCanvas ? 1 : 0,
                  cursor: "url('/assets/cursor_menu_highlight.png'),auto",
                }}
              />
            </button>

            {/* <button onClick={toggleCreateCharacterSheet}>{showCreateCharacter ? "Close" : "Character Creation"}</button>
      <button onClick={toggleCharacterSheet}>{showCharacter ? "Close" : "Character"}</button> */}
          </div>

          <Canvas
            performance={{ min: 0.5, max: 1, debounce: 200 }}
            style={{
              width: "85vw",
              height: "65vh",
              border: '3px double transparent',
              boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.25)',
              borderRadius: "1rem",
              opacity: showCanvas ? 1 : 0,
              cursor: cursorStyle,
              margin:'.5rem',
              transition: "opacity 1s ease-in, filter 2s ease-out",
              filter: showCanvas
                ? "blur(0px) invert(0)contrast(112%) Sepia(0.25) brightness(1.12)"
                : "blur(50px) invert(100%) contrast(2) Sepia(100%) brightness(2) ",
              flexBasis: "75%",
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
            <Grid selectedGridSquare={selectedGridSquare} setSelectedGridSquare={setSelectedGridSquare} showBattleEvent={showBattleEvent} setShowBattleEvent={setShowBattleEvent} />
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
  
              <Noise opacity={0.01} />
            </EffectComposer>

            {forestComponents}
            {forestComponents1}
            {forestComponents2}
            {WoodlandComponents}
            {WoodlandComponents1}

          </Canvas>
          <section style={{
            position: "absolute",
          left:"15%",    
         width: "75vw",
         height: "68vh",
         
        
         borderRadius: "1rem",
         opacity: showCanvas ? .75 : 0,
         cursor: cursorStyle,
         margin:'.5rem',
         transition: "opacity 1s ease-in, filter 2s ease-out",
         filter: showCanvas
           ? "blur(0px) invert(0)contrast(112%) Sepia(0.25) brightness(1.12)"
           : "blur(50px) invert(100%) contrast(2) Sepia(100%) brightness(2) ",
      

 overflow: "hidden",
 padding: "1em", // Adjust this value to control the border size

 background: "url('/assets/map_bg2_COVER.png')",
 backgroundRepeat: "no-repeat", // This sets the background image
 backgroundPosition: 'center',
 backgroundSize: "100% 100%" // This makes the background image scale nicely within the border
}}/>
        </div>
      )}

      {showCreateCharacter && <CreateCharacter />}
      {showCharacter && <Character />}
    </>
  );
};
export default App;
