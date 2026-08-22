import React, { useState, useEffect } from "react";
import { Mail, MessageCircle, ArrowUp, Send, Sparkles } from "lucide-react";
import { playClickSound } from "../utils/audio";
import { TOKENS } from "../theme";

export default function FloatingWidgets() {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    playClickSound();
    if (window.__lenis) {
      window.__lenis.scrollTo("#contact");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    playClickSound();
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Quick Action Floating Glass Dock"
      style={{
        position: "fixed",
        bottom: "26px",
        right: "24px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
        pointerEvents: "none", // child buttons enable pointer-events
      }}
    >
      {/* ── 1. Unified Frosted Glass Action Dock ── */}
      <div
        style={{
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          padding: "7px",
          backgroundColor: "rgba(11, 18, 32, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "40px",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
          transition: "transform 250ms ease, box-shadow 250ms ease",
        }}
      >
        {/* A. Scroll to Top Button (Collapses inside dock smoothly) */}
        {showScrollTop && (
          <div style={{ position: "relative" }}>
            {hoveredBtn === "top" && (
              <div
                style={{
                  position: "absolute",
                  right: "52px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(11, 18, 32, 0.95)",
                  backdropFilter: "blur(10px)",
                  color: "#FFFFFF",
                  padding: "5px 12px",
                  borderRadius: TOKENS.radius.xs,
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  ...TOKENS.type.micro,
                  fontSize: "11px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span>Back to Top</span>
                <ArrowUp size={11} color={TOKENS.accent} />
              </div>
            )}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setHoveredBtn("top")}
              onMouseLeave={() => setHoveredBtn(null)}
              aria-label="Scroll to top"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E2E8F0",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "#E2E8F0";
                e.currentTarget.style.transform = "none";
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        )}

        {/* B. Direct Message / Contact Form Button */}
        <div style={{ position: "relative" }}>
          {hoveredBtn === "contact" && (
            <div
              style={{
                position: "absolute",
                right: "54px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(11, 18, 32, 0.95)",
                backdropFilter: "blur(10px)",
                color: "#FFFFFF",
                padding: "6px 14px",
                borderRadius: TOKENS.radius.xs,
                border: "1px solid rgba(2, 132, 199, 0.4)",
                ...TOKENS.type.micro,
                fontSize: "11.5px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: TOKENS.accent }} />
              <span>Direct Project Inquiry Form</span>
            </div>
          )}

          <button
            onClick={scrollToContact}
            onMouseEnter={() => setHoveredBtn("contact")}
            onMouseLeave={() => setHoveredBtn(null)}
            aria-label="Direct Contact Form"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(2, 132, 199, 0.18)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#38BDF8",
              cursor: "pointer",
              position: "relative",
              transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(2, 132, 199, 0.4)";
              e.currentTarget.style.borderColor = "#38BDF8";
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(56, 189, 248, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(2, 132, 199, 0.18)";
              e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Mail size={18} />
            {/* Live Indicator Pulse */}
            <span
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 8px #38BDF8",
              }}
            />
          </button>
        </div>

        {/* C. Direct WhatsApp Floating Action */}
        <div style={{ position: "relative" }}>
          {hoveredBtn === "whatsapp" && (
            <div
              style={{
                position: "absolute",
                right: "60px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(11, 18, 32, 0.95)",
                backdropFilter: "blur(10px)",
                color: "#FFFFFF",
                padding: "6px 14px",
                borderRadius: TOKENS.radius.xs,
                border: "1px solid rgba(37, 211, 102, 0.4)",
                ...TOKENS.type.micro,
                fontSize: "11.5px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#25D366",
                  boxShadow: "0 0 8px #25D366",
                }}
              />
              <span>Chat on WhatsApp · Online (+92 329 2597331)</span>
            </div>
          )}

          <a
            href="https://wa.me/923292597331?text=Hello%20Mansoor,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
            onClick={() => playClickSound()}
            onMouseEnter={() => setHoveredBtn("whatsapp")}
            onMouseLeave={() => setHoveredBtn(null)}
            aria-label="Direct WhatsApp Chat with Mansoor"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              textDecoration: "none",
              boxShadow: "0 4px 18px rgba(37, 211, 102, 0.45)",
              position: "relative",
              transition: "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.12)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(37, 211, 102, 0.7)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(37, 211, 102, 0.45)";
            }}
          >
            {/* WhatsApp SVG Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>

            {/* Glowing Pulse Ring */}
            <span
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "50%",
                border: "2px solid rgba(37, 211, 102, 0.4)",
                animation: "whatsappPulse 2s infinite ease-out",
                pointerEvents: "none",
              }}
            />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes whatsappPulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </aside>
  );
}
