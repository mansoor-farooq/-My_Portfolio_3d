import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Html, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TOKENS } from "../theme";
import { Cpu, Database, Globe, Smartphone, Shield, Sparkles as SparklesIcon, RefreshCw, Zap, Activity, Layers, ArrowRight, Code2, CheckCircle2, Terminal } from "lucide-react";
import { playClickSound } from "../utils/audio";

// ── Ultra-Detailed System Topology Nodes
const SYSTEM_NODES = [
  {
    id: "frontend",
    name: "Next.js & React Core",
    role: "Client Architecture & 60FPS UI Engine",
    position: [-2.4, 0.9, 0],
    color: "#0284C7",
    glowColor: "#38BDF8",
    icon: "⚛️",
    badge: "SUB-1.2s LCP",
    specs: ["App Router & Server Components", "React Streaming & Suspense", "Framer Motion Hardware Transforms", "Tailwind Atomic CSS"],
    metrics: { throughput: "60 FPS", latency: "<120ms TTFB", state: "OPTIMAL", load: "98.8%" },
    codeSnippet: `// Next.js App Router Server Component
export async function SystemDashboard() {
  const telemetry = await getLiveTelemetry();
  return (
    <Suspense fallback={<SkeletonHUD />}>
      <TelemetryView data={telemetry} />
    </Suspense>
  );
}`,
  },
  {
    id: "backend",
    name: "Node.js REST Gateway",
    role: "Microservices & JWT Auth Pipeline",
    position: [0, 1.6, -0.6],
    color: "#059669",
    glowColor: "#34D399",
    icon: "🟢",
    badge: "JWT SECURE",
    specs: ["Express.js Layered Controllers", "Zod Schema Payload Sanitization", "Token Family Rotation Defense", "Redis Token Rate Limiting"],
    metrics: { throughput: "4,200 req/s", latency: "34ms avg", state: "HEALTHY", load: "99.4%" },
    codeSnippet: `// Express JWT Rotation & Auth Middleware
router.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  const session = await verifyTokenFamily(refreshToken);
  const newTokens = await issueTokenPair(session.userId);
  return res.json({ success: true, tokens: newTokens });
});`,
  },
  {
    id: "database",
    name: "PostgreSQL & SQLite",
    role: "Relational Ledger & Offline Edge DB",
    position: [2.4, 0.7, 0.3],
    color: "#7C3AED",
    glowColor: "#A78BFA",
    icon: "🐘",
    badge: "100% ACID",
    specs: ["PostgreSQL Relational Schema", "B-Tree & Composite Partial Indexes", "Offline SQLite Local Persistence", "Zero Data Loss Guarantee"],
    metrics: { throughput: "ACID Locked", latency: "<4ms Local", state: "VERIFIED", load: "99.9%" },
    codeSnippet: `-- Double-Entry Verified Transaction Block
BEGIN TRANSACTION;
  INSERT INTO journal_entries (id, account_id, debit, credit)
  VALUES ($1, $2, $3, 0), ($4, $5, 0, $3);
  -- Invariant Check: SUM(debits) = SUM(credits)
COMMIT;`,
  },
  {
    id: "mobile",
    name: "Kotlin & Android Native",
    role: "Native Mobile Client & Room DB",
    position: [-1.4, -1.4, 0.6],
    color: "#D97706",
    glowColor: "#FBBF24",
    icon: "🎯",
    badge: "NATIVE COMPOSE",
    specs: ["Jetpack Compose Reactive UI", "Room Database Offline Sync", "Direct Hardware & Sensor APIs", "Zero-Bridge Native Speed"],
    metrics: { throughput: "120Hz Native", latency: "0ms Bridge", state: "ACTIVE", load: "99.1%" },
    codeSnippet: `// Kotlin Jetpack Compose + Room ViewModel
@Composable
fun KnowledgeScreen(viewModel: MindVaultViewModel) {
    val notes by viewModel.offlineNotes.collectAsState()
    LazyColumn {
        items(notes) { note -> NoteCard(note) }
    }
}`,
  },
  {
    id: "security",
    name: "Safe Auth & Encryption",
    role: "OWASP Hardening & SSL Shield",
    position: [1.4, -1.3, -0.4],
    color: "#EC4899",
    glowColor: "#F472B6",
    icon: "🔒",
    badge: "256-BIT SSL",
    specs: ["Strict Input Sanitization", "Helmet CSP & HSTS Headers", "Parameterized SQL Queries", "HTTPS End-to-End Encryption"],
    metrics: { throughput: "SHA-256", latency: "Real-Time", state: "PROTECTED", load: "100%" },
    codeSnippet: `// Security Defense & Rate Limiter
app.use(helmet({ contentSecurityPolicy: true }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));
app.use(cors({ origin: 'https://mansoor.dev', credentials: true }));`,
  },
];

// ── Hyper-Realistic Glassy 3D Node
function Ultra3DNode({ node, activeNodeId, onSelectNode, isHovered, onHover }) {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();
  const isSelected = activeNodeId === node.id;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.35;
      outerRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.6;
      innerRef.current.rotation.z = t * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group position={node.position}>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
        {/* 1. Translucent Outer Glass Polyhedron */}
        <mesh
          ref={outerRef}
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
          scale={isSelected ? 1.3 : isHovered ? 1.18 : 1.05}
        >
          <icosahedronGeometry args={[0.62, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={256}
            transmission={0.92}
            roughness={0.08}
            thickness={1.2}
            ior={1.45}
            chromaticAberration={0.18}
            distortion={0.25}
            color={node.color}
            attenuationDistance={1.4}
            attenuationColor={node.color}
          />
        </mesh>

        {/* 2. Inner Glowing Energy Core */}
        <mesh ref={innerRef} scale={isSelected ? 0.38 : 0.3}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={node.glowColor}
            emissive={node.glowColor}
            emissiveIntensity={isSelected ? 3.0 : isHovered ? 2.2 : 1.4}
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>

        {/* 3. Glowing Orbital Planetary Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]} scale={isSelected ? 1.15 : 0.95}>
          <torusGeometry args={[1, 0.018, 16, 64]} />
          <meshBasicMaterial color={node.glowColor} transparent opacity={isSelected ? 0.9 : 0.45} />
        </mesh>

        {/* 4. Luxury Cyberpunk Frosted Glass HUD Tag */}
        <Html distanceFactor={8} position={[0, -0.95, 0]} center>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
            style={{
              padding: "5px 12px",
              borderRadius: "8px",
              backgroundColor: isSelected ? node.color : "rgba(11, 18, 32, 0.88)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: `1px solid ${isSelected ? "#FFFFFF" : `${node.glowColor}60`}`,
              color: "#FFFFFF",
              fontSize: "11px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
              boxShadow: isSelected
                ? `0 0 20px ${node.glowColor}, 0 4px 14px rgba(0,0,0,0.5)`
                : "0 8px 24px rgba(0, 0, 0, 0.45)",
              transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <span style={{ fontSize: "12px" }}>{node.icon}</span>
            <span>{node.name.split(" ")[0]}</span>
            {isSelected && (
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 0 6px #FFFFFF",
                }}
              />
            )}
          </div>
        </Html>
      </Float>
    </group>
  );
}

// ── 3D Dynamic Laser Data Streams
function LaserDataStreams({ nodes }) {
  const points = nodes.map((n) => new THREE.Vector3(...n.position));
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    points[0], points[1],
    points[1], points[2],
    points[2], points[4],
    points[4], points[3],
    points[3], points[0],
    points[1], points[3],
    points[1], points[4],
  ]);

  return (
    <lineSegments geometry={lineGeo}>
      <lineBasicMaterial color="#38BDF8" transparent opacity={0.35} />
    </lineSegments>
  );
}

// ── Main WebGL 3D Scene
function LabScene({ activeNodeId, onSelectNode, hoveredNodeId, onHover }) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <pointLight position={[6, 6, 6]} intensity={3.2} color="#0284C7" />
      <pointLight position={[-6, -6, -2]} intensity={2.6} color="#38BDF8" />
      <pointLight position={[0, 5, 4]} intensity={2.0} color="#7C3AED" />

      <LaserDataStreams nodes={SYSTEM_NODES} />

      {SYSTEM_NODES.map((node) => (
        <Ultra3DNode
          key={node.id}
          node={node}
          activeNodeId={activeNodeId}
          onSelectNode={onSelectNode}
          isHovered={hoveredNodeId === node.id}
          onHover={onHover}
        />
      ))}

      <Sparkles count={55} scale={9} size={2.8} speed={0.6} color="#38BDF8" opacity={0.7} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.6}
        rotateSpeed={0.5}
        autoRotate={true}
        autoRotateSpeed={0.6}
      />
    </>
  );
}

export default function Spatial3DLab() {
  const [selectedNode, setSelectedNode] = useState(SYSTEM_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [activeTab, setActiveTab] = useState("specs"); // 'specs' | 'code'
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
        backgroundColor: "#060912",
        paddingTop: "90px",
        paddingBottom: "90px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Aurora Ambient Glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2, 132, 199, 0.18) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%)",
          filter: "blur(70px)",
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
              SPATIAL 3D ARCHITECTURE LAB // INTERACTIVE SYSTEM TOPOLOGY
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
                Inspect Full-Stack 3D System Topology
              </h2>
              <p style={{ ...TOKENS.type.body, color: "#94A3B8", maxWidth: "640px" }}>
                Rotate the 3D WebGL constellation. Click any system node to inspect live throughput benchmarks, security protocols, and production code snippets.
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
                    padding: "7px 14px",
                    borderRadius: TOKENS.radius.xs,
                    border: `1px solid ${selectedNode.id === n.id ? n.color : "rgba(255, 255, 255, 0.12)"}`,
                    backgroundColor: selectedNode.id === n.id ? `${n.color}25` : "rgba(255, 255, 255, 0.04)",
                    color: selectedNode.id === n.id ? "#FFFFFF" : "#94A3B8",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: TOKENS.transition,
                    boxShadow: selectedNode.id === n.id ? `0 0 16px ${n.glowColor}40` : "none",
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
            gridTemplateColumns: "1.35fr 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
          className="spatial-lab-grid"
        >
          {/* 1. Left: 3D Interactive WebGL Canvas */}
          <div
            style={{
              position: "relative",
              height: "500px",
              backgroundColor: "rgba(11, 18, 32, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: TOKENS.radius.sm,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {isVisible && (
              <Canvas
                camera={{ position: [0, 0, 5.4], fov: 48 }}
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
                  backdropFilter: "blur(6px)",
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
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(6px)",
                  padding: "4px 10px",
                  borderRadius: TOKENS.radius.xs,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                60FPS WEBGL ACCELERATED
              </span>
            </div>
          </div>

          {/* 2. Right: Live Selected Node Telemetry HUD */}
          <div
            style={{
              backgroundColor: "rgba(11, 18, 32, 0.95)",
              border: `1px solid ${selectedNode.color}60`,
              borderRadius: TOKENS.radius.sm,
              padding: "26px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: `0 10px 35px ${selectedNode.color}20`,
            }}
          >
            <div>
              {/* Node Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: `${selectedNode.color}20`,
                      border: `1px solid ${selectedNode.color}60`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      boxShadow: `0 0 14px ${selectedNode.glowColor}40`,
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
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${selectedNode.color}30`,
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
                    border: `1px solid ${selectedNode.color}30`,
                    borderRadius: TOKENS.radius.xs,
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ ...TOKENS.type.micro, fontSize: "9.5px", color: "#94A3B8", display: "block", marginBottom: "4px" }}>
                    LATENCY
                  </span>
                  <span style={{ ...TOKENS.type.data, fontSize: "13px", fontWeight: 700, color: selectedNode.glowColor }}>
                    {selectedNode.metrics.latency}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${selectedNode.color}30`,
                    borderRadius: TOKENS.radius.xs,
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ ...TOKENS.type.micro, fontSize: "9.5px", color: "#94A3B8", display: "block", marginBottom: "4px" }}>
                    HEALTH
                  </span>
                  <span style={{ ...TOKENS.type.data, fontSize: "13px", fontWeight: 700, color: "#10B981" }}>
                    {selectedNode.metrics.state}
                  </span>
                </div>
              </div>

              {/* Inspector View Mode Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingBottom: "10px",
                  marginBottom: "14px",
                }}
              >
                <button
                  onClick={() => setActiveTab("specs")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: TOKENS.radius.xs,
                    border: "none",
                    backgroundColor: activeTab === "specs" ? selectedNode.color : "transparent",
                    color: activeTab === "specs" ? "#FFFFFF" : "#94A3B8",
                    ...TOKENS.type.micro,
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  SPECS & PROTOCOLS
                </button>

                <button
                  onClick={() => setActiveTab("code")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: TOKENS.radius.xs,
                    border: "none",
                    backgroundColor: activeTab === "code" ? selectedNode.color : "transparent",
                    color: activeTab === "code" ? "#FFFFFF" : "#94A3B8",
                    ...TOKENS.type.micro,
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Code2 size={12} />
                  <span>CODE SNIPPET</span>
                </button>
              </div>

              {/* Tab 1: Specs List */}
              {activeTab === "specs" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", minHeight: "120px" }}>
                  {selectedNode.specs.map((spec) => (
                    <div key={spec} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: selectedNode.color }} />
                      <span style={{ ...TOKENS.type.data, fontSize: "12.5px", color: "#E2E8F0" }}>{spec}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Code Snippet Preview */}
              {activeTab === "code" && (
                <pre
                  style={{
                    margin: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: TOKENS.radius.xs,
                    padding: "10px 12px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    lineHeight: 1.5,
                    color: "#A7F3D0",
                    overflowX: "auto",
                    minHeight: "120px",
                  }}
                >
                  {selectedNode.codeSnippet}
                </pre>
              )}
            </div>

            {/* Bottom CTA to Discuss */}
            <a
              href="#contact"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                marginTop: "16px",
                backgroundColor: `${selectedNode.color}18`,
                border: `1px solid ${selectedNode.color}50`,
                borderRadius: TOKENS.radius.xs,
                color: "#FFFFFF",
                textDecoration: "none",
                ...TOKENS.type.data,
                fontSize: "13px",
                fontWeight: 600,
                transition: TOKENS.transition,
                boxShadow: `0 4px 14px ${selectedNode.color}15`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = selectedNode.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${selectedNode.color}18`;
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
