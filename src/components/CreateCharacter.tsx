import React, { useState, useEffect, useRef } from "react";
import { useLoader, Canvas, useThree } from "@react-three/fiber";
import { useCharacterContext } from "../context/CharacterContext";
import { useStatsContext } from "../context/StatsContext";
import { TextureLoader } from "three";

const CreateCharacter: React.FC = () => {
  // Define the props for TexturedSprite component
  type TexturedSpriteProps = {
    texturePath: string;
    opacity: number;
    index: number;
    color?: string; // Optional color prop
  };

  const TexturedSprite = ({ texturePath, opacity, index, color }: TexturedSpriteProps) => {
    const texture = useLoader(TextureLoader, texturePath);
    const spriteRef = useRef<any>();

    useEffect(() => {
      if (spriteRef.current) {
        spriteRef.current.material.opacity = opacity;
      }
    }, [opacity]); // Depend on the opacity prop

    return (
      <sprite scale={[3, 3, 3]} ref={spriteRef}>
      <spriteMaterial color={color || "#c8bdae"} attach="material" map={texture} transparent />
    </sprite>
    );
  };

  const OpacityControls = ({
    opacities,
    setOpacities,
  }: {
    opacities: number[];
    setOpacities: React.Dispatch<React.SetStateAction<number[]>>;
  }) => {
    const handleOpacityChange = (index: number, value: string) => {
      const newOpacities = [...opacities];
      newOpacities[index] = parseFloat(value);
      setOpacities(newOpacities);
    };

    return (
      <div>
        {opacities.map((opacity, index) => (
          <input
            key={index}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => handleOpacityChange(index, e.target.value)}
          />
        ))}
      </div>
    );
  };

  // New code for react-three-fiber
  const [opacities, setOpacities] = useState(new Array(10).fill(1));
  const texturePaths = [
    "./assets/portraits/1.png",
    "./assets/portraits/2.png",
    "./assets/portraits/3.png",
    "./assets/portraits/4.png",
    "./assets/portraits/5.png",
    "./assets/portraits/6.png",
    "./assets/portraits/7.png",
    "./assets/portraits/8.png",
    "./assets/portraits/9.png",
    "./assets/portraits/male_age.png",
    "./assets/portraits/eye_color.png",

    // ... list all texture paths
  ];
  const clothingTextures = [
    "./assets/portraits/male_clothes_1.png",
    "./assets/portraits/male_clothes_2.png",
    "./assets/portraits/male_clothes_3.png",
    "./assets/portraits/male_clothes_4.png",
    "./assets/portraits/male_clothes_5.png",
  ];

  const hairTextures = [
    "./assets/portraits/male_hair_1.png",
    "./assets/portraits/male_hair_2.png",
    "./assets/portraits/male_hair_3.png",
    "./assets/portraits/male_hair_4.png",
    "./assets/portraits/male_hair_5.png",
    "./assets/portraits/male_hair_6.png",
    "./assets/portraits/male_hair_7.png",
    "./assets/portraits/male_hair_8.png",
    "./assets/portraits/male_hair_9.png",
    "./assets/portraits/male_hair_10.png",
    "./assets/portraits/male_hair_11.png",
    "./assets/portraits/male_hair_12.png",
  ];
  
  

  const [hairColor, setHairColor] = useState(getRandomColor());

useEffect(() => {
  setHairColor(getRandomColor());
}, []);

const HairSelector = ({ setSelectedHairIndex } : any) => (
  <div>
    {hairTextures.map((_, index) => (
      <button key={index} onClick={() => setSelectedHairIndex(index)}>
        Hair Style {index + 1}
      </button>
    ))}
  </div>
);
  
  const [selectedClothingTexture, setSelectedClothingTexture] = useState<string>(clothingTextures[0]);

  useEffect(() => {
    // Randomize clothing texture on component mount
    const randomIndex = Math.floor(Math.random() * clothingTextures.length);
    setSelectedClothingTexture(clothingTextures[randomIndex]);
  }, []);




  const { name, setName } = useCharacterContext();
  const { setStats } = useStatsContext();

  function randomizeTextures() {
    const textureKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Implicit keys based on texture order
    const opacities = new Array(textureKeys.length).fill(0); // Initialize all opacities to 0

    // Randomly select the "Base" texture
    const baseIndex = getRandomIntInclusive(0, textureKeys.length - 1);
    opacities[baseIndex] = 1; // Set base texture opacity to 100%

    // Randomly select "layer_1" texture
    let layer1Index = getRandomIntInclusive(
      baseIndex + 1,
      textureKeys.length - 1
    );
    if (layer1Index !== baseIndex) {
      opacities[layer1Index] = getRandomArbitrary(0.1, 0.5); // Set opacity between 0% and 50%
    }

    // Randomly select "layer_2" texture
    let layer2Index = getRandomIntInclusive(
      layer1Index + 1,
      textureKeys.length - 1
    );
    if (layer2Index !== baseIndex && layer2Index !== layer1Index) {
      opacities[layer2Index] = getRandomArbitrary(0.1, 0.5); // Set opacity between 0% and 50%
    }

    // Randomly select "layer_3" texture
    let layer3Index = getRandomIntInclusive(
      layer2Index + 1,
      textureKeys.length - 1
    );
    if (
      layer3Index !== baseIndex &&
      layer3Index !== layer1Index &&
      layer3Index !== layer2Index
    ) {
      opacities[layer3Index] = getRandomIntInclusive(0, 100) / 100; // Set opacity between 0% and 100%
    }

    return opacities;
  }

  function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Helper function to get a random number between two values
  function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  const simulateRollDice = () => {
    const roll = () => Math.floor(Math.random() * 20) + 1;
    const rolls = [roll(), roll(), roll(), roll(), roll(), roll()];
    const sum = rolls.reduce((acc, curr) => acc + curr, 0);
    const stats: any = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      wisdom: 0,
      intelligence: 0,
      charisma: 0,
    };
    for (let i = 0; i < sum; i++) {
      const statKeys = Object.keys(stats);
      const randomIndex = Math.floor(Math.random() * statKeys.length);
      const randomStat = statKeys[randomIndex];
      if (stats[randomStat] < 18) {
        stats[randomStat]++;
      }
    }
    setStats(stats);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRollDice = () => {
    simulateRollDice();
  };

    // State to store the random eye color
    const [eyeColor, setEyeColor] = useState<string>('#ffffff'); // default white, will be set on mount

    useEffect(() => {
      // Set a random color when the component mounts
      setEyeColor(getRandomColor());
    }, []);

  useEffect(() => {
    setOpacities(randomizeTextures());
  }, []);

  const [blinkOpacity, setBlinkOpacity] = useState(0.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkOpacity((prevOpacity) => (prevOpacity === 0.2 ? 0 : 0.2));
    }, 1400); // Change interval as desired for blink speed
    return () => clearInterval(interval);
  }, []);
  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
    // Define natural hair colors
  const naturalHairColors = [
    '#857f72', // Black
    '#2C222B', // Dark Brown
    '#71635A', // Medium Brown
    '#B7A69E', // Light Brown
    '#D6C4C2', // Blonde
    '#CABFB1', // Platinum Blonde
    '#DCD0BA', // White Blonde
    '#8D4A43', // Red
    '#A55728', // Ginger
  ];

  // Function to get a random natural hair color
  const getRandomNaturalHairColor = () => {
    return naturalHairColors[Math.floor(Math.random() * naturalHairColors.length)];
  };

  // State for selected hair index and color
  const [selectedHairIndex, setSelectedHairIndex] = useState(
    Math.floor(Math.random() * hairTextures.length) // Random default hair selection
  );
  

  // Effect hook for setting initial hair color and hair style
  useEffect(() => {
    setHairColor(getRandomNaturalHairColor()); // Set a random natural hair color
    setSelectedHairIndex(Math.floor(Math.random() * hairTextures.length)); // Randomize default hair selection
  }, []);
  

  return (
    <>
      <div>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>

      <div>
        <button onClick={handleRollDice}>Roll Dice</button>
      </div>
      <div>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <button onClick={handleRollDice}>Roll Dice</button>
      </div>

      {/* New JSX for react-three-fiber */}
      <Canvas
        performance={{ min: 0.5, max: 1, debounce: 200 }}
        style={{
          width: "15vw",
          height: "50vh",
          border: "double 3px tan",
          borderRadius: "1rem",
          margin: ".5rem",
          background:
            "linear-gradient(0deg, rgba(198,176,133,1) 0%, rgba(153,168,114,1) 16%, rgba(88,127,58,1) 51%, rgba(89,135,74,1) 51%, rgba(207,237,255,1) 52%, rgba(101,224,255,1) 100%)",
        }}
        shadows
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 10], fov: 20 }}
      >
      <group position={[0,-.25,0]}>
        {texturePaths.map((path, index) => (
          <TexturedSprite
            key={index}
            texturePath={path}
            opacity={opacities[index]}
            index={index}
            // Set the position closer to the camera
          />
        ))}
                {texturePaths.map((path, index) => (
          <TexturedSprite
            key={1}
            texturePath="./assets/portraits/eye_color.png"
            color={eyeColor}
            index={1}
            opacity={0.1}
            // Set the position closer to the camera
          />
        ))}
        {texturePaths.map((path, index) => (
          <TexturedSprite
            key={index}
            texturePath="./assets/portraits/blink.png"
            opacity={blinkOpacity}
            index={index}
            // Set the position closer to the camera
          />
        ))}
  <TexturedSprite
    texturePath={selectedClothingTexture}
    opacity={1} // Fully opaque
    index={texturePaths.length} // Assuming this is the topmost layer
  />
  {hairTextures.map((texturePath, index) => (
  <TexturedSprite
    key={`hair-${index}`}
    texturePath={texturePath}
    color={hairColor}
    opacity={index === selectedHairIndex ? 1 : 0}
    index={texturePaths.length + 1 + index} // Adjust index accordingly
  />
))}
<TexturedSprite
    texturePath="./assets/portraits/ear.png"
    opacity={1} // Fully opaque
    index={texturePaths.length} // Assuming this is the topmost layer
  />

  </group>

      </Canvas>
      <HairSelector setSelectedHairIndex={setSelectedHairIndex} />
      {/* <OpacityControls opacities={opacities} setOpacities={setOpacities} /> */}
    </>
  );
};

export default CreateCharacter;
