import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import * as React from "react";
import { useMemo } from "react";
import DeerHerd from "./HerdAnimation";

const StageEnvironment: React.FC = () => {

  const texture_sprite = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/forest/floor_tile/forest_floor_tex_1.png"
  );
  texture_sprite.wrapS = texture_sprite.wrapT = THREE.RepeatWrapping;
  texture_sprite.repeat.set(1, 1);

  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/forest/floor_tile/forest_floor_tex_1.png"
  );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  const texture_BG = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/forest/backdrop/forest-4.png"
  );
  texture_BG.wrapS = texture_BG.wrapT = THREE.RepeatWrapping;
  texture_BG.repeat.set(1, 1); // Repeat the texture 5 times along the x-axis
  const bumpMap = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/forest/floor_tile/forest_floor_bump_1.png"
  );
  bumpMap.wrapS = texture.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(1, 1);
  const displacementMap = useLoader(
    THREE.TextureLoader,
    "/assets/stage_enviro/forest/floor_tile/forest_floor_dis_1.png"
  );
  displacementMap.wrapS = texture.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(1, 1);

  const planeGeometry_BG = new THREE.PlaneGeometry(35, 12, 680, 200); 

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    color: "#676f65",
    bumpMap: bumpMap,
    bumpScale: 3, // Adjust as needed
    displacementMap: displacementMap,
    displacementScale: .95, // Adjust as needed
    displacementBias: 0, // Adjust as needed
  });

  const material_BG = new THREE.MeshPhongMaterial({
    map: texture_BG,
    color: "#3d634f",
  });

  const plane_bg = new THREE.Mesh(planeGeometry_BG, material_BG);

  const tiles = [];
  for (let x = -4; x <= 4; x++) {
    for (let y = -4; y <= 4; y++) {
      const planeGeometry = new THREE.PlaneGeometry(10, 10, 100, 100);
      const plane = new THREE.Mesh(planeGeometry, material);
      plane.position.set(x * 1.8, 0, 0); // Adjust the positions as needed
      tiles.push(<primitive key={`${x},${y}`} object={plane} />);
    }
  }
  const Fern = React.memo((props: any) => {

    const texturePaths = [
      "/assets/stage_enviro/forest/floor_tile/fern-1.png",
      "/assets/stage_enviro/forest/floor_tile/fern-2.png",
      "/assets/stage_enviro/forest/floor_tile/fern-3.png",
      "/assets/stage_enviro/forest/floor_tile/fern-4.png",
      "/assets/stage_enviro/forest/floor_tile/log-1.png",
      "/assets/stage_enviro/forest/floor_tile/log-2.png",
    ];

const spriteMap = useLoader(THREE.TextureLoader, texturePaths[Math.floor(Math.random() * texturePaths.length)]);
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#676f65" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);

   

    sprite.scale.set(1.25, 1.25, 1);

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
      "/assets/stage_enviro/forest/floor_tile/trunk-1.png"
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


    sprite.scale.set(3, 7, 5);

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
          const y = 3;

          tempTrees.push(<Tree position={[x, y, -5.25]} key={i} />);
        }
        return tempTrees;
      }, [numberOfTrees, areaSize]);

      return <group position={position}>{trees}</group>;
    }
  );

  const Tree_1 = React.memo((props: any) => {
    const spriteMap = useLoader(
      THREE.TextureLoader,
      "/assets/stage_enviro/forest/floor_tile/trunk-2.png"
    );
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#676f65" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);

    sprite.scale.set(1.75, 6, 1);

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
          const y = 3;
          const z = Math.random() * (5.5 - 5) - 5;

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
      "/assets/stage_enviro/forest/floor_tile/trunk-3.png"
    );
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#606a60" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);

    sprite.scale.set(1, 8, 1);

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
          const y = 4;
          const z = Math.random() * (6 - 7) - 7;
          tempTrees.push(<Tree_2 position={[x, y, z]} key={i} />);
        }
        return tempTrees;
      }, [numberOfTrees, areaSize]);

      return <group position={position}>{trees}</group>;
    }
  );

  const Tree_3 = React.memo((props: any) => {
    const spriteMap = useLoader(
      THREE.TextureLoader,
      "/assets/stage_enviro/forest/floor_tile/trunk-4.png"
    );
    const material = useMemo(() => {
      return new THREE.SpriteMaterial({ map: spriteMap, color: "#2e302e" });
    }, [spriteMap]);

    const sprite = useMemo(() => {
      return new THREE.Sprite(material);
    }, [material]);

    sprite.scale.set(1, 8, 1);

    return <primitive object={sprite} {...props} />;
  });

  const Forest_3 = React.memo(
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
          const y = 4;
          const z = Math.random() * (6 - 7) - 7;
          tempTrees.push(<Tree_3 position={[x, y, z]} key={i} />);
        }
        return tempTrees;
      }, [numberOfTrees, areaSize]);

      return <group position={position}>{trees}</group>;
    }
  );



  const fernPositions = useMemo(() => [[2, -4, 8]], []);
  const fernPositions1 = useMemo(() => [[-1, -4, 22.55]], []);

  const forestPositions = useMemo(() => [[2, -0.65, 7]], []);
  const forestPositions1 = useMemo(() => [[1, -1, 5]], []);
  const forestPositions2 = useMemo(() => [[0.75, -0.5, 4.5]], []);
  const forestPositions3 = useMemo(() => [[0.25, 0, 3]], []);

  const fernComponents = useMemo(() => {
    return fernPositions.map((pos, index) => (
      <>
        <Ferns numberOfTrees={2000} areaSize={75} position={pos} key={index} />
      </>
    ));
  }, [fernPositions]);
  const fernComponents1 = useMemo(() => {
    return fernPositions1.map((pos, index) => (
      <>
        <Ferns numberOfTrees={1000} areaSize={75} position={pos} key={index} />
        <Ferns numberOfTrees={1000} areaSize={75} position={pos} key={index} />
      </>
    ));
  }, [fernPositions1]);

  const forestComponents = useMemo(() => {
    return forestPositions.map((pos, index) => (
      <>
        <Forest numberOfTrees={25} areaSize={200} position={pos} key={index} />
      </>
    ));
  }, [forestPositions]);

  const forestComponents1 = useMemo(() => {
    return forestPositions1.map((pos, index) => (
      <>
        <Forest_1 numberOfTrees={24} areaSize={60} position={pos} key={index} />
        
      </>
    ));
  }, [forestPositions1]);

  const forestComponents2 = useMemo(() => {
    return forestPositions2.map((pos, index) => (
      <>
        <Forest_2 numberOfTrees={48} areaSize={50} position={pos} key={index} />
        <Forest_2 numberOfTrees={48} areaSize={500} position={pos} key={index} />
      </>
    ));
  }, [forestPositions2]);

  const forestComponents3 = useMemo(() => {
    return forestPositions3.map((pos, index) => (
      <>
        <Forest_3 numberOfTrees={100} areaSize={100} position={pos} key={index} />
        <Forest_3 numberOfTrees={100} areaSize={1000} position={pos} key={index} />
      </>
    ));
  }, [forestPositions3]);



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
      {forestComponents3}
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        {tiles}
      </group>
    </>
  );
};

export default StageEnvironment;
