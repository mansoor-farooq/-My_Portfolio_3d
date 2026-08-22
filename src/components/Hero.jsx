import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Database, Cpu, Sparkles, Layers } from "lucide-react";
import { TOKENS } from "../theme";
import IsometricArchitecture from "./IsometricArchitecture";
import Interactive3DCore from "./Interactive3DCore";

export default function Hero({ onExploreClick }) {
  const [heroMode, setHeroMode] = useState("3d");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <section
      id="home"
      style={{
        backgroundColor: TOKENS.surface,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "100px",
        paddingBottom: "48px",
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* Top Live Telemetry Eyebrow */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "28px",
              paddingBottom: "12px",
              borderBottom: `1px solid ${TOKENS.line}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: TOKENS.success,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  ...TOKENS.type.micro,
                  color: TOKENS.ink,
                }}
              >
                MANSOOR FAROOQ · FULL-STACK DEVELOPER
              </span>
            </div>

            <span
              style={{
                ...TOKENS.type.micro,
                color: TOKENS.muted,
              }}
            >
              NEXT.JS · NODE.JS · POSTGRESQL · KOTLIN ANDROID
            </span>
          </motion.div>

          {/* Main Hero Split: Left Content, Right 3D Isometric Architecture */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: "40px",
              alignItems: "center",
              marginBottom: "44px",
            }}
            className="hero-split-grid"
          >
            {/* Left: Proposition, Narrative, and Actions */}
            <div>
              {/* Main Proposition (Single Honest Claim) */}
              <motion.h1
                variants={itemVariants}
                style={{
                  ...TOKENS.type.display,
                  color: TOKENS.ink,
                  marginBottom: "20px",
                }}
              >
                I build premium custom web and mobile applications — from animated SaaS products to new-idea startups.
              </motion.h1>

              {/* Subtext — accurate, first-person */}
              <motion.p
                variants={itemVariants}
                style={{
                  ...TOKENS.type.body,
                  color: TOKENS.muted,
                  marginBottom: "32px",
                  maxWidth: "640px",
                }}
              >
                Through InfoTech Solutions in Karachi, I deliver fully custom web applications, animated business websites, and SaaS interfaces — built on Next.js, JavaScript, and Node.js with PostgreSQL. I also build native mobile apps with Kotlin. Every project starts from a real problem and a fresh idea.
              </motion.p>

              {/* Direct Actions (First-Person Human Voice, >=44px Touch Target) */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://wa.me/923292597331?text=Hello%20Mansoor,%20I%20would%20like%20to%20discuss%20an%20enterprise%20system%20build."
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "48px",
                    padding: "0 22px",
                    backgroundColor: TOKENS.accent,
                    color: "#FFFFFF",
                    borderRadius: TOKENS.radius.sm,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: TOKENS.transition,
                    boxShadow: TOKENS.shadow.resting,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1648CC";
                    e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = TOKENS.accent;
                    e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
                  }}
                >
                  <span>Discuss an Architecture Build</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  onClick={onExploreClick}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "48px",
                    padding: "0 20px",
                    backgroundColor: TOKENS.card,
                    color: TOKENS.ink,
                    border: `1px solid ${TOKENS.line}`,
                    borderRadius: TOKENS.radius.sm,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: TOKENS.transition,
                    boxShadow: TOKENS.shadow.resting,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = TOKENS.ink;
                    e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = TOKENS.line;
                    e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
                  }}
                >
                  <span>Inspect Production Systems & Proof</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive 3D Spatial Canvas or Isometric Architecture */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              {/* 3D Mode Selector Pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "3px",
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.xs,
                  boxShadow: TOKENS.shadow.resting,
                }}
              >
                <button
                  onClick={() => setHeroMode("3d")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    border: "none",
                    borderRadius: TOKENS.radius.xs,
                    backgroundColor: heroMode === "3d" ? TOKENS.accent : "transparent",
                    color: heroMode === "3d" ? "#FFFFFF" : TOKENS.muted,
                    ...TOKENS.type.micro,
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: TOKENS.transition,
                  }}
                >
                  <Sparkles size={11} />
                  <span>3D HOLOGRAM CORE</span>
                </button>

                <button
                  onClick={() => setHeroMode("iso")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    border: "none",
                    borderRadius: TOKENS.radius.xs,
                    backgroundColor: heroMode === "iso" ? TOKENS.accent : "transparent",
                    color: heroMode === "iso" ? "#FFFFFF" : TOKENS.muted,
                    ...TOKENS.type.micro,
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: TOKENS.transition,
                  }}
                >
                  <Layers size={11} />
                  <span>ISOMETRIC STACK</span>
                </button>
              </div>

              {heroMode === "3d" ? <Interactive3DCore /> : <IsometricArchitecture />}
            </motion.div>
          </div>

          {/* Three Verifiable Proof Blocks (Exact Mono/Sans Roles) */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              backgroundColor: TOKENS.line,
              border: `1px solid ${TOKENS.line}`,
              borderRadius: TOKENS.radius.sm,
              overflow: "hidden",
              boxShadow: TOKENS.shadow.resting,
            }}
          >
            {/* Stat 1 */}
            <div
              style={{
                backgroundColor: TOKENS.card,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <Database size={15} color={TOKENS.accent} />
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted }}>PRIMARY STACK</span>
              </div>
              <div style={{ ...TOKENS.type.title, color: TOKENS.ink, marginBottom: "4px" }}>
                Next.js + Node.js
              </div>
              <p style={{ ...TOKENS.type.data, color: TOKENS.muted, fontSize: "13px" }}>
                Full-stack JavaScript — from SaaS UI to REST API and PostgreSQL database design.
              </p>
            </div>

            {/* Stat 2 */}
            <div
              style={{
                backgroundColor: TOKENS.card,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <Cpu size={15} color={TOKENS.success} />
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted }}>MOBILE DEVELOPMENT</span>
              </div>
              <div style={{ ...TOKENS.type.title, color: TOKENS.ink, marginBottom: "4px" }}>
                Kotlin & Android
              </div>
              <p style={{ ...TOKENS.type.data, color: TOKENS.muted, fontSize: "13px" }}>
                Native Android development — currently building offline-first apps with Jetpack Compose.
              </p>
            </div>

            {/* Stat 3 */}
            <div
              style={{
                backgroundColor: TOKENS.card,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <ShieldCheck size={15} color={TOKENS.ink} />
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted }}>DELIVERY APPROACH</span>
              </div>
              <div style={{ ...TOKENS.type.title, color: TOKENS.ink, marginBottom: "4px" }}>
                Secure & Production-Ready
              </div>
              <p style={{ ...TOKENS.type.data, color: TOKENS.muted, fontSize: "13px" }}>
                Every app ships with clean code, secure authentication, and real performance benchmarks.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive Breakpoint Helper */}
      <style>{`
        @media (max-width: 900px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
