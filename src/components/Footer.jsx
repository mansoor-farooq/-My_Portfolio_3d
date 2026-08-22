import React, { useState } from "react";
import { TOKENS } from "../theme";
import { Mail, Copy, Check, ArrowUpRight, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "./Icons";
import { playClickSound, playSuccessSound } from "../utils/audio";
import confetti from "canvas-confetti";
import TiltCard3D from "./TiltCard3D";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Custom Web Application (Next.js / Node)",
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
        setStatusMessage("Message delivered directly to mansoorturk757@gmail.com! I will reply within 24 hours.");
        playSuccessSound();
        try {
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.8 },
            colors: [TOKENS.accent, "#25D366", "#7C3AED"],
          });
        } catch (err) {}
        setFormState({ name: "", email: "", subject: "Custom Web Application (Next.js / Node)", message: "" });
      } else {
        throw new Error("Failed to send message via AJAX.");
      }
    } catch (err) {
      console.warn("FormSubmit AJAX fallback to mailto:", err);
      const mailtoUrl = `mailto:mansoorturk757@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formState.subject} from ${formState.name}`
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
      {/* ── CONTACT & DIRECT REACH SECTION ── */}
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
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: TOKENS.accent,
                display: "inline-block",
                boxShadow: "0 0 10px rgba(2, 132, 199, 0.5)",
              }}
            />
            <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, letterSpacing: "0.08em" }}>
              07 // DIRECT CONTACT & INQUIRIES
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
              maxWidth: "640px",
              marginBottom: "44px",
            }}
          >
            Have a custom web application, animated website, or mobile app in mind? Reach out directly via WhatsApp or send a message below.
          </p>

          {/* 2-Column Split: Premium Left Cards + Right Interactive Form */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.25fr",
              gap: "32px",
              alignItems: "start",
            }}
            className="contact-split-grid"
          >
            {/* Left Column: Premium Direct Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* 1. Direct Email Card */}
              <TiltCard3D intensity={8} glare={true}>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    width: "100%",
                    padding: "22px 24px",
                    backgroundColor: TOKENS.card,
                    border: `1px solid ${TOKENS.line}`,
                    borderRadius: TOKENS.radius.sm,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: TOKENS.transition,
                    boxShadow: TOKENS.shadow.resting,
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = TOKENS.accent;
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(2, 132, 199, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = TOKENS.line;
                    e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
                  }}
                  aria-label="Copy Mansoor email address"
                >
                  {/* Premium Metallic Icon Box */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(2, 132, 199, 0.04) 100%)",
                      border: "1px solid rgba(2, 132, 199, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(2, 132, 199, 0.1)",
                    }}
                  >
                    <Mail size={22} color={TOKENS.accent} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "10.5px" }}>
                        EMAIL (CLICK TO COPY)
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          ...TOKENS.type.micro,
                          fontSize: "10px",
                          color: copied ? TOKENS.success : TOKENS.muted,
                          backgroundColor: copied ? TOKENS.successSubtle : TOKENS.surface,
                          padding: "2px 6px",
                          borderRadius: TOKENS.radius.xs,
                          border: `1px solid ${copied ? TOKENS.success : TOKENS.line}`,
                        }}
                      >
                        {copied ? <Check size={11} color={TOKENS.success} /> : <Copy size={11} />}
                        <span>{copied ? "COPIED" : "COPY"}</span>
                      </span>
                    </div>

                    <div
                      style={{
                        ...TOKENS.type.data,
                        color: copied ? TOKENS.success : TOKENS.ink,
                        fontWeight: 600,
                        fontSize: "15px",
                        wordBreak: "break-all",
                        transition: TOKENS.transition,
                      }}
                    >
                      mansoorturk757@gmail.com
                    </div>
                  </div>
                </button>
              </TiltCard3D>

              {/* 2. Direct WhatsApp Card */}
              <TiltCard3D intensity={8} glare={true}>
                <a
                  href="https://wa.me/923292597331?text=Hello%20Mansoor,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  style={{
                    width: "100%",
                    padding: "22px 24px",
                    backgroundColor: TOKENS.card,
                    border: `1px solid ${TOKENS.line}`,
                    borderRadius: TOKENS.radius.sm,
                    textDecoration: "none",
                    transition: TOKENS.transition,
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    boxShadow: TOKENS.shadow.resting,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#25D366";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(37, 211, 102, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = TOKENS.line;
                    e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
                  }}
                >
                  {/* Premium Emerald WhatsApp Icon Box */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(37, 211, 102, 0.2) 0%, rgba(37, 211, 102, 0.05) 100%)",
                      border: "1px solid rgba(37, 211, 102, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 4px 14px rgba(37, 211, 102, 0.15)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.15 4.14 13.56 4.14 11.92C4.14 7.38 7.84 3.67 12.04 3.67ZM8.83 7.37C8.65 7.37 8.35 7.44 8.1 7.71C7.86 7.97 7.17 8.62 7.17 9.94C7.17 11.26 8.13 12.54 8.27 12.72C8.4 12.9 10.16 15.61 12.86 16.78C13.51 17.06 14.01 17.22 14.41 17.35C15.06 17.56 15.65 17.53 16.12 17.46C16.64 17.38 17.72 16.8 17.95 16.16C18.18 15.52 18.18 14.97 18.11 14.86C18.04 14.75 17.86 14.69 17.59 14.55C17.32 14.42 16.02 13.78 15.78 13.69C15.54 13.6 15.36 13.56 15.18 13.82C15.01 14.09 14.51 14.69 14.36 14.86C14.21 15.04 14.06 15.06 13.79 14.93C13.53 14.79 12.67 14.51 11.66 13.61C10.87 12.91 10.34 12.04 10.18 11.78C10.03 11.51 10.17 11.37 10.3 11.24C10.42 11.12 10.57 10.93 10.7 10.77C10.84 10.62 10.88 10.51 10.97 10.33C11.06 10.16 11.02 10.01 10.95 9.87C10.89 9.74 10.39 8.52 10.18 8.01C9.98 7.52 9.77 7.59 9.62 7.58C9.47 7.57 9.3 7.57 9.12 7.57L8.83 7.37Z" />
                    </svg>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "10.5px" }}>
                        WHATSAPP · DIRECT CHAT
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          ...TOKENS.type.micro,
                          fontSize: "10px",
                          color: "#059669",
                          backgroundColor: "#ECFDF5",
                          padding: "2px 6px",
                          borderRadius: TOKENS.radius.xs,
                          border: "1px solid rgba(5, 150, 105, 0.25)",
                        }}
                      >
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#059669" }} />
                        <span>ONLINE</span>
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ ...TOKENS.type.data, color: TOKENS.ink, fontWeight: 600, fontSize: "15px" }}>
                        +92 329 259 7331
                      </span>
                      <ArrowUpRight size={16} color={TOKENS.muted} />
                    </div>
                  </div>
                </a>
              </TiltCard3D>

              {/* 3. Social Profile Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <TiltCard3D intensity={6} glare={true}>
                  <a
                    href="https://github.com/mansoor-farooq"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClickSound()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      backgroundColor: TOKENS.card,
                      border: `1px solid ${TOKENS.line}`,
                      borderRadius: TOKENS.radius.sm,
                      textDecoration: "none",
                      boxShadow: TOKENS.shadow.resting,
                      transition: TOKENS.transition,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#0B1220";
                      e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = TOKENS.line;
                      e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        backgroundColor: "#0B1220",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <GithubIcon size={16} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ ...TOKENS.type.data, fontSize: "13.5px", fontWeight: 600, color: TOKENS.ink }}>
                        GitHub
                      </div>
                      <div style={{ ...TOKENS.type.micro, fontSize: "10px", color: TOKENS.muted }}>
                        Code & Repos
                      </div>
                    </div>
                  </a>
                </TiltCard3D>

                <TiltCard3D intensity={6} glare={true}>
                  <a
                    href="https://linkedin.com/in/mansoor-farooq-a757b9365/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClickSound()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      backgroundColor: TOKENS.card,
                      border: `1px solid ${TOKENS.line}`,
                      borderRadius: TOKENS.radius.sm,
                      textDecoration: "none",
                      boxShadow: TOKENS.shadow.resting,
                      transition: TOKENS.transition,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#0A66C2";
                      e.currentTarget.style.boxShadow = TOKENS.shadow.raised;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = TOKENS.line;
                      e.currentTarget.style.boxShadow = TOKENS.shadow.resting;
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        backgroundColor: "#0A66C2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LinkedInIcon size={16} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ ...TOKENS.type.data, fontSize: "13.5px", fontWeight: 600, color: TOKENS.ink }}>
                        LinkedIn
                      </div>
                      <div style={{ ...TOKENS.type.micro, fontSize: "10px", color: TOKENS.muted }}>
                        Connect & Verify
                      </div>
                    </div>
                  </a>
                </TiltCard3D>
              </div>
            </div>

            {/* Right Column: Ultra-Premium Direct Message Form */}
            <TiltCard3D intensity={6} glare={true}>
              <form
                onSubmit={handleFormSubmit}
                style={{
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  padding: "30px 28px",
                  boxShadow: TOKENS.shadow.resting,
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {/* Form Top Chrome */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "14px",
                    borderBottom: `1px solid ${TOKENS.line}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        backgroundColor: TOKENS.accentSubtle,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Send size={14} color={TOKENS.accent} />
                    </div>
                    <span style={{ ...TOKENS.type.title, fontSize: "16px", color: TOKENS.ink }}>
                      Send Direct Project Inquiry
                    </span>
                  </div>

                  <span
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "10px",
                      color: TOKENS.muted,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <ShieldCheck size={12} color={TOKENS.success} />
                    <span>DIRECT INBOX</span>
                  </span>
                </div>

                {/* Name & Email Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="form-row-2">
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
                        padding: "11px 14px",
                        borderRadius: TOKENS.radius.xs,
                        border: `1px solid ${TOKENS.line}`,
                        backgroundColor: TOKENS.surface,
                        color: TOKENS.ink,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: TOKENS.transition,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = TOKENS.accent;
                        e.target.style.boxShadow = "0 0 0 3px rgba(2, 132, 199, 0.15)";
                        e.target.style.backgroundColor = "#FFFFFF";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = TOKENS.line;
                        e.target.style.boxShadow = "none";
                        e.target.style.backgroundColor = TOKENS.surface;
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
                        padding: "11px 14px",
                        borderRadius: TOKENS.radius.xs,
                        border: `1px solid ${TOKENS.line}`,
                        backgroundColor: TOKENS.surface,
                        color: TOKENS.ink,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: TOKENS.transition,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = TOKENS.accent;
                        e.target.style.boxShadow = "0 0 0 3px rgba(2, 132, 199, 0.15)";
                        e.target.style.backgroundColor = "#FFFFFF";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = TOKENS.line;
                        e.target.style.boxShadow = "none";
                        e.target.style.backgroundColor = TOKENS.surface;
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
                    PROJECT SCOPE / ARCHITECTURE
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      color: TOKENS.ink,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Custom Web Application (Next.js / Node)">Custom Web Application (Next.js / Node / PostgreSQL)</option>
                    <option value="Animated Business Website (InfoTech Style)">Animated Business Website (InfoTech Style)</option>
                    <option value="Native Mobile App (Kotlin / Android)">Native Mobile App (Kotlin / Jetpack Compose)</option>
                    <option value="Offline-First System / SQLite Engine">Offline-First System / Local SQLite Engine</option>
                    <option value="Backend API & Microservice Architecture">Backend REST API & Microservice Architecture</option>
                    <option value="Consulting & Technical Collaboration">High-Stakes Technical Consulting</option>
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
                    MESSAGE & REQUIREMENTS
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Describe your idea, project scope, requirements, or timeline..."
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      color: TOKENS.ink,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                      lineHeight: 1.55,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = TOKENS.accent;
                      e.target.style.boxShadow = "0 0 0 3px rgba(2, 132, 199, 0.15)";
                      e.target.style.backgroundColor = "#FFFFFF";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = TOKENS.line;
                      e.target.style.boxShadow = "none";
                      e.target.style.backgroundColor = TOKENS.surface;
                    }}
                  />
                </div>

                {/* Status Notice */}
                {statusMessage && (
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: TOKENS.radius.xs,
                      backgroundColor: status === "success" ? TOKENS.successSubtle : "#FEF2F2",
                      border: `1px solid ${status === "success" ? TOKENS.success : "#F87171"}`,
                      color: status === "success" ? TOKENS.success : "#B91C1C",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      ...TOKENS.type.data,
                      fontSize: "13px",
                    }}
                  >
                    {status === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Ultra-Premium Gradient Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    height: "48px",
                    padding: "0 24px",
                    background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: TOKENS.radius.xs,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: TOKENS.transition,
                    boxShadow: "0 4px 16px rgba(2, 132, 199, 0.35)",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(2, 132, 199, 0.45)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(2, 132, 199, 0.35)";
                    }
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={17} className="spin-animation" />
                      <span>Sending directly to Mansoor...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message to Mansoor</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </TiltCard3D>
          </div>
        </div>
      </section>

      {/* ── FOOTER SIGNOFF ── */}
      <footer
        style={{
          backgroundColor: TOKENS.ink,
          paddingTop: "36px",
          paddingBottom: "36px",
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
                fontSize: "14px",
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
              color: "rgba(255, 255, 255, 0.75)",
              ...TOKENS.type.micro,
              fontSize: "11px",
              padding: "7px 16px",
              cursor: "pointer",
              transition: TOKENS.transition,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
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
