import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, ShieldCheck, Zap, Layers, Server, CheckCircle2 } from "lucide-react";
import { TH } from "../theme";
import { playClickSound } from "../utils/audio";
import { GithubIcon } from "./Icons";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(3, 5, 8, 0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          style={{
            position: "relative",
            zIndex: 1001,
            width: "100%",
            maxWidth: 780,
            maxHeight: "88vh",
            background: "linear-gradient(170deg, #101522 0%, #0A0D15 100%)",
            border: `1px solid ${TH.borderMid}`,
            borderRadius: 24,
            overflowY: "auto",
            boxShadow: `0 28px 80px ${TH.shadowLg}, 0 0 0 1px rgba(255,255,255,0.06)`,
            color: TH.text,
          }}
        >
          {/* Header Accent Bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color || TH.accent}, ${TH.cyan}, ${TH.gold})` }} />

          {/* Modal Header */}
          <div style={{ padding: "28px 32px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${TH.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: `${project.color || TH.accent}15`,
                  border: `1px solid ${project.color || TH.accent}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  boxShadow: `0 0 24px ${project.color || TH.accent}20`,
                }}
              >
                {project.icon || "⚡"}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 100,
                      background: `${project.color || TH.accent}18`,
                      border: `1px solid ${project.color || TH.accent}30`,
                      color: project.color || TH.accent,
                      fontSize: 10,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.tag || "Production"}
                  </span>
                  <span style={{ color: TH.textMuted, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                    Verified Case Study
                  </span>
                </div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, marginTop: 4, letterSpacing: "-0.02em" }}>
                  {project.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${TH.border}`,
                color: TH.textSub,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.color = "#FFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.color = TH.textSub;
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: "28px 32px 36px", display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Description */}
            <div>
              <h4 style={{ color: TH.textSub, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                Executive Summary
              </h4>
              <p style={{ color: "#E2E8F0", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
                {project.desc}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div style={{ background: "rgba(255, 255, 255, 0.03)", border: `1px solid ${TH.border}`, borderRadius: 16, padding: "20px 22px" }}>
              <h4 style={{ color: project.color || TH.accent, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Cpu size={14} /> Architecture & Engineering Impact
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle2 size={16} color={project.color || TH.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TH.text }}>Clean Micro-Architecture</div>
                    <div style={{ fontSize: 12, color: TH.textMuted, marginTop: 2 }}>Modular, decoupled pipeline with strict error boundaries and caching layers.</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Zap size={16} color={TH.gold} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TH.text }}>Ultra-Low Latency</div>
                    <div style={{ fontSize: 12, color: TH.textMuted, marginTop: 2 }}>Sub-100ms API response times with streaming tokens & connection pooling.</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <ShieldCheck size={16} color={TH.cyan} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TH.text }}>Enterprise Security</div>
                    <div style={{ fontSize: 12, color: TH.textMuted, marginTop: 2 }}>JWT verification, rate limiting, and sanitized payload validation.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 style={{ color: TH.textSub, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
                Core Technologies & Tools
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tech?.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 10,
                      background: "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${TH.border}`,
                      color: "#F8FAFC",
                      fontSize: 12.5,
                      fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClickSound()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 22px",
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${project.color || TH.accent}, #059669)`,
                  color: "#030712",
                  fontWeight: 800,
                  fontSize: 13.5,
                  textDecoration: "none",
                  boxShadow: `0 10px 30px ${project.color || TH.accent}35`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                }}
              >
                <GithubIcon size={17} color="#030712" /> View Source on GitHub
              </a>

              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                style={{
                  padding: "13px 20px",
                  borderRadius: 14,
                  background: "rgba(255, 255, 255, 0.06)",
                  border: `1px solid ${TH.border}`,
                  color: TH.textSub,
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#FFF";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = TH.textSub;
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                }}
              >
                Close Drawer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
