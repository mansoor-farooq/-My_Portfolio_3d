import React, { useState } from "react";
import { TOKENS } from "../theme";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from "./Icons";
import { playClickSound } from "../utils/audio";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mansoorturk757@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* ── CONTACT SECTION ── */}
      <section
        id="contact"
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
          {/* Section Eyebrow */}
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
              03 // DIRECT CONTACT
            </span>
          </div>

          {/* Section Headline */}
          <h2
            style={{
              ...TOKENS.type.title,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              color: TOKENS.ink,
              marginBottom: "10px",
            }}
          >
            I respond to direct messages. No contact forms.
          </h2>

          <p
            style={{
              ...TOKENS.type.body,
              color: TOKENS.muted,
              maxWidth: "560px",
              marginBottom: "40px",
            }}
          >
            If you have a system that needs building — an ERP, a compliance engine, a warehouse platform — email or WhatsApp me directly. I read every message myself.
          </p>

          {/* 2-Column Contact Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              maxWidth: "620px",
              marginBottom: "24px",
            }}
            className="contact-grid"
          >
            {/* Email Card */}
            <button
              onClick={handleCopyEmail}
              style={{
                padding: "20px 22px",
                backgroundColor: TOKENS.card,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: TOKENS.radius.sm,
                cursor: "pointer",
                textAlign: "left",
                transition: TOKENS.transition,
                boxShadow: TOKENS.shadow.resting,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = TOKENS.accent;
                e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = TOKENS.line;
                e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
              }}
              aria-label="Copy email address to clipboard"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                  EMAIL — CLICK TO COPY
                </span>
                {copied
                  ? <Check size={14} color={TOKENS.success} />
                  : <Copy size={14} color={TOKENS.muted} />
                }
              </div>
              <div
                style={{
                  ...TOKENS.type.data,
                  color: copied ? TOKENS.success : TOKENS.ink,
                  fontWeight: 600,
                  wordBreak: "break-all",
                  transition: TOKENS.transition,
                }}
              >
                {copied ? "Copied to clipboard" : "mansoorturk757@gmail.com"}
              </div>
            </button>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923292597331?text=Hello%20Mansoor,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound()}
              style={{
                padding: "20px 22px",
                backgroundColor: TOKENS.card,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: TOKENS.radius.sm,
                textDecoration: "none",
                transition: TOKENS.transition,
                display: "block",
                boxShadow: TOKENS.shadow.resting,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = TOKENS.accent;
                e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = TOKENS.line;
                e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                  WHATSAPP · DIRECT
                </span>
                <ArrowUpRight size={14} color={TOKENS.muted} />
              </div>
              <div
                style={{
                  ...TOKENS.type.data,
                  color: TOKENS.ink,
                  fontWeight: 600,
                }}
              >
                +92 329 259 7331
              </div>
            </a>
          </div>

          {/* Profiles Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "GitHub",
                url: "https://github.com/mansoor-farooq",
                icon: <GithubIcon size={14} color={TOKENS.ink} />,
              },
              {
                label: "LinkedIn",
                url: "https://linkedin.com/in/mansoor-farooq-a757b9365/",
                icon: <LinkedInIcon size={14} color={TOKENS.ink} />,
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClickSound()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.xs,
                  ...TOKENS.type.data,
                  fontSize: "13px",
                  color: TOKENS.ink,
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: TOKENS.transition,
                  boxShadow: TOKENS.shadow.resting,
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
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: TOKENS.ink,
          paddingTop: "32px",
          paddingBottom: "32px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: TOKENS.maxWidth,
            margin: "0 auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Identity */}
          <div>
            <div
              style={{
                ...TOKENS.type.data,
                color: "#FFFFFF",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Mansoor Farooq · Karachi
            </div>
            <div
              style={{
                ...TOKENS.type.micro,
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              Still writing code at midnight. Most of it ships.
            </div>
          </div>

          {/* Right: Back to top */}
          <button
            onClick={() => {
              playClickSound();
              if (window.__lenis) {
                window.__lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{
              background: "transparent",
              border: `1px solid rgba(255, 255, 255, 0.15)`,
              borderRadius: TOKENS.radius.xs,
              color: "rgba(255, 255, 255, 0.5)",
              ...TOKENS.type.micro,
              fontSize: "11px",
              padding: "6px 12px",
              cursor: "pointer",
              transition: TOKENS.transition,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          >
            Back to top ↑
          </button>
        </div>
      </footer>

      <style>{`
        @media (max-width: 540px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
