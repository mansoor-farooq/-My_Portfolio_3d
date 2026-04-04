import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
  OrbitControls,
} from "@react-three/drei";

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

function PremiumShape({ running }) {
  const ref = useRef();
  const light = useRef();

  useFrame((state) => {
    if (!running) return;
    const t = state.clock.getElapsedTime();

    if (ref.current) {
      ref.current.rotation.x = t * 0.18;
      ref.current.rotation.y = t * 0.28;
    }
    if (light.current) {
      light.current.position.x = Math.sin(t * 0.8) * 3.2;
      light.current.position.z = Math.cos(t * 0.8) * 3.2;
    }
  });

  return (
    <group>
      <pointLight ref={light} intensity={2.2} color="#19ffb0" position={[2, 2, 2]} />
      <Float speed={1.35} rotationIntensity={0.55} floatIntensity={0.85}>
        <mesh ref={ref} castShadow>
          <torusKnotGeometry args={[1.05, 0.32, 100, 16]} />
          <MeshTransmissionMaterial
            thickness={1.0}
            roughness={0.08}
            transmission={1}
            ior={1.25}
            chromaticAberration={0.08}
            anisotropy={0.25}
            distortion={0.25}
            distortionScale={0.32}
            temporalDistortion={0.15}
            color="#0C6E4E"
            resolution={256}
          />
        </mesh>
      </Float>

      {/* Premium particles */}
      <Sparkles count={40} scale={[6, 4, 6]} size={1.2} speed={0.25} color="#B8873A" />
    </group>
  );
}

export default function ThreeHero() {
  const pageVisible = usePageVisibility();
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const running = pageVisible && !reduceMotion;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        style={{ height: "100%", width: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 6, 4]} intensity={1.1} castShadow />
        <PremiumShape running={running} />

        <ContactShadows position={[0, -1.55, 0]} opacity={0.38} scale={8} blur={2.7} resolution={256} frames={1} />
        <Environment preset="city" resolution={256} />

        {/* Desktop only control feel (optional) */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
