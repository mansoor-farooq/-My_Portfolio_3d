import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { TOKENS } from "../theme";
import { Eye, Sparkles as SparklesIcon, Maximize2, RotateCcw } from "lucide-react";
import { playClickSound } from "../utils/audio";

// ── Cinematic Stylized Humanoid Character
function CinematicCharacter({ mouse }) {
  const groupRef = useRef();
  const spineRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const shardsGroupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Subtle breathing motion (sinusoidal expansion of chest & spine)
    const breath = Math.sin(t * 1.8) * 0.025;
    if (spineRef.current) {
      spineRef.current.position.y = breath;
      spineRef.current.scale.y = 1 + breath * 0.5;
      spineRef.current.scale.x = 1 + breath * 0.3;
    }

    // 2. Mouse-Look Head Tracking with Strict Smooth Clamping (±15° Y, ±10° X)
    if (headRef.current) {
      const targetHeadY = THREE.MathUtils.clamp(mouse.current.x * 0.35, -0.28, 0.28);
      const targetHeadX = THREE.MathUtils.clamp(-mouse.current.y * 0.2, -0.18, 0.18);
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, 0.08);
      headRef.current.rotation.z = Math.sin(t * 0.8) * 0.01;
    }

    // 3. Subtle arm sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.2 + Math.sin(t * 1.4) * 0.02;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.2 - Math.sin(t * 1.4) * 0.02;
    }

    // 4. Orbiting Optical Quartz Shards
    if (shardsGroupRef.current) {
      shardsGroupRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* ── 1. The Humanoid Character Rig ── */}
      <group position={[0, 0, 0]}>
        {/* Spine / Torso Group (Animated Breathing) */}
        <group ref={spineRef}>
          {/* Main Tailored Torso (Obsidian Architect Silhouette) */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.3, 0.9, 32]} />
            <meshStandardMaterial
              color="#0F172A"
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>

          {/* Chest Optical Lapel Highlight */}
          <mesh position={[0, 0.6, 0.18]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.36, 0.4, 0.04]} />
            <meshStandardMaterial
              color="#1E293B"
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>

          {/* Glowing Sapphire Core Tie / Telemetry Seam */}
          <mesh position={[0, 0.48, 0.2]}>
            <boxGeometry args={[0.025, 0.45, 0.02]} />
            <meshBasicMaterial color="#0284C7" />
          </mesh>
        </group>

        {/* Neck Column */}
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.11, 0.12, 0.18, 24]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Head Hierarchy (Smooth Mouse Look) */}
        <group ref={headRef} position={[0, 1.22, 0]}>
          {/* Stylized Ceramic Head Base */}
          <mesh castShadow>
            <sphereGeometry args={[0.26, 32, 32]} />
            <meshStandardMaterial
              color="#F8FAFC"
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>

          {/* Optical Sapphire Visor / Eye Horizon (Peryton Film Visual Signature) */}
          <mesh position={[0, 0.03, 0.2]}>
            <boxGeometry args={[0.32, 0.06, 0.12]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#0284C7"
              emissiveIntensity={1.4}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Titanium Crown Rim */}
          <mesh position={[0, 0.16, 0]}>
            <torusGeometry args={[0.24, 0.012, 16, 32]} />
            <meshStandardMaterial color="#64748B" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        {/* Left Arm & Shoulder */}
        <group ref={leftArmRef} position={[-0.48, 0.72, 0]}>
          {/* Shoulder Sphere */}
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[-0.05, -0.4, 0]} rotation={[0, 0, -0.05]}>
            <cylinderGeometry args={[0.09, 0.08, 0.65, 24]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>
          {/* Forearm & Polished Hand */}
          <mesh position={[-0.08, -0.85, 0.08]} rotation={[0.2, 0, -0.05]}>
            <cylinderGeometry args={[0.07, 0.06, 0.5, 24]} />
            <meshStandardMaterial color="#1E293B" roughness={0.3} />
          </mesh>
          <mesh position={[-0.09, -1.14, 0.14]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>

        {/* Right Arm & Shoulder */}
        <group ref={rightArmRef} position={[0.48, 0.72, 0]}>
          {/* Shoulder Sphere */}
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[0.05, -0.4, 0]} rotation={[0, 0, 0.05]}>
            <cylinderGeometry args={[0.09, 0.08, 0.65, 24]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>
          {/* Forearm & Polished Hand */}
          <mesh position={[0.08, -0.85, 0.08]} rotation={[0.2, 0, 0.05]}>
            <cylinderGeometry args={[0.07, 0.06, 0.5, 24]} />
            <meshStandardMaterial color="#1E293B" roughness={0.3} />
          </mesh>
          <mesh position={[0.09, -1.14, 0.14]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>

        {/* Lower Tailored Pedestal Base */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.26, 0.32, 0.7, 32]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
      </group>

      {/* ── 2. Orbiting Optical Quartz Shards with Chromatic Caustics ── */}
      <group ref={shardsGroupRef} position={[0, 0.5, 0]}>
        {/* Shard 1 (Top Left) */}
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh position={[-1.1, 0.7, 0.4]} scale={0.22}>
            <octahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial
              backside
              samples={6}
              resolution={256}
              transmission={0.96}
              roughness={0.04}
              thickness={1.4}
              ior={1.6}
              chromaticAberration={0.28}
              color="#38BDF8"
              attenuationDistance={1.4}
              attenuationColor="#0284C7"
            />
          </mesh>
        </Float>

        {/* Shard 2 (Right Mid) */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
          <mesh position={[1.15, 0.2, -0.2]} scale={0.28}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial
              backside
              samples={6}
              resolution={256}
              transmission={0.96}
              roughness={0.04}
              thickness={1.5}
              ior={1.62}
              chromaticAberration={0.3}
              color="#0284C7"
              attenuationDistance={1.6}
              attenuationColor="#0369A1"
            />
          </mesh>
        </Float>

        {/* Shard 3 (Low Front Accent) */}
        <Float speed={3} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh position={[-0.5, -0.6, 0.7]} scale={0.16}>
            <tetrahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              resolution={128}
              transmission={0.94}
              roughness={0.05}
              thickness={1.2}
              ior={1.55}
              chromaticAberration={0.2}
              color="#818CF8"
              attenuationDistance={1.2}
              attenuationColor="#4F46E5"
            />
          </mesh>
        </Float>
      </group>

      {/* ── 3. Atmospheric Particle Dust ── */}
      <Sparkles count={35} scale={4} size={2.2} speed={0.4} color="#0284C7" opacity={0.45} />

      {/* ── 4. Precision Contact Shadows on Studio Infinity Floor ── */}
      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.5}
        scale={6}
        blur={2.4}
        far={3}
        color="#0F172A"
      />
    </group>
  );
}

export default function CharacterScene() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
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
        height: "430px",
        backgroundColor: "#FFFFFF",
        border: `1px solid ${TOKENS.line}`,
        borderRadius: TOKENS.radius.sm,
        overflow: "hidden",
        boxShadow: TOKENS.shadow.raised,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Film Direction HUD Bar */}
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
              backgroundColor: "#2563EB",
              boxShadow: "0 0 8px rgba(37, 99, 235, 0.5)",
              display: "inline-block",
            }}
          />
          <span style={{ ...TOKENS.type.micro, color: TOKENS.ink, fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em" }}>
            CINEMATIC 3D CHARACTER ENGINE
          </span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: TOKENS.radius.xs,
            backgroundColor: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.25)",
            color: "#2563EB",
            ...TOKENS.type.micro,
            fontSize: "10.5px",
            fontWeight: 700,
          }}
        >
          <SparklesIcon size={12} />
          <span>PERYTON AESTHETIC</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Stage */}
      <div style={{ position: "relative", flex: 1, width: "100%", height: "100%", backgroundColor: "#FAFCFF" }}>
        <Canvas
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.3, 4.4], fov: 38 }}
          style={{ background: "transparent" }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
            stencil: false,
            depth: true,
          }}
        >
          {/* Studio 3-Point Lighting */}
          <ambientLight intensity={1.6} />
          {/* Key Light (Front-Left) */}
          <directionalLight position={[-4, 5, 4]} intensity={2.8} color="#FFFFFF" castShadow />
          {/* Warm Fill Light (Right) */}
          <pointLight position={[4, 2, 3]} intensity={1.8} color="#FEF3C7" />
          {/* Cool Sapphire Rim Light (Back-Top) to separate character from white infinity cove */}
          <pointLight position={[0, 4, -3]} intensity={4.5} color="#2563EB" />
          <pointLight position={[-3, -2, -2]} intensity={2.0} color="#38BDF8" />

          <CinematicCharacter mouse={mouse} />
        </Canvas>

        {/* Bottom Left Mouse-Tracking Telemetry Badge */}
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
          INTERACTIVE MOUSE-TRACKING LOOK · 60FPS
        </div>

        {/* Bottom Right Refraction Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "16px",
            ...TOKENS.type.micro,
            fontSize: "10px",
            color: "#2563EB",
            backgroundColor: "rgba(37, 99, 235, 0.08)",
            backdropFilter: "blur(12px)",
            padding: "5px 10px",
            borderRadius: TOKENS.radius.xs,
            border: "1px solid rgba(37, 99, 235, 0.22)",
            pointerEvents: "none",
            fontWeight: 700,
          }}
        >
          OPTICAL QUARTZ SHARDS
        </div>
      </div>
    </div>
  );
}
