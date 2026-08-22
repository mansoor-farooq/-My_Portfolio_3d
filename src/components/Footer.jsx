import React, { useState } from "react";
import { TOKENS } from "../theme";
import { Mail, Copy, Check, ArrowUpRight, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from "./Icons";
import { playClickSound, playSuccessSound } from "../utils/audio";
import confetti from "canvas-confetti";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Custom Web Application",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText("mansoorturk757@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setStatusMessage("Please fill in your name, email, and message.");
      return;
    }

    playClickSound();
    setStatus("loading");
    setStatusMessage("");

    try {
      // Direct FormSubmit AJAX Endpoint targeting mansoorturk757@gmail.com
      const res = await fetch("https://formsubmit.co/ajax/mansoorturk757@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formState.name,
          Email: formState.email,
          Subject: formState.subject,
          Message: formState.message,
          _subject: `[Portfolio Inquiry] ${formState.subject} from ${formState.name}`,
          _template: "table",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setStatusMessage("Message sent successfully! I will reply to you within 24 hours.");
        playSuccessSound();
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.8 },
            colors: [TOKENS.accent, TOKENS.success, "#7C3AED"],
          });
        } catch (err) {}
        setFormState({ name: "", email: "", subject: "Custom Web Application", message: "" });
      } else {
        throw new Error("Failed to send message via AJAX.");
      }
    } catch (err) {
      console.warn("FormSubmit AJAX error, falling back to mailto:", err);
      // Fallback opens direct mail client with pre-filled content
      const mailtoUrl = `mailto:mansoorturk757@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${formState.subject} from ${formState.name}`
      )}&body=${encodeURIComponent(
        `Hi Mansoor,\n\nMy name is ${formState.name} (${formState.email}).\n\n${formState.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus("success");
      setStatusMessage("Opening your email client to send message...");
    }
  };

  return (
    <>
      {/* ── CONTACT & EMAIL SECTION ── */}
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
              04 // DIRECT CONTACT & INQUIRIES
            </span>
          </div>

          <h2
            style={{
              ...TOKENS.type.title,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              color: TOKENS.ink,
              marginBottom: "8px",
            }}
          >
            Let's discuss your next project.
          </h2>

          <p
            style={{
              ...TOKENS.type.body,
              color: TOKENS.muted,
              maxWidth: "600px",
              marginBottom: "40px",
            }}
          >
            Have a custom web application, animated website, or mobile app in mind? Send a direct message below or reach out via WhatsApp.
          </p>

          {/* 2-Column Split: Left Contact Cards + Right Interactive Form */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "36px",
              alignItems: "start",
            }}
            className="contact-split-grid"
          >
            {/* Left Column: Fast Reach Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Email Copy Card */}
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
                aria-label="Copy email address"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                    EMAIL ADDRESS (CLICK TO COPY)
                  </span>
                  {copied ? <Check size={15} color={TOKENS.success} /> : <Copy size={15} color={TOKENS.muted} />}
                </div>
                <div
                  style={{
                    ...TOKENS.type.data,
                    color: copied ? TOKENS.success : TOKENS.ink,
                    fontWeight: 600,
                    fontSize: "14.5px",
                    wordBreak: "break-all",
                  }}
                >
                  {copied ? "Copied to clipboard!" : "mansoorturk757@gmail.com"}
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
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                    WHATSAPP · INSTANT DIRECT CHAT
                  </span>
                  <ArrowUpRight size={15} color={TOKENS.muted} />
                </div>
                <div
                  style={{
                    ...TOKENS.type.data,
                    color: TOKENS.ink,
                    fontWeight: 600,
                    fontSize: "14.5px",
                  }}
                >
                  +92 329 259 7331
                </div>
              </a>

              {/* Social Profiles Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <a
                  href="https://github.com/mansoor-farooq"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "12px",
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = TOKENS.line;
                  }}
                >
                  <GithubIcon size={15} color={TOKENS.ink} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/mansoor-farooq-a757b9365/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "12px",
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = TOKENS.line;
                  }}
                >
                  <LinkedInIcon size={15} color={TOKENS.ink} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Column: Working Interactive Email Form */}
            <form
              onSubmit={handleFormSubmit}
              style={{
                backgroundColor: TOKENS.card,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: TOKENS.radius.sm,
                padding: "26px 24px",
                boxShadow: TOKENS.shadow.resting,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Mail size={16} color={TOKENS.accent} />
                <span style={{ ...TOKENS.type.data, color: TOKENS.ink, fontWeight: 600, fontSize: "14px" }}>
                  Send a Direct Message
                </span>
              </div>

              {/* Name & Email Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="form-row-2">
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      ...TOKENS.type.micro,
                      display: "block",
                      marginBottom: "6px",
                      color: TOKENS.muted,
                      fontSize: "11px",
                    }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ali Ahmed"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      color: TOKENS.ink,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      ...TOKENS.type.micro,
                      display: "block",
                      marginBottom: "6px",
                      color: TOKENS.muted,
                      fontSize: "11px",
                    }}
                  >
                    YOUR EMAIL
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      color: TOKENS.ink,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Project Type Selector */}
              <div>
                <label
                  htmlFor="subject"
                  style={{
                    ...TOKENS.type.micro,
                    display: "block",
                    marginBottom: "6px",
                    color: TOKENS.muted,
                    fontSize: "11px",
                  }}
                >
                  PROJECT TYPE
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: TOKENS.radius.xs,
                    border: `1px solid ${TOKENS.line}`,
                    backgroundColor: TOKENS.surface,
                    color: TOKENS.ink,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Custom Web Application">Custom Web Application (Next.js / Node)</option>
                  <option value="Animated Business Website">Animated Business Website (InfoTech Style)</option>
                  <option value="Native Mobile App">Native Mobile App (Kotlin / Android)</option>
                  <option value="Backend API & Database">Backend API & PostgreSQL Architecture</option>
                  <option value="Other Consulting / Collaboration">Other Inquiries & Consulting</option>
                </select>
              </div>

              {/* Message Box */}
              <div>
                <label
                  htmlFor="message"
                  style={{
                    ...TOKENS.type.micro,
                    display: "block",
                    marginBottom: "6px",
                    color: TOKENS.muted,
                    fontSize: "11px",
                  }}
                >
                  MESSAGE DETAILS
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Describe your idea, requirements, or timeline..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: TOKENS.radius.xs,
                    border: `1px solid ${TOKENS.line}`,
                    backgroundColor: TOKENS.surface,
                    color: TOKENS.ink,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Status Notice */}
              {statusMessage && (
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: TOKENS.radius.xs,
                    backgroundColor: status === "success" ? TOKENS.successSubtle : "#FEF2F2",
                    border: `1px solid ${status === "success" ? TOKENS.success : "#F87171"}`,
                    color: status === "success" ? TOKENS.success : "#B91C1C",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    ...TOKENS.type.data,
                    fontSize: "12.5px",
                  }}
                >
                  {status === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  height: "46px",
                  padding: "0 20px",
                  backgroundColor: TOKENS.accent,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: TOKENS.radius.xs,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: TOKENS.transition,
                  boxShadow: TOKENS.shadow.resting,
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading") e.currentTarget.style.backgroundColor = "#0369A1";
                }}
                onMouseLeave={(e) => {
                  if (status !== "loading") e.currentTarget.style.backgroundColor = TOKENS.accent;
                }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="spin-animation" />
                    <span>Sending to mansoorturk757@gmail.com...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message to Mansoor</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER SIGNOFF ── */}
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
          <div>
            <div
              style={{
                ...TOKENS.type.data,
                color: "#FFFFFF",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Mansoor Farooq · Karachi, Pakistan
            </div>
            <div
              style={{
                ...TOKENS.type.micro,
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              Full-Stack Developer · InfoTech Solutions · Next.js · Node.js · PostgreSQL · Kotlin
            </div>
          </div>

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
              border: `1px solid rgba(255, 255, 255, 0.2)`,
              borderRadius: TOKENS.radius.xs,
              color: "rgba(255, 255, 255, 0.7)",
              ...TOKENS.type.micro,
              fontSize: "11px",
              padding: "6px 14px",
              cursor: "pointer",
              transition: TOKENS.transition,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
          >
            Back to top ↑
          </button>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
}
