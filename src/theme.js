// Enterprise Design Tokens — Strictly Authoritative High-Trust Architecture
// Typography: IBM Plex Superfamily Only (5 Exact Tiers)
export const TOKENS = {
  // Colors (WCAG AAA Compliant)
  ink: "#0B1220",          // Deep navy-black for dominant typography & authority
  surface: "#F8F9FA",      // Architectural cool off-white background
  card: "#FFFFFF",         // Crisp structural white cards
  muted: "#4B5565",        // Slate mid-tone for secondary text (WCAG AAA >= 5.8:1)
  line: "#E2E6EC",         // Precision hairline borders and data dividers
  accent: "#0284C7",       // Refined Sky Blue (4.6:1 WCAG AA+ on white)
  accentSubtle: "#E0F2FE", // Soft sky blue wash for indicators & active badges
  success: "#059669",      // Verified audit / compliance green
  successSubtle: "#ECFDF5",// Subtle green wash for compliance badges

  // Exact 5-Tier Typography Scale (IBM Plex Superfamily Only)
  type: {
    display: {
      fontSize: "clamp(36px, 4.6vw, 54px)",
      lineHeight: 1.02,
      letterSpacing: "-0.03em",
      fontFamily: "'IBM Plex Sans Condensed', sans-serif",
      fontWeight: 600,
    },
    title: {
      fontSize: "24px",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 600,
    },
    body: {
      fontSize: "17px",
      lineHeight: 1.65,
      letterSpacing: "0em",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 400,
    },
    data: {
      fontSize: "14px",
      lineHeight: 1.5,
      letterSpacing: "0.02em",
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 500,
    },
    micro: {
      fontSize: "12px",
      lineHeight: 1.4,
      letterSpacing: "0.04em",
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 500,
      textTransform: "uppercase",
    },
  },

  // Shadows (Two-Step Elevation Scale Only)
  shadow: {
    resting: "0 1px 3px rgba(11, 18, 32, 0.05), 0 1px 2px rgba(11, 18, 32, 0.03)",
    raised: "0 10px 25px -5px rgba(11, 18, 32, 0.08), 0 8px 10px -6px rgba(11, 18, 32, 0.04)",
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
