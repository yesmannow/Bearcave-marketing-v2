"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1500;
const POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  POSITIONS[i * 3] = (Math.random() - 0.5) * 10;
  POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 10;
  POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

function PointsSwarm() {
  const points = useRef<THREE.Points>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = time * 0.03;
    
    // Subtle organic wave movement
    const attr = points.current.geometry.attributes.position;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = attr.getX(i);
        const y = attr.getY(i);
        
        attr.setY(i, y + Math.sin(time + x) * 0.002);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[POSITIONS, 3]}
          count={PARTICLE_COUNT}
          array={POSITIONS}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#40E0D0"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroLoadingSystem() {
  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <PointsSwarm />
      </Canvas>
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <span className="text-neutral-500 text-[9px] font-mono tracking-[0.4em] uppercase animate-pulse">
           Initializing Core Visuals
        </span>
      </div>
    </div>
  );
}
