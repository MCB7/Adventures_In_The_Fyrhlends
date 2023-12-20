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
    "/assets/stage_enviro/forest/backdrop/deer_sheet.png"
  );

  const deerSprite = useMemo(() => new AnimatedSprite(deerTexture, 3, 1, 3), [deerTexture]);


  const [deerPosition, setDeerPosition] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setDeerPosition((prevPosition) => {
        if (prevPosition <= -100) {
          clearInterval(id);
          return prevPosition;
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
  });

  const Deer = React.memo((props: any) => {
    const spriteMaterial = useMemo(() => new THREE.SpriteMaterial({ 
        map: deerSprite.texture,
        color: new THREE.Color('#7b766f')
        }), [deerSprite.texture]);
    const sprite = useMemo(() => new THREE.Sprite(spriteMaterial), [spriteMaterial]);

    sprite.scale.set(1, 1, 1); // Adjust as needed

    return <primitive object={sprite} {...props} />;
  });


 

  return (
    <>

      <group position={[deerPosition, 0, 1]}>
      <Deer position={[26, 0, -1.5]} />
      <Deer position={[48, 0, -2]} />
      <Deer position={[39, 0, -5]} />
      <Deer position={[21, 0, -.25]} />
      <Deer position={[42, 0, -1.75]} />
      <Deer position={[15, 0, -4.25]} />
      </group>
    
    </>
  );
};

export default DeerHerd;
