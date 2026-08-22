import React, { useState, useRef, useEffect } from "react";
import { TOKENS } from "../theme";
import { Terminal, Send, Sparkles, CornerDownLeft, Shield, Cpu, Database } from "lucide-react";
import { playClickSound } from "../utils/audio";

export default function InteractiveTerminalHUD() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "MANSOOR_OS v3.2.0 (x86_64-pc-karachi) — Interactive Architecture Terminal",
    },
    {
      type: "output",
      text: "Type 'help' or click quick commands below to inspect system architecture.",
    },
  ]);
  const endRef = useRef(null);

  const executeCommand = (cmdText) => {
    playClickSound();
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "user", text: `mansoor@terminal:~$ ${cmdText}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: "Available commands:\n • stack       — Inspect core languages & frameworks\n • projects    — List featured production builds\n • about       — Read developer background\n • contact     — Get direct communication channels\n • ping        — Test server response latency\n • clear       — Clear terminal buffer",
        });
        break;
      case "stack":
        newHistory.push({
          type: "json",
          data: {
            frontend: ["Next.js (App Router)", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
            backend: ["Node.js", "Express.js", "ASP.NET Core (C#)", "REST APIs", "JWT Security"],
            databases: ["PostgreSQL (Relational)", "SQLite (Offline Edge)", "Prisma ORM"],
            mobile: ["Kotlin", "Jetpack Compose", "Room DB"],
          },
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          text: "Featured Builds:\n 1. InfoTech Solutions Digital Platform (Next.js + Framer Motion)\n 2. MindVault Offline Knowledge & Ledger OS (TypeScript + SQLite)\n 3. Gate Pass & Material Dispatch System (React + PostgreSQL)\n 4. API Status & Microservice Health Monitor (Node.js + Charts)",
        });
        break;
      case "about":
        newHistory.push({
          type: "output",
          text: "Mansoor Farooq — Full-Stack Developer based in Karachi, Pakistan.\nOwner of InfoTech Solutions. Building custom web applications, SaaS tools, and native Android apps from original ideas.",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: "Email: mansoorturk757@gmail.com\nWhatsApp: +92 329 259 7331\nGitHub: github.com/mansoor-farooq\nLinkedIn: linkedin.com/in/mansoor-farooq-a757b9365",
        });
        break;
      case "ping":
        newHistory.push({
          type: "output",
          text: `PONG 127.0.0.1: time=${(Math.random() * 12 + 14).toFixed(1)}ms status=200_OK`,
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        newHistory.push({
          type: "error",
          text: `Command not found: '${cmd}'. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <section
      id="terminal"
      style={{
        backgroundColor: TOKENS.surface,
        paddingTop: "60px",
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
        {/* Terminal Header */}
        <div style={{ marginBottom: "28px" }}>
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
              04 // INTERACTIVE ARCHITECTURE TERMINAL
            </span>
          </div>

          <h2
            style={{
              ...TOKENS.type.title,
              fontSize: "clamp(24px, 3vw, 32px)",
              color: TOKENS.ink,
              marginBottom: "8px",
            }}
          >
            Live Command HUD.
          </h2>
          <p style={{ ...TOKENS.type.body, color: TOKENS.muted, fontSize: "14.5px" }}>
            Type or click commands to query live stack, project architectures, and telemetry.
          </p>
        </div>

        {/* Terminal Container */}
        <div
          style={{
            backgroundColor: "#0B1220",
            border: `1px solid ${TOKENS.line}`,
            borderRadius: TOKENS.radius.sm,
            overflow: "hidden",
            boxShadow: TOKENS.shadow.raised,
          }}
        >
          {/* Terminal Window Chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              backgroundColor: "#070B14",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#F59E0B" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span
                style={{
                  ...TOKENS.type.micro,
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "11px",
                  marginLeft: "8px",
                }}
              >
                mansoor@karachi-edge:~
              </span>
            </div>

            <span
              style={{
                ...TOKENS.type.micro,
                color: TOKENS.accent,
                fontSize: "10px",
                backgroundColor: "rgba(2, 132, 199, 0.15)",
                padding: "2px 8px",
                borderRadius: TOKENS.radius.xs,
              }}
            >
              HTTP 200 · LIVE READY
            </span>
          </div>

          {/* Terminal Body */}
          <div
            style={{
              padding: "18px 20px",
              minHeight: "220px",
              maxHeight: "340px",
              overflowY: "auto",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#E2E8F0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {history.map((item, idx) => (
              <div key={idx}>
                {item.type === "system" && (
                  <span style={{ color: TOKENS.accent, fontWeight: 600 }}>{item.text}</span>
                )}
                {item.type === "user" && (
                  <span style={{ color: "#38BDF8", fontWeight: 600 }}>{item.text}</span>
                )}
                {item.type === "output" && (
                  <pre
                    style={{
                      margin: 0,
                      color: "#94A3B8",
                      fontFamily: "inherit",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {item.text}
                  </pre>
                )}
                {item.type === "json" && (
                  <pre
                    style={{
                      margin: 0,
                      color: "#A7F3D0",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      padding: "8px 12px",
                      borderRadius: TOKENS.radius.xs,
                      fontFamily: "inherit",
                      overflowX: "auto",
                    }}
                  >
                    {JSON.stringify(item.data, null, 2)}
                  </pre>
                )}
                {item.type === "error" && (
                  <span style={{ color: "#F87171" }}>{item.text}</span>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Command Pills */}
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: "#070B14",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ ...TOKENS.type.micro, color: "rgba(255, 255, 255, 0.4)", fontSize: "10px" }}>
              QUICK:
            </span>
            {["help", "stack", "projects", "about", "contact", "ping", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: TOKENS.radius.xs,
                  color: "#E2E8F0",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  padding: "3px 9px",
                  cursor: "pointer",
                  transition: TOKENS.transition,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = TOKENS.accent;
                  e.currentTarget.style.color = TOKENS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.color = "#E2E8F0";
                }}
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Interactive Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(input);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 16px",
              backgroundColor: "#05080F",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span style={{ color: TOKENS.accent, fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", marginRight: "8px" }}>
              $&gt;
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command (e.g. stack, projects, ping)..."
              style={{
                flex: 1,
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFFFF",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "13px",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: TOKENS.accent,
                border: "none",
                borderRadius: TOKENS.radius.xs,
                color: "#FFFFFF",
                padding: "5px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              <span>Run</span>
              <CornerDownLeft size={12} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
