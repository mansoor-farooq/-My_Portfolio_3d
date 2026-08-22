import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Code, Briefcase, Mail, Sparkles, Terminal, Copy, Check } from "lucide-react";
import { TH } from "../theme";
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
            background: "rgba(3, 5, 8, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        />

        {/* Command HUD Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", damping: 26, stiffness: 350 }}
          style={{
            position: "relative",
            zIndex: 1101,
            width: "100%",
            maxWidth: 620,
            background: "linear-gradient(175deg, #101522 0%, #090C14 100%)",
            border: `1px solid ${TH.borderAccent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 24px 70px rgba(0,0,0,0.8), 0 0 40px rgba(0,245,155,0.15)`,
          }}
        >
          {/* Top Search Input Bar */}
          <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${TH.border}` }}>
            <Search size={19} color={TH.accent} style={{ marginRight: 12 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or jump to section..."
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
                color: "#FFF",
                fontSize: 15,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                color: TH.textMuted,
                background: "rgba(255, 255, 255, 0.06)",
                padding: "3px 7px",
                borderRadius: 6,
                border: `1px solid ${TH.border}`,
              }}
            >
              ESC
            </span>
          </div>

          {/* Results List */}
          <div style={{ maxHeight: 340, overflowY: "auto", padding: "8px 10px" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "32px 20px", textAlign: "center", color: TH.textMuted, fontSize: 14 }}>
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
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: isSelected ? "rgba(0, 245, 155, 0.12)" : "transparent",
                      border: isSelected ? `1px solid ${TH.borderAccent}` : "1px solid transparent",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                      color: isSelected ? "#FFF" : TH.textSub,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: isSelected ? TH.accent : TH.textMuted }}>{item.icon}</span>
                      <span style={{ fontSize: 13.5, fontWeight: isSelected ? 600 : 500 }}>
                        {item.title}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "'JetBrains Mono', monospace",
                          color: TH.textMuted,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.category}
                      </span>
                      {isSelected && <ArrowRight size={14} color={TH.accent} />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              padding: "10px 18px",
              background: "rgba(0, 0, 0, 0.35)",
              borderTop: `1px solid ${TH.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              color: TH.textMuted,
            }}
          >
            <span>Navigation: ↑ ↓ · Select: ↵</span>
            {copied && <span style={{ color: TH.accent }}>✓ Email copied to clipboard!</span>}
            <span>Mansoor Developer HUD</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
