import React from "react";
import { TOKENS } from "../theme";
import { GitBranch, Star, ExternalLink, Code, Layers, Activity } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function GitHubProjects() {
  const repos = [
    {
      name: "InfoTech-web",
      url: "https://github.com/mansoor-farooq/InfoTech-web",
      description: "Official animated business web platform for InfoTech Solutions, featuring fluid motion and custom design.",
      language: "JavaScript / Next.js",
      category: "Full Stack",
      tagColor: TOKENS.accent,
      stars: 0,
    },
    {
      name: "mymindbregfruntend",
      url: "https://github.com/mansoor-farooq/mymindbregfruntend",
      description: "Frontend client for MindVault — offline-first personal knowledge management, voice note capture, and document ledger.",
      language: "TypeScript / React",
      category: "Web App",
      tagColor: "#059669",
      stars: 0,
    },
    {
      name: "gate-pass-frontend",
      url: "https://github.com/mansoor-farooq/gate-pass-frontend",
      description: "Material dispatch and industrial gate pass management client for fast tracking and verifiable scan events.",
      language: "JavaScript / React",
      category: "Industrial UI",
      tagColor: "#D97706",
      stars: 1,
    },
    {
      name: "Api_Status_Checker",
      url: "https://github.com/mansoor-farooq/Api_Status_Checker",
      description: "Real-time backend service latency, endpoint health, and uptime monitoring dashboard.",
      language: "JavaScript / Node.js",
      category: "DevOps Tool",
      tagColor: "#7C3AED",
      stars: 0,
    },
    {
      name: "sd-app-backend-updated",
      url: "https://github.com/mansoor-farooq/sd-app-backend-updated",
      description: "Sales management backend with media upload controllers, authentication, and database transactional logic.",
      language: "Node.js / Express",
      category: "Backend API",
      tagColor: TOKENS.accent,
      stars: 0,
    },
    {
      name: "LLM_Backend_With_Analizer",
      url: "https://github.com/mansoor-farooq/LLM_Backend_With_Analizer",
      description: "AI integration backend for document parsing, query evaluation, and custom LLM inference pipelines.",
      language: "Node.js / Python",
      category: "AI Integration",
      tagColor: "#EC4899",
      stars: 1,
    },
  ];

  return (
    <section
      id="repos"
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
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div>
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
                03 // OPEN SOURCE & GITHUB REPOSITORIES
              </span>
            </div>

            <h2
              style={{
                ...TOKENS.type.title,
                fontSize: "clamp(26px, 3.2vw, 36px)",
                color: TOKENS.ink,
              }}
            >
              Real code. Real repositories.
            </h2>
          </div>

          <a
            href="https://github.com/mansoor-farooq"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.line}`,
              borderRadius: TOKENS.radius.xs,
              ...TOKENS.type.data,
              fontSize: "13px",
              color: TOKENS.ink,
              textDecoration: "none",
              fontWeight: 600,
              boxShadow: TOKENS.shadow.resting,
              transition: TOKENS.transition,
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
            <GithubIcon size={15} color={TOKENS.ink} />
            <span>View All Repos on GitHub</span>
            <ExternalLink size={13} color={TOKENS.muted} />
          </a>
        </div>

        {/* 3-Column Grid of GitHub Repos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: TOKENS.card,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: TOKENS.radius.sm,
                padding: "20px 22px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: TOKENS.shadow.resting,
                transition: TOKENS.transition,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = TOKENS.accent;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = TOKENS.line;
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
              }}
            >
              <div>
                {/* Repo Top Bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <GitBranch size={15} color={TOKENS.muted} />
                    <span
                      style={{
                        ...TOKENS.type.data,
                        fontSize: "14px",
                        fontWeight: 600,
                        color: TOKENS.ink,
                      }}
                    >
                      {repo.name}
                    </span>
                  </div>

                  <span
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "10px",
                      color: repo.tagColor,
                      backgroundColor: `${repo.tagColor}14`,
                      padding: "2px 6px",
                      borderRadius: TOKENS.radius.xs,
                      fontWeight: 600,
                    }}
                  >
                    {repo.category}
                  </span>
                </div>

                <p
                  style={{
                    ...TOKENS.type.body,
                    fontSize: "13.5px",
                    color: TOKENS.muted,
                    marginBottom: "16px",
                    lineHeight: 1.55,
                  }}
                >
                  {repo.description}
                </p>
              </div>

              {/* Repo Footer Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "12px",
                  borderTop: `1px solid ${TOKENS.line}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Code size={13} color={TOKENS.muted} />
                  <span style={{ ...TOKENS.type.micro, fontSize: "11px", color: TOKENS.muted }}>
                    {repo.language}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {repo.stars > 0 && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        ...TOKENS.type.micro,
                        fontSize: "11px",
                        color: "#D97706",
                        marginRight: "6px",
                      }}
                    >
                      <Star size={11} fill="#D97706" /> {repo.stars}
                    </span>
                  )}
                  <ExternalLink size={13} color={TOKENS.accent} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
