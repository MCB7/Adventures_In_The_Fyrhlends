import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import * as React from "react";
import { useMemo } from "react";
import DeerHerd from "./HerdAnimation_mire";

const StageEnvironment: React.FC = () => {

  const texture_sprite = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/mire/floor_tile/mire_tex.png"
  );
  texture_sprite.wrapS = texture_sprite.wrapT = THREE.RepeatWrapping;
  texture_sprite.repeat.set(5, 5);

  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/mire/floor_tile/mire_tex.png"
  );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  const texture_BG = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/mire/backdrop/swamp_BG-4.png"
  );
  texture_BG.wrapS = texture_BG.wrapT = THREE.RepeatWrapping;
  texture_BG.repeat.set(1, 1); // Repeat the texture 5 times along the x-axis
  const bumpMap = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/mire/floor_tile/mire_bump.png"
  );
  bumpMap.wrapS = texture.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(4, 4);
  const displacementMap = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/mire/floor_tile/mire_dis.png"
  );
  displacementMap.wrapS = texture.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(1,1);

  const planeGeometry_BG = new THREE.PlaneGeometry(45, 14, 600, 200); 

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    color: "#4a4830",
    bumpMap: bumpMap,
    bumpScale: 10, // Adjust as needed
    displacementMap: displacementMap,
    displacementScale: .6, // Adjust as needed
    displacementBias: 0, // Adjust as needed
  });

  const material_BG = new THREE.MeshPhongMaterial({
    map: texture_BG,
    color: "#968a77",
  });

  const plane_bg = new THREE.Mesh(planeGeometry_BG, material_BG);

  const tiles = [];
  for (let x = -6; x <= 6; x++) {
    for (let y = -4; y <= 4; y++) {
      const planeGeometry = new THREE.PlaneGeometry(50, 25, 200, 200);
      const plane = new THREE.Mesh(planeGeometry, material);
      plane.position.set(x * 1.8, 0, 0); // Adjust the positions as needed
      tiles.push(<primitive key={`${x},${y}`} object={plane} />);
    }
  }
  const Fern = React.memo((props: any) => {

    const texturePaths = [
      "/assets/stage_enviro/mire/floor_tile/fungus_1.png",
      "/assets/stage_enviro/mire/floor_tile/fungus_2.png",
      "/assets/stage_enviro/mire/floor_tile/fungus_3.png",
      "/assets/stage_enviro/mire/floor_tile/fungus_4.png",
      "/assets/stage_enviro/mire/floor_tile/stump.png",
    ];

const spriteMap = useLoader(THREE.TextureLoader, texturePaths[Math.floor(Math.random() * texturePaths.length)]);
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#525f3c" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);

   

    sprite.scale.set(.5, .5, .5);

    return <primitive object={sprite} {...props} />;
  });

  const Ferns = React.memo(
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
          const angle = (i / (numberOfTrees / 2)) * Math.PI;
          const radius = (Math.sqrt(Math.random()) * areaSize) / 2;
          const x = radius * Math.cos(angle);
          const y = 3.3;
          const z = Math.random() * (-6.22 + -6) - 6; 


          tempTrees.push(<Fern position={[x, y,z]} key={i} />);
        }
        return tempTrees;
      }, [numberOfTrees, areaSize]);

      return <group position={position}>{trees}</group>;
    }
  );


  const Tree = React.memo((props: any) => {
    const spriteMap = useLoader(
      THREE.TextureLoader,
      "/assets/stage_enviro/mire/floor_tile/swamp_tree_1.png"
    );
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#676f65" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);

    // const randX = Math.random() * 0.5 + 1;
    // const randY = Math.random() * 0.5 + 1;
    // const randZ = Math.random() * 0.75 + 1;


    sprite.scale.set(1, 1, 1);

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
          const angle = (i / (numberOfTrees / 2)) * Math.PI;
          const radius = (Math.sqrt(Math.random()) * areaSize) / 2;
          const x = radius * Math.cos(angle);
          const y = 1.3;

          tempTrees.push(<Tree position={[x, y, 1]} key={i} />);
        }
        return tempTrees;
      }, [numberOfTrees, areaSize]);

      return <group position={position}>{trees}</group>;
    }
  );

  const Tree_1 = React.memo((props: any) => {
    const spriteMap = useLoader(
      THREE.TextureLoader,
      "/assets/stage_enviro/mire/floor_tile/swamp_tree_2.png"
    );
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#676f65" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);

    sprite.scale.set(2, 2, 1);

    return <primitive object={sprite} {...props} />;
  });

  const Forest_1 = React.memo(
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
          const angle = (i / (numberOfTrees / 2)) * Math.PI;
          const radius = (Math.sqrt(Math.random()) * areaSize) / 2;
          const x = radius * Math.cos(angle);
          const y = 1;
          const z = Math.random() * (2 - 1) - 1;

          tempTrees.push(<Tree_1 position={[x, y, z]} key={i} />);
        }
        return tempTrees;
      }, [numberOfTrees, areaSize]);

      return <group position={position}>{trees}</group>;
    }
  );

  const Tree_2 = React.memo((props: any) => {
    const spriteMap = useLoader(
      THREE.TextureLoader,
      "/assets/stage_enviro/mire/floor_tile/swamp_tree_3.png"
    );
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#606a60" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);
    sprite.scale.set(5,5,5);

    return <primitive object={sprite} {...props} />;
  });

  const Forest_2 = React.memo(
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
          const angle = (i / (numberOfTrees / 2)) * Math.PI;
          const radius = (Math.sqrt(Math.random()) * areaSize) / 2;
          const x = radius * Math.cos(angle);
          const y = 1.2;
          const z = Math.random() * (1 - 2) - 2;
          tempTrees.push(<Tree_2 position={[x, y, z]} key={i} />);
        }
        return tempTrees;
      }, [numberOfTrees, areaSize]);

      return <group position={position}>{trees}</group>;
    }
  );


  const fernPositions = useMemo(() => [[2, -5, 8]], []);
  const fernPositions1 = useMemo(() => [[-1, -5, 22.1]], []);

  const forestPositions = useMemo(() => [[.5, -1.75, 11 ]], []);
  const forestPositions1 = useMemo(() =>  [[.75, -1.75, .75]], []);
  const forestPositions2 = useMemo(() => [[1, -1.5, 1]], []);

  const fernComponents = useMemo(() => {
    return fernPositions.map((pos, index) => (
      <>
        <Ferns numberOfTrees={500} areaSize={50} position={pos} key={index} />
      </>
    ));
  }, [fernPositions]);
  const fernComponents1 = useMemo(() => {
    return fernPositions1.map((pos, index) => (
      <>
        <Ferns numberOfTrees={300} areaSize={30} position={pos} key={index} />
        <Ferns numberOfTrees={300} areaSize={30} position={pos} key={index} />
      </>
    ));
  }, [fernPositions1]);

  const forestComponents = useMemo(() => {
    return forestPositions.map((pos, index) => (
      <>
        <Forest numberOfTrees={25} areaSize={500} position={pos} key={index} />
      </>
    ));
  }, [forestPositions]);

  const forestComponents1 = useMemo(() => {
    return forestPositions1.map((pos, index) => (
      <>
        <Forest_1 numberOfTrees={24} areaSize={400} position={pos} key={index} />
        
      </>
    ));
  }, [forestPositions1]);

  const forestComponents2 = useMemo(() => {
    return forestPositions2.map((pos, index) => (
      <>
        <Forest_2 numberOfTrees={48} areaSize={500} position={pos} key={index} />
        <Forest_2 numberOfTrees={48} areaSize={500} position={pos} key={index} />
      </>
    ));
  }, [forestPositions2]);





  return (
    <>
      <group position={[0, 3.5, -6]}>
        <primitive object={plane_bg} />
       
      </group>
      <DeerHerd/>
      {fernComponents}
      {fernComponents1}
      {forestComponents}
      {forestComponents1}
      {forestComponents2}

      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        {tiles}
      </group>
    </>
  );
};

export default StageEnvironment;
