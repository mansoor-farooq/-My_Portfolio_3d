import React, { useState, useEffect } from "react";
import { Mail, MessageCircle, Heart, ArrowUp, Send } from "lucide-react";
import { playClickSound } from "../utils/audio";

export default function FloatingWidgets() {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
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
      aria-label="Quick Actions & WhatsApp Chat"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "24px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* 1. Scroll To Top Button (Appears when scrolled) */}
      {showScrollTop && (
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {hoveredBtn === "top" && (
            <div
              style={{
                position: "absolute",
                right: "56px",
                backgroundColor: "#0B1220",
                color: "#FFFFFF",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                pointerEvents: "none",
              }}
            >
              Back to Top
            </div>
          )}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setHoveredBtn("top")}
            onMouseLeave={() => setHoveredBtn(null)}
            aria-label="Scroll to top"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E6EC",
              boxShadow: "0 4px 14px rgba(11, 18, 32, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B1220",
              cursor: "pointer",
              transition: "transform 180ms ease, box-shadow 180ms ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(11, 18, 32, 0.18)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(11, 18, 32, 0.12)";
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      )}

      {/* 2. Contact Us / Hire Me Button (White Circle with Red Heart / Mail) */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {hoveredBtn === "contact" && (
          <div
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "#0B1220",
              color: "#FFFFFF",
              padding: "5px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Direct Message & Inquiries</span>
          </div>
        )}
        <button
          onClick={scrollToContact}
          onMouseEnter={() => setHoveredBtn("contact")}
          onMouseLeave={() => setHoveredBtn(null)}
          aria-label="Direct Contact Form"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E6EC",
            boxShadow: "0 6px 18px rgba(11, 18, 32, 0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 200ms ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.08) translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(11, 18, 32, 0.22)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(11, 18, 32, 0.14)";
          }}
        >
          <Mail size={20} color="#0284C7" />
          {/* Live pulsing dot */}
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#059669",
              border: "2px solid #FFFFFF",
            }}
          />
        </button>
      </div>

      {/* 3. Floating WhatsApp Button (Exact Style from Image) */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {hoveredBtn === "whatsapp" && (
          <div
            style={{
              position: "absolute",
              right: "66px",
              backgroundColor: "#1F2937",
              color: "#FFFFFF",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "12.5px",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
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
                display: "inline-block",
              }}
            />
            <span>Chat on WhatsApp · Online</span>
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
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            backgroundColor: "#25D366",
            boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            cursor: "pointer",
            transition: "transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 200ms ease",
            animation: "pulseShadow 2.5s infinite",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.12) translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(37, 211, 102, 0.6)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.45)";
          }}
        >
          {/* Authentic WhatsApp SVG Logo */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.15 4.14 13.56 4.14 11.92C4.14 7.38 7.84 3.67 12.04 3.67ZM8.83 7.37C8.65 7.37 8.35 7.44 8.1 7.71C7.86 7.97 7.17 8.62 7.17 9.94C7.17 11.26 8.13 12.54 8.27 12.72C8.4 12.9 10.16 15.61 12.86 16.78C13.51 17.06 14.01 17.22 14.41 17.35C15.06 17.56 15.65 17.53 16.12 17.46C16.64 17.38 17.72 16.8 17.95 16.16C18.18 15.52 18.18 14.97 18.11 14.86C18.04 14.75 17.86 14.69 17.59 14.55C17.32 14.42 16.02 13.78 15.78 13.69C15.54 13.6 15.36 13.56 15.18 13.82C15.01 14.09 14.51 14.69 14.36 14.86C14.21 15.04 14.06 15.06 13.79 14.93C13.53 14.79 12.67 14.51 11.66 13.61C10.87 12.91 10.34 12.04 10.18 11.78C10.03 11.51 10.17 11.37 10.3 11.24C10.42 11.12 10.57 10.93 10.7 10.77C10.84 10.62 10.88 10.51 10.97 10.33C11.06 10.16 11.02 10.01 10.95 9.87C10.89 9.74 10.39 8.52 10.18 8.01C9.98 7.52 9.77 7.59 9.62 7.58C9.47 7.57 9.3 7.57 9.12 7.57L8.83 7.37Z" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes pulseShadow {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
      `}</style>
    </aside>
  );
}
