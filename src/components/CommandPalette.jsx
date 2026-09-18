import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Code, Briefcase, Mail, Sparkles, Terminal, Copy, Check } from "lucide-react";
import { TH, TOKENS } from "../theme";
import { playClickSound, playSuccessSound } from "../utils/audio";
import { GithubIcon } from "./Icons";
import confetti from "canvas-confetti";

export default function CommandPalette({ isOpen, onClose, onSelectProject }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const actions = [
    { id: "home", title: "Go to Home", category: "Navigation", icon: <Terminal size={16} />, action: () => scrollTo("home") },
    { id: "about", title: "View Experience & Journey", category: "Navigation", icon: <Briefcase size={16} />, action: () => scrollTo("about") },
    { id: "skills", title: "Explore Tech Stack & Skills", category: "Navigation", icon: <Code size={16} />, action: () => scrollTo("skills") },
    { id: "projects", title: "Browse Project Showcase", category: "Navigation", icon: <Sparkles size={16} />, action: () => scrollTo("projects") },
    { id: "contact", title: "Get in Touch / Contact", category: "Navigation", icon: <Mail size={16} />, action: () => scrollTo("contact") },
    {
      id: "copy-email",
      title: "Copy Email Address (mansoorturk757@gmail.com)",
      category: "Actions",
      icon: <Copy size={16} />,
      action: () => {
        navigator.clipboard.writeText("mansoorturk757@gmail.com");
        setCopied(true);
        playSuccessSound();
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch (e) {}
        setTimeout(() => setCopied(false), 2500);
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile (@mansoor-farooq)",
      category: "External",
      icon: <GithubIcon size={16} color="currentColor" />,
      action: () => window.open("https://github.com/mansoor-farooq", "_blank"),
    },
    {
      id: "whatsapp",
      title: "Direct WhatsApp Message (+92 329 2597331)",
      category: "External",
      icon: <Mail size={16} />,
      action: () => window.open("https://wa.me/923292597331", "_blank"),
    },
  ];

  const scrollTo = (id) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        playClickSound();
        filtered[selectedIndex].action();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{ position: "fixed", inset: 0, zIndex: 1100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh", paddingLeft: 16, paddingRight: 16 }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15, 23, 42, 0.35)",
            backdropFilter: "blur(16px)",
          }}
        />

        {/* Command HUD Window (Apple Spotlight Light Mode) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ type: "spring", damping: 28, stiffness: 380 }}
          style={{
            position: "relative",
            zIndex: 1101,
            width: "100%",
            maxWidth: 620,
            backgroundColor: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${TOKENS.line}`,
            borderRadius: TOKENS.radius.sm,
            overflow: "hidden",
            boxShadow: "0 25px 60px -12px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.05)",
          }}
        >
          {/* Top Search Input Bar */}
          <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${TOKENS.line}` }}>
            <Search size={18} color="#0284C7" style={{ marginRight: 12 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sections, projects, or commands..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: TOKENS.ink,
                fontSize: 15,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 500,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontFamily: "'IBM Plex Mono', monospace",
                color: TOKENS.sub,
                background: "#F1F5F9",
                padding: "3px 8px",
                borderRadius: 4,
                border: `1px solid ${TOKENS.line}`,
                fontWeight: 600,
              }}
            >
              ESC
            </span>
          </div>

          {/* Results List */}
          <div style={{ maxHeight: 340, overflowY: "auto", padding: "8px 10px" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "32px 20px", textAlign: "center", color: TOKENS.sub, fontSize: 14 }}>
                No matching actions or commands found.
              </div>
            ) : (
              filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      playClickSound();
                      item.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "11px 14px",
                      borderRadius: TOKENS.radius.xs,
                      background: isSelected ? "rgba(2, 132, 199, 0.08)" : "transparent",
                      border: isSelected ? "1px solid rgba(2, 132, 199, 0.25)" : "1px solid transparent",
                      cursor: "pointer",
                      transition: "background 0.12s ease",
                      color: isSelected ? TOKENS.ink : TOKENS.sub,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: isSelected ? "#0284C7" : TOKENS.sub }}>{item.icon}</span>
                      <span style={{ fontSize: 13.5, fontWeight: isSelected ? 700 : 500, color: isSelected ? TOKENS.ink : TOKENS.sub }}>
                        {item.title}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: TOKENS.sub,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          fontWeight: 600,
                        }}
                      >
                        {item.category}
                      </span>
                      {isSelected && <ArrowRight size={14} color="#0284C7" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              padding: "11px 18px",
              background: "#F8FAFC",
              borderTop: `1px solid ${TOKENS.line}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
              color: TOKENS.sub,
              fontWeight: 600,
            }}
          >
            <span>Navigation: ↑ ↓ · Select: ↵</span>
            {copied && <span style={{ color: "#059669" }}>✓ Email copied to clipboard!</span>}
            <span>Mansoor Developer HUD</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
