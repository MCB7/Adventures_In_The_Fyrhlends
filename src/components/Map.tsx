import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useThree, extend, useFrame, useLoader  } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CameraHelper,  } from 'three';
import { Plane, useTexture, Html, Sky} from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLocationContext } from "../context/LocationContext";
import {BiomeGenerator} from './BiomeGenerator';


const Model = () => {
  const gltf = useLoader(GLTFLoader, 'src/assets/Tower.gltf')
  return <primitive object={gltf.scene}  position={[38, -0.5, 39]} scale={.5} rotate={[1,0,0]}  castShadow receiveShadow />
}
const City = ({ position } : {position: any}) => {
  const gltf = useLoader(GLTFLoader, 'src/assets/city.gltf');
  return useMemo(() => <primitive object={gltf.scene} position={position} scale={4} rotate={[1, 0, 0]}  castShadow receiveShadow />, [gltf.scene, position]);
};
const MultipleCities = () => {
  return (
    <>
      <City position={[38.5, 0.25, 38.5]} />
      
    </>
  );
};

const Clouds = () => {
  const [cloudTexture] = useState(() => useLoader(THREE.TextureLoader, 'src/assets/cloud.png'));
  const [clouds, setClouds] = useState<THREE.Mesh[] >([]);

    useFrame(() => {
    clouds.forEach((cloud) => {
      cloud.position.x += 0.01;
      cloud.position.z += 0.01;

      // Wrap around if out of bounds
      if (cloud.position.x > 100) cloud.position.x = -100;
      if (cloud.position.z > 100) cloud.position.z = -100;
    });
  });

  const createCloud = () => {
    const cloud = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ map: cloudTexture, transparent: true, opacity: 0.5,  })
    );

    cloud.position.x = Math.random() * 200 - 100;
    cloud.position.y = Math.random() * 50 + 50;
    cloud.position.z = Math.random() * 200 - 100;
    cloud.rotation.x = -Math.PI / 2;
    cloud.scale.set(.75, 1, .75);
    return cloud;
  };

  useEffect(() => {
    const newClouds = Array.from({ length: 2 }, createCloud);
    setClouds(newClouds);
  }, []);

  return (
    <group>
      <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]} >
        <meshBasicMaterial attach="material"  map={cloudTexture} side={THREE.DoubleSide}   />
      </Plane>
      {clouds.map((cloud, index) => (
        <primitive key={index} object={cloud} />
      ))}
    </group>
  );
};


const Bird = ({ position } : { position : any }) => {
  const birdRef : any = useRef();
  const texture = new THREE.TextureLoader().load("src/assets/bird.png");
// Generate a random offset for each bird
  const offsetX = Math.random() * 10;
  const offsetY = Math.random() * 10;


  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const radius = 25;
    const angle = elapsedTime * 0.5; // Adjust the speed of movement

    // Calculate the unique position for each bird
    const x = Math.cos(angle + offsetX) * radius + position.x;
    const z = Math.sin((angle + offsetY) * 3) * radius / 3 + position.z; // Adjust the shape of the figure-eight

    birdRef.current.position.x = x;
    birdRef.current.position.y = 25;
    birdRef.current.position.z = z;

    // Calculate the rotation to face the direction of movement
    const rotationAngle = Math.atan2(position.x - x, position.z - z);
    birdRef.current.rotation.y = rotationAngle;

    // Calculate the quaternion rotation to face a certain direction
    const targetDirection = new THREE.Vector3(0, 0, 1); // Set the target direction vector
    const currentDirection = new THREE.Vector3(Math.sin(rotationAngle), 0, -Math.PI/ 2); // Calculate the current direction vector based on the rotation angle
    const quaternion = new THREE.Quaternion().setFromUnitVectors(currentDirection, targetDirection);
    birdRef.current.quaternion.copy(quaternion);

    // Flap the wings
    const wingAngle = Math.sin(elapsedTime * 10) * Math.PI / 5; // Adjust the wing flapping speed and angle
    birdRef.current.rotation.z += wingAngle;

    // Constrain the roll and flip of the sprite
    birdRef.current.rotation.x = THREE.MathUtils.clamp(birdRef.current.rotation.x, -Math.PI / 4, Math.PI / 4);
    birdRef.current.rotation.z = THREE.MathUtils.clamp(birdRef.current.rotation.z, -Math.PI / 4, Math.PI / 4);
  });
  return (
    <mesh ref={birdRef} rotation={[0, 0, 0]} scale={.45}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} color="brown" side={THREE.DoubleSide} transparent />
    </mesh>
  );
};


// Define a Tree component
const Tree = (props : any) => {
  // Load the sprite texture
  const spriteMap = useLoader(THREE.TextureLoader, 'src/assets/Forest_Tree.png');
  const material = new THREE.SpriteMaterial({ map: spriteMap,  color: 'DarkOliveGreen' });

  // Create sprite
  const sprite = new THREE.Sprite(material);

  // Scale the sprite
  sprite.scale.set(.75, 1.25, 2);

  return <primitive object={sprite} {...props} />;
};

// Define a Forest component
const Forest = ({ numberOfTrees, areaSize, position } : { numberOfTrees : any , areaSize : any, position : any }) => {
  const trees = useMemo(() => {
    const tempTrees = [];
    for(let i = 0; i < numberOfTrees; i++) {
      const angle = (i / (numberOfTrees / 2)) * Math.PI; // Calculate the angle at which the tree will be placed.
      const radius = Math.sqrt(Math.random()) * areaSize / 2; // Calculate the radius at which the tree will be placed.
      const x = radius * Math.cos(angle); // Calculate the x position of the tree.
      const y = .75;
      const z = radius * Math.sin(angle); // Calculate the z position of the tree.
      tempTrees.push(<Tree position={[x, y, z]} key={i} />);
    }
    return tempTrees;
  }, [numberOfTrees, areaSize]);

  return (
    <group position={position}>
      {trees}
    </group>
  );
};
// Define a Tree component
const Fern = (props : any) => {
  const spriteMaps = [
    useLoader(THREE.TextureLoader, 'src/assets/isometric_pine_tree_by_banok_d73cis4-fullview.png'),
    useLoader(THREE.TextureLoader, 'src/assets/deym7tf8.png'),
    useLoader(THREE.TextureLoader, 'src/assets/hjm-randomized_forbs_02-alpha_0.png')
  ];

  // Select a random sprite texture
  const randomIndex = Math.floor(Math.random() * spriteMaps.length);
  const spriteMap = spriteMaps[randomIndex];
  const material = new THREE.SpriteMaterial({ map: spriteMap, color: 'DarkOliveGreen' });

  // Create sprite
  const sprite = new THREE.Sprite(material);

  // Scale the sprite
  sprite.scale.set(0.5, 1, 2);

  return <primitive object={sprite} {...props} />;
};

// Define a Forest component
const Ferns = ({ numberOfTrees, areaSize, position } : { numberOfTrees : any , areaSize : any, position : any }) => {
  const ferns = useMemo(() => {
    const tempTrees = [];
    for(let i = 0; i < numberOfTrees; i++) {
      const angle = (i / (numberOfTrees / 2)) * Math.PI; // Calculate the angle at which the tree will be placed.
      const radius = Math.sqrt(Math.random()) * areaSize / 2; // Calculate the radius at which the tree will be placed.
      const x = radius * Math.cos(angle); // Calculate the x position of the tree.
      const y = .75;
      const z = radius * Math.sin(angle); // Calculate the z position of the tree.
      tempTrees.push(<Fern position={[x, y, z]} key={i} />);
    }
    return tempTrees;
  }, [numberOfTrees, areaSize]);

  return (
    <group position={position}>
      {ferns}
    </group>
  );
};
const PlaneWithTexture = () => {
  const texture1 = useTexture('src/assets/bumpMap10.1.jpg');
  texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
  texture1.repeat.set(1, 1);
  const bumpMap = useTexture('src/assets/bump1Map3.png');
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(1, 1);

  const displacementMap = useLoader(THREE.TextureLoader, 'src/assets/DisMap3.png');

  displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(1, 1);

  return (
    <group>
          <mesh receiveShadow castShadow rotation={[-Math.PI / 2, 0, 0]} position={[0,0,0]}>
          <planeGeometry attach="geometry" args={[100, 100, 20, 25]} />
      <meshPhongMaterial color={'tan'} map={texture1} bumpMap={bumpMap} bumpScale={12}  displacementMap={displacementMap} displacementScale={8}  />

    </mesh>
    </group>
  );
};


extend({ OrbitControls });

const CameraControls = () => {
  
  const { camera, gl } = useThree();
  const controlsRef : any = useRef();
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
    controlsRef.current.dampingFactor = .08; // Adjust the damping factor for desired effect
    controlsRef.current.maxDistance = 200; // Remove the maximum distance limit
    controlsRef.current.minDistance = 50;
    THREE.MathUtils.degToRad(75);

    // Enable panning with mouse drag
    controlsRef.current.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    
    return () => {
    controlsRef.current.dispose();
    };
  }, [camera, gl.domElement]);

  return null; // Return null as we don't want this component to render any visible elements
};

const Camera = () => {
  
  const { camera } = useThree();
  return <primitive object={camera} position={[700, 250, 100]}/>;
};



const ConfirmationModal = ({ position, onConfirm, onCancel } : { position : any, onConfirm : any, onCancel : any }) => {
  const { camera } = useThree();
  const groupRef : any = useRef();

  useFrame(() => {
    groupRef.current.lookAt(camera.position);
  });

  const modalStyle: React.CSSProperties = {
    width: '25vw',
    height: 'auto',
    padding:"1em",
    backgroundColor: 'whitesmoke',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 9999,
  };

  const contentStyle: React.CSSProperties = {
    margin: 'auto',
  };

  const questionStyle: React.CSSProperties = {
    fontSize: '2em',
    color: 'darkgray',
    padding:'1em'
  };

  return (
    <group ref={groupRef} position={position}>
      <Html>
        <div className="confirmation-modal" style={modalStyle}>
          <div className="modal-content" style={contentStyle}>
            <div className="question" style={questionStyle}>Venture forth?</div>
            <div className="buttons" style={{display: 'flex', justifyContent: 'space-between', fontSize: '3em',}}>
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
}:{
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
      meshRef.current!.material.color.set('#228B22');
      meshRef.current!.material.opacity = 0.25;
      meshRef.current!.material.transparent = true;
      meshRef.current!.material.wireframe = false;

      // Create lime green outline using lineSegments if not already present
      if (!lineSegmentsRef.current) {
        const edgesGeometry = new THREE.EdgesGeometry(meshRef.current!.geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: '#228B22' });
        const lineSegments = new THREE.LineSegments(edgesGeometry, lineMaterial);
        lineSegments.name = 'lineSegments'; // Set a name for easy access
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
      <mesh receiveShadow ref={meshRef} onClick={onClick}  onDoubleClick={onDoubleClick}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.005} wireframe={false} />
      </mesh>
    </group>
  );
};

const Grid = () => {
  const {LocationX, LocationY, setLocationX, setLocationY } = useLocationContext();
  const rotation = new THREE.Euler(-Math.PI * 0.5, 0, 0);
  const [orbPosition, setOrbPosition] = useState<[number, number, number]>([LocationX, LocationY, -2]);
  const [doubleClickIndex, setDoubleClickIndex] = useState<any>(null);
  const [isRayIntersectionEnabled, setIsRayIntersectionEnabled] = useState(true);
  const [selectedGridSquare, setSelectedGridSquare] = useState<[number, number] | null>(null);
  
  console.log("Selected GridSquare: X:", LocationX, "Y:", LocationY);
  
  const handleGridSquareClick = (rowIndex: number, colIndex: number, event: React.PointerEvent | React.TouchEvent) => {
    const newPosition = [colIndex * 5 + 2.5, rowIndex * 5 + 2.5, -2]; // Adjust the newPosition calculation based on your grid's coordinate system
    if ('touches' in event) {
      // Touch event handling
      const touchEvent = event as React.TouchEvent;
      if (touchEvent.touches.length === 1) {
        // Single tap action
        setDoubleClickIndex(null);
        setIsRayIntersectionEnabled(true);
        setSelectedGridSquare(null); // Reset the selected grid square
      } else if (touchEvent.touches.length === 2) {
        // Double tap action
        if (newPosition[0] !== orbPosition[0] || newPosition[1] !== orbPosition[1] || newPosition[2] !== orbPosition[2]) {
          setDoubleClickIndex([rowIndex, colIndex]);
          setIsRayIntersectionEnabled(false);
          setSelectedGridSquare([rowIndex, colIndex]); // Set the selected grid square
        }
      }
    } else {
      // Pointer event handling
      const pointerEvent = event as React.PointerEvent;
      if (pointerEvent.detail === 2 ) {
        // Single click action
        setDoubleClickIndex(null);
        setIsRayIntersectionEnabled(true);
        setSelectedGridSquare(null); // Reset the selected grid square
      } else if (pointerEvent.detail === 1 )  {
        // Double click action
        if (newPosition[0] !== orbPosition[0] || newPosition[1] !== orbPosition[1] || newPosition[2] !== orbPosition[2]) {
          setDoubleClickIndex([rowIndex, colIndex]);
          setIsRayIntersectionEnabled(false);
          setSelectedGridSquare([rowIndex, colIndex]); // Set the selected grid square
        }
      }
    }
  };
  // Our helper function that uses the supercover line algorithm
function countIntersectedSquares(start : any, end : any)  {
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
  } else {  // parallel to y
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
    const newPosition : any = [doubleClickIndex[1] * 5 + 2.5, doubleClickIndex[0] * 5 + 2.5, -2];

    if (newPosition[0] !== orbPosition[0] || newPosition[1] !== orbPosition[1] || newPosition[2] !== orbPosition[2]) {
      setOrbPosition(newPosition);
      const intersectedSquares = countIntersectedSquares(orbPosition, newPosition)
      const HoursTraveled = intersectedSquares*3.4286
      const HoursTraveledRounded = Math.floor(HoursTraveled);
      console.log(HoursTraveledRounded);

      setLocationX(newPosition[0]);
      setLocationY(newPosition[1]);
      console.log("Selected GridSquare: X:", LocationX, "Y:", LocationY);
        // Trigger the BiomeGenerator component here
        
    }
    
    setDoubleClickIndex(null);
    setIsRayIntersectionEnabled(true);
    setSelectedGridSquare(null); // Reset the selected grid square
 
  }
};

  const handleCancel = () => {

    setIsRayIntersectionEnabled(true);
    setSelectedGridSquare(null); // Reset the selected grid square
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
                ? 'lime' // Set the color to lime green if the grid square is selected
                : 'forestgreen'
            }
            onClick={(event: React.PointerEvent) => handleGridSquareClick(rowIndex, colIndex, event)}
            onDoubleClick={handleConfirm}
            isRayIntersectionEnabled={isRayIntersectionEnabled && !selectedGridSquare} // Disable ray intersection when a grid square is selected
     
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
    </group>
  );
};

const PlayerMapIcon = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [material, setMaterial] = useState<THREE.Material>(new THREE.MeshPhysicalMaterial({color: 'green'}));
  const [geometry, setGeometry] = useState<THREE.BufferGeometry>(new THREE.SphereGeometry(0.5, 32, 32));
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
        setGeometry(new THREE.BoxGeometry(5, 5, 5,)); 
        setMaterial(new THREE.MeshBasicMaterial({color: '#228B22', opacity: 0.25, transparent: true}));
        meshRef.current.scale.set(1, 1, 1); // Reset scale to original size
      } else {
        meshRef.current.position.lerp(targetPosition, 0.08);
        meshRef.current.scale.set(0.1, .1, 0); // Set scale to 0.25 of original size
        setMaterial(new THREE.MeshBasicMaterial({color: '#228B22', opacity: 1, transparent: true}));
      }
    }
  });

  // Add the outline when the geometry is updated
  useEffect(() => {
    if (meshRef.current && geometry instanceof THREE.BoxGeometry) {
      // Create lime green outline using lineSegments if not already present
      if (!lineSegmentsRef.current) {
        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: '#228B22' });
        const lineSegments = new THREE.LineSegments(edgesGeometry, lineMaterial);
        lineSegments.name = 'lineSegments'; // Set a name for easy access
        meshRef.current.add(lineSegments);
        lineSegmentsRef.current = lineSegments; // Store the lineSegments object in the ref
      }
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} material={material} geometry={geometry} />
  );}



const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [, setLoadingTime] = useState<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const startTime = useRef<number>(0);
  const {LocationX, LocationY} = useLocationContext();
  const rotation = new THREE.Euler(-Math.PI * 0.5, 0, 0);
  
  const toggleGrid = () => {
    setShowGrid((prevShowGrid) => !prevShowGrid);
  };

  useEffect(() => {
    const loadData = async () => {
      startTime.current = performance.now();
      const delay = 2000; // Replace with your desired loading time in milliseconds

      const progressInterval = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress + .5);
      }, 20);

      // Perform your actual loading logic here
      // For example, fetching data from an API or loading external resources
      await new Promise((resolve) => setTimeout(resolve, delay));

      const endTime = performance.now();
      const calculatedLoadingTime = endTime - startTime.current;
      setLoadingTime(calculatedLoadingTime);
      clearInterval(progressInterval);
      setIsReady(true);
      setTimeout(()=>{   setShowCanvas(true);},100)
   
    };

    loadData();
  }, []);

  const forestPositions = [
    [-20, 0.2, 25],
  ];
  const forestPositions1 = [
    [-7, 0.2, 25],
  ];
  const forestPositions2 = [
    [10, 0.2, 25],
  ];
  const shrubPositions = [
    [15, -0.2, -20],
    [15, -0.2, 5],
  ];

  const birdPositions = [
    { x: -10, z: 5 },
    { x: 20, z: -15 },
    { x: -5, z: -30 },
    { x: 30, z: 10 },
    { x: -25, z: -5 },
  ];

  return (
    <>
  
          {!isReady ? (
        <div>
          <h2>Loading...</h2>
          <div style={{ width: '50vw', height: '10px', backgroundColor: '#DDD' }}>
            <div
              style={{
                width: `${loadingProgress}%`,
                height: '100%',
                backgroundColor: '#000',
              }}
            />
          </div>
        </div>
      ) : (
          <Canvas   style={{
            width: '50vw',
            height: '50vh',
            backgroundColor: 'skyblue',
            opacity: showCanvas ? 1 : 0,
            transition: 'opacity .75s ease-in, filter .75s ease-in',
            filter: showCanvas ? 'blur(0px) contrast(1.25) Sepia(.2) brightness(1)' : 'blur(25px) contrast(2)Sepia(100%)brightness(2)',
          }}
          shadows gl={{ alpha: true }} camera={{ position: [0, 10, 10], fov: 20 }}>
        <fog attach="fog" args={['skyblue', 50, 375]}/>
        <CameraControls />
        <Camera />
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[10, 50, 10]}
          intensity={0.75}
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
          <Bird key={index} position={position} />
        ))}
        {forestPositions.map((pos, index) => (
          <Forest
            numberOfTrees={3000}
            areaSize={52}
            position={pos}
            key={index}
          />
        ))}
        {forestPositions1.map((pos, index) => (
          <Forest
            numberOfTrees={3000}
            areaSize={47}
            position={pos}
            key={index}
          />
        ))}
        {forestPositions2.map((pos, index) => (
          <Forest
            numberOfTrees={800}
            areaSize={26}
            position={pos}
            key={index}
          />
        ))}
        {shrubPositions.map((pos, index) => (
          <Ferns
            numberOfTrees={7000}
            areaSize={60}
            position={pos}
            key={index}
          />
        ))}
        <Clouds/>
        <Suspense fallback={null}>
          <Model />
          <MultipleCities />
        </Suspense>
        <group position={[-50, 5, 50]} rotation={rotation}>
        <PlayerMapIcon position={[LocationX, LocationY, -2]} />
        </group>
        <BiomeGenerator />
      </Canvas>
      )}
            <button onClick={toggleGrid}>
        {showGrid ? "Close" : "Travel"}
      </button>
      </>
    );
  };

export default App;