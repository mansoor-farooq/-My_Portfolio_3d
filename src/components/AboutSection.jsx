import React from "react";
import { TOKENS } from "../theme";
import { Terminal, Smartphone, Code2, Heart, ArrowUpRight } from "lucide-react";
import mansoorImg from "../image/mansoor_professional.jpg";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: TOKENS.surface,
        paddingTop: "80px",
        paddingBottom: "80px",
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
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
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
              01 // ABOUT ME
            </span>
          </div>

          <h2
            style={{
              ...TOKENS.type.title,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              color: TOKENS.ink,
              maxWidth: "680px",
            }}
          >
            Custom work. Fresh ideas. Clean code.
          </h2>
        </div>

        {/* 2-Column Grid: Left Narrative + Right Designed Portrait */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "36px",
            alignItems: "start",
          }}
          className="about-split-grid"
        >
          {/* Left Column: First-Person Narrative (~120 words) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <p style={{ ...TOKENS.type.body, color: TOKENS.ink }}>
              I got into web development because I wanted to build things that work in the real world, not just demos. Through InfoTech Solutions in Karachi, I build fully custom web applications and animated digital experiences — websites, SaaS products, and tools based on original ideas, not generic templates.
            </p>

            <p style={{ ...TOKENS.type.body, color: TOKENS.muted }}>
              When I am not working on client projects, I build for myself. Right now that is <strong>MindVault</strong> — an offline-first personal knowledge and finance app combining voice notes, PDF indexing, and a simple ledger. I am also building native Android apps with <strong>Kotlin and Jetpack Compose</strong> to expand into mobile.
            </p>


            {/* Current Active Tracks / Status Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "8px",
              }}
              className="about-tracks-grid"
            >
              <div
                style={{
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  padding: "14px 16px",
                  boxShadow: TOKENS.shadow.resting,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <Terminal size={14} color={TOKENS.accent} />
                  <span style={{ ...TOKENS.type.micro, color: TOKENS.muted }}>BUILDING</span>
                </div>
                <div style={{ ...TOKENS.type.data, color: TOKENS.ink, fontWeight: 600 }}>
                  MindVault App
                </div>
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                  Offline-first · Voice + PDF + Ledger
                </span>
              </div>

              <div
                style={{
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  padding: "14px 16px",
                  boxShadow: TOKENS.shadow.resting,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <Smartphone size={14} color={TOKENS.success} />
                  <span style={{ ...TOKENS.type.micro, color: TOKENS.muted }}>LEARNING</span>
                </div>
                <div style={{ ...TOKENS.type.data, color: TOKENS.ink, fontWeight: 600 }}>
                  Kotlin & Compose
                </div>
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                  Native Android Mobile Apps
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Designed Portrait Anchor */}
          <div
            style={{
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.line}`,
              borderRadius: TOKENS.radius.sm,
              overflow: "hidden",
              boxShadow: TOKENS.shadow.raised,
            }}
          >
            {/* Header Telemetry Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderBottom: `1px solid ${TOKENS.line}`,
                backgroundColor: TOKENS.surface,
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
                <span style={{ ...TOKENS.type.micro, color: TOKENS.ink }}>
                  MANSOOR FAROOQ
                </span>
              </div>
              <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "10.5px" }}>
                KARACHI, PK · 24°51'N
              </span>
            </div>

            {/* Portrait Framing with Subtle Industrial Crop */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "340px",
                backgroundColor: TOKENS.ink,
                overflow: "hidden",
              }}
            >
              <img
                src={mansoorImg}
                alt="Mansoor Farooq — Full-Stack Systems Engineer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  display: "block",
                  filter: "contrast(1.02) brightness(0.98)",
                }}
                loading="lazy"
              />
            </div>

            {/* Footer Credential Verification Strip */}
            <div
              style={{
                padding: "14px 16px",
                backgroundColor: TOKENS.card,
                borderTop: `1px solid ${TOKENS.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "10px" }}>
                  DIRECT BUILDER
                </div>
                <div style={{ ...TOKENS.type.data, color: TOKENS.ink, fontSize: "13px", fontWeight: 600 }}>
                  InfoTech Solutions
                </div>
              </div>

              <a
                href="https://linkedin.com/in/mansoor-farooq-a757b9365/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  ...TOKENS.type.micro,
                  color: TOKENS.accent,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              >
                <span>VERIFY ON LINKEDIN</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Breakpoint Helper */}
      <style>{`
        @media (max-width: 860px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .about-tracks-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
