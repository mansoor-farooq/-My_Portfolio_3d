import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Command, Menu, X } from "lucide-react";
import { TOKENS } from "../theme";
import { playClickSound, toggleAudioMute } from "../utils/audio";
import { GithubIcon } from "./Icons";

export default function Navbar({ activeSection, onOpenCommandPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMuteToggle = () => {
    playClickSound();
    const muted = toggleAudioMute();
    setIsMuted(muted);
  };

  // Navigation links
  const navLinks = [
    { id: "home", label: "Overview" },
    { id: "about", label: "About" },
    { id: "skills", label: "Stack" },
    { id: "projects", label: "Work" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    playClickSound();
    setMobileMenuOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: "14px 20px",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <nav
          style={{
            width: "100%",
            maxWidth: TOKENS.maxWidth,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            backgroundColor: scrolled ? "rgba(255, 255, 255, 0.94)" : TOKENS.card,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: TOKENS.radius.sm,
            border: `1px solid ${TOKENS.line}`,
            boxShadow: scrolled ? TOKENS.shadow.raised : TOKENS.shadow.resting,
            transition: TOKENS.transition,
            pointerEvents: "auto",
          }}
        >
          {/* Personal Identity Monogram & Name */}
          <div
            onClick={() => scrollTo("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: TOKENS.radius.xs,
                backgroundColor: TOKENS.ink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              MF
            </div>
            <span
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                color: TOKENS.ink,
                letterSpacing: "-0.01em",
              }}
            >
              Mansoor Farooq
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              gap: "2px",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeSection?.toLowerCase() === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    position: "relative",
                    background: "transparent",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: TOKENS.radius.xs,
                    color: isActive ? TOKENS.ink : TOKENS.muted,
                    fontSize: "14px",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontWeight: isActive ? 600 : 500,
                    cursor: "pointer",
                    transition: TOKENS.transition,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = TOKENS.ink;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = TOKENS.muted;
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: TOKENS.accentSubtle,
                        borderRadius: TOKENS.radius.xs,
                        zIndex: -1,
                      }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Quick Command, Audio, Direct WhatsApp */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Quick Cmd+K Button */}
            <button
              onClick={() => {
                playClickSound();
                onOpenCommandPalette();
              }}
              style={{
                display: "none",
                alignItems: "center",
                gap: "8px",
                padding: "6px 10px",
                borderRadius: TOKENS.radius.xs,
                backgroundColor: TOKENS.surface,
                border: `1px solid ${TOKENS.line}`,
                color: TOKENS.muted,
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                transition: TOKENS.transition,
              }}
              className="desktop-cmd-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = TOKENS.ink;
                e.currentTarget.style.color = TOKENS.ink;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = TOKENS.line;
                e.currentTarget.style.color = TOKENS.muted;
              }}
              title="Open Command Palette (Ctrl+K)"
            >
              <Command size={12} />
              <span>Search</span>
              <kbd style={{ fontSize: "10px", opacity: 0.7, padding: "1px 4px", border: `1px solid ${TOKENS.line}`, borderRadius: "3px" }}>⌘K</kbd>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleMuteToggle}
              title={isMuted ? "Unmute UI Sound Effects" : "Mute UI Sound Effects"}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: TOKENS.radius.xs,
                backgroundColor: TOKENS.surface,
                border: `1px solid ${TOKENS.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isMuted ? TOKENS.muted : TOKENS.ink,
                cursor: "pointer",
                transition: TOKENS.transition,
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com/mansoor-farooq"
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound()}
              style={{
                display: "none",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: TOKENS.radius.xs,
                backgroundColor: TOKENS.ink,
                color: "#FFFFFF",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: TOKENS.transition,
              }}
              className="desktop-github-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = TOKENS.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = TOKENS.ink;
              }}
            >
              <GithubIcon size={14} color="#FFFFFF" />
              <span>GitHub</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              style={{
                display: "flex",
                width: "32px",
                height: "32px",
                borderRadius: TOKENS.radius.xs,
                backgroundColor: TOKENS.surface,
                border: `1px solid ${TOKENS.line}`,
                alignItems: "center",
                justifyContent: "center",
                color: TOKENS.ink,
                cursor: "pointer",
              }}
              className="mobile-hamburger"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              top: "70px",
              left: "20px",
              right: "20px",
              zIndex: 499,
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.line}`,
              borderRadius: TOKENS.radius.sm,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              boxShadow: TOKENS.shadow.raised,
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  padding: "10px 14px",
                  borderRadius: TOKENS.radius.xs,
                  backgroundColor: activeSection?.toLowerCase() === link.id ? TOKENS.accentSubtle : "transparent",
                  border: "none",
                  color: activeSection?.toLowerCase() === link.id ? TOKENS.accent : TOKENS.ink,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}

            <div style={{ height: "1px", backgroundColor: TOKENS.line, margin: "6px 0" }} />

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: TOKENS.radius.xs,
                backgroundColor: TOKENS.surface,
                border: `1px solid ${TOKENS.line}`,
                color: TOKENS.ink,
                fontSize: "13px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Command size={14} color={TOKENS.accent} /> Quick Search (⌘K)
            </button>

            <a
              href="https://github.com/mansoor-farooq"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: TOKENS.radius.xs,
                backgroundColor: TOKENS.ink,
                color: "#FFFFFF",
                fontSize: "13px",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <GithubIcon size={14} color="#FFFFFF" /> Open GitHub Profile
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS helper for responsive desktop elements */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cmd-btn { display: flex !important; }
          .desktop-github-btn { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
