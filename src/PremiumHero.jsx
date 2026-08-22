import React, { Suspense, useEffect, useState, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Sparkles, MapPin, Clock, Shield, Cpu, Code2, ExternalLink, CheckCircle } from "lucide-react";
import { TH } from "./theme";
import { playClickSound, playHoverSound } from "./utils/audio";
import SpotlightCard from "./components/SpotlightCard";

const ThreeHero = lazy(() => import("./ThreeHero"));

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    setMatches(m.matches);
    if (m.addEventListener) m.addEventListener("change", onChange);
    else m.addListener(onChange);
    return () => {
      if (m.removeEventListener) m.removeEventListener("change", onChange);
      else m.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

// Live Karachi Time Formatter
function useKarachiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

export default function PremiumHero({ photoSrc, onOpenCommandPalette }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const karachiTime = useKarachiTime();
  const [enable3D, setEnable3D] = useState(true);

  const show3D = enable3D && !reduceMotion;

  const scrollToSection = (id) => {
    playClickSound();
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 20%, #0D131F 0%, #060709 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: isMobile ? 100 : 130,
        paddingBottom: isMobile ? 60 : 90,
        overflow: "hidden",
      }}
    >
      {/* 3D WebGL Background Layer */}
      {show3D && (
        <Suspense fallback={null}>
          <ThreeHero />
        </Suspense>
      )}

      {/* Atmospheric Ambient Glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: isMobile ? 300 : 650,
            height: isMobile ? 300 : 650,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 245, 155, 0.12) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: isMobile ? 300 : 700,
            height: isMobile ? 300 : 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          paddingLeft: isMobile ? 20 : 40,
          paddingRight: isMobile ? 20 : 40,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
            gap: isMobile ? 36 : 48,
            alignItems: "center",
          }}
        >
          {/* Left Column: Headline, Bio, and CTAs */}
          <div>
            {/* Status Radar & Availability Badge */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 16px",
                borderRadius: 100,
                background: "rgba(14, 20, 30, 0.75)",
                border: `1px solid ${TH.borderAccent}`,
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 30px rgba(0, 245, 155, 0.12)",
                marginBottom: 22,
              }}
            >
              <span style={{ position: "relative", display: "flex", width: 9, height: 9 }}>
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: TH.accent,
                    opacity: 0.75,
                    animation: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
                  }}
                />
                <span style={{ position: "relative", width: 9, height: 9, borderRadius: "50%", background: TH.accent }} />
              </span>

              <span
                style={{
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "#E2E8F0",
                  textTransform: "uppercase",
                }}
              >
                Available for High-Impact Projects
              </span>
            </motion.div>

            {/* Main Editorial Hero Title */}
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: isMobile ? "clamp(38px, 10vw, 54px)" : "clamp(56px, 5.5vw, 84px)",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                color: "#FFF",
                margin: "0 0 20px",
              }}
            >
              Architecting <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00F59B 0%, #00D2FF 50%, #E5B869 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                High-Performance
              </span>{" "}
              <br />
              Digital Products.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                color: "#94A3B8",
                fontSize: isMobile ? 15.5 : 17.5,
                lineHeight: 1.75,
                maxWidth: 540,
                margin: "0 0 32px",
                fontWeight: 400,
              }}
            >
              I’m <strong style={{ color: "#FFF", fontWeight: 700 }}>M. Mansoor Farooq</strong> — Full Stack Web Developer & AI Integrator. I engineer enterprise-grade web applications, real-time AI pipelines, and resilient backend architectures with sub-second execution speeds.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
            >
              <button
                onClick={() => scrollToSection("projects")}
                onMouseEnter={() => playHoverSound()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "15px 28px",
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #00F59B, #00D2FF)",
                  color: "#030A07",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14.5,
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 12px 35px rgba(0, 245, 155, 0.32)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "")}
              >
                <span>Explore Showcase</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                onMouseEnter={(e) => {
                  playHoverSound();
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = TH.borderMid;
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 24px",
                  borderRadius: 14,
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#FFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14.5,
                  fontWeight: 700,
                  border: `1px solid ${TH.borderMid}`,
                  cursor: "pointer",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.2s ease",
                }}
              >
                Initiate Contact
              </button>

              {/* Mobile 3D Toggle */}
              {isMobile && (
                <button
                  onClick={() => {
                    playClickSound();
                    setEnable3D(!enable3D);
                  }}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 14,
                    background: enable3D ? "rgba(0, 245, 155, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${enable3D ? TH.accent : TH.border}`,
                    color: enable3D ? TH.accent : TH.textSub,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {enable3D ? "3D Active" : "Enable 3D"}
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column: Editorial Profile & Telemetry HUD Card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ position: "relative" }}
          >
            <SpotlightCard
              spotlightColor="rgba(0, 245, 155, 0.22)"
              borderColor="rgba(255, 255, 255, 0.12)"
              style={{
                padding: isMobile ? "24px 20px" : "32px 28px",
                background: "linear-gradient(165deg, rgba(17, 23, 36, 0.7) 0%, rgba(9, 12, 19, 0.85) 100%)",
                boxShadow: "0 28px 60px rgba(0,0,0,0.7), 0 0 35px rgba(0, 245, 155, 0.08)",
              }}
            >
              {/* Profile Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div
                  style={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    overflow: "hidden",
                    border: `2px solid ${TH.borderAccent}`,
                    boxShadow: "0 0 24px rgba(0, 245, 155, 0.25)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={photoSrc}
                    alt="M. Mansoor Farooq"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#FFF", margin: 0 }}>
                      M. Mansoor Farooq
                    </h3>
                    <CheckCircle size={16} color={TH.accent} />
                  </div>
                  <div style={{ color: TH.accent, fontSize: 12.5, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>
                    Full Stack · AI Specialist
                  </div>
                </div>
              </div>

              {/* Telemetry Metrics & Status Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px 14px", borderRadius: 14, border: `1px solid ${TH.border}` }}>
                  <div style={{ color: TH.textMuted, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase" }}>
                    <MapPin size={12} color={TH.accent} /> Location
                  </div>
                  <div style={{ color: "#FFF", fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                    Karachi, PK (Remote)
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px 14px", borderRadius: 14, border: `1px solid ${TH.border}` }}>
                  <div style={{ color: TH.textMuted, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase" }}>
                    <Clock size={12} color={TH.cyan} /> Local Time
                  </div>
                  <div style={{ color: TH.cyan, fontSize: 13, fontWeight: 700, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                    {karachiTime || "GMT+5"}
                  </div>
                </div>
              </div>

              {/* Core Skill Badges */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ color: TH.textMuted, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  Primary Technology Arsenal
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["React.js", "Next.js", "Node.js", "PostgreSQL", "Ollama LLM", "ASP.NET Core", "Pen Testing"].map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "5px 11px",
                        borderRadius: 8,
                        background: "rgba(0, 245, 155, 0.08)",
                        border: "1px solid rgba(0, 245, 155, 0.2)",
                        color: "#E2E8F0",
                        fontSize: 11.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Command Launcher Button */}
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCommandPalette();
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${TH.border}`,
                  color: TH.textSub,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 245, 155, 0.1)";
                  e.currentTarget.style.borderColor = TH.borderAccent;
                  e.currentTarget.style.color = "#FFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.borderColor = TH.border;
                  e.currentTarget.style.color = TH.textSub;
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Terminal size={14} color={TH.accent} /> Press ⌘K for Command Center
                </span>
                <span style={{ color: TH.accent, fontWeight: 700 }}>Open →</span>
              </button>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}