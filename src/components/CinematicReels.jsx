import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOKENS } from "../theme";
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles, Film, ArrowRight, Eye, Clapperboard, CheckCircle2 } from "lucide-react";
import TiltCard3D from "./TiltCard3D";
import { playClickSound, playHoverSound } from "../utils/audio";

const CINEMATIC_REELS = [
  {
    id: "reel-01",
    edition: "NICOLAS MARTINS EDITION",
    number: "01",
    title: "Kinetic Spatial Identity & 3D Motion Graphics",
    category: "Creative Direction · Motion Graphics · 3D VFX",
    client: "Nicolas Martins Inspired Studio",
    videoSrc: "/nic0martins.mp4",
    duration: "00:15",
    accentColor: "#0284C7",
    glowColor: "#38BDF8",
    description:
      "High-velocity graphic design, procedural 3D motion, and VFX compositing inspired by the minimalist aesthetic of Nicolas Martins (by1337.com). Seamless integration between web interactivity and film editing.",
    specs: ["4K High-Bitrate Stream", "Procedural 3D Motion", "Custom Sound Design", "Hardware Accelerated"],
    tags: ["3D Motion", "Creative Direction", "VFX Editing", "Spatial UI"],
  },
  {
    id: "reel-02",
    edition: "PERYTON CINEMA EDITION",
    number: "02",
    title: "High-Impact Commercial & Brand Film Storytelling",
    category: "Commercial Film · Social Ads · Cinematography",
    client: "Peryton Film Inspired Production",
    videoSrc: "/nic0martins.mp4",
    duration: "00:15",
    accentColor: "#F59E0B",
    glowColor: "#FBBF24",
    description:
      "Premium commercial cinematography and conversion-focused social ads inspired by Peryton Film (peryton-film.com). Dynamic framing, moody contrast ratios, and precision rhythmic editing that commands attention.",
    specs: ["Anamorphic Color Grade", "Precision Sound Design", "High-Converting Pacing", "Film Grain Overlay"],
    tags: ["Commercial Film", "Brand Identity", "Cinematography", "Audio Mastering"],
  },
  {
    id: "reel-03",
    edition: "BESPOKE SPATIAL VFX",
    number: "03",
    title: "Next-Gen Interactive Digital Product Showcase",
    category: "SaaS Prototyping · Spatial Shaders · WebGL",
    client: "Luxury Digital Platforms & SaaS",
    videoSrc: "/nic0martins.mp4",
    duration: "00:15",
    accentColor: "#10B981",
    glowColor: "#34D399",
    description:
      "Where high-performance Next.js full-stack software meets cinema-grade visual storytelling. Interactive product demonstrations engineered to captivate enterprise clients and investors.",
    specs: ["Sub-Second Latency", "Spatial WebGL Mesh Blend", "Interactive Glass Shader", "Zero-Buffer Streaming"],
    tags: ["Spatial UI", "Micro-Interactions", "SaaS Showcase", "WebGL Shaders"],
  },
];

export default function CinematicReels() {
  const [activeModalReel, setActiveModalReel] = useState(null);
  const [mutedStates, setMutedStates] = useState({ "reel-01": true, "reel-02": true, "reel-03": true });
  const [hoveredReelId, setHoveredReelId] = useState(null);
  const [isPlayingModal, setIsPlayingModal] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(false);
  const [modalProgress, setModalProgress] = useState(0);

  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);

  // Toggle card-level audio
  const toggleCardAudio = (e, id) => {
    e.stopPropagation();
    playClickSound();
    setMutedStates((prev) => {
      const nextState = !prev[id];
      if (videoRefs.current[id]) {
        videoRefs.current[id].muted = nextState;
      }
      return { ...prev, [id]: nextState };
    });
  };

  const openCinemaModal = (reel) => {
    playClickSound();
    setActiveModalReel(reel);
    setIsPlayingModal(true);
    setIsModalMuted(false);
    document.body.style.overflow = "hidden";
  };

  const closeCinemaModal = () => {
    playClickSound();
    setActiveModalReel(null);
    document.body.style.overflow = "";
  };

  // Modal keyboard shortcuts (Esc, Space, M)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModalReel) return;
      if (e.key === "Escape") closeCinemaModal();
      if (e.code === "Space") {
        e.preventDefault();
        if (modalVideoRef.current) {
          if (modalVideoRef.current.paused) {
            modalVideoRef.current.play();
            setIsPlayingModal(true);
          } else {
            modalVideoRef.current.pause();
            setIsPlayingModal(false);
          }
        }
      }
      if (e.key === "m" || e.key === "M") {
        setIsModalMuted((prev) => {
          if (modalVideoRef.current) modalVideoRef.current.muted = !prev;
          return !prev;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalReel]);

  return (
    <section
      id="cinema"
      style={{
        backgroundColor: "#070C16",
        paddingTop: "100px",
        paddingBottom: "100px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient Film Glow */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "350px",
          background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: TOKENS.maxWidth,
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: "42px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Clapperboard size={16} color="#38BDF8" />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                color: "#38BDF8",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              04 // CINEMATIC MOTION & VIDEO PRODUCTION
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  ...TOKENS.type.title,
                  fontSize: "clamp(26px, 3.4vw, 38px)",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                  lineHeight: 1.25,
                }}
              >
                Cinema-grade motion, 3D VFX & brand storytelling.
              </h2>
              <p style={{ ...TOKENS.type.body, color: "#94A3B8", maxWidth: "680px" }}>
                Inspired by the visual direction of <strong>Nicolas Martins</strong> and <strong>Peryton Film</strong>.
                Bespoke motion graphics, commercial film pacing, and high-impact digital showcases.
              </p>
            </div>

            {/* Live Reel Counter Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: TOKENS.radius.xs,
                color: "#E2E8F0",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span>3 CINEMATIC REELS READY</span>
            </div>
          </div>
        </div>

        {/* ── 3 Cinematic Video Cards Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "26px",
          }}
          className="cinematic-reels-grid"
        >
          {CINEMATIC_REELS.map((reel) => {
            const isMuted = mutedStates[reel.id];
            const isHovered = hoveredReelId === reel.id;

            return (
              <TiltCard3D key={reel.id} intensity={4} glare={true}>
                <div
                  onClick={() => openCinemaModal(reel)}
                  onMouseEnter={() => {
                    playHoverSound();
                    setHoveredReelId(reel.id);
                  }}
                  onMouseLeave={() => setHoveredReelId(null)}
                  style={{
                    backgroundColor: "rgba(11, 18, 32, 0.85)",
                    border: `1px solid ${isHovered ? reel.glowColor : "rgba(255, 255, 255, 0.1)"}`,
                    borderRadius: TOKENS.radius.sm,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                    boxShadow: isHovered
                      ? `0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px ${reel.glowColor}25`
                      : "0 10px 30px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {/* Top Film Meta Bar */}
                  <div
                    style={{
                      padding: "12px 18px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "rgba(6, 10, 18, 0.95)",
                      zIndex: 3,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "10.5px",
                          color: reel.accentColor,
                          fontWeight: 700,
                          backgroundColor: `${reel.accentColor}18`,
                          border: `1px solid ${reel.accentColor}35`,
                          padding: "2px 7px",
                          borderRadius: "4px",
                        }}
                      >
                        REEL [{reel.number} / 03]
                      </span>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "10.5px",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {reel.edition}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "11px",
                        color: "#E2E8F0",
                        fontWeight: 600,
                      }}
                    >
                      {reel.duration}
                    </span>
                  </div>

                  {/* 16:9 Video Canvas Frame */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      backgroundColor: "#000000",
                      overflow: "hidden",
                    }}
                  >
                    <video
                      ref={(el) => (videoRefs.current[reel.id] = el)}
                      src={reel.videoSrc}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: isHovered ? "brightness(1.05) contrast(1.05)" : "brightness(0.95)",
                        transition: "filter 300ms ease, transform 400ms ease",
                        transform: isHovered ? "scale(1.04)" : "scale(1)",
                      }}
                    />

                    {/* Subtle Vignette Gradient */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Audio Toggle Button On Card */}
                    <button
                      onClick={(e) => toggleCardAudio(e, reel.id)}
                      title={isMuted ? "Unmute Reel Audio" : "Mute Reel Audio"}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(11, 18, 32, 0.8)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: isMuted ? "#94A3B8" : "#38BDF8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 5,
                        transition: "transform 180ms ease, background 180ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                        e.currentTarget.style.backgroundColor = "rgba(11, 18, 32, 0.95)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.backgroundColor = "rgba(11, 18, 32, 0.8)";
                      }}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>

                    {/* Peryton-style Center "PLAY FILM" Magnetic Pill */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "8px 18px",
                        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.96)" : "rgba(11, 18, 32, 0.85)",
                        backdropFilter: "blur(12px)",
                        color: isHovered ? "#0B1220" : "#FFFFFF",
                        borderRadius: "30px",
                        border: `1px solid ${isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.25)"}`,
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                        pointerEvents: "none",
                        transition: "all 250ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                        opacity: isHovered ? 1 : 0.85,
                        scale: isHovered ? 1.08 : 1,
                      }}
                    >
                      <Play size={12} fill="currentColor" />
                      <span>{isHovered ? "EXPAND THEATER" : "PLAY FILM"}</span>
                    </div>
                  </div>

                  {/* Story, Description & Production Specs */}
                  <div
                    style={{
                      padding: "22px 20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "11px",
                          color: reel.accentColor,
                          fontWeight: 600,
                          marginBottom: "6px",
                        }}
                      >
                        {reel.category}
                      </div>

                      <h3
                        style={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontSize: "17.5px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                          marginBottom: "8px",
                          lineHeight: 1.35,
                        }}
                      >
                        {reel.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontSize: "13px",
                          color: "#94A3B8",
                          lineHeight: 1.6,
                          marginBottom: "16px",
                        }}
                      >
                        {reel.description}
                      </p>

                      {/* Specs Tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                        {reel.specs.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: "10.5px",
                              color: "#CBD5E1",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              padding: "3px 8px",
                              borderRadius: TOKENS.radius.xs,
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action Strip */}
                    <div
                      style={{
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "11px",
                          color: "rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        {reel.client}
                      </span>

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          color: reel.glowColor,
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "11.5px",
                          fontWeight: 600,
                        }}
                      >
                        <span>Watch Theater</span>
                        <Maximize2 size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>

      {/* ── High-Res Cinema Lightbox Modal (Peryton & Nicolas Martins Architecture) ── */}
      {activeModalReel && (
        <div
          data-lenis-prevent="true"
          onClick={closeCinemaModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(4, 7, 13, 0.95)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            overscrollBehavior: "contain",
          }}
        >
          <div
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "1180px",
              backgroundColor: "#080D1A",
              border: `1px solid ${activeModalReel.glowColor}50`,
              borderRadius: TOKENS.radius.sm,
              overflow: "hidden",
              boxShadow: `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px ${activeModalReel.glowColor}25`,
              position: "relative",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header Bar */}
            <div
              style={{
                padding: "14px 22px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(11, 18, 32, 0.95)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    color: activeModalReel.accentColor,
                    backgroundColor: `${activeModalReel.accentColor}20`,
                    padding: "3px 9px",
                    borderRadius: "4px",
                    fontWeight: 700,
                  }}
                >
                  CINEMA THEATER [{activeModalReel.number}]
                </span>
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px", color: "#FFFFFF", fontWeight: 600 }}>
                  {activeModalReel.title}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => {
                    setIsModalMuted((prev) => {
                      if (modalVideoRef.current) modalVideoRef.current.muted = !prev;
                      return !prev;
                    });
                  }}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: TOKENS.radius.xs,
                    color: isModalMuted ? "#94A3B8" : "#38BDF8",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isModalMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isModalMuted ? "UNMUTE [M]" : "SOUND ON [M]"}</span>
                </button>

                <button
                  onClick={closeCinemaModal}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: TOKENS.radius.xs,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  aria-label="Close Cinema Player"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Cinema Video Player Viewport */}
            <div style={{ position: "relative", width: "100%", backgroundColor: "#000000", flex: 1 }}>
              <video
                ref={modalVideoRef}
                src={activeModalReel.videoSrc}
                autoPlay
                loop
                muted={isModalMuted}
                playsInline
                controls
                style={{
                  width: "100%",
                  maxHeight: "56vh",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            {/* Theater Info & Technical Breakdown */}
            <div
              style={{
                padding: "22px 26px",
                backgroundColor: "#0B1220",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: activeModalReel.accentColor, fontWeight: 700 }}>
                    {activeModalReel.edition}
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "rgba(255, 255, 255, 0.5)" }}>
                    {activeModalReel.category}
                  </span>
                </div>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13.5px", color: "#CBD5E1", margin: 0, maxWidth: "680px" }}>
                  {activeModalReel.description}
                </p>
              </div>

              <a
                href="#contact"
                onClick={closeCinemaModal}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "10px 20px",
                  backgroundColor: activeModalReel.accentColor,
                  color: "#FFFFFF",
                  borderRadius: TOKENS.radius.xs,
                  textDecoration: "none",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  transition: "opacity 180ms ease",
                }}
              >
                <span>Commission Visual Reel</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .cinematic-reels-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
