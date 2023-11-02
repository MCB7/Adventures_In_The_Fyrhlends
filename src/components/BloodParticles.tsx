import { FC, useRef } from 'react';
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

interface BloodSprayProps {
  position: [number, number, number];
}

const BloodSpray: FC<BloodSprayProps> = ({ position }) => {
  const particleGeometry = new THREE.BufferGeometry();
  const particles = new Float32Array(10000 * 3);

  // Initialize particles at the central point [0,0,0]
  for (let i = 0; i < particles.length; i += 3) {
    particles[i] = 0; // x
    particles[i + 1] = 0; // y
    particles[i + 2] = 0; // z
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: '#e40000',
    size: 1, // Increase the size of the particles
    sizeAttenuation: false, // Enable size attenuation
  });

  // Use useRef to get a reference to the particles
  const particlesRef : any = useRef();

  useFrame(() => {
    // Update particles' positions over time
    for (let i = 0; i < particles.length; i += 3) {
      particles[i] = position[0] + (Math.random() / 3) * 15; // x
      particles[i + 1] = position[1] + (Math.random() / 3) * 2; // y
      particles[i + 2] = position[2] + (Math.random() / 3) * 1.75; // z
      particlesRef.current.position.set(  particles[i], particles[i + 1], particles[i + 2]);
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    particleMaterial.size =  1;
  });



  return (
    
    <points
      ref={particlesRef}
      geometry={particleGeometry}
      material={particleMaterial}
    />
  );
};

export default BloodSpray;
