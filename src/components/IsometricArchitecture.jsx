import React from "react";
import { TOKENS } from "../theme";
import { Globe, Server, Database } from "lucide-react";

export default function IsometricArchitecture() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "460px",
        height: "380px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1200px",
        margin: "0 auto",
      }}
      aria-label="Isometric diagram of the Next.js, Node.js API, and PostgreSQL full-stack"
    >
      {/* 3D Isometric Scene Container */}
      <div
        className="iso-scene"
        style={{
          width: "320px",
          height: "320px",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateX(58deg) rotateZ(-36deg)",
          transition: TOKENS.transition,
        }}
      >
        {/* SVG Connecting Spine */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <line x1="160" y1="50" x2="160" y2="270" stroke={TOKENS.line} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="160" y1="50" x2="160" y2="270" stroke={TOKENS.accent} strokeWidth="2" strokeDasharray="8 12" className="iso-data-pulse" />
        </svg>

        {/* LAYER 1: Next.js Frontend (translateZ: 70px) */}
        <div
          className="iso-layer iso-layer-top"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "280px",
            height: "72px",
            backgroundColor: TOKENS.card,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: TOKENS.radius.sm,
            boxShadow: "0 12px 24px rgba(11, 18, 32, 0.07)",
            padding: "10px 14px",
            transform: "translateZ(70px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Globe size={14} color={TOKENS.accent} />
              <span style={{ ...TOKENS.type.micro, color: TOKENS.ink }}>NEXT.JS FRONTEND</span>
            </div>
            <span
              style={{
                ...TOKENS.type.micro,
                fontSize: "10px",
                color: TOKENS.success,
                backgroundColor: TOKENS.successSubtle,
                padding: "1px 6px",
                borderRadius: TOKENS.radius.xs,
              }}
            >
              SSR · LIVE
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ ...TOKENS.type.data, fontSize: "12px", color: TOKENS.muted }}>
              React · Framer Motion · Tailwind
            </span>
            <span style={{ ...TOKENS.type.data, fontSize: "12px", color: TOKENS.ink, fontWeight: 600 }}>
              &lt;2s LCP
            </span>
          </div>
        </div>

        {/* LAYER 2: Node.js API (translateZ: 0px) — highlighted as the core */}
        <div
          className="iso-layer iso-layer-mid"
          style={{
            position: "absolute",
            top: "115px",
            left: "20px",
            width: "280px",
            height: "76px",
            backgroundColor: TOKENS.card,
            border: `1.5px solid ${TOKENS.accent}`,
            borderRadius: TOKENS.radius.sm,
            boxShadow: TOKENS.shadow.raised,
            padding: "10px 14px",
            transform: "translateZ(0px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Server size={14} color={TOKENS.accent} />
              <span style={{ ...TOKENS.type.micro, color: TOKENS.ink, fontWeight: 700 }}>NODE.JS REST API</span>
            </div>
            <span
              style={{
                ...TOKENS.type.micro,
                fontSize: "10px",
                color: TOKENS.accent,
                backgroundColor: TOKENS.accentSubtle,
                padding: "1px 6px",
                borderRadius: TOKENS.radius.xs,
              }}
            >
              JWT · SECURE
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ ...TOKENS.type.data, fontSize: "12px", color: TOKENS.muted }}>
              Express · Auth · Validation
            </span>
            <span style={{ ...TOKENS.type.data, fontSize: "12px", color: TOKENS.ink, fontWeight: 600 }}>
              100ms avg
            </span>
          </div>
        </div>

        {/* LAYER 3: PostgreSQL Database (translateZ: -70px) */}
        <div
          className="iso-layer iso-layer-base"
          style={{
            position: "absolute",
            top: "210px",
            left: "20px",
            width: "280px",
            height: "72px",
            backgroundColor: TOKENS.card,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: TOKENS.radius.sm,
            boxShadow: "0 4px 12px rgba(11, 18, 32, 0.04)",
            padding: "10px 14px",
            transform: "translateZ(-70px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Database size={14} color={TOKENS.success} />
              <span style={{ ...TOKENS.type.micro, color: TOKENS.ink }}>POSTGRESQL</span>
            </div>
            <span
              style={{
                ...TOKENS.type.micro,
                fontSize: "10px",
                color: TOKENS.success,
                backgroundColor: TOKENS.successSubtle,
                padding: "1px 6px",
                borderRadius: TOKENS.radius.xs,
              }}
            >
              ACID · RELATIONAL
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ ...TOKENS.type.data, fontSize: "12px", color: TOKENS.muted }}>
              Migrations · Indexed · Backed Up
            </span>
            <span style={{ ...TOKENS.type.data, fontSize: "12px", color: TOKENS.ink, fontWeight: 600 }}>
              0 Data Loss
            </span>
          </div>
        </div>
      </div>

      {/* Annotation Badge */}
      <div
        style={{
          position: "absolute",
          bottom: "4px",
          right: "12px",
          backgroundColor: TOKENS.card,
          border: `1px solid ${TOKENS.line}`,
          borderRadius: TOKENS.radius.xs,
          padding: "5px 10px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: TOKENS.shadow.resting,
        }}
      >
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: TOKENS.success, display: "inline-block" }} />
        <span style={{ ...TOKENS.type.micro, fontSize: "10.5px", color: TOKENS.muted }}>
          FULL-STACK · 0KB WEBGL
        </span>
      </div>

      <style>{`
        @keyframes dataPulse {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .iso-data-pulse { animation: dataPulse 1.8s linear infinite; }
        .iso-scene:hover .iso-layer-top { transform: translateZ(88px) !important; }
        .iso-scene:hover .iso-layer-base { transform: translateZ(-88px) !important; }
        .iso-layer { transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1); }
        @media (prefers-reduced-motion: reduce) {
          .iso-data-pulse { animation: none !important; }
          .iso-scene:hover .iso-layer-top,
          .iso-scene:hover .iso-layer-base { transform: none !important; }
        }
        @media (max-width: 900px) {
          .iso-scene { transform: rotateX(45deg) rotateZ(-25deg) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
