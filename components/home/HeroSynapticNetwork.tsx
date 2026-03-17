"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  Float,
  Html,
  QuadraticBezierLine,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";

// --- Types ---
interface NodeProps {
  name: string;
  description: string;
  position: [number, number, number];
  onHover: (hovered: boolean) => void;
}

// --- Components ---

function Node({ name, description, position, onHover }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onHover(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
  };

  return (
    <mesh
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshPhysicalMaterial
        transmission={1}
        roughness={0.15}
        thickness={2}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        color="#ffffff"
        emissive={hovered ? "#FFA500" : "#40E0D0"}
        emissiveIntensity={hovered ? 2 : 0}
      />
      <Html
        position={[0, 0.6, 0]}
        center
        distanceFactor={10}
        pointerEvents="none"
        className="select-none pointer-events-none flex flex-col items-center"
        style={{ pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}
      >
        <div className="whitespace-nowrap font-mono text-[9px] tracking-[0.3em] uppercase text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
          {name}
        </div>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -5 }}
          transition={{ duration: 0.2 }}
          className="mt-2 w-48 bg-slate-950/80 backdrop-blur-md border border-teal-400/30 text-slate-300 text-xs p-3 rounded-md pointer-events-none"
          style={{ whiteSpace: 'normal', textAlign: 'center' }}
        >
          {description}
        </motion.div>
      </Html>
    </mesh>
  );
}

function Connection({ start, end, active }: { start: [number, number, number]; end: [number, number, number]; active: boolean }) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame(() => {
    if (active && lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial & { dashOffset: number };
      material.dashOffset -= 0.01;
    }
  });

  return (
    <QuadraticBezierLine
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={lineRef as any}
      start={start}
      end={end}
      mid={[ (start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 1, (start[2] + end[2]) / 2 ]}
      color={active ? "#FFA500" : "#40E0D0"}
      lineWidth={active ? 2 : 0.5}
      transparent
      opacity={active ? 0.9 : 0.2}
      dashed={active}
      dashScale={active ? 4 : 0}
    />
  );
}

function SynapticScene() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = useMemo(() => [
    { name: "Strategy", description: "Brand positioning, market research, and full-funnel architecture.", pos: [-3, 1.5, 0] as [number, number, number] },
    { name: "Automation", description: "CRM pipelines, custom CLI tooling, and workflow optimization.", pos: [3, 1.2, -1] as [number, number, number] },
    { name: "Growth", description: "Data-driven acquisition, technical SEO, and scalable revenue engines.", pos: [-2, -2, 1] as [number, number, number] },
    { name: "Leadership", description: "Fractional CMO direction bridging creative vision with technical execution.", pos: [3.5, -1.5, 0.5] as [number, number, number] },
  ], []);

  useFrame((state) => {
    const { mouse, camera } = state;
    // Mouse Parallax with Smooth Lerp
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 3, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#40E0D0" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#FFA500" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0.8, 0, -1.5]} scale={0.85}>
          {/* The Core - Liquid Obsidian */}
          <mesh>
            <icosahedronGeometry args={[1.5, 2]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#40E0D0"
              emissiveIntensity={2}
              wireframe={true}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Orbiting Nodes and Connections */}
          {nodes.map((node) => (
            <React.Fragment key={node.name}>
              <Node
                name={node.name}
                description={node.description}
                position={node.pos}
                onHover={(hovered) => setHoveredNode(hovered ? node.name : null)}
              />
              <Connection start={[0, 0, 0]} end={node.pos} active={hoveredNode === node.name} />
            </React.Fragment>
          ))}
        </group>
      </Float>

      <Environment preset="city" />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={2.0} />
      </EffectComposer>

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.1} far={10} color="#000000" />
    </>
  );
}

export default function HeroSynapticNetwork() {
  return (
    <div className="w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/5 bg-[#0f172a] shadow-2xl relative group">
      <Canvas 
        dpr={[1, 2]} 
        shadows 
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', outline: 'none', border: 'none' }}
      >
        <Suspense fallback={null}>
          <SynapticScene />
        </Suspense>
      </Canvas>
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: `radial-gradient(#40E0D0 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />

      {/* Loading Overlay */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.5em] text-[#40E0D0] uppercase animate-pulse">
            Neural Signal Active
          </span>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-[#40E0D0/30] to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
