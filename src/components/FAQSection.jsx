import React, { useState } from "react";
import { TOKENS } from "../theme";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ArrowUpRight } from "lucide-react";
import { playClickSound } from "../utils/audio";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is your primary tech stack for custom web and mobile apps?",
      a: "My primary web stack is Next.js (App Router), React, TypeScript, and Tailwind CSS on the frontend, with Node.js / Express and PostgreSQL on the backend. For offline-first capabilities, I use local SQLite stores. For native mobile applications, I build with native Kotlin and Jetpack Compose on Android.",
    },
    {
      q: "How long does a typical custom application or website take to build?",
      a: "A high-performance animated business website typically takes 1 to 2 weeks. A full-stack custom web application (with database modeling, authentication, dashboard, and payment/API integrations) typically takes 3 to 6 weeks depending on feature scope.",
    },
    {
      q: "Do you build custom architectures or use pre-made templates / WordPress?",
      a: "I build 100% custom code from scratch. I do not use slow, bloated WordPress themes or generic templates. Custom Next.js code guarantees sub-1.5s load times, top-tier security, and complete flexibility for any custom business workflow.",
    },
    {
      q: "Can you build offline-first applications that work without internet?",
      a: "Yes! Many of my projects (such as MindVault and industrial gate check-ins) are engineered offline-first using local SQLite database caching and progressive web app (PWA) background synchronization.",
    },
    {
      q: "How do we get started on a project?",
      a: "Simply send a direct message through the contact form below or reach out directly on WhatsApp at +92 329 259 7331. We will schedule a quick scope alignment call to define your requirements, timeline, and architectural plan.",
    },
  ];

  return (
    <section
      id="faq"
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
          maxWidth: "840px",
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: "36px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
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
              06 // FREQUENTLY ASKED QUESTIONS
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
            Got Questions? Straight Answers.
          </h2>
          <p style={{ ...TOKENS.type.body, color: TOKENS.muted }}>
            Everything you need to know about working together, timelines, and technical standards.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${isOpen ? TOKENS.accent : TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  overflow: "hidden",
                  boxShadow: isOpen ? TOKENS.shadow.raised : TOKENS.shadow.resting,
                  transition: TOKENS.transition,
                }}
              >
                <button
                  onClick={() => {
                    playClickSound();
                    setOpenIndex(isOpen ? null : idx);
                  }}
                  style={{
                    width: "100%",
                    padding: "20px 22px",
                    backgroundColor: "transparent",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      ...TOKENS.type.title,
                      fontSize: "16px",
                      color: isOpen ? TOKENS.accent : TOKENS.ink,
                      fontWeight: 600,
                    }}
                  >
                    {item.q}
                  </span>

                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: TOKENS.radius.xs,
                      backgroundColor: TOKENS.surface,
                      border: `1px solid ${TOKENS.line}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: TOKENS.muted,
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 22px 22px",
                      borderTop: `1px solid ${TOKENS.line}`,
                      paddingTop: "16px",
                    }}
                  >
                    <p
                      style={{
                        ...TOKENS.type.body,
                        fontSize: "14.5px",
                        color: TOKENS.muted,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
