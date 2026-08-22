import React, { useState } from "react";
import { TOKENS } from "../theme";
import { CheckCircle2, AlertTriangle, Cpu, Database, ShieldCheck, ChevronDown, ChevronUp, ArrowUpRight, Globe } from "lucide-react";

// ── Honest Case Study Data — only what was actually built
const CASE_STUDIES = [
  {
    index: "01",
    domain: "WEB DESIGN & DEVELOPMENT",
    title: "InfoTech Solutions — Animated Business Website",
    outcome: "Fully custom, premium animated website. Built and shipped.",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS", "Node.js", "PostgreSQL"],
    problem:
      "InfoTech Solutions needed a web presence that matched the quality of its custom software work — not a generic template, but a designed, animated digital experience that communicates credibility to local B2B clients.",
    constraint:
      "The site had to load fast on Pakistani mobile networks (3G/4G), look premium on desktop, and require zero third-party page builders or CMS overhead — just clean, maintainable code.",
    decision:
      "Built fully from scratch with Next.js for static generation and fast delivery. Used Framer Motion for orchestrated page animations and hover micro-interactions. Designed every section as a custom component — no Bootstrap, no templates. Deployed on Vercel with automatic CI/CD.",
    result:
      "A production-quality animated business website with sub-2s load times, clean mobile layout at 360px, and zero dependency on page builder tools. Running live and maintained by me directly.",
    accentColor: TOKENS.accent,
  },
  {
    index: "02",
    domain: "CUSTOM WEB APPLICATION",
    title: "MindVault — Offline-First Personal Knowledge App",
    outcome: "In active development. Offline-first, works without internet.",
    stack: ["Next.js", "SQLite (local)", "Node.js", "Whisper API", "PostgreSQL"],
    problem:
      "I needed a personal tool to capture voice notes, index PDFs, and track a simple financial ledger — all in one place, without needing internet access or a subscription to a SaaS product that might disappear.",
    constraint:
      "The core feature is full offline capability. Data must be stored locally (SQLite), sync only when online, and the app must remain usable in airplane mode — including voice capture and PDF reading.",
    decision:
      "Built the entire app as a Next.js progressive web app with a local SQLite store using better-sqlite3 for synchronous offline reads and writes. Voice notes are captured in-browser and processed through Whisper when connectivity is available. The ledger uses a simple double-entry model — credit/debit pairs with balance verification.",
    result:
      "Fully functional offline mode, voice capture, PDF upload and text extraction, and a working ledger engine. Currently in personal use for daily note capture. Mobile-first layout works cleanly on Android via browser.",
    accentColor: TOKENS.success,
  },
  {
    index: "03",
    domain: "NATIVE MOBILE · IN PROGRESS",
    title: "Kotlin Android App — In Development",
    outcome: "Building a native Android app with Kotlin and Jetpack Compose.",
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "Android SDK"],
    problem:
      "I wanted to move beyond web-only delivery and have native mobile as a service I can offer. Cross-platform frameworks like React Native require a bridge and limit hardware access — so I chose native Kotlin from the start.",
    constraint:
      "Learning Kotlin while building a real app at the same time means the architecture decisions need to be clean from day one — Room for local persistence, ViewModel for state, and Compose for UI so there is no XML to maintain.",
    decision:
      "Started with Jetpack Compose because it is declarative and maps well to React's mental model from my web background. Using Room DB for offline-first local storage — the same principle that drives MindVault on web. More details will be shared here when the first version ships.",
    result:
      "Actively in development. First build in progress. Will be updated here on release.",
    accentColor: "#7C3AED",
  },
];

// ── Individual Case Study Card
function CaseStudyCard({ cs, isExpanded, onToggle }) {
  return (
    <article
      style={{
        backgroundColor: TOKENS.card,
        border: `1px solid ${isExpanded ? cs.accentColor : TOKENS.line}`,
        borderRadius: TOKENS.radius.sm,
        overflow: "hidden",
        boxShadow: isExpanded ? TOKENS.shadow.raised : TOKENS.shadow.resting,
        transition: TOKENS.transition,
      }}
    >
      {/* Card Header — always visible */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "24px 28px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
        aria-expanded={isExpanded}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span style={{ ...TOKENS.type.micro, color: cs.accentColor, fontSize: "11px" }}>
              {cs.index}
            </span>
            <span style={{ width: "1px", height: "10px", backgroundColor: TOKENS.line, display: "inline-block" }} />
            <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
              {cs.domain}
            </span>
          </div>
          <h3 style={{ ...TOKENS.type.title, color: TOKENS.ink, marginBottom: "8px", fontSize: "20px" }}>
            {cs.title}
          </h3>
          <p style={{ ...TOKENS.type.data, color: cs.accentColor, fontSize: "13px" }}>
            {cs.outcome}
          </p>
        </div>

        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: TOKENS.radius.xs,
            backgroundColor: TOKENS.surface,
            border: `1px solid ${TOKENS.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "4px",
            color: TOKENS.muted,
          }}
        >
          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {/* Expanded Body */}
      {isExpanded && (
        <div style={{ padding: "0 28px 28px", borderTop: `1px solid ${TOKENS.line}` }}>
          {/* Stack Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "16px 0", marginBottom: "20px", borderBottom: `1px solid ${TOKENS.line}` }}>
            {cs.stack.map((t) => (
              <span
                key={t}
                style={{
                  ...TOKENS.type.micro,
                  fontSize: "11px",
                  padding: "3px 9px",
                  borderRadius: TOKENS.radius.xs,
                  backgroundColor: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  color: TOKENS.muted,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Structured Narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <NarrativeRow icon={<AlertTriangle size={14} color={TOKENS.muted} />} label="PROBLEM" text={cs.problem} />
            <NarrativeRow icon={<Database size={14} color={TOKENS.muted} />} label="CONSTRAINT" text={cs.constraint} />
            <NarrativeRow icon={<Cpu size={14} color={cs.accentColor} />} label="WHAT I BUILT" text={cs.decision} highlight accentColor={cs.accentColor} />
            <NarrativeRow icon={<CheckCircle2 size={14} color={TOKENS.success} />} label="RESULT" text={cs.result} />
          </div>
        </div>
      )}
    </article>
  );
}

function NarrativeRow({ icon, label, text, highlight, accentColor }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "16px",
        alignItems: "start",
        padding: highlight ? "12px 14px" : "0",
        backgroundColor: highlight ? `${accentColor}08` : "transparent",
        border: highlight ? `1px solid ${accentColor}25` : "none",
        borderRadius: highlight ? TOKENS.radius.xs : 0,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px", paddingTop: "2px" }}>
        {icon}
        <span style={{ ...TOKENS.type.micro, fontSize: "10px", color: TOKENS.muted }}>{label}</span>
      </div>
      <p style={{ ...TOKENS.type.body, fontSize: "15px", color: TOKENS.ink, margin: 0, lineHeight: 1.7 }}>
        {text}
      </p>
    </div>
  );
}

export default function CaseStudies() {
  const [expandedIndex, setExpandedIndex] = useState("01");

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
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", gap: "16px", marginBottom: "40px" }}
          className="case-studies-header"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: TOKENS.accent, display: "inline-block" }} />
              <span style={{ ...TOKENS.type.micro, color: TOKENS.muted }}>02 // WORK & PROJECTS</span>
            </div>
            <h2 style={{ ...TOKENS.type.title, fontSize: "clamp(26px, 3.2vw, 36px)", color: TOKENS.ink }}>
              Things I have actually built.
            </h2>
          </div>
          <p
            style={{ ...TOKENS.type.body, fontSize: "15px", color: TOKENS.muted, maxWidth: "320px", textAlign: "right" }}
            className="case-studies-sub"
          >
            Click any project to see the problem, what I built, and the outcome.
          </p>
        </div>

        {/* Case Study Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {CASE_STUDIES.map((cs) => (
            <CaseStudyCard
              key={cs.index}
              cs={cs}
              isExpanded={expandedIndex === cs.index}
              onToggle={() => setExpandedIndex(expandedIndex === cs.index ? null : cs.index)}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <div
          style={{
            marginTop: "28px",
            padding: "14px 20px",
            backgroundColor: TOKENS.card,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: TOKENS.radius.sm,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            boxShadow: TOKENS.shadow.resting,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Globe size={15} color={TOKENS.accent} />
            <span style={{ ...TOKENS.type.data, color: TOKENS.muted, fontSize: "13px" }}>
              Open to new client projects and collaborations. Secure, production-ready code only.
            </span>
          </div>
          <a
            href="https://wa.me/923292597331?text=Hello%20Mansoor,%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              ...TOKENS.type.data,
              color: TOKENS.accent,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            Let's discuss your project
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .case-studies-header { grid-template-columns: 1fr !important; }
          .case-studies-sub { text-align: left !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
