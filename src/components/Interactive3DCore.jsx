import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshTransmissionMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { TOKENS } from "../theme";
import { Layers, Sparkles as SparklesIcon, RefreshCw, Eye } from "lucide-react";

function HolographicCore({ mouse, isWireframe }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const targetX = mouse.current.x * 0.45;
    const targetY = mouse.current.y * 0.35;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, t * 0.2 + targetY, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, t * 0.3 + targetX, 0.05);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = THREE.MathUtils.lerp(innerRef.current.rotation.x, -t * 0.35, 0.05);
      innerRef.current.rotation.z = THREE.MathUtils.lerp(innerRef.current.rotation.z, t * 0.25, 0.05);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.3;
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Ambient & Directional Sky Blue Spotlights */}
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 3, 3]} intensity={2.8} color="#0284C7" />
      <pointLight position={[-3, -3, 2]} intensity={2.2} color="#38BDF8" />
      <pointLight position={[0, 4, -2]} intensity={1.5} color="#818CF8" />

      {/* Floating 3D Object */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Outer Translucent Holographic Glass Icosahedron */}
        <mesh ref={meshRef} scale={1.35}>
          <icosahedronGeometry args={[1, 1]} />
          {isWireframe ? (
            <meshStandardMaterial
              color="#0284C7"
              emissive="#0284C7"
              emissiveIntensity={1.4}
              wireframe={true}
            />
          ) : (
            <MeshTransmissionMaterial
              backside
              samples={4}
              resolution={256}
              transmission={0.95}
              roughness={0.08}
              thickness={1.1}
              ior={1.4}
              chromaticAberration={0.15}
              distortion={0.25}
              distortionScale={0.3}
              color="#0284C7"
              attenuationDistance={1.2}
              attenuationColor="#0369A1"
            />
          )}
        </mesh>

        {/* Inner Glowing Energetic Octahedron Core */}
        <mesh ref={innerRef} scale={0.55}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#38BDF8"
            emissiveIntensity={2.5}
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>

        {/* Orbital Energy Rings */}
        <mesh ref={ring1Ref} scale={1.8}>
          <torusGeometry args={[1, 0.015, 16, 64]} />
          <meshBasicMaterial color="#0284C7" transparent opacity={0.6} />
        </mesh>

        <mesh ref={ring2Ref} scale={2.1}>
          <torusGeometry args={[1, 0.012, 16, 64]} />
          <meshBasicMaterial color="#818CF8" transparent opacity={0.45} />
        </mesh>
      </Float>

      {/* Floating Starfield Particles */}
      <Sparkles count={35} scale={5} size={2.5} speed={0.4} color="#38BDF8" opacity={0.6} />
    </group>
  );
}

export default function Interactive3DCore() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [isWireframe, setIsWireframe] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Track Mouse in Normalized Coordinates (-1 to +1)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  // IntersectionObserver to pause rendering when offscreen
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
        maxWidth: "480px",
        height: "390px",
        backgroundColor: TOKENS.card,
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
          padding: "10px 14px",
          borderBottom: `1px solid ${TOKENS.line}`,
          backgroundColor: TOKENS.surface,
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: TOKENS.success,
              display: "inline-block",
            }}
          />
          <span style={{ ...TOKENS.type.micro, color: TOKENS.ink, fontSize: "11px" }}>
            SPATIAL 3D ARCHITECTURE CORE
          </span>
        </div>

        {/* Wireframe Mode Toggle */}
        <button
          onClick={() => setIsWireframe(!isWireframe)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 8px",
            borderRadius: TOKENS.radius.xs,
            backgroundColor: isWireframe ? TOKENS.accentSubtle : "transparent",
            border: `1px solid ${isWireframe ? TOKENS.accent : TOKENS.line}`,
            color: isWireframe ? TOKENS.accent : TOKENS.muted,
            ...TOKENS.type.micro,
            fontSize: "10px",
            cursor: "pointer",
            transition: TOKENS.transition,
          }}
        >
          <Eye size={11} />
          <span>{isWireframe ? "WIREFRAME" : "HOLOGRAPHIC"}</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div style={{ position: "relative", flex: 1, width: "100%", height: "100%" }}>
        {isVisible && (
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
          >
            <HolographicCore mouse={mouse} isWireframe={isWireframe} />
          </Canvas>
        )}

        {/* Interactive Coordinate Float Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "12px",
            ...TOKENS.type.micro,
            fontSize: "10px",
            color: TOKENS.muted,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(6px)",
            padding: "3px 8px",
            borderRadius: TOKENS.radius.xs,
            border: `1px solid ${TOKENS.line}`,
            pointerEvents: "none",
          }}
        >
          INTERACTIVE PHYSICS · MOUSE RESPONSIVE
        </div>

        {/* Stack Highlights Orbit Pill */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "12px",
            ...TOKENS.type.micro,
            fontSize: "10px",
            color: TOKENS.accent,
            backgroundColor: TOKENS.accentSubtle,
            padding: "3px 8px",
            borderRadius: TOKENS.radius.xs,
            border: `1px solid ${TOKENS.accent}30`,
            pointerEvents: "none",
          }}
        >
          NEXT.JS + R3F 3D ENGINE
        </div>
      </div>
    </div>
  );
}
