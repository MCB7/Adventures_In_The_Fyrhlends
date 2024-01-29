import * as THREE from "three";
import { useLoader,useFrame } from "@react-three/fiber";
import * as React from "react";
import { useMemo } from "react";

class AnimatedSprite {
  texture: THREE.Texture;
  tilesHorizontal: number;
  tilesVertical: number;
  numberOfTiles: number;
  currentTile: number;

  constructor(texture: THREE.Texture, tilesHoriz: number, tilesVert: number, numTiles: number) {
    this.texture = texture;
    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    this.numberOfTiles = numTiles;
    this.currentTile = 0;

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
  }

  update(delta: number) {
    let tile = Math.floor(this.currentTile);
    let xPos = (tile % this.tilesHorizontal) / this.tilesHorizontal;
    let yPos = Math.floor(tile / this.tilesHorizontal) / this.tilesVertical;
    this.texture.offset.set(xPos, yPos);
    this.currentTile += 1;
    delta
    if (this.currentTile > this.numberOfTiles) {
      this.currentTile = 0;
    }
  }
}

const DeerHerd: React.FC = () => {


  const deerTexture = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/mire/backdrop/pill_sheet.png"
  );
  const RaptorTexture = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/mire/backdrop/cent_sheet.png"
  );
  const birdTexture = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/forest/backdrop/bird_sheet.png"
  );

    const beetleTexture = useLoader(
      THREE.TextureLoader,
      "/assets/stage_enviro/mire/backdrop/beet_sheet.png"
    )

  const deerSprite = useMemo(() => new AnimatedSprite(deerTexture, 3, 1, 3), [deerTexture]);
  const raptorSprite = useMemo(() => new AnimatedSprite(RaptorTexture, 3, 1, 3), [RaptorTexture]);
  const birdSprite = useMemo(() => new AnimatedSprite(birdTexture, 2, 1, 2), [birdTexture]);
  const beetleSprite = useMemo(() => new AnimatedSprite(beetleTexture, 3, 1, 3), [beetleTexture]);


  const [Position, setPosition] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPosition((prevPosition) => {
        if (prevPosition <= -100) {
          // Reset the position to the initial value (e.g., 0)
          return 0;
        }
        return prevPosition - 0.1;
      });
    }, 20);
  
    return () => {
      clearInterval(id);
    };
  }, []);
 
  useFrame(({ clock }) => {
  const delta = clock.getElapsedTime();
  deerSprite.update(delta);
  raptorSprite.update(delta);
  birdSprite.update(delta);
  beetleSprite.update(delta);
  });

  const Deer = React.memo((props: any) => {
    const spriteMaterial = useMemo(() => new THREE.SpriteMaterial({ 
        map: deerSprite.texture,
        color: new THREE.Color('#39534f')
        }), [deerSprite.texture]);
    const sprite = useMemo(() => new THREE.Sprite(spriteMaterial), [spriteMaterial]);

    sprite.scale.set(.75, .75, 1); // Adjust as needed

    return <primitive object={sprite} {...props} />;
  });

  const Raptor = React.memo((props: any) => {
    const spriteMaterial = useMemo(() => new THREE.SpriteMaterial({ 
        map: raptorSprite.texture,
        color: new THREE.Color('#5d6055')
        }), [raptorSprite.texture]);
    const sprite = useMemo(() => new THREE.Sprite(spriteMaterial), [spriteMaterial]);

    sprite.scale.set(2.5, 1, 1); // Adjust as needed

    return <primitive object={sprite} {...props} />;
  });

  const Bird = React.memo((props: any) => {
    const spriteMaterial = useMemo(() => new THREE.SpriteMaterial({ 
        map: birdSprite.texture,
        color: new THREE.Color('#022a07')
        }), [birdSprite.texture]);
    const sprite = useMemo(() => new THREE.Sprite(spriteMaterial), [spriteMaterial]);

    sprite.scale.set(2, 1, 1); // Adjust as needed

    return <primitive object={sprite} {...props} />;
  });

  const Beetle = React.memo((props: any) => {
    const spriteMaterial = useMemo(() => new THREE.SpriteMaterial({ 
        map: beetleSprite.texture,
        color: new THREE.Color('#022a07')
        }), [beetleSprite.texture]);
    const sprite = useMemo(() => new THREE.Sprite(spriteMaterial), [spriteMaterial]);

    sprite.scale.set(2, 2, 2); // Adjust as needed

    return <primitive object={sprite} {...props} />;
  });



 

  return (
    <>

<group position={[Position, 0, 1]}>
        
      <Deer position={[8, -1.85, -.85]} />
      <Deer position={[20, -2, -.95]} />
      <Deer position={[15, -2, 1]} />


      <Raptor position={[55, -.75, 1.79]}/>
      <Raptor position={[60, -.75, 1.82]}/>
      <Raptor position={[62, -.75, 2.85]}/>
      <Raptor position={[65, -.75, -4.5]}/>
      <Raptor position={[70, -.75, 3]}/>
      <Raptor position={[75, -.75, 2.95]}/>
      
      
      <Bird position={[25, 3, -1.5]}/>
      <Bird position={[28, 3, -.75]}/>
      
      <Beetle position={[20, -1, -7]}/>
      <Beetle position={[25, -1.1, -4.75]}/>
      <Beetle position={[30, -1.2, -5.75]}/>
      <Beetle position={[35, -1.3, -6.75]}/>
      <Beetle position={[38, -1.5, -6.75]}/>
      <Beetle position={[40, -1, -7.75]}/>
      

      </group>
    
    </>
  );
};

export default DeerHerd;
