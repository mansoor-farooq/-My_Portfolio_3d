import React from "react";
import { TOKENS } from "../theme";
import { Layers, CheckCircle2, AlertCircle, Sparkles, Cpu, Globe, ArrowRight } from "lucide-react";
import TiltCard3D from "./TiltCard3D";
import infotechImg from "../image/project_infotech.jpg";
import mindvaultImg from "../image/project_mindvault.jpg";
import gatepassImg from "../image/project_gatepass.jpg";
import apimonitorImg from "../image/project_apimonitor.jpg";

export default function FeaturedProjects() {
  const projects = [
    {
      id: "01",
      title: "InfoTech Solutions — Digital Platform",
      tag: "FULL-STACK & UI ANIMATION",
      tagColor: TOKENS.accent,
      image: infotechImg,
      subtitle: "Custom-built, animated web presence and client services dashboard.",
      problem:
        "Local business websites rely heavily on generic WordPress templates and bloated page builders that load slowly (4s+), provide poor mobile usability, and fail to convey modern technical credibility.",
      solution:
        "Engineered a bespoke, zero-bloat Next.js platform with custom Framer Motion orchestration, responsive UI components, and sub-1.5s load times. Built from scratch with clean, maintainable code.",
      stack: ["Next.js", "React", "Framer Motion", "Tailwind CSS", "Node.js"],
      deliverables: ["Custom Animation Engine", "100% Mobile Responsive (360px+)", "SEO & Sub-1.5s Performance"],
    },
    {
      id: "02",
      title: "MindVault — Offline Knowledge & Ledger OS",
      tag: "OFFLINE-FIRST APP",
      tagColor: "#7C3AED",
      image: mindvaultImg,
      subtitle: "Personal knowledge management, voice note capture, and private financial ledger.",
      problem:
        "Existing note-taking and personal ledger apps lock user data behind monthly subscription fees and completely stop working when internet connectivity is unstable or offline.",
      solution:
        "Architected an offline-first system using SQLite local database synchronization and in-browser audio recording. Captures thoughts, indexes documents, and manages personal ledgers without needing active internet.",
      stack: ["TypeScript", "Next.js", "SQLite (Local)", "Web Audio API", "Node.js"],
      deliverables: ["100% Offline Usability", "Voice-to-Text Note Pipeline", "Double-Entry Balance Verification"],
    },
    {
      id: "03",
      title: "Gate Pass & Material Dispatch System",
      tag: "OPERATIONS & LOGISTICS",
      tagColor: "#D97706",
      image: gatepassImg,
      subtitle: "Real-time dispatch tracking, gate clearance, and QR verification interface.",
      problem:
        "Manual paper registers at industrial gates cause vehicle bottlenecks, lost records, and delays in verifying whether outgoing inventory matches authorized purchase orders.",
      solution:
        "Digitized the entire gate pass lifecycle with an intuitive, high-contrast web dashboard. Features instant QR status verification, dispatch logs, and live tracking of material status across terminal checkpoints.",
      stack: ["JavaScript", "React", "REST API", "Tailwind CSS", "PostgreSQL"],
      deliverables: ["Instant QR Verification", "Zero Record Loss", "Fast Multi-Terminal Entry Search"],
    },
    {
      id: "04",
      title: "API Status & Microservice Health Monitor",
      tag: "DEVELOPER TOOLING",
      tagColor: TOKENS.success,
      image: apimonitorImg,
      subtitle: "Live endpoint uptime tracker, latency charts, and incident telemetry.",
      problem:
        "Developers and businesses often discover backend API outages only after users complain, lacking live telemetry on latency spikes or database connection drops.",
      solution:
        "Built a lightweight, continuous health-check dashboard that pings critical microservices, visualizes response time wave charts, and generates real-time HTTP 200 / 500 status logs.",
      stack: ["Node.js", "Express", "Chart Telemetry", "PostgreSQL", "Next.js"],
      deliverables: ["Live Latency Waveform Graph", "Automated Health Checks", "Endpoint Response Benchmarks"],
    },
  ];

  return (
    <section
      id="projects"
      style={{
        backgroundColor: TOKENS.surface,
        paddingTop: "80px",
        paddingBottom: "80px",
        borderBottom: `1px solid ${TOKENS.line}`,
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
        <div style={{ marginBottom: "44px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: TOKENS.accent,
                display: "inline-block",
              }}
            />
            <span style={{ ...TOKENS.type.micro, color: TOKENS.muted }}>
              03 // FEATURED APPLICATIONS & CASE STUDIES
            </span>
          </div>

          <h2
            style={{
              ...TOKENS.type.title,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              color: TOKENS.ink,
              marginBottom: "8px",
            }}
          >
            Real problems solved with custom software.
          </h2>
          <p style={{ ...TOKENS.type.body, color: TOKENS.muted, maxWidth: "660px" }}>
            Detailed breakdown of production applications — the exact challenge, visual interface, and custom architectural solution.
          </p>
        </div>

        {/* 2x2 Large Featured Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
          }}
          className="projects-grid"
        >
          {projects.map((p) => (
            <TiltCard3D key={p.id} intensity={8} glare={true} style={{ height: "100%" }}>
              <article
                style={{
                  height: "100%",
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  overflow: "hidden",
                  boxShadow: TOKENS.shadow.resting,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: TOKENS.transition,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.tagColor;
                  e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = TOKENS.line;
                  e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
                }}
              >
              <div>
                {/* Visual UI Preview Image Header */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    backgroundColor: "#0B1220",
                    overflow: "hidden",
                    borderBottom: `1px solid ${TOKENS.line}`,
                  }}
                >
                  <img
                    src={p.image}
                    alt={`${p.title} Interface Preview`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                      transition: "transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    loading="lazy"
                  />

                  {/* Float Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      ...TOKENS.type.micro,
                      fontSize: "10px",
                      color: "#FFFFFF",
                      backgroundColor: "rgba(11, 18, 32, 0.85)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid rgba(255, 255, 255, 0.15)`,
                      padding: "3px 8px",
                      borderRadius: TOKENS.radius.xs,
                      fontWeight: 600,
                    }}
                  >
                    {p.tag}
                  </div>
                </div>

                {/* Content Body */}
                <div style={{ padding: "24px 22px" }}>
                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      ...TOKENS.type.title,
                      fontSize: "20px",
                      color: TOKENS.ink,
                      marginBottom: "6px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      ...TOKENS.type.data,
                      fontSize: "13px",
                      color: TOKENS.muted,
                      marginBottom: "20px",
                    }}
                  >
                    {p.subtitle}
                  </p>

                  {/* Problem & Solution Breakdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                    {/* Problem Box */}
                    <div
                      style={{
                        padding: "12px 14px",
                        backgroundColor: TOKENS.surface,
                        border: `1px solid ${TOKENS.line}`,
                        borderRadius: TOKENS.radius.xs,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <AlertCircle size={13} color="#DC2626" />
                        <span style={{ ...TOKENS.type.micro, color: "#DC2626", fontSize: "10px" }}>
                          THE PROBLEM
                        </span>
                      </div>
                      <p style={{ ...TOKENS.type.body, fontSize: "13.5px", color: TOKENS.ink, margin: 0, lineHeight: 1.55 }}>
                        {p.problem}
                      </p>
                    </div>

                    {/* Solution Box */}
                    <div
                      style={{
                        padding: "12px 14px",
                        backgroundColor: `${p.tagColor}08`,
                        border: `1px solid ${p.tagColor}25`,
                        borderRadius: TOKENS.radius.xs,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <CheckCircle2 size={13} color={p.tagColor} />
                        <span style={{ ...TOKENS.type.micro, color: p.tagColor, fontSize: "10px" }}>
                          WHAT I BUILT & SOLVED
                        </span>
                      </div>
                      <p style={{ ...TOKENS.type.body, fontSize: "13.5px", color: TOKENS.ink, margin: 0, lineHeight: 1.55 }}>
                        {p.solution}
                      </p>
                    </div>
                  </div>

                  {/* Deliverable Highlights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                    {p.deliverables.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: p.tagColor }} />
                        <span style={{ ...TOKENS.type.data, fontSize: "12.5px", color: TOKENS.ink }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Tech Stack Chips (No repo links) */}
              <div
                style={{
                  padding: "14px 22px",
                  borderTop: `1px solid ${TOKENS.line}`,
                  backgroundColor: TOKENS.surface,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "11px",
                      padding: "2px 7px",
                      borderRadius: TOKENS.radius.xs,
                      backgroundColor: TOKENS.card,
                      border: `1px solid ${TOKENS.line}`,
                      color: TOKENS.muted,
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
