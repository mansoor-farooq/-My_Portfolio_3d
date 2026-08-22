import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOKENS } from "../theme";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, ArrowLeft, X, Maximize2, ShieldCheck, Zap, Layers, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import TiltCard3D from "./TiltCard3D";
import { playClickSound } from "../utils/audio";
import infotechImg from "../image/project_infotech.jpg";
import mindvaultImg from "../image/project_mindvault.jpg";
import gatepassImg from "../image/project_gatepass.jpg";
import apimonitorImg from "../image/project_apimonitor.jpg";

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState(null);

  const projects = [
    {
      id: "01",
      number: "01",
      title: "InfoTech Solutions — Digital Platform",
      category: "Full-Stack Web Application",
      tag: "FULL-STACK WEB APP",
      tagColor: TOKENS.accent,
      image: infotechImg,
      subtitle: "Custom animated web presence, services catalogue, and interactive client dashboard.",
      metric: "<1.2s LCP · 100 Lighthouse Performance",
      problem:
        "Local business websites rely heavily on generic WordPress templates and bloated page builders that load slowly (4s+), provide poor mobile usability, and fail to convey modern technical credibility.",
      solution:
        "Engineered a bespoke, zero-bloat Next.js platform with custom Framer Motion orchestration, responsive UI components, and sub-1.5s load times. Built from scratch with clean, maintainable code.",
      architecture: [
        "React Server Components for instant HTML streaming without heavy JS hydration overhead",
        "Hardware-accelerated CSS transforms targeting GPU-only properties (translate3d, opacity)",
        "Fully custom responsive layout tested from 360px mobile viewport up to 4K displays",
      ],
      stack: ["Next.js", "React", "Framer Motion", "Tailwind CSS", "Node.js"],
      deliverables: ["Custom Animation Engine", "100% Mobile Responsive (360px+)", "SEO & Sub-1.5s Performance"],
    },
    {
      id: "02",
      number: "02",
      title: "MindVault — Offline Knowledge & Ledger OS",
      category: "Offline-First Architecture",
      tag: "OFFLINE-FIRST APP",
      tagColor: "#7C3AED",
      image: mindvaultImg,
      subtitle: "Personal knowledge management, voice note capture, and private financial ledger.",
      metric: "100% Offline · Sub-5ms Local SQLite",
      problem:
        "Existing note-taking and personal ledger apps lock user data behind monthly subscription fees and completely stop working when internet connectivity is unstable or offline.",
      solution:
        "Architected an offline-first system using SQLite local database synchronization and in-browser audio recording. Captures thoughts, indexes documents, and manages personal ledgers without needing active internet.",
      architecture: [
        "Local SQLite / IndexedDB layer acting as immediate single source of truth",
        "Append-only transaction journal with cryptographic vector clock timestamps",
        "Background web worker sync dispatcher listening for connection state events",
      ],
      stack: ["TypeScript", "Next.js", "SQLite (Local)", "Web Audio API", "Node.js"],
      deliverables: ["100% Offline Usability", "Voice-to-Text Note Pipeline", "Double-Entry Balance Verification"],
    },
    {
      id: "03",
      number: "03",
      title: "Gate Pass & Material Dispatch System",
      category: "Operations & Logistics",
      tag: "OPERATIONS & LOGISTICS",
      tagColor: "#D97706",
      image: gatepassImg,
      subtitle: "Real-time dispatch tracking, gate clearance, and QR verification interface.",
      metric: "Zero Record Loss · <300ms Verification",
      problem:
        "Manual paper registers at industrial gates cause vehicle bottlenecks, lost records, and delays in verifying whether outgoing inventory matches authorized purchase orders.",
      solution:
        "Digitized the entire gate pass lifecycle with an intuitive, high-contrast web dashboard. Features instant QR status verification, dispatch logs, and live tracking of material status across terminal checkpoints.",
      architecture: [
        "Role-based security ensuring security guards only see clearance tokens",
        "PostgreSQL indexed material ledgers with audit history on every status update",
        "High-contrast terminal UI designed specifically for outdoor industrial monitors",
      ],
      stack: ["JavaScript", "React", "REST API", "Tailwind CSS", "PostgreSQL"],
      deliverables: ["Instant QR Verification", "Zero Record Loss", "Fast Multi-Terminal Entry Search"],
    },
    {
      id: "04",
      number: "04",
      title: "API Status & Microservice Health Monitor",
      category: "Developer Tooling & DevOps",
      tag: "TELEMETRY & MONITORING",
      tagColor: TOKENS.success,
      image: apimonitorImg,
      subtitle: "Live endpoint uptime tracker, latency charts, and incident telemetry.",
      metric: "Real-Time Telemetry · 30s Health Pings",
      problem:
        "Developers and businesses often discover backend API outages only after users complain, lacking live telemetry on latency spikes or database connection drops.",
      solution:
        "Built a lightweight, continuous health-check dashboard that pings critical microservices, visualizes response time wave charts, and generates real-time HTTP 200 / 500 status logs.",
      architecture: [
        "Lightweight Node.js background cron workers pinging microservice endpoints",
        "Real-time latency analytics calculating rolling p95 and p99 response times",
        "Automated incident alert logs stored with exact timestamps and HTTP error payloads",
      ],
      stack: ["Node.js", "Express", "Chart Telemetry", "PostgreSQL", "Next.js"],
      deliverables: ["Live Latency Waveform Graph", "Automated Health Checks", "Endpoint Response Benchmarks"],
    },
  ];

  const currentProject = projects[currentIndex];

  const handleNext = () => {
    playClickSound();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    playClickSound();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleJumpTo = (idx) => {
    if (idx === currentIndex) return;
    playClickSound();
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const openProjectModal = (p) => {
    playClickSound();
    setActiveModalProject(p);
  };

  // Safe background scroll lock for modals without breaking internal modal wheel scroll
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalProject]);

  const handleModalNext = () => {
    playClickSound();
    const nextIdx = (projects.findIndex((p) => p.id === activeModalProject.id) + 1) % projects.length;
    setActiveModalProject(projects[nextIdx]);
  };

  const handleModalPrev = () => {
    playClickSound();
    const currIdx = projects.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + projects.length) % projects.length;
    setActiveModalProject(projects[prevIdx]);
  };

  // Keyboard navigation when modal or slider is focused
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalProject) {
        if (e.key === "Escape") setActiveModalProject(null);
        if (e.key === "ArrowRight") handleModalNext();
        if (e.key === "ArrowLeft") handleModalPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalProject]);

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 140 : -140,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -140 : 140,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      id="projects"
      style={{
        backgroundColor: TOKENS.surface,
        paddingTop: "90px",
        paddingBottom: "90px",
        borderBottom: `1px solid ${TOKENS.line}`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: TOKENS.maxWidth,
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
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
                backgroundColor: TOKENS.accent,
                display: "inline-block",
                boxShadow: "0 0 10px rgba(2, 132, 199, 0.5)",
              }}
            />
            <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, letterSpacing: "0.08em" }}>
              03 // PRODUCTION CASE STUDIES & APPLICATIONS
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  ...TOKENS.type.title,
                  fontSize: "clamp(26px, 3.4vw, 38px)",
                  color: TOKENS.ink,
                  marginBottom: "8px",
                }}
              >
                Real problems solved with custom software.
              </h2>
              <p style={{ ...TOKENS.type.body, color: TOKENS.muted, maxWidth: "660px" }}>
                Interactive sliding case studies — slide through production applications to inspect exact challenges and custom architectures.
              </p>
            </div>

            {/* Slider Navigation Buttons & Counter */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.xs,
                  ...TOKENS.type.micro,
                  fontSize: "12px",
                  color: TOKENS.ink,
                  fontWeight: 600,
                }}
              >
                <span>{String(currentIndex + 1).padStart(2, "0")}</span>
                <span style={{ color: TOKENS.muted }}>/</span>
                <span style={{ color: TOKENS.muted }}>{String(projects.length).padStart(2, "0")}</span>
              </div>

              <button
                onClick={handlePrev}
                aria-label="Previous Project"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: TOKENS.radius.xs,
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: TOKENS.ink,
                  transition: TOKENS.transition,
                  boxShadow: TOKENS.shadow.resting,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = TOKENS.accent;
                  e.currentTarget.style.backgroundColor = TOKENS.accentSubtle;
                  e.currentTarget.style.color = TOKENS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = TOKENS.line;
                  e.currentTarget.style.backgroundColor = TOKENS.card;
                  e.currentTarget.style.color = TOKENS.ink;
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Project"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: TOKENS.radius.xs,
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: TOKENS.ink,
                  transition: TOKENS.transition,
                  boxShadow: TOKENS.shadow.resting,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = TOKENS.accent;
                  e.currentTarget.style.backgroundColor = TOKENS.accentSubtle;
                  e.currentTarget.style.color = TOKENS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = TOKENS.line;
                  e.currentTarget.style.backgroundColor = TOKENS.card;
                  e.currentTarget.style.color = TOKENS.ink;
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Slideable Active Project Showcase Card ── */}
        <div style={{ position: "relative", minHeight: "520px", marginBottom: "28px", width: "100%" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProject.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -80 || offset.x < -50) {
                  handleNext();
                } else if (swipe > 80 || offset.x > 50) {
                  handlePrev();
                }
              }}
              style={{ width: "100%", cursor: "grab" }}
            >
              <TiltCard3D intensity={3} glare={true}>
                <div
                  style={{
                    backgroundColor: TOKENS.card,
                    border: `1px solid ${currentProject.tagColor}50`,
                    borderRadius: TOKENS.radius.sm,
                    overflow: "hidden",
                    boxShadow: "0 20px 45px rgba(0, 0, 0, 0.08)",
                    display: "grid",
                    gridTemplateColumns: "1.15fr 1fr",
                    alignItems: "stretch",
                    transition: TOKENS.transition,
                  }}
                  className="project-showcase-row"
                >
                  {/* Left Column: Uncropped Padded UI Mockup */}
                  <div
                    style={{
                      backgroundColor: "#080D1A",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRight: `1px solid ${TOKENS.line}`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    className="project-image-col"
                  >
                    {/* Top macOS Browser Frame Bar */}
                    <div
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "rgba(11, 18, 32, 0.95)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        zIndex: 2,
                      }}
                    >
                      <div style={{ display: "flex", gap: "6px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#EF4444" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#F59E0B" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                      </div>

                      <span style={{ ...TOKENS.type.micro, fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                        https://app.{currentProject.id}.mansoor.production
                      </span>

                      <span
                        style={{
                          ...TOKENS.type.micro,
                          fontSize: "10px",
                          color: currentProject.tagColor,
                          backgroundColor: `${currentProject.tagColor}20`,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontWeight: 700,
                        }}
                      >
                        {currentProject.metric.split("·")[0]}
                      </span>
                    </div>

                    {/* Uncropped Fitted Mockup Image Container */}
                    <div
                      style={{
                        position: "relative",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "22px 26px",
                        backgroundColor: "#080D1A",
                        cursor: "pointer",
                        overflow: "hidden",
                        minHeight: "330px",
                      }}
                      onClick={() => openProjectModal(currentProject)}
                    >
                      <img
                        src={currentProject.image}
                        alt={`${currentProject.title} Interface`}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "330px",
                          objectFit: "contain",
                          display: "block",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.45)",
                          transition: "transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.025)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        loading="lazy"
                      />

                      {/* Click to Expand Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          right: "16px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "5px 11px",
                          backgroundColor: "rgba(11, 18, 32, 0.9)",
                          backdropFilter: "blur(10px)",
                          borderRadius: TOKENS.radius.xs,
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "#FFFFFF",
                          ...TOKENS.type.micro,
                          fontSize: "10.5px",
                          fontWeight: 600,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        }}
                      >
                        <Maximize2 size={11} />
                        <span>Click to Expand</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Architecture Story */}
                  <div
                    style={{
                      padding: "32px 30px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {/* Eyebrow Meta */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <span
                          style={{
                            ...TOKENS.type.micro,
                            fontSize: "11px",
                            color: currentProject.tagColor,
                            backgroundColor: `${currentProject.tagColor}15`,
                            border: `1px solid ${currentProject.tagColor}35`,
                            padding: "3px 9px",
                            borderRadius: TOKENS.radius.xs,
                            fontWeight: 700,
                          }}
                        >
                          {currentProject.tag}
                        </span>
                        <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                          {currentProject.category}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3
                        style={{
                          ...TOKENS.type.title,
                          fontSize: "clamp(20px, 2.2vw, 24px)",
                          color: TOKENS.ink,
                          marginBottom: "6px",
                          lineHeight: 1.3,
                        }}
                      >
                        {currentProject.title}
                      </h3>

                      <p
                        style={{
                          ...TOKENS.type.body,
                          fontSize: "13.5px",
                          color: TOKENS.muted,
                          marginBottom: "20px",
                          lineHeight: 1.6,
                        }}
                      >
                        {currentProject.subtitle}
                      </p>

                      {/* Problem vs Solution Split */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                        {/* 1. Problem Box */}
                        <div
                          style={{
                            padding: "12px 14px",
                            backgroundColor: "#FEF2F2",
                            border: "1px solid #FECACA",
                            borderRadius: TOKENS.radius.xs,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <AlertCircle size={14} color="#DC2626" />
                            <span style={{ ...TOKENS.type.micro, color: "#DC2626", fontSize: "10.5px", fontWeight: 700 }}>
                              THE CHALLENGE
                            </span>
                          </div>
                          <p style={{ ...TOKENS.type.body, fontSize: "13px", color: "#7F1D1D", margin: 0, lineHeight: 1.55 }}>
                            {currentProject.problem}
                          </p>
                        </div>

                        {/* 2. Solution Box */}
                        <div
                          style={{
                            padding: "12px 14px",
                            backgroundColor: `${currentProject.tagColor}0D`,
                            border: `1px solid ${currentProject.tagColor}35`,
                            borderRadius: TOKENS.radius.xs,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <CheckCircle2 size={14} color={currentProject.tagColor} />
                            <span style={{ ...TOKENS.type.micro, color: currentProject.tagColor, fontSize: "10.5px", fontWeight: 700 }}>
                              CUSTOM ARCHITECTURAL SOLUTION
                            </span>
                          </div>
                          <p style={{ ...TOKENS.type.body, fontSize: "13px", color: TOKENS.ink, margin: 0, lineHeight: 1.55 }}>
                            {currentProject.solution}
                          </p>
                        </div>
                      </div>

                      {/* Key Deliverables Bullet Points */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                        {currentProject.deliverables.map((item) => (
                          <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: currentProject.tagColor }} />
                            <span style={{ ...TOKENS.type.data, fontSize: "12.5px", color: TOKENS.ink, fontWeight: 500 }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Row: Stack Chips + Case Study Action Button */}
                    <div
                      style={{
                        paddingTop: "16px",
                        borderTop: `1px solid ${TOKENS.line}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {currentProject.stack.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              ...TOKENS.type.micro,
                              fontSize: "11px",
                              padding: "3px 8px",
                              borderRadius: TOKENS.radius.xs,
                              backgroundColor: TOKENS.surface,
                              border: `1px solid ${TOKENS.line}`,
                              color: TOKENS.muted,
                              fontWeight: 600,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => openProjectModal(currentProject)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          backgroundColor: TOKENS.ink,
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: TOKENS.radius.xs,
                          ...TOKENS.type.data,
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: TOKENS.transition,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = currentProject.tagColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = TOKENS.ink;
                        }}
                      >
                        <span>Deep Case Study</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Direct Slide Thumbnails Selector ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "14px",
            width: "100%",
          }}
          className="project-thumbnails-grid"
        >
          {projects.map((p, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => handleJumpTo(idx)}
                style={{
                  padding: "12px 14px",
                  borderRadius: TOKENS.radius.xs,
                  backgroundColor: isSelected ? TOKENS.card : TOKENS.surface,
                  border: `1px solid ${isSelected ? p.tagColor : TOKENS.line}`,
                  boxShadow: isSelected ? `0 4px 14px ${p.tagColor}25` : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: TOKENS.transition,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "10px",
                      color: isSelected ? p.tagColor : TOKENS.muted,
                      fontWeight: 700,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  {isSelected && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: p.tagColor,
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    ...TOKENS.type.data,
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: isSelected ? TOKENS.ink : TOKENS.muted,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.title.split("—")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Ultra-Wide Deep Architectural Case Study Modal (data-lenis-prevent) ── */}
        {activeModalProject && (
          <div
            data-lenis-prevent="true"
            onClick={() => setActiveModalProject(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(11, 18, 32, 0.88)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              overscrollBehavior: "contain",
            }}
          >
            <div
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                backgroundColor: TOKENS.card,
                border: `1px solid ${activeModalProject.tagColor}50`,
                borderRadius: TOKENS.radius.sm,
                maxWidth: "1160px",
                width: "95vw",
                maxHeight: "90vh",
                overflowY: "auto",
                overscrollBehavior: "contain",
                padding: "36px 36px",
                boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.5)",
                position: "relative",
              }}
              className="custom-modal-scrollbar"
            >
              {/* Modal Top Bar with Next / Prev */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: `1px solid ${TOKENS.line}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "11px",
                      color: "#FFFFFF",
                      backgroundColor: activeModalProject.tagColor,
                      padding: "3px 9px",
                      borderRadius: TOKENS.radius.xs,
                      fontWeight: 700,
                    }}
                  >
                    {activeModalProject.tag}
                  </span>
                  <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11.5px" }}>
                    Case Study ({activeModalProject.id} of {projects.length})
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={handleModalPrev}
                    style={{
                      padding: "6px 12px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      ...TOKENS.type.micro,
                      fontSize: "11.5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                    }}
                  >
                    <ChevronLeft size={14} />
                    <span>PREV</span>
                  </button>

                  <button
                    onClick={handleModalNext}
                    style={{
                      padding: "6px 12px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      ...TOKENS.type.micro,
                      fontSize: "11.5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                    }}
                  >
                    <span>NEXT</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    onClick={() => setActiveModalProject(null)}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: TOKENS.ink,
                      cursor: "pointer",
                    }}
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 style={{ ...TOKENS.type.title, fontSize: "26px", color: TOKENS.ink, marginBottom: "6px" }}>
                {activeModalProject.title}
              </h2>
              <p style={{ ...TOKENS.type.body, color: TOKENS.muted, marginBottom: "22px" }}>
                {activeModalProject.subtitle}
              </p>

              {/* High-Res Full Image Banner (100% Uncropped with Ultra-Wide Padded Frame) */}
              <div
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  borderRadius: TOKENS.radius.xs,
                  overflow: "hidden",
                  marginBottom: "26px",
                  border: `1px solid ${TOKENS.line}`,
                  backgroundColor: "#080D1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "440px",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "8px",
                    boxShadow: "0 14px 36px rgba(0,0,0,0.5)",
                  }}
                />
              </div>

              {/* Wide 2-Column Problem & Solution Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px",
                  marginBottom: "24px",
                }}
                className="modal-challenge-grid"
              >
                <div style={{ padding: "18px 20px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: TOKENS.radius.xs }}>
                  <div style={{ ...TOKENS.type.micro, color: "#DC2626", fontWeight: 700, marginBottom: "6px" }}>
                    EXACT CHALLENGE & CLIENT PROBLEM
                  </div>
                  <p style={{ ...TOKENS.type.body, fontSize: "13.5px", color: "#7F1D1D", margin: 0, lineHeight: 1.6 }}>
                    {activeModalProject.problem}
                  </p>
                </div>

                <div style={{ padding: "18px 20px", backgroundColor: `${activeModalProject.tagColor}0D`, border: `1px solid ${activeModalProject.tagColor}40`, borderRadius: TOKENS.radius.xs }}>
                  <div style={{ ...TOKENS.type.micro, color: activeModalProject.tagColor, fontWeight: 700, marginBottom: "6px" }}>
                    CUSTOM ENGINEERING SOLUTION
                  </div>
                  <p style={{ ...TOKENS.type.body, fontSize: "13.5px", color: TOKENS.ink, margin: 0, lineHeight: 1.6 }}>
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Key Technical Protocols List */}
              <div style={{ marginBottom: "26px" }}>
                <div style={{ ...TOKENS.type.micro, color: TOKENS.muted, marginBottom: "10px", fontSize: "11.5px" }}>
                  SYSTEM ARCHITECTURAL DECISIONS:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {activeModalProject.architecture.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "start", gap: "10px" }}>
                      <CheckCircle2 size={16} color={activeModalProject.tagColor} style={{ marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ ...TOKENS.type.data, fontSize: "13.5px", color: TOKENS.ink, lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "20px",
                  borderTop: `1px solid ${TOKENS.line}`,
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {activeModalProject.stack.map((t) => (
                    <span
                      key={t}
                      style={{
                        ...TOKENS.type.micro,
                        fontSize: "11px",
                        padding: "4px 9px",
                        borderRadius: TOKENS.radius.xs,
                        backgroundColor: TOKENS.surface,
                        border: `1px solid ${TOKENS.line}`,
                        color: TOKENS.ink,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={() => setActiveModalProject(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 18px",
                    backgroundColor: TOKENS.ink,
                    color: "#FFFFFF",
                    borderRadius: TOKENS.radius.xs,
                    textDecoration: "none",
                    ...TOKENS.type.data,
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <span>Build a Similar Application with Mansoor</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-modal-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.35);
        }

        @media (max-width: 900px) {
          .project-showcase-row {
            grid-template-columns: 1fr !important;
          }
          .project-image-col {
            border-right: none !important;
            border-bottom: 1px solid ${TOKENS.line} !important;
          }
          .project-thumbnails-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .modal-challenge-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
