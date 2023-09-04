import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const useGridDistance = (camera: THREE.Camera) => {
  const [selectedGrid, setSelectedGrid] = useState<number[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Get the mouse position
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      // Use raycasting to check if the clicked object is a grid square
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object as THREE.Mesh;
        const selectedGridPosition = selectedMesh.userData.position;

        if (selectedGrid.length === 0) {
          // First grid selection
          setSelectedGrid(selectedGridPosition);
          (selectedMesh.material as THREE.MeshBasicMaterial).color.set('limegreen');
        } else {
          // Second grid selection
          const distance = calculateDistance(selectedGrid, selectedGridPosition);
          alert(`${distance} spaces away`);

          // Reset the selection
          setSelectedGrid([]);
          (selectedMesh.material as THREE.MeshBasicMaterial).color.set('limegreen');
        }
      }
    };

    // Add event listener for mouse click
    window.addEventListener('click', handleClick);

    // Clean up the event listener
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [selectedGrid]);

  const meshes: THREE.Object3D[] = [];

  const calculateDistance = (grid1: number[], grid2: number[]) => {
    const [x1, y1] = grid1;
    const [x2, y2] = grid2;

    const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    return distance;
  };

  return selectedGrid;
};

export default useGridDistance;