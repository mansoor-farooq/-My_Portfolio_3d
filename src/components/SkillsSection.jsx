import React from "react";
import { TOKENS } from "../theme";
import { Code2, Server, Database, Smartphone, Wrench, Shield } from "lucide-react";

export default function SkillsSection() {
  const categories = [
    {
      title: "Frontend Engineering",
      icon: <Code2 size={16} color={TOKENS.accent} />,
      badge: "CORE FOCUS",
      badgeColor: TOKENS.accent,
      desc: "High-performance client interfaces, responsive layouts, and fluid animations.",
      skills: [
        { name: "Next.js (App Router)", highlight: true },
        { name: "React.js", highlight: true },
        { name: "JavaScript (ES6+)", highlight: true },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Framer Motion" },
        { name: "HTML5 / CSS3" },
      ],
    },
    {
      title: "Backend & APIs",
      icon: <Server size={16} color={TOKENS.success} />,
      badge: "PRODUCTION",
      badgeColor: TOKENS.success,
      desc: "Robust REST services, business logic controllers, and secure auth pipelines.",
      skills: [
        { name: "Node.js", highlight: true },
        { name: "Express.js", highlight: true },
        { name: "ASP.NET Core (C#)" },
        { name: "RESTful API Design" },
        { name: "JWT & Safe Authentication" },
        { name: "Middleware & Validation" },
      ],
    },
    {
      title: "Databases & Storage",
      icon: <Database size={16} color="#7C3AED" />,
      badge: "DATA INTEGRITY",
      badgeColor: "#7C3AED",
      desc: "Relational modeling, fast indexed queries, and offline-first local stores.",
      skills: [
        { name: "PostgreSQL", highlight: true },
        { name: "SQLite (Offline Edge)" },
        { name: "Database Schema Design" },
        { name: "SQL Query Optimization" },
        { name: "Prisma ORM" },
      ],
    },
    {
      title: "Mobile & Native",
      icon: <Smartphone size={16} color="#D97706" />,
      badge: "ACTIVE FOCUS",
      badgeColor: "#D97706",
      desc: "Native Android development and multi-device responsive integration.",
      skills: [
        { name: "Kotlin (Android)", highlight: true },
        { name: "Jetpack Compose" },
        { name: "Room Local DB" },
        { name: "Android SDK" },
        { name: "Progressive Web Apps" },
      ],
    },
  ];

  return (
    <section
      id="skills"
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
        <div style={{ marginBottom: "36px" }}>
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
              02 // TECHNICAL STACK & ARSENAL
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
            Technologies I build with every day.
          </h2>
          <p style={{ ...TOKENS.type.body, color: TOKENS.muted, maxWidth: "600px" }}>
            Clean categorized stack without fake proficiency percentages. Focused on full-stack web, secure APIs, and native mobile.
          </p>
        </div>

        {/* 4-Column Grid of Stack Categories */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.title}
              style={{
                backgroundColor: TOKENS.card,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: TOKENS.radius.sm,
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: TOKENS.shadow.resting,
                transition: TOKENS.transition,
              }}
            >
              <div>
                {/* Category Top */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {cat.icon}
                    <h3
                      style={{
                        ...TOKENS.type.title,
                        fontSize: "16px",
                        color: TOKENS.ink,
                        margin: 0,
                      }}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "9.5px",
                      color: cat.badgeColor,
                      backgroundColor: `${cat.badgeColor}12`,
                      padding: "2px 6px",
                      borderRadius: TOKENS.radius.xs,
                      fontWeight: 600,
                    }}
                  >
                    {cat.badge}
                  </span>
                </div>

                <p
                  style={{
                    ...TOKENS.type.data,
                    fontSize: "12.5px",
                    color: TOKENS.muted,
                    marginBottom: "16px",
                    lineHeight: 1.5,
                  }}
                >
                  {cat.desc}
                </p>

                {/* Skills Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      style={{
                        ...TOKENS.type.data,
                        fontSize: "12px",
                        padding: "4px 8px",
                        borderRadius: TOKENS.radius.xs,
                        backgroundColor: skill.highlight ? TOKENS.accentSubtle : TOKENS.surface,
                        border: `1px solid ${skill.highlight ? `${TOKENS.accent}40` : TOKENS.line}`,
                        color: skill.highlight ? TOKENS.accent : TOKENS.ink,
                        fontWeight: skill.highlight ? 600 : 500,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
