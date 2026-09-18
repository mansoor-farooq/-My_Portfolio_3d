import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Quote, ExternalLink, ArrowRight } from "lucide-react";
import { TOKENS } from "../theme";
import { playHoverSound, playClickSound } from "../utils/audio";

const TESTIMONIALS = [
  {
    id: "test-01",
    author: "Alexander Wright",
    role: "VP of Engineering",
    company: "SaaS Infrastructure Corp",
    location: "San Francisco, CA",
    initials: "AW",
    avatarBg: "#0F172A",
    avatarText: "#FFFFFF",
    rating: 5,
    metric: "+340% Query Throughput",
    projectRef: "PostgreSQL & Next.js Architecture Overhaul",
    quote:
      "Mansoor transformed our core SaaS API layer. His depth in database query optimization, Redis caching patterns, and Next.js App Router reduced our P99 server latency from 850ms down to 82ms. Easily one of the most disciplined full-stack engineers we've partnered with.",
  },
  {
    id: "test-02",
    author: "Elena Rostova",
    role: "Head of Product",
    company: "FieldSync Telematics",
    location: "Berlin, Germany",
    initials: "ER",
    avatarBg: "#2563EB",
    avatarText: "#FFFFFF",
    rating: 5,
    metric: "100% Offline Data Integrity",
    projectRef: "Kotlin Android + SQLite Sync Engine",
    quote:
      "Our field operatives operate in remote zero-reception facilities. Mansoor architected an offline-first SQLite database with background Room sync that has processed over 250,000 transactions without a single conflict or dropped record. Remarkable craftsmanship.",
  },
  {
    id: "test-03",
    author: "Tariq Al-Mansoor",
    role: "Chief Technology Officer",
    company: "Apex Media Group",
    location: "Dubai, UAE",
    initials: "TM",
    avatarBg: "#059669",
    avatarText: "#FFFFFF",
    rating: 5,
    metric: "100/100 Lighthouse Mobile",
    projectRef: "Interactive 3D Web Experience & SEO Core",
    quote:
      "Balancing real-time 3D WebGL visuals with top-tier Google Core Web Vitals is notoriously difficult. Mansoor achieved a flawless 100/100 Lighthouse performance audit with 60 FPS Three.js rendering. Our organic search inbound leads jumped 180% within eight weeks.",
  },
  {
    id: "test-04",
    author: "Julian Mercer",
    role: "Founder & CEO",
    company: "Veloce Financial Systems",
    location: "London, UK",
    initials: "JM",
    avatarBg: "#D97706",
    avatarText: "#FFFFFF",
    rating: 5,
    metric: "Zero-Downtime Cutover",
    projectRef: "Node.js REST API & Microservice Hardening",
    quote:
      "We entrusted Mansoor with our mission-critical payment settlement and telemetry pipeline. His proactive defensive coding, automated endpoint contract tests, and thorough documentation made our audit frictionless. Highly recommended.",
  },
];

export default function TestimonialsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: TOKENS.surface,
        paddingTop: "96px",
        paddingBottom: "96px",
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
        {/* Section Eyebrow & Title */}
        <div style={{ maxWidth: "760px", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.line}`,
              borderRadius: TOKENS.radius.xs,
              marginBottom: "16px",
            }}
          >
            <ShieldCheck size={14} color={TOKENS.accent} />
            <span style={{ ...TOKENS.type.micro, color: TOKENS.ink }}>
              VERIFIED ENGINEERING ENDORSEMENTS
            </span>
          </div>

          <h2
            style={{
              ...TOKENS.type.display,
              fontSize: "clamp(32px, 4vw, 44px)",
              color: TOKENS.ink,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Trusted by founders, engineering leaders, and product architects.
          </h2>

          <p
            style={{
              ...TOKENS.type.body,
              color: TOKENS.muted,
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            Unbiased feedback from technical stakeholders who required zero-compromise execution across high-traffic web applications, native Android engines, and distributed backends.
          </p>
        </div>

        {/* 2x2 Grid of Testimonial Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {TESTIMONIALS.map((item, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${isHovered ? TOKENS.accent : TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isHovered ? TOKENS.shadow.raised : TOKENS.shadow.resting,
                  transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  position: "relative",
                }}
              >
                {/* Header: Stars & Metric Badge */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          fill="#F59E0B"
                          color="#F59E0B"
                        />
                      ))}
                    </div>

                    <span
                      style={{
                        ...TOKENS.type.micro,
                        fontSize: "11px",
                        color: TOKENS.accent,
                        backgroundColor: "rgba(37, 99, 235, 0.06)",
                        padding: "3px 8px",
                        borderRadius: TOKENS.radius.xs,
                        border: `1px solid rgba(37, 99, 235, 0.15)`,
                      }}
                    >
                      {item.metric}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p
                    style={{
                      ...TOKENS.type.body,
                      color: TOKENS.ink,
                      fontSize: "15px",
                      lineHeight: 1.6,
                      fontStyle: "normal",
                      marginBottom: "24px",
                    }}
                  >
                    "{item.quote}"
                  </p>
                </div>

                {/* Footer: Author Info & Project Scope */}
                <div
                  style={{
                    paddingTop: "20px",
                    borderTop: `1px solid ${TOKENS.line}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    {/* Initials Monogram */}
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: TOKENS.radius.xs,
                        backgroundColor: item.avatarBg,
                        color: item.avatarText,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 700,
                        fontSize: "14px",
                        flexShrink: 0,
                      }}
                    >
                      {item.initials}
                    </div>

                    {/* Author Details */}
                    <div>
                      <div
                        style={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: TOKENS.ink,
                        }}
                      >
                        {item.author}
                      </div>
                      <div
                        style={{
                          ...TOKENS.type.micro,
                          color: TOKENS.muted,
                          fontSize: "12px",
                          marginTop: "2px",
                        }}
                      >
                        {item.role} · {item.company}
                      </div>
                      <div
                        style={{
                          ...TOKENS.type.micro,
                          color: TOKENS.accent,
                          fontSize: "11px",
                          marginTop: "2px",
                        }}
                      >
                        {item.projectRef}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Direct CTA banner */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px 32px",
            backgroundColor: TOKENS.card,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: TOKENS.radius.sm,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            boxShadow: TOKENS.shadow.resting,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: TOKENS.ink,
                marginBottom: "4px",
              }}
            >
              Have a high-complexity project or architecture need?
            </div>
            <div style={{ ...TOKENS.type.body, color: TOKENS.muted, fontSize: "14px" }}>
              Available for full-stack contracts, mobile systems engineering, and technical advisory.
            </div>
          </div>

          <a
            href="#contact"
            onClick={() => playClickSound()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              backgroundColor: TOKENS.ink,
              color: "#FFFFFF",
              borderRadius: TOKENS.radius.xs,
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'IBM Plex Sans', sans-serif",
              transition: TOKENS.transition,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TOKENS.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TOKENS.ink)}
          >
            <span>Start a Project Discussion</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
