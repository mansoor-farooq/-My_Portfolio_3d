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
      {/* Studio Lighting */}
      <ambientLight intensity={1.2} />
      <pointLight position={[4, 4, 4]} intensity={3.5} color="#0284C7" />
      <pointLight position={[-4, -4, 2]} intensity={2.5} color="#38BDF8" />
      <pointLight position={[0, 4, -2]} intensity={2.0} color="#818CF8" />

      {/* Floating 3D Crystal & Rings (Cleanly Scaled so no edge clipping) */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* 1. Outer Translucent Holographic Glass Icosahedron */}
        <mesh ref={meshRef} scale={0.95}>
          <icosahedronGeometry args={[1, 1]} />
          {isWireframe ? (
            <meshStandardMaterial
              color="#38BDF8"
              emissive="#0284C7"
              emissiveIntensity={1.8}
              wireframe={true}
            />
          ) : (
            <MeshTransmissionMaterial
              backside
              samples={4}
              resolution={256}
              transmission={0.93}
              roughness={0.06}
              thickness={1.2}
              ior={1.48}
              chromaticAberration={0.2}
              distortion={0.2}
              color="#0284C7"
              attenuationDistance={1.3}
              attenuationColor="#0369A1"
            />
          )}
        </mesh>

        {/* 2. Inner Glowing Energy Octahedron Core */}
        <mesh ref={innerRef} scale={0.42}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#38BDF8"
            emissiveIntensity={2.8}
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>

        {/* 3. Primary Orbital Ring (Well within margins) */}
        <mesh ref={ring1Ref} scale={1.35}>
          <torusGeometry args={[1, 0.015, 16, 64]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} />
        </mesh>

        {/* 4. Secondary Orbital Ring */}
        <mesh ref={ring2Ref} scale={1.55}>
          <torusGeometry args={[1, 0.012, 16, 64]} />
          <meshBasicMaterial color="#818CF8" transparent opacity={0.45} />
        </mesh>
      </Float>

      {/* Floating Particle Dust */}
      <Sparkles count={30} scale={4} size={2.2} speed={0.4} color="#38BDF8" opacity={0.7} />
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
        backgroundColor: "#0B1220",
        border: `1px solid rgba(255, 255, 255, 0.12)`,
        borderRadius: TOKENS.radius.sm,
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
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
          padding: "12px 16px",
          borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
          backgroundColor: "rgba(11, 18, 32, 0.95)",
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
              boxShadow: "0 0 8px #10B981",
              display: "inline-block",
            }}
          />
          <span style={{ ...TOKENS.type.micro, color: "#FFFFFF", fontSize: "11px", letterSpacing: "0.05em" }}>
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
            padding: "4px 10px",
            borderRadius: TOKENS.radius.xs,
            backgroundColor: isWireframe ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.06)",
            border: `1px solid ${isWireframe ? "#38BDF8" : "rgba(255, 255, 255, 0.15)"}`,
            color: isWireframe ? "#38BDF8" : "#94A3B8",
            ...TOKENS.type.micro,
            fontSize: "10.5px",
            cursor: "pointer",
            transition: TOKENS.transition,
            fontWeight: 600,
          }}
        >
          <Eye size={12} />
          <span>{isWireframe ? "WIREFRAME" : "HOLOGRAPHIC"}</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Area with generous Zoom Out */}
      <div style={{ position: "relative", flex: 1, width: "100%", height: "100%" }}>
        {isVisible && (
          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 42 }}
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
          >
            <HolographicCore mouse={mouse} isWireframe={isWireframe} />
          </Canvas>
        )}

        {/* Interactive Physics Bottom Left Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "14px",
            ...TOKENS.type.micro,
            fontSize: "10px",
            color: "#94A3B8",
            backgroundColor: "rgba(11, 18, 32, 0.8)",
            backdropFilter: "blur(8px)",
            padding: "4px 9px",
            borderRadius: TOKENS.radius.xs,
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            pointerEvents: "none",
          }}
        >
          MOUSE RESPONSIVE · WEBGL CORE
        </div>

        {/* Stack Highlight Orbit Pill */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "14px",
            ...TOKENS.type.micro,
            fontSize: "10px",
            color: "#38BDF8",
            backgroundColor: "rgba(2, 132, 199, 0.2)",
            backdropFilter: "blur(8px)",
            padding: "4px 9px",
            borderRadius: TOKENS.radius.xs,
            border: `1px solid rgba(56, 189, 248, 0.3)`,
            pointerEvents: "none",
          }}
        >
          NEXT.JS + R3F CORE
        </div>
      </div>
    </div>
  );
}
