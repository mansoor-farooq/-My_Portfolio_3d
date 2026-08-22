import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Html, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TOKENS } from "../theme";
import { Cpu, Database, Globe, Smartphone, Shield, Sparkles as SparklesIcon, RefreshCw, Zap, Activity, Layers, ArrowRight } from "lucide-react";
import { playClickSound } from "../utils/audio";

// ── 3D Nodes Data
const SYSTEM_NODES = [
  {
    id: "frontend",
    name: "Next.js & React Core",
    role: "Client Architecture & UI Engine",
    position: [-2.2, 0.8, 0],
    color: "#0284C7",
    glowColor: "#38BDF8",
    icon: "⚛️",
    badge: "SUB-1.2s LCP",
    specs: ["App Router Architecture", "Server & Client Streaming", "Framer Motion 60FPS", "Tailwind CSS"],
    metrics: { throughput: "60 FPS", latency: "<150ms TTFB", state: "OPTIMAL" },
  },
  {
    id: "backend",
    name: "Node.js REST Gateway",
    role: "API Controllers & Business Logic",
    position: [0, 1.4, -0.5],
    color: "#059669",
    glowColor: "#34D399",
    icon: "🟢",
    badge: "JWT SECURE",
    specs: ["Express.js Microservices", "Zod Payload Validation", "Token Family Rotation", "Rate Limiting"],
    metrics: { throughput: "4,200 req/s", latency: "38ms avg", state: "HEALTHY" },
  },
  {
    id: "database",
    name: "PostgreSQL & SQLite",
    role: "Relational Ledger & Offline Edge",
    position: [2.2, 0.6, 0.2],
    color: "#7C3AED",
    glowColor: "#A78BFA",
    icon: "🐘",
    badge: "ACID LOCKED",
    specs: ["Relational Schema Design", "B-Tree & Composite Indexes", "Offline SQLite Room DB", "Zero Data Loss"],
    metrics: { throughput: "100% ACID", latency: "<5ms Local", state: "VERIFIED" },
  },
  {
    id: "mobile",
    name: "Kotlin & Android Native",
    role: "Native Mobile Client",
    position: [-1.2, -1.3, 0.5],
    color: "#D97706",
    glowColor: "#FBBF24",
    icon: "🎯",
    badge: "NATIVE COMPOSE",
    specs: ["Jetpack Compose UI", "Room Local DB Persistence", "Direct Hardware APIs", "Offline Capability"],
    metrics: { throughput: "120Hz Native", latency: "0ms Bridge", state: "ACTIVE" },
  },
  {
    id: "security",
    name: "Safe Auth & Encryption",
    role: "Security & OWASP Defense",
    position: [1.3, -1.2, -0.3],
    color: "#EC4899",
    glowColor: "#F472B6",
    icon: "🔒",
    badge: "SHA-256",
    specs: ["Input Sanitization", "CORS & CSP Hardening", "Parameterized SQL", "HTTPS & SSL/TLS"],
    metrics: { throughput: "256-Bit", latency: "Real-Time", state: "PROTECTED" },
  },
];

// ── Interactive Single 3D Node
function InteractiveNode({ node, activeNodeId, onSelectNode, isHovered, onHover }) {
  const meshRef = useRef();
  const isSelected = activeNodeId === node.id;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!isSelected) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    } else {
      meshRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group position={node.position}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Glowing Outer Polyhedron */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelectNode(node);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(node.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            onHover(null);
            document.body.style.cursor = "auto";
          }}
          scale={isSelected ? 1.25 : isHovered ? 1.15 : 1}
        >
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.glowColor}
            emissiveIntensity={isSelected ? 2.5 : isHovered ? 1.8 : 0.9}
            roughness={0.15}
            metalness={0.8}
            wireframe={!isSelected && !isHovered}
          />
        </mesh>

        {/* Inner Solid Crystal Core */}
        <mesh scale={0.28}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={node.glowColor} />
        </mesh>

        {/* Pulsing Orbit Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={isSelected ? 0.95 : 0.75}>
          <torusGeometry args={[1, 0.015, 16, 48]} />
          <meshBasicMaterial color={node.glowColor} transparent opacity={isSelected ? 0.8 : 0.4} />
        </mesh>

        {/* 3D Floating Tag in Space */}
        <Html distanceFactor={8} position={[0, -0.85, 0]} center>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              backgroundColor: isSelected ? node.color : "rgba(11, 18, 32, 0.85)",
              backdropFilter: "blur(6px)",
              border: `1px solid ${node.glowColor}`,
              color: "#FFFFFF",
              fontSize: "11px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
              boxShadow: isSelected ? `0 0 15px ${node.glowColor}80` : "0 4px 12px rgba(0,0,0,0.3)",
              transition: "all 180ms ease",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>{node.icon}</span>
            <span>{node.name.split(" ")[0]}</span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// ── 3D Laser Transmission Spines
function ConnectingLasers({ nodes, activeNodeId }) {
  const points = nodes.map((n) => new THREE.Vector3(...n.position));
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    points[0], points[1],
    points[1], points[2],
    points[2], points[4],
    points[4], points[3],
    points[3], points[0],
    points[1], points[3],
    points[1], points[4]
  ]);

  return (
    <lineSegments geometry={lineGeo}>
      <lineBasicMaterial color="#0284C7" transparent opacity={0.25} />
    </lineSegments>
  );
}

// ── Main Scene
function LabScene({ activeNodeId, onSelectNode, hoveredNodeId, onHover }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#0284C7" />
      <pointLight position={[-5, -5, -2]} intensity={2.5} color="#38BDF8" />
      <pointLight position={[0, 4, 3]} intensity={1.8} color="#7C3AED" />

      <ConnectingLasers nodes={SYSTEM_NODES} activeNodeId={activeNodeId} />

      {SYSTEM_NODES.map((node) => (
        <InteractiveNode
          key={node.id}
          node={node}
          activeNodeId={activeNodeId}
          onSelectNode={onSelectNode}
          isHovered={hoveredNodeId === node.id}
          onHover={onHover}
        />
      ))}

      <Sparkles count={45} scale={8} size={2.5} speed={0.5} color="#38BDF8" opacity={0.6} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} rotateSpeed={0.5} />
    </>
  );
}

export default function Spatial3DLab() {
  const [selectedNode, setSelectedNode] = useState(SYSTEM_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNodeClick = (node) => {
    playClickSound();
    setSelectedNode(node);
  };

  return (
    <section
      id="spatial-lab"
      ref={containerRef}
      style={{
        backgroundColor: "#070B14",
        paddingTop: "90px",
        paddingBottom: "90px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: TOKENS.maxWidth,
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#38BDF8",
                display: "inline-block",
                boxShadow: "0 0 12px #38BDF8",
              }}
            />
            <span style={{ ...TOKENS.type.micro, color: "#94A3B8", letterSpacing: "0.08em" }}>
              SPATIAL 3D ARCHITECTURE LAB // INTERACTIVE SYSTEM ENGINE
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h2
                style={{
                  ...TOKENS.type.title,
                  fontSize: "clamp(26px, 3.4vw, 38px)",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                Inspect the Full-Stack 3D System Topology
              </h2>
              <p style={{ ...TOKENS.type.body, color: "#94A3B8", maxWidth: "640px" }}>
                Rotate the 3D constellation. Click any system node in 3D space to inspect live throughput benchmarks, security protocols, and architectural specifications.
              </p>
            </div>

            {/* Quick Node Selector Pills */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {SYSTEM_NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNodeClick(n)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: TOKENS.radius.xs,
                    border: `1px solid ${selectedNode.id === n.id ? n.color : "rgba(255, 255, 255, 0.12)"}`,
                    backgroundColor: selectedNode.id === n.id ? `${n.color}25` : "rgba(255, 255, 255, 0.04)",
                    color: selectedNode.id === n.id ? "#FFFFFF" : "#94A3B8",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: TOKENS.transition,
                  }}
                >
                  <span>{n.icon}</span>
                  <span>{n.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Split: Left 3D WebGL Canvas + Right Live Telemetry Inspector */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
          className="spatial-lab-grid"
        >
          {/* 1. Left: 3D Interactive WebGL Canvas */}
          <div
            style={{
              position: "relative",
              height: "480px",
              backgroundColor: "rgba(11, 18, 32, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: TOKENS.radius.sm,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            {isVisible && (
              <Canvas
                camera={{ position: [0, 0, 5.2], fov: 50 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
              >
                <LabScene
                  activeNodeId={selectedNode.id}
                  onSelectNode={handleNodeClick}
                  hoveredNodeId={hoveredNodeId}
                  onHover={setHoveredNodeId}
                />
              </Canvas>
            )}

            {/* Bottom HUD Overlay Instruction */}
            <div
              style={{
                position: "absolute",
                bottom: "14px",
                left: "16px",
                right: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  ...TOKENS.type.micro,
                  fontSize: "10.5px",
                  color: "#38BDF8",
                  backgroundColor: "rgba(2, 132, 199, 0.2)",
                  padding: "4px 10px",
                  borderRadius: TOKENS.radius.xs,
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                DRAG TO ORBIT · CLICK NODES TO INSPECT
              </span>

              <span
                style={{
                  ...TOKENS.type.micro,
                  fontSize: "10.5px",
                  color: "#94A3B8",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "4px 10px",
                  borderRadius: TOKENS.radius.xs,
                }}
              >
                60FPS WEBGL ACCELERATED
              </span>
            </div>
          </div>

          {/* 2. Right: Live Selected Node Telemetry HUD */}
          <div
            style={{
              backgroundColor: "rgba(11, 18, 32, 0.9)",
              border: `1px solid ${selectedNode.color}40`,
              borderRadius: TOKENS.radius.sm,
              padding: "28px 26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: `0 10px 30px ${selectedNode.color}15`,
            }}
          >
            <div>
              {/* Node Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      backgroundColor: `${selectedNode.color}20`,
                      border: `1px solid ${selectedNode.color}50`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                  >
                    {selectedNode.icon}
                  </div>
                  <div>
                    <h3 style={{ ...TOKENS.type.title, fontSize: "18px", color: "#FFFFFF", margin: 0 }}>
                      {selectedNode.name}
                    </h3>
                    <span style={{ ...TOKENS.type.micro, color: "#94A3B8", fontSize: "11px" }}>
                      {selectedNode.role}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    ...TOKENS.type.micro,
                    fontSize: "10px",
                    color: selectedNode.glowColor,
                    backgroundColor: `${selectedNode.color}20`,
                    padding: "3px 8px",
                    borderRadius: TOKENS.radius.xs,
                    border: `1px solid ${selectedNode.color}40`,
                    fontWeight: 700,
                  }}
                >
                  {selectedNode.badge}
                </span>
              </div>

              {/* Live Metric Cards (3 Columns) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  margin: "20px 0",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: TOKENS.radius.xs,
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ ...TOKENS.type.micro, fontSize: "9.5px", color: "#94A3B8", display: "block", marginBottom: "4px" }}>
                    THROUGHPUT
                  </span>
                  <span style={{ ...TOKENS.type.data, fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>
                    {selectedNode.metrics.throughput}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: TOKENS.radius.xs,
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ ...TOKENS.type.micro, fontSize: "9.5px", color: "#94A3B8", display: "block", marginBottom: "4px" }}>
                    LATENCY
                  </span>
                  <span style={{ ...TOKENS.type.data, fontSize: "13px", fontWeight: 700, color: "#38BDF8" }}>
                    {selectedNode.metrics.latency}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: TOKENS.radius.xs,
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ ...TOKENS.type.micro, fontSize: "9.5px", color: "#94A3B8", display: "block", marginBottom: "4px" }}>
                    STATUS
                  </span>
                  <span style={{ ...TOKENS.type.data, fontSize: "13px", fontWeight: 700, color: "#10B981" }}>
                    {selectedNode.metrics.state}
                  </span>
                </div>
              </div>

              {/* Architectural Specs List */}
              <div style={{ marginBottom: "20px" }}>
                <span style={{ ...TOKENS.type.micro, fontSize: "11px", color: "#94A3B8", display: "block", marginBottom: "10px" }}>
                  ENGINEERING PROTOCOLS & STACK:
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedNode.specs.map((spec) => (
                    <div key={spec} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: selectedNode.color }} />
                      <span style={{ ...TOKENS.type.data, fontSize: "13px", color: "#E2E8F0" }}>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA to Discuss */}
            <a
              href="#contact"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: `${selectedNode.color}15`,
                border: `1px solid ${selectedNode.color}40`,
                borderRadius: TOKENS.radius.xs,
                color: "#FFFFFF",
                textDecoration: "none",
                ...TOKENS.type.data,
                fontSize: "13px",
                fontWeight: 600,
                transition: TOKENS.transition,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = selectedNode.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${selectedNode.color}15`;
              }}
            >
              <span>Build with {selectedNode.name.split(" ")[0]} Architecture</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .spatial-lab-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
