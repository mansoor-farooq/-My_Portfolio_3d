import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Database, 
  Server, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap,
  Layers,
  Code2
} from "lucide-react";
import { TOKENS } from "../theme";
import { playHoverSound, playClickSound } from "../utils/audio";

const SERVICES = [
  {
    id: "svc-01",
    code: "SVC-01",
    title: "Full-Stack SaaS & Web Platforms",
    icon: Globe,
    badge: "ENTERPRISE GRADE",
    tagline: "High-performance reactive web applications engineered for scale, reliability, and precision UX.",
    capabilities: [
      "Next.js App Router & Server Components architecture",
      "Robust state management, validation & type-safe RPCs",
      "Multi-tenant auth, role-based access control (RBAC)",
      "Automated CI/CD workflows with automated preview tests"
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Prisma"],
    timeline: "2 - 6 Weeks Delivery",
  },
  {
    id: "svc-02",
    code: "SVC-02",
    title: "Native Android & Mobile Systems",
    icon: Smartphone,
    badge: "KOTLIN FIRST",
    tagline: "Production-ready Android applications adhering to Google's official Modern Android Architecture (MAD).",
    capabilities: [
      "Declarative UI development with Jetpack Compose",
      "Coroutines & Kotlin Flow asynchronous data streams",
      "Clean architecture with dependency injection (Hilt/Koin)",
      "Background worker synchronization & push notifications"
    ],
    stack: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "Retrofit", "Material 3"],
    timeline: "3 - 8 Weeks Delivery",
  },
  {
    id: "svc-03",
    code: "SVC-03",
    title: "Offline-First & Local-Storage Architecture",
    icon: Database,
    badge: "ZERO LATENCY",
    tagline: "Resilient applications designed to operate seamlessly without connectivity and sync bi-directionally.",
    capabilities: [
      "Embedded SQLite & Room database schema migrations",
      "Optimistic UI updates with queued offline mutations",
      "Conflict-free replicated data strategies (CRDT / timestamping)",
      "Instant cold-boot application startup performance"
    ],
    stack: ["SQLite", "Room DB", "IndexedDB", "Zustand", "WorkManager", "REST APIs"],
    timeline: "2 - 4 Weeks Delivery",
  },
  {
    id: "svc-04",
    code: "SVC-04",
    title: "Backend APIs & Distributed Systems",
    icon: Server,
    badge: "HIGH CONCURRENCY",
    tagline: "Scalable server architectures, secure RESTful & GraphQL interfaces, and optimized database indexing.",
    capabilities: [
      "Node.js, Express & ASP.NET Core microservices",
      "Relational database design & complex PostgreSQL querying",
      "Redis caching layer, rate-limiting & JWT session management",
      "Rigorous API contract testing and OpenAPI 3.0 documentation"
    ],
    stack: ["Node.js", "Express", "ASP.NET Core", "PostgreSQL", "Redis", "Docker"],
    timeline: "2 - 6 Weeks Delivery",
  },
  {
    id: "svc-05",
    code: "SVC-05",
    title: "3D WebGL Experiences & Motion Design",
    icon: Sparkles,
    badge: "CINEMATIC FIDELITY",
    tagline: "Sensory WebGL viewports, spatial product showcases, and bespoke micro-interactions that captivate.",
    capabilities: [
      "Real-time Three.js & React Three Fiber canvas rendering",
      "Custom procedural geometry & PBR lighting setups",
      "Hardware-accelerated Framer Motion & Lenis smooth scroll",
      "Mobile performance fallback & memory-leak defense"
    ],
    stack: ["Three.js", "React Three Fiber", "GLSL", "Framer Motion", "Lenis", "WebGL"],
    timeline: "1 - 3 Weeks Delivery",
  },
  {
    id: "svc-06",
    code: "SVC-06",
    title: "Technical SEO & Core Web Vitals Auditing",
    icon: TrendingUp,
    badge: "TOP 1% RANKING",
    tagline: "Precision search visibility engineering and extreme Core Web Vitals optimization for competitive SERPs.",
    capabilities: [
      "Rich JSON-LD schema graphs (Person, Org, FAQ, Breadcrumbs)",
      "Sub-second Largest Contentful Paint (LCP) & zero CLS",
      "Automated XML sitemaps, robots protocol & canonical structures",
      "Semantic HTML5 hierarchy and ARIA accessibility auditing"
    ],
    stack: ["JSON-LD", "Lighthouse 100", "Next SEO", "Edge Caching", "SSR/SSG", "A11y"],
    timeline: "1 - 2 Weeks Delivery",
  }
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleBookService = (serviceName) => {
    playClickSound();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      if (window.__lenis) {
        window.__lenis.scrollTo("#contact");
      } else {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      // Pre-fill subject if contact form input exists
      setTimeout(() => {
        const subjectInput = document.getElementById("contact-subject");
        if (subjectInput) {
          subjectInput.value = `Architecture Engagement: ${serviceName}`;
        }
      }, 400);
    }
  };

  return (
    <section
      id="services"
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
        {/* Section Header */}
        <div style={{ maxWidth: "780px", marginBottom: "56px" }}>
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
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: TOKENS.accent,
              }}
            />
            <span style={{ ...TOKENS.type.micro, color: TOKENS.ink }}>
              ARCHITECTURAL SERVICES & CAPABILITIES
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
            Engineered for high-stakes deliverables and mission-critical scale.
          </h2>

          <p
            style={{
              ...TOKENS.type.body,
              color: TOKENS.muted,
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            Direct architectural consulting and full-cycle development from idea to zero-defect production release. Every solution adheres to strict type safety, measurable uptime SLAs, and top-tier performance standards.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {SERVICES.map((svc, idx) => {
            const Icon = svc.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={svc.id}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredIndex(null)}
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
                {/* Top Meta Header */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: TOKENS.radius.xs,
                        backgroundColor: isHovered ? "rgba(37, 99, 235, 0.08)" : TOKENS.surface,
                        border: `1px solid ${isHovered ? "rgba(37, 99, 235, 0.25)" : TOKENS.line}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isHovered ? TOKENS.accent : TOKENS.ink,
                        transition: TOKENS.transition,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          ...TOKENS.type.micro,
                          color: TOKENS.muted,
                          fontSize: "11px",
                        }}
                      >
                        {svc.code}
                      </span>
                      <span
                        style={{
                          ...TOKENS.type.micro,
                          fontSize: "10px",
                          color: TOKENS.accent,
                          backgroundColor: "rgba(37, 99, 235, 0.06)",
                          padding: "3px 7px",
                          borderRadius: TOKENS.radius.xs,
                          border: `1px solid rgba(37, 99, 235, 0.15)`,
                        }}
                      >
                        {svc.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{
                      ...TOKENS.type.title,
                      fontSize: "20px",
                      color: TOKENS.ink,
                      marginBottom: "10px",
                    }}
                  >
                    {svc.title}
                  </h3>

                  <p
                    style={{
                      ...TOKENS.type.body,
                      color: TOKENS.muted,
                      fontSize: "14px",
                      lineHeight: 1.55,
                      marginBottom: "24px",
                    }}
                  >
                    {svc.tagline}
                  </p>

                  {/* Deliverables Checklist */}
                  <div style={{ marginBottom: "24px" }}>
                    <div
                      style={{
                        ...TOKENS.type.micro,
                        color: TOKENS.muted,
                        marginBottom: "12px",
                        letterSpacing: "0.08em",
                      }}
                    >
                      CORE DELIVERABLES & SPECS
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "9px",
                      }}
                    >
                      {svc.capabilities.map((cap, cIdx) => (
                        <li
                          key={cIdx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            ...TOKENS.type.body,
                            fontSize: "13px",
                            color: TOKENS.ink,
                            lineHeight: 1.4,
                          }}
                        >
                          <CheckCircle2
                            size={15}
                            color={TOKENS.accent}
                            style={{ flexShrink: 0, marginTop: "2px" }}
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Technology Stack & Action */}
                <div
                  style={{
                    paddingTop: "20px",
                    borderTop: `1px solid ${TOKENS.line}`,
                  }}
                >
                  {/* Tech Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "20px",
                    }}
                  >
                    {svc.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          ...TOKENS.type.micro,
                          fontSize: "11px",
                          color: TOKENS.muted,
                          backgroundColor: TOKENS.surface,
                          padding: "3px 8px",
                          borderRadius: TOKENS.radius.xs,
                          border: `1px solid ${TOKENS.line}`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA & Timeline */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        ...TOKENS.type.micro,
                        color: TOKENS.muted,
                        fontSize: "11px",
                      }}
                    >
                      {svc.timeline}
                    </span>

                    <button
                      onClick={() => handleBookService(svc.title)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 14px",
                        backgroundColor: isHovered ? TOKENS.ink : TOKENS.card,
                        color: isHovered ? "#FFFFFF" : TOKENS.ink,
                        border: `1px solid ${isHovered ? TOKENS.ink : TOKENS.line}`,
                        borderRadius: TOKENS.radius.xs,
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: TOKENS.transition,
                      }}
                    >
                      <span>Engage</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
