import React from "react";
import { TOKENS } from "../theme";
import { Compass, Code2, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import TiltCard3D from "./TiltCard3D";

export default function EngineeringProcess() {
  const steps = [
    {
      num: "01",
      title: "Architecture & Problem Scope",
      icon: <Compass size={20} color={TOKENS.accent} />,
      desc: "Deep analysis of the business bottleneck. Defining database schemas, API contracts, and user flows before writing code.",
      points: ["Database schema modeling", "API contract definition", "Wireframing & UI layout"],
      tagColor: TOKENS.accent,
    },
    {
      num: "02",
      title: "Full-Stack Custom Development",
      icon: <Code2 size={20} color={TOKENS.success} />,
      desc: "Building clean, modular components in Next.js/React and robust RESTful controllers in Node.js or ASP.NET Core.",
      points: ["Modular clean code", "Fluid UI animations", "Zero-bloat architecture"],
      tagColor: TOKENS.success,
    },
    {
      num: "03",
      title: "Security & Performance Audit",
      icon: <ShieldCheck size={20} color="#7C3AED" />,
      desc: "Rigorous testing for sub-1.5s load times, input sanitization, JWT auth safety, and cross-browser responsiveness.",
      points: ["Sub-1.5s LCP optimization", "JWT & Auth security", "Mobile 360px verification"],
      tagColor: "#7C3AED",
    },
    {
      num: "04",
      title: "Production Deployment & SLA",
      icon: <Rocket size={20} color="#D97706" />,
      desc: "Continuous CI/CD deployment on Vercel or cloud infrastructure with automated backups and post-launch monitoring.",
      points: ["Automated CI/CD pipelines", "SSL & Domain configuration", "Ongoing maintenance support"],
      tagColor: "#D97706",
    },
  ];

  return (
    <section
      id="process"
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
              04 // HOW I WORK & DELIVER
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
            Engineering Workflow & Delivery Pipeline
          </h2>
          <p style={{ ...TOKENS.type.body, color: TOKENS.muted, maxWidth: "620px" }}>
            From initial concept to production launch — a transparent, disciplined engineering process built for reliability.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {steps.map((step) => (
            <TiltCard3D key={step.num} intensity={8} glare={true} style={{ height: "100%" }}>
              <div
                style={{
                  height: "100%",
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: TOKENS.shadow.resting,
                  transition: TOKENS.transition,
                }}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: TOKENS.radius.xs,
                        backgroundColor: `${step.tagColor}12`,
                        border: `1px solid ${step.tagColor}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {step.icon}
                    </div>

                    <span
                      style={{
                        ...TOKENS.type.micro,
                        fontSize: "14px",
                        fontWeight: 700,
                        color: step.tagColor,
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      PHASE {step.num}
                    </span>
                  </div>

                  <h3
                    style={{
                      ...TOKENS.type.title,
                      fontSize: "18px",
                      color: TOKENS.ink,
                      marginBottom: "10px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      ...TOKENS.type.body,
                      fontSize: "13.5px",
                      color: TOKENS.muted,
                      marginBottom: "18px",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Bullets */}
                <div
                  style={{
                    paddingTop: "14px",
                    borderTop: `1px solid ${TOKENS.line}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {step.points.map((p) => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: step.tagColor,
                        }}
                      />
                      <span
                        style={{
                          ...TOKENS.type.data,
                          fontSize: "12px",
                          color: TOKENS.ink,
                        }}
                      >
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
