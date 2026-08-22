import React, { useState } from "react";
import { TOKENS } from "../theme";
import { BookOpen, Clock, Tag, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import TiltCard3D from "./TiltCard3D";
import { playClickSound } from "../utils/audio";

export const ARTICLES = [
  {
    id: "offline-first-nextjs-sqlite",
    title: "Building Offline-First Web Applications with Next.js and SQLite",
    slug: "offline-first-nextjs-sqlite",
    category: "Architecture",
    date: "August 2026",
    readTime: "6 min read",
    excerpt:
      "How to architect resilient web applications that function 100% offline using local SQLite stores, browser cache persistence, and background sync queues.",
    content: `### Introduction
In emerging markets and industrial environments, network connectivity is notoriously unpredictable. Standard cloud-dependent Single Page Applications (SPAs) fail completely when internet connections drop. In this article, we explore how to build offline-first web applications using Next.js, local SQLite storage, and background sync protocols.

### 1. The Core Architecture
Instead of making every database read and write depend on a live remote server, the application treats local storage (IndexedDB or embedded SQLite via WebAssembly / native backend) as the single source of truth for immediate UI state.
- **Local Read/Write:** Instant response times (<5ms) with zero loading spinners.
- **Transaction Log:** Every write operation generates an immutable local transaction token.
- **Sync Dispatcher:** A background worker monitors \`navigator.onLine\` and syncs queued transactions when connectivity returns.

### 2. Handling Conflict Resolution
When multiple offline clients update the same record, conflicts are inevitable. We implement deterministic timestamp-based vector clocks combined with Last-Write-Wins (LWW) or custom business reconciliation handlers to ensure data integrity without loss.

### 3. Conclusion
Building offline-first requires shifting your mental model from 'request-response' to 'local-state-sync'. The result is an application that is unbeatably fast, reliable, and user-friendly.`,
    tags: ["Next.js", "SQLite", "Offline-First", "PWA"],
  },
  {
    id: "nextjs-sub-second-lcp",
    title: "Optimizing Next.js 14/15 App Router for Sub-1-Second LCP",
    slug: "nextjs-sub-second-lcp",
    category: "Frontend",
    date: "August 2026",
    readTime: "5 min read",
    excerpt:
      "Techniques to achieve perfect 100 Lighthouse performance and sub-1s Largest Contentful Paint (LCP) in Next.js applications.",
    content: `### Why LCP Matters
Largest Contentful Paint (LCP) measures when the main content of a webpage has likely loaded. A fast LCP directly correlates with higher search engine rankings, lower bounce rates, and increased conversions.

### Key Optimization Strategies
1. **Server Components by Default:** Keep client components at the leaves of your component tree to eliminate heavy JavaScript hydration overhead.
2. **Font & Image Strategy:** Use Next.js \`next/font\` with \`display: swap\` and self-hosted subsets. Utilize \`priority\` attributes on above-the-fold hero images with modern AVIF/WebP formats.
3. **Route Handlers & Streaming:** Stream heavy data blocks using React Suspense boundaries so the critical UI shell renders in under 200ms.
4. **CSS Optimization:** Eliminate unused CSS frameworks and rely on lightweight atomic utility classes.

### Result
Achieving consistent sub-1s LCP across 3G/4G mobile networks with a 100/100 Lighthouse performance rating.`,
    tags: ["Next.js", "Performance", "LCP", "SEO"],
  },
  {
    id: "nodejs-secure-rest-apis",
    title: "Architecting Secure Node.js & Express REST APIs in 2026",
    slug: "nodejs-secure-rest-apis",
    category: "Backend",
    date: "July 2026",
    readTime: "7 min read",
    excerpt:
      "A comprehensive guide to building hardened Node.js backend services: JWT rotation, rate limiting, SQL injection defense, and input sanitization.",
    content: `### Security First Backend Design
Building production-grade backend APIs requires defensive engineering at every layer. Here is the blueprint for securing modern Node.js and Express REST services.

### 1. Authentication & JWT Rotation
- Store access tokens in memory or short-lived cookies (15 minutes).
- Store refresh tokens in \`httpOnly\`, \`secure\`, \`sameSite=strict\` cookies with database token family tracking to detect token reuse attacks.

### 2. Input Validation & Parameterized Queries
Never trust client inputs. Utilize robust schema validation libraries (such as Zod) on incoming payloads before they reach business logic. Always use parameterized queries or trusted ORMs to eliminate SQL injection vectors.

### 3. Rate Limiting & Security Headers
- Apply \`helmet\` for essential HTTP security headers (CSP, HSTS, X-Frame-Options).
- Implement Redis-backed IP and user-rate limiters to prevent brute-force attacks and denial-of-service attempts.`,
    tags: ["Node.js", "Express", "API Security", "JWT"],
  },
  {
    id: "postgresql-indexing-high-concurrency",
    title: "PostgreSQL Indexing & ACID Transactions for High-Concurrency Apps",
    slug: "postgresql-indexing-high-concurrency",
    category: "Database",
    date: "July 2026",
    readTime: "8 min read",
    excerpt:
      "How to design relational schemas, write optimal B-Tree and GIN indexes, and prevent transaction deadlocks in production PostgreSQL databases.",
    content: `### Relational Modeling at Scale
PostgreSQL is the gold standard for reliable relational data storage. However, without intentional indexing and transaction management, performance can degrade rapidly under concurrency.

### Best Practices:
- **Index Selectivity:** Create multi-column indexes matching your query's WHERE and ORDER BY clauses.
- **Partial Indexes:** Index only active or unarchived rows (\`WHERE is_active = true\`) to save disk space and accelerate lookups.
- **Lock Contention:** Keep database transactions short and avoid holding locks during third-party external API requests.
- **Connection Pooling:** Always deploy connection pooling (PgBouncer) between your Node.js application instances and the database.`,
    tags: ["PostgreSQL", "Database", "SQL", "ACID"],
  },
  {
    id: "react-to-kotlin-compose",
    title: "Transitioning from React Web to Native Android with Jetpack Compose",
    slug: "react-to-kotlin-compose",
    category: "Mobile",
    date: "June 2026",
    readTime: "6 min read",
    excerpt:
      "A web developer's guide to mastering Kotlin and Jetpack Compose: state management, declarative UI paradigms, and Room local persistence.",
    content: `### The Declarative Parallel
If you are experienced in React, Jetpack Compose feels remarkably familiar. Both frameworks use declarative UI paradigms, component composition, and unidirectional state flow.

### Direct Equivalents:
- \`useState()\` in React -> \`remember { mutableStateOf() }\` in Compose.
- \`useEffect()\` in React -> \`LaunchedEffect()\` in Compose.
- Custom Hooks -> Composable helper functions and ViewModels.

### Why Native Matters:
Native Kotlin provides direct access to device hardware (Bluetooth, camera scanners, offline SQLite Room DB) without the bridge performance penalty of hybrid frameworks.`,
    tags: ["Kotlin", "Android", "Jetpack Compose", "Mobile"],
  },
  {
    id: "framer-motion-60fps-web",
    title: "Building Silky 60FPS UI Animations with Framer Motion",
    slug: "framer-motion-60fps-web",
    category: "Frontend",
    date: "June 2026",
    readTime: "5 min read",
    excerpt:
      "Mastering hardware-accelerated transforms, spring physics, and layout animations to create ultra-responsive web experiences.",
    content: `### The Golden Rule of Web Animation
Animate \`transform\` and \`opacity\` only. Changing layout properties like \`width\`, \`height\`, or \`top\` triggers expensive browser reflow and repaint cycles, causing visual stutter on mobile devices.

### Using Spring Physics
Replace linear easing curves with natural spring physics:
- \`type: "spring", stiffness: 400, damping: 30\` delivers immediate tactile responsiveness without feeling sluggish.
- Use \`layoutId\` in Framer Motion for seamless shared element transitions across state changes.`,
    tags: ["Framer Motion", "UI Animation", "React", "UX"],
  },
  {
    id: "custom-web-apps-vs-wordpress",
    title: "Why Custom Full-Stack Web Apps Outperform WordPress & Low-Code in 2026",
    slug: "custom-web-apps-vs-wordpress",
    category: "Architecture",
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "Comparing bespoke Next.js/Node.js web applications against template-based platforms for speed, security, scalability, and long-term ROI.",
    content: `### The Template Dilemma
WordPress and low-code platforms promise quick setup, but accumulate technical debt over time. Heavy plugin ecosystems create security vulnerabilities, slow load times (3-6s), and brittle customizations.

### The Custom Advantage:
- **Zero Bloat:** Load only the code you write, achieving sub-1.5s page speeds.
- **Uncompromised Security:** No vulnerable third-party plugin vulnerabilities.
- **Custom Business Logic:** Tailored workflows that match exact enterprise operations rather than forcing you into a template.`,
    tags: ["Full-Stack", "Next.js", "Web Development", "Business"],
  },
  {
    id: "double-entry-ledger-postgresql",
    title: "Designing a Fault-Tolerant Double-Entry Accounting Ledger in PostgreSQL",
    slug: "double-entry-ledger-postgresql",
    category: "Database",
    date: "May 2026",
    readTime: "8 min read",
    excerpt:
      "Architecting immutable financial records, credit/debit transaction constraints, and zero-sum verification in relational databases.",
    content: `### Double-Entry Fundamentals
In double-entry accounting, every financial event produces at least two balanced entries: a debit and a credit. The fundamental rule is: \`SUM(debits) = SUM(credits)\`.

### Database Design Rules:
1. **Immutable Records:** Never UPDATE or DELETE transaction rows. Corrections must be handled by posting new reversing adjustment entries.
2. **Atomic Commits:** Wrap all debit/credit entry pairs inside a single PostgreSQL transaction block (\`BEGIN ... COMMIT\`).
3. **Database Constraints:** Enforce non-negative amounts and verify foreign key integrity for all linked chart-of-accounts.`,
    tags: ["PostgreSQL", "FinTech", "Ledger", "ACID"],
  },
  {
    id: "real-time-api-health-monitor",
    title: "How to Build a Real-Time API Uptime & Latency Telemetry Dashboard",
    slug: "real-time-api-health-monitor",
    category: "Backend",
    date: "April 2026",
    readTime: "6 min read",
    excerpt:
      "Creating lightweight continuous endpoint monitoring services with automated alerting, latency wave charts, and incident logging.",
    content: `### The Need for Proactive Monitoring
Discovering service downtime from customer complaints is too late. Building a continuous health-check telemetry daemon allows you to detect latency degradation and connection bottlenecks immediately.

### Key Components:
- **Ping Daemon:** Node.js cron worker executing HEAD/GET requests every 30 seconds.
- **Latency Histogram:** Storing round-trip response times in PostgreSQL for percentile calculations (p50, p95, p99).
- **Incident Dispatcher:** Webhook alerts triggered when consecutive failures exceed defined thresholds.`,
    tags: ["Node.js", "DevOps", "Monitoring", "Telemetry"],
  },
  {
    id: "dark-mode-wcag-aaa-contrast",
    title: "Designing High-Converting Dark Mode UI with WCAG AAA Contrast",
    slug: "dark-mode-wcag-aaa-contrast",
    category: "Frontend",
    date: "April 2026",
    readTime: "5 min read",
    excerpt:
      "Design principles for dark mode interfaces: avoiding pure #000000 black, elevation through surface lightness, and accessible typography ratios.",
    content: `### Beyond Pure Black
Pure black (\`#000000\`) causes eye fatigue and harsh optical halation against white text. High-end dark interfaces use deep navy or slate tones (\`#09090B\` or \`#0B1220\`).

### Key Rules:
- **Elevation via Tonal Value:** Higher elevation layers (cards, modals) should be slightly lighter in color than the background surface.
- **Muted Contrast:** Use soft off-whites (\`#FAFAFA\` or \`#E2E8F0\`) rather than blinding pure white for prose copy.
- **Accent Restraint:** Limit high-saturation accent colors to primary actions and telemetry indicators.`,
    tags: ["UI/UX", "Accessibility", "Design", "CSS"],
  },
  {
    id: "pwa-service-worker-caching",
    title: "Progressive Web Apps in 2026: Service Worker Caching Strategies",
    slug: "pwa-service-worker-caching",
    category: "Architecture",
    date: "March 2026",
    readTime: "7 min read",
    excerpt:
      "Deep dive into Cache-First, Network-First, and Stale-While-Revalidate service worker caching strategies for lightning-fast PWAs.",
    content: `### Modern PWA Caching
Service workers act as programmable network proxies, allowing you to intercept fetch requests and serve cached responses instantly.

### Choosing the Right Strategy:
- **Static Assets (JS/CSS/Fonts):** \`Cache-First\` with content hashing for instant cache hits.
- **Dynamic API Data:** \`Stale-While-Revalidate\` — serves immediate cached data while fetching updates in the background.
- **Critical Transmissions:** \`Network-First\` with local IndexedDB fallback for guaranteed data freshness.`,
    tags: ["PWA", "Service Workers", "Caching", "Performance"],
  },
  {
    id: "web-vitals-100-lighthouse",
    title: "The 2026 Web Vitals & 100/100 Lighthouse Performance Blueprint",
    slug: "web-vitals-100-lighthouse",
    category: "Frontend",
    date: "March 2026",
    readTime: "6 min read",
    excerpt:
      "Step-by-step audit checklist to eliminate render-blocking resources, minimize main-thread work, and maximize Core Web Vitals scores.",
    content: `### Mastering Core Web Vitals
Google's search algorithm heavily rewards websites that pass all Core Web Vitals metrics:
- **LCP (Largest Contentful Paint):** < 1.2s
- **INP (Interaction to Next Paint):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.05

### The Action Plan:
1. Defer non-critical scripts with async/defer or dynamic imports.
2. Specify exact width and height aspect ratios on all images and embeds to prevent layout shift.
3. Optimize font loading with \`font-display: swap\` and preconnect headers.`,
    tags: ["SEO", "Performance", "Web Vitals", "Lighthouse"],
  },
];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ["All", "Architecture", "Frontend", "Backend", "Database", "Mobile"];

  const filteredArticles =
    selectedCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <section
      id="blog"
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
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div>
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
                05 // TECHNICAL INSIGHTS & ENGINEERING BLOG
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
              Engineering Notes & Architecture Deep Dives
            </h2>
            <p style={{ ...TOKENS.type.body, color: TOKENS.muted, maxWidth: "600px" }}>
              Detailed technical write-ups on full-stack architecture, offline-first systems, Next.js optimization, and API security.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                style={{
                  padding: "6px 14px",
                  borderRadius: TOKENS.radius.xs,
                  border: `1px solid ${selectedCategory === cat ? TOKENS.accent : TOKENS.line}`,
                  backgroundColor: selectedCategory === cat ? TOKENS.accentSubtle : TOKENS.card,
                  color: selectedCategory === cat ? TOKENS.accent : TOKENS.muted,
                  ...TOKENS.type.micro,
                  fontSize: "11px",
                  cursor: "pointer",
                  transition: TOKENS.transition,
                  fontWeight: selectedCategory === cat ? 600 : 500,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Articles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredArticles.map((article) => (
            <TiltCard3D key={article.id} intensity={8} glare={true} style={{ height: "100%" }}>
              <article
                onClick={() => {
                  playClickSound();
                  setActiveArticle(article);
                }}
                style={{
                  height: "100%",
                  backgroundColor: TOKENS.card,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.sm,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: TOKENS.shadow.resting,
                  transition: TOKENS.transition,
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
                <div>
                  {/* Article Eyebrow Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        ...TOKENS.type.micro,
                        fontSize: "10px",
                        color: TOKENS.accent,
                        backgroundColor: TOKENS.accentSubtle,
                        padding: "2px 7px",
                        borderRadius: TOKENS.radius.xs,
                        fontWeight: 600,
                      }}
                    >
                      {article.category}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: TOKENS.muted }}>
                      <Clock size={12} />
                      <span style={{ ...TOKENS.type.micro, fontSize: "11px" }}>{article.readTime}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      ...TOKENS.type.title,
                      fontSize: "17px",
                      color: TOKENS.ink,
                      marginBottom: "10px",
                      lineHeight: 1.35,
                    }}
                  >
                    {article.title}
                  </h3>

                  <p
                    style={{
                      ...TOKENS.type.body,
                      fontSize: "13.5px",
                      color: TOKENS.muted,
                      lineHeight: 1.6,
                      marginBottom: "18px",
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>

                {/* Card Footer: Tags & Read Link */}
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          ...TOKENS.type.micro,
                          fontSize: "10.5px",
                          padding: "2px 6px",
                          borderRadius: TOKENS.radius.xs,
                          backgroundColor: TOKENS.surface,
                          border: `1px solid ${TOKENS.line}`,
                          color: TOKENS.muted,
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      ...TOKENS.type.micro,
                      color: TOKENS.accent,
                      fontWeight: 600,
                      fontSize: "11.5px",
                      paddingTop: "10px",
                      borderTop: `1px solid ${TOKENS.line}`,
                    }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </article>
            </TiltCard3D>
          ))}
        </div>

        {/* Read Article Modal */}
        {activeArticle && (
          <div
            onClick={() => setActiveArticle(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              backgroundColor: "rgba(11, 18, 32, 0.75)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: TOKENS.card,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: TOKENS.radius.sm,
                maxWidth: "760px",
                width: "100%",
                maxHeight: "85vh",
                overflowY: "auto",
                padding: "32px 30px",
                boxShadow: TOKENS.shadow.raised,
                position: "relative",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "32px",
                  height: "32px",
                  borderRadius: TOKENS.radius.xs,
                  border: `1px solid ${TOKENS.line}`,
                  backgroundColor: TOKENS.surface,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: TOKENS.ink,
                  cursor: "pointer",
                }}
                aria-label="Close article modal"
              >
                <X size={16} />
              </button>

              {/* Modal Article Meta */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span
                  style={{
                    ...TOKENS.type.micro,
                    fontSize: "11px",
                    color: TOKENS.accent,
                    backgroundColor: TOKENS.accentSubtle,
                    padding: "3px 8px",
                    borderRadius: TOKENS.radius.xs,
                    fontWeight: 600,
                  }}
                >
                  {activeArticle.category}
                </span>
                <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                  {activeArticle.date} · {activeArticle.readTime}
                </span>
              </div>

              <h2
                style={{
                  ...TOKENS.type.title,
                  fontSize: "clamp(22px, 3vw, 28px)",
                  color: TOKENS.ink,
                  marginBottom: "20px",
                  lineHeight: 1.3,
                }}
              >
                {activeArticle.title}
              </h2>

              {/* Full Article Content */}
              <div
                style={{
                  ...TOKENS.type.body,
                  fontSize: "15px",
                  color: TOKENS.ink,
                  lineHeight: 1.75,
                  whiteSpace: "pre-line",
                  borderTop: `1px solid ${TOKENS.line}`,
                  paddingTop: "20px",
                }}
              >
                {activeArticle.content}
              </div>

              {/* Tags and Author Signoff */}
              <div
                style={{
                  marginTop: "30px",
                  paddingTop: "20px",
                  borderTop: `1px solid ${TOKENS.line}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {activeArticle.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        ...TOKENS.type.micro,
                        fontSize: "11px",
                        padding: "3px 8px",
                        borderRadius: TOKENS.radius.xs,
                        backgroundColor: TOKENS.surface,
                        border: `1px solid ${TOKENS.line}`,
                        color: TOKENS.muted,
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <span style={{ ...TOKENS.type.data, fontSize: "12.5px", color: TOKENS.muted }}>
                  Written by <strong>Mansoor Farooq</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
