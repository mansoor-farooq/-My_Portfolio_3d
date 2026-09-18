import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshTransmissionMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { TOKENS } from "../theme";
import { Layers, Sparkles as SparklesIcon, RefreshCw, Eye, Orbit } from "lucide-react";
import { playClickSound } from "../utils/audio";

function HolographicCore({ mouse, isWireframe }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.3;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, t * 0.25 + targetY, 0.06);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, t * 0.35 + targetX, 0.06);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = THREE.MathUtils.lerp(innerRef.current.rotation.x, -t * 0.4, 0.06);
      innerRef.current.rotation.z = THREE.MathUtils.lerp(innerRef.current.rotation.z, t * 0.3, 0.06);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.45;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.35;
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Studio Optical Lighting */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[0, 6, 2]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[4, 5, 4]} intensity={3.5} color="#0284C7" />
      <pointLight position={[-4, -3, 3]} intensity={2.5} color="#0EA5E9" />
      <pointLight position={[0, 3, -3]} intensity={2.0} color="#818CF8" />

      {/* Floating 3D Optical Quartz Crystal & Rings */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* 1. Outer Optical Quartz Diamond Prism */}
        <mesh ref={meshRef} scale={0.95}>
          <icosahedronGeometry args={[1, 1]} />
          {isWireframe ? (
            <meshStandardMaterial
              color="#0284C7"
              emissive="#0284C7"
              emissiveIntensity={1.2}
              wireframe={true}
            />
          ) : (
            <MeshTransmissionMaterial
              backside
              samples={6}
              resolution={256}
              transmission={0.96}
              roughness={0.04}
              thickness={1.3}
              ior={1.52}
              chromaticAberration={0.25}
              distortion={0.15}
              color="#38BDF8"
              attenuationDistance={1.6}
              attenuationColor="#0284C7"
            />
          )}
        </mesh>

        {/* 2. Inner Glowing Energy Octahedron Core */}
        <mesh ref={innerRef} scale={0.42}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#0284C7"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.85}
            wireframe={true}
          />
        </mesh>

        {/* 3. Primary Precision Orbital Ring */}
        <mesh ref={ring1Ref} scale={1.35}>
          <torusGeometry args={[1, 0.015, 16, 64]} />
          <meshBasicMaterial color="#0284C7" transparent opacity={0.7} />
        </mesh>

        {/* 4. Secondary Precision Orbital Ring */}
        <mesh ref={ring2Ref} scale={1.55}>
          <torusGeometry args={[1, 0.012, 16, 64]} />
          <meshBasicMaterial color="#6366F1" transparent opacity={0.5} />
        </mesh>
      </Float>

      {/* Floating Particle Dust */}
      <Sparkles count={30} scale={4} size={2.2} speed={0.4} color="#0284C7" opacity={0.5} />
    </group>
  );
}

export default function Interactive3DCore() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [isWireframe, setIsWireframe] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "490px",
        height: "410px",
        backgroundColor: "#FFFFFF",
        border: `1px solid ${TOKENS.line}`,
        borderRadius: TOKENS.radius.sm,
        overflow: "hidden",
        boxShadow: TOKENS.shadow.raised,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top HUD Telemetry Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: `1px solid ${TOKENS.line}`,
          backgroundColor: "#FFFFFF",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 6px rgba(16, 185, 129, 0.4)",
              display: "inline-block",
            }}
          />
          <span style={{ ...TOKENS.type.micro, color: TOKENS.ink, fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em" }}>
            SPATIAL 3D ARCHITECTURE CORE
          </span>
        </div>

        {/* Wireframe vs Hologram Mode Toggle */}
        <button
          onClick={() => {
            playClickSound();
            setIsWireframe(!isWireframe);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 12px",
            borderRadius: TOKENS.radius.xs,
            backgroundColor: isWireframe ? "rgba(2, 132, 199, 0.08)" : "#F1F5F9",
            border: `1px solid ${isWireframe ? "#0284C7" : TOKENS.line}`,
            color: isWireframe ? "#0284C7" : TOKENS.sub,
            ...TOKENS.type.micro,
            fontSize: "10.5px",
            cursor: "pointer",
            transition: TOKENS.transition,
            fontWeight: 700,
          }}
        >
          <Eye size={12} />
          <span>{isWireframe ? "WIREFRAME" : "OPTICAL CRYSTAL"}</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Area with generous Zoom Out & Zero-Load Offscreen Pausing */}
      <div style={{ position: "relative", flex: 1, width: "100%", height: "100%", backgroundColor: "#FAFCFF" }}>
        <Canvas
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          style={{ background: "transparent" }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
            stencil: false,
            depth: true,
          }}
        >
          <HolographicCore mouse={mouse} isWireframe={isWireframe} />
        </Canvas>

        {/* Interactive Physics Bottom Left Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "16px",
            ...TOKENS.type.micro,
            fontSize: "10px",
            color: TOKENS.sub,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",
            padding: "5px 10px",
            borderRadius: TOKENS.radius.xs,
            border: `1px solid ${TOKENS.line}`,
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
            pointerEvents: "none",
            fontWeight: 600,
          }}
        >
          MOUSE RESPONSIVE · THREE.JS / R3F
        </div>

        {/* Stack Highlight Orbit Pill */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "16px",
            ...TOKENS.type.micro,
            fontSize: "10px",
            color: "#0284C7",
            backgroundColor: "rgba(2, 132, 199, 0.07)",
            backdropFilter: "blur(12px)",
            padding: "5px 10px",
            borderRadius: TOKENS.radius.xs,
            border: `1px solid rgba(2, 132, 199, 0.22)`,
            pointerEvents: "none",
            fontWeight: 700,
          }}
        >
          REACT THREE FIBER · OPTICAL
        </div>
      </div>
    </div>
  );
}
