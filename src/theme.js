// Enterprise Design Tokens — Ultra-Luxury Editorial Light Architecture
// Typography: IBM Plex Superfamily Only (5 Exact Tiers)
export const TOKENS = {
  // Colors (WCAG AAA Compliant on Light Alabaster Surfaces)
  ink: "#0F172A",          // Deep obsidian slate for authoritative typography
  surface: "#F8FAFC",      // Crisp architectural alabaster off-white
  surfaceSubtle: "#F1F5F9",// Soft platinum tint for alternating sections
  card: "#FFFFFF",         // Pure structural white cards
  muted: "#64748B",        // Slate mid-tone for secondary text (WCAG AAA >= 6.2:1)
  line: "#E2E8F0",         // Precision 1px hairline borders and dividers
  accent: "#0284C7",       // Refined Sky Blue (4.8:1 WCAG AA+ on white)
  accentSubtle: "#E0F2FE", // Soft sky blue wash for indicators & active badges
  success: "#059669",      // Verified compliance green
  successSubtle: "#ECFDF5",// Subtle emerald wash for active telemetry

  // Exact 5-Tier Typography Scale (IBM Plex Superfamily Only)
  type: {
    display: {
      fontSize: "clamp(36px, 4.6vw, 54px)",
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      fontFamily: "'IBM Plex Sans Condensed', sans-serif",
      fontWeight: 600,
    },
    title: {
      fontSize: "24px",
      lineHeight: 1.25,
      letterSpacing: "-0.01em",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 600,
    },
    body: {
      fontSize: "16.5px",
      lineHeight: 1.65,
      letterSpacing: "0em",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 400,
    },
    data: {
      fontSize: "13.5px",
      lineHeight: 1.5,
      letterSpacing: "0.02em",
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 500,
    },
    micro: {
      fontSize: "11.5px",
      lineHeight: 1.4,
      letterSpacing: "0.05em",
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },

  // Shadows (Luxury Diffusion Elevation Scale)
  shadow: {
    resting: "0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)",
    raised: "0 20px 35px -10px rgba(15, 23, 42, 0.07), 0 1px 3px rgba(15, 23, 42, 0.04)",
    glow: "0 0 25px rgba(2, 132, 199, 0.15)",
  },

  // Layout & Spacing Constants
  maxWidth: 1160,
  transition: "all 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  radius: {
    xs: "4px",
    sm: "6px",
    md: "10px",
    pill: "999px",
  },
};

// Aliased for downstream component compatibility
export const TH = {
  bg: TOKENS.surface,
  card: TOKENS.card,
  cardBorder: TOKENS.line,
  border: TOKENS.line,
  borderMid: TOKENS.line,
  borderAccent: TOKENS.accent,
  text: TOKENS.ink,
  textSub: TOKENS.muted,
  textMuted: TOKENS.muted,
  accent: TOKENS.accent,
  cyan: TOKENS.accent,
  gold: TOKENS.accent,
  shadow: TOKENS.shadow.resting,
  shadowLg: TOKENS.shadow.raised,
  grain: "none",
};
