import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

function usePageVisibility() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const fn = () => setVisible(document.visibilityState === "visible");
    fn();
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, []);
  return visible;
}

function HyperGlassCore({ mouse, running }) {
  const outerRef = useRef();
  const innerRef = useRef();
  const lightRef = useRef();
  const pointLight2 = useRef();

  useFrame((state) => {
    if (!running) return;
    const t = state.clock.getElapsedTime();

    // Smooth inertia mouse tracking
    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.3;

    if (outerRef.current) {
      outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, t * 0.15 + targetY, 0.05);
      outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, t * 0.22 + targetX, 0.05);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = THREE.MathUtils.lerp(innerRef.current.rotation.x, -t * 0.3, 0.05);
      innerRef.current.rotation.z = THREE.MathUtils.lerp(innerRef.current.rotation.z, t * 0.25, 0.05);
    }

    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.7) * 3.5;
      lightRef.current.position.z = Math.cos(t * 0.7) * 3.5;
      lightRef.current.position.y = Math.cos(t * 0.5) * 1.5;
    }

    if (pointLight2.current) {
      pointLight2.current.position.x = -Math.sin(t * 0.6) * 3.0;
      pointLight2.current.position.y = Math.sin(t * 0.9) * 2.0;
    }
  });

  return (
    <group>
      {/* Specular Cyber-Emerald & Cyan Lights */}
      <pointLight ref={lightRef} intensity={3.5} color="#00F59B" position={[2.5, 2.5, 3]} />
      <pointLight ref={pointLight2} intensity={2.8} color="#00D2FF" position={[-2.5, -2, 2]} />
      <pointLight intensity={1.5} color="#E5B869" position={[0, 3, -2]} />

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
        {/* Outer Translucent Glass Torus Knot */}
        <mesh ref={outerRef} castShadow>
          <torusKnotGeometry args={[1.15, 0.36, 128, 24]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={384}
            transmission={1}
            roughness={0.06}
            thickness={1.2}
            ior={1.35}
            chromaticAberration={0.12}
            anisotropy={0.3}
            distortion={0.3}
            distortionScale={0.4}
            temporalDistortion={0.15}
            color="#00F59B"
            attenuationDistance={1.0}
            attenuationColor="#003B26"
          />
        </mesh>

        {/* Inner Glowing Crystal Core */}
        <mesh ref={innerRef} scale={0.48}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00F59B"
            emissive="#00F59B"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.9}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Atmospheric Star Dust / Specular Sparkles */}
      <Sparkles count={60} scale={[8, 6, 8]} size={1.8} speed={0.35} color="#00F59B" />
      <Sparkles count={40} scale={[10, 8, 10]} size={1.4} speed={0.25} color="#00D2FF" />
      <Sparkles count={25} scale={[7, 5, 7]} size={2.0} speed={0.4} color="#E5B869" />
    </group>
  );
}

export default function ThreeHero() {
  const pageVisible = usePageVisibility();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#F8FAFC" />
        <HyperGlassCore mouse={mouse} running={pageVisible} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={9} blur={2.8} far={4} color="#000000" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
