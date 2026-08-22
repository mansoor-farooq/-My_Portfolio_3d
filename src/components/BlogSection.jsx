import React, { useState, useMemo } from "react";
import { TOKENS } from "../theme";
import { BookOpen, Clock, Tag, ArrowRight, X, Sparkles, CheckCircle2, Search, Share2, Copy, Check, ChevronRight, User, Calendar } from "lucide-react";
import TiltCard3D from "./TiltCard3D";
import { playClickSound, playSuccessSound } from "../utils/audio";

export const ARTICLES = [
  {
    id: "offline-first-nextjs-sqlite",
    title: "Building Offline-First Web Applications with Next.js and SQLite",
    slug: "offline-first-nextjs-sqlite",
    category: "Architecture",
    featured: true,
    date: "August 2026",
    readTime: "6 min read",
    excerpt:
      "How to architect resilient web applications that function 100% offline using local SQLite stores, browser cache persistence, and background sync queues.",
    content: `### 1. Introduction: The Fragility of Cloud-Only Apps
In emerging markets and industrial environments, network connectivity is notoriously unpredictable. Standard Single Page Applications (SPAs) freeze and display broken screens the moment a connection drops. In this deep dive, we explore the exact architectural blueprint used in production systems like MindVault to guarantee 100% offline uptime.

### 2. The Local-First Storage Hierarchy
Instead of treating remote servers as the primary database, the client application maintains its own high-speed embedded database:
- **Local SQLite / IndexedDB Layer:** Every write operation is committed locally in sub-5ms with zero loading spinners.
- **Append-Only Transaction Log:** Mutations (INSERT, UPDATE, DELETE) are serialized into an immutable transaction journal with cryptographic IDs.
- **Background Sync Engine:** A web worker listens for \`window.addEventListener('online')\` events to synchronize batched changes to the remote PostgreSQL cluster.

\`\`\`javascript
// Example: Resilient Offline Write Dispatcher
async function recordTransaction(payload) {
  const localTx = {
    id: crypto.randomUUID(),
    data: payload,
    timestamp: Date.now(),
    synced: false
  };
  await localDb.transactions.add(localTx);
  if (navigator.onLine) {
    backgroundSyncDispatcher.trigger();
  }
}
\`\`\`

### 3. Conflict Resolution with Vector Clocks
When multiple devices edit identical records offline, race conditions occur. We implement deterministic timestamped vector clocks and custom field-level merge strategies rather than naive Last-Write-Wins (LWW).

### 4. Key Takeaway
Designing for offline-first creates an application that is not only fault-tolerant during blackouts, but also blazingly fast under normal network conditions.`,
    tags: ["Next.js", "SQLite", "Offline-First", "Architecture", "PWA"],
  },
  {
    id: "nextjs-sub-second-lcp",
    title: "Optimizing Next.js 14/15 App Router for Sub-1-Second LCP",
    slug: "nextjs-sub-second-lcp",
    category: "Frontend",
    featured: false,
    date: "August 2026",
    readTime: "5 min read",
    excerpt:
      "Techniques to achieve perfect 100 Lighthouse performance and sub-1s Largest Contentful Paint (LCP) in Next.js applications.",
    content: `### The Performance Imperative
Largest Contentful Paint (LCP) directly dictates whether visitors stay on your web application or bounce. Here is how to achieve consistent sub-1s LCP on real-world 4G networks.

### 1. Server Components at the Root
Keep client component boundaries (\`'use client'\`) restricted to small leaf nodes (like buttons and search inputs). This prevents megabytes of React hydration bundles from blocking browser rendering.

### 2. Modern Asset Optimization
- Use \`next/font\` with self-hosted subsets and \`display: swap\` to eliminate layout shift (CLS).
- Serve images in modern AVIF formats with strict \`priority\` attributes for above-the-fold elements.

### 3. Streaming with Suspense
Wrap data-heavy components in \`<Suspense fallback={<Skeleton />}>\` so the HTML shell streams instantly to the browser within 150ms.`,
    tags: ["Next.js", "Performance", "LCP", "SEO", "React"],
  },
  {
    id: "nodejs-secure-rest-apis",
    title: "Architecting Secure Node.js & Express REST APIs in 2026",
    slug: "nodejs-secure-rest-apis",
    category: "Backend",
    featured: false,
    date: "July 2026",
    readTime: "7 min read",
    excerpt:
      "A comprehensive guide to building hardened Node.js backend services: JWT rotation, rate limiting, SQL injection defense, and input sanitization.",
    content: `### Security By Design
Building enterprise-ready backend APIs requires defensive engineering at every layer.

### 1. Hardened JWT & Refresh Token Rotation
- Store short-lived access tokens (15m validity) in client memory.
- Store refresh tokens in \`httpOnly\`, \`secure\`, \`sameSite=strict\` cookies with automatic family invalidation upon detection of token reuse.

### 2. Input Validation via Zod Schemas
Never trust client payloads. Validate every request body, query parameter, and route parameter before passing to controllers.

### 3. Rate Limiting & Denial-of-Service Shielding
Apply Redis-backed rate limiting on authentication routes (maximum 5 attempts per minute) and use \`helmet\` for strict CSP and HSTS headers.`,
    tags: ["Node.js", "Express", "API Security", "JWT", "Backend"],
  },
  {
    id: "postgresql-indexing-high-concurrency",
    title: "PostgreSQL Indexing & ACID Transactions for High-Concurrency Apps",
    slug: "postgresql-indexing-high-concurrency",
    category: "Database",
    featured: false,
    date: "July 2026",
    readTime: "8 min read",
    excerpt:
      "How to design relational schemas, write optimal B-Tree and GIN indexes, and prevent transaction deadlocks in production PostgreSQL databases.",
    content: `### Scalable Database Architecture
PostgreSQL offers unparalleled ACID reliability, but poor query patterns can quickly saturate CPU and disk I/O.

### Optimization Rules:
- **Composite Index Ordering:** Place high-cardinality equality filter columns first, followed by range or sort columns.
- **Partial Indexes:** Create indexes with \`WHERE is_deleted = false\` to reduce index footprint by up to 80%.
- **Connection Pooling:** Deploy PgBouncer or serverless connection pools to prevent connection exhaustion.`,
    tags: ["PostgreSQL", "Database", "SQL", "ACID", "Backend"],
  },
  {
    id: "react-to-kotlin-compose",
    title: "Transitioning from React Web to Native Android with Jetpack Compose",
    slug: "react-to-kotlin-compose",
    category: "Mobile",
    featured: false,
    date: "June 2026",
    readTime: "6 min read",
    excerpt:
      "A web developer's guide to mastering Kotlin and Jetpack Compose: state management, declarative UI paradigms, and Room local persistence.",
    content: `### Declarative UI Patterns
Web developers accustomed to React's JSX and hooks will find Jetpack Compose exceptionally intuitive.

### Core Parallels:
- React \`useState()\` -> Compose \`remember { mutableStateOf() }\`
- React Props -> Composable function parameters
- React Context -> \`CompositionLocalProvider\`

### Why Choose Native Kotlin:
Native Android code provides direct hardware access (Bluetooth, barcode hardware scanners, offline SQLite Room database) without the bridging overhead and memory consumption of cross-platform runtimes.`,
    tags: ["Kotlin", "Android", "Jetpack Compose", "Mobile"],
  },
  {
    id: "framer-motion-60fps-web",
    title: "Building Silky 60FPS UI Animations with Framer Motion",
    slug: "framer-motion-60fps-web",
    category: "Frontend",
    featured: false,
    date: "June 2026",
    readTime: "5 min read",
    excerpt:
      "Mastering hardware-accelerated transforms, spring physics, and layout animations to create ultra-responsive web experiences.",
    content: `### Hardware Acceleration Principles
Browser animations should strictly target GPU-accelerated CSS properties: \`transform\` (translate, scale, rotate) and \`opacity\`.

### Avoiding Layout Thrashing:
Animating properties like \`height\` or \`margin\` triggers CPU reflow cycles. Use Framer Motion's \`layoutId\` and \`transformOrigin\` to achieve smooth morphing transitions without triggering layout calculation bottlenecks.`,
    tags: ["Framer Motion", "UI Animation", "React", "UX"],
  },
  {
    id: "custom-web-apps-vs-wordpress",
    title: "Why Custom Full-Stack Web Apps Outperform WordPress & Low-Code in 2026",
    slug: "custom-web-apps-vs-wordpress",
    category: "Architecture",
    featured: false,
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "Comparing bespoke Next.js/Node.js web applications against template-based platforms for speed, security, scalability, and long-term ROI.",
    content: `### The Hidden Cost of Templates
While WordPress and no-code tools provide fast initial setups, they accumulate significant security and speed bottlenecks as businesses scale.

### Custom Next.js Advantages:
- **Zero Third-Party Plugin Bloat:** 100% clean code that loads in under 1.5 seconds.
- **Superior Security Posture:** No vulnerable plugin ecosystems that hackers routinely target.
- **Unlimited Scalability:** Freedom to build bespoke ERP, portal, or SaaS logic tailored to real workflows.`,
    tags: ["Full-Stack", "Next.js", "Web Development", "Business"],
  },
  {
    id: "double-entry-ledger-postgresql",
    title: "Designing a Fault-Tolerant Double-Entry Accounting Ledger in PostgreSQL",
    slug: "double-entry-ledger-postgresql",
    category: "Database",
    featured: false,
    date: "May 2026",
    readTime: "8 min read",
    excerpt:
      "Architecting immutable financial records, credit/debit transaction constraints, and zero-sum verification in relational databases.",
    content: `### The Zero-Sum Invariant
In true double-entry bookkeeping, money cannot be created or destroyed—it merely transfers between accounts. Every transaction must enforce \`SUM(debits) = SUM(credits)\`.

### Database Architecture:
1. **Append-Only Architecture:** Transactions are never updated or deleted. Reversals must be recorded as distinct compensating entries.
2. **Atomic Commits:** Both debit and credit legs must be committed within an atomic SQL transaction (\`BEGIN ... COMMIT\`).`,
    tags: ["PostgreSQL", "FinTech", "Ledger", "ACID"],
  },
  {
    id: "real-time-api-health-monitor",
    title: "How to Build a Real-Time API Uptime & Latency Telemetry Dashboard",
    slug: "real-time-api-health-monitor",
    category: "Backend",
    featured: false,
    date: "April 2026",
    readTime: "6 min read",
    excerpt:
      "Creating lightweight continuous endpoint monitoring services with automated alerting, latency wave charts, and incident logging.",
    content: `### Proactive Telemetry
Detecting backend service outages before end-users notice is the hallmark of modern software engineering.

### System Components:
- **Health Check Daemon:** Asynchronous Node.js cron workers pinging REST microservices every 30s.
- **Latency Analytics:** Calculating rolling p95 and p99 response times.
- **Automated Incident Logs:** Storing timestamped failure logs and HTTP status codes in PostgreSQL.`,
    tags: ["Node.js", "DevOps", "Monitoring", "Telemetry"],
  },
  {
    id: "dark-mode-wcag-aaa-contrast",
    title: "Designing High-Converting Dark Mode UI with WCAG AAA Contrast",
    slug: "dark-mode-wcag-aaa-contrast",
    category: "Frontend",
    featured: false,
    date: "April 2026",
    readTime: "5 min read",
    excerpt:
      "Design principles for dark mode interfaces: avoiding pure #000000 black, elevation through surface lightness, and accessible typography ratios.",
    content: `### Elevation & Optical Comfort
True dark mode luxury is defined by surface depth, not pure pitch black.
- Use dark slate backgrounds (\`#0B1220\` or \`#0F172A\`) rather than \`#000000\` to prevent harsh contrast glare.
- Elevate cards and modals with slightly lighter surface tones and subtle 1px border highlights.`,
    tags: ["UI/UX", "Accessibility", "Design", "CSS"],
  },
  {
    id: "pwa-service-worker-caching",
    title: "Progressive Web Apps in 2026: Service Worker Caching Strategies",
    slug: "pwa-service-worker-caching",
    category: "Architecture",
    featured: false,
    date: "March 2026",
    readTime: "7 min read",
    excerpt:
      "Deep dive into Cache-First, Network-First, and Stale-While-Revalidate service worker caching strategies for lightning-fast PWAs.",
    content: `### Precision Cache Routing
A well-configured service worker acts as a local proxy that eliminates network latency for static resources.

### Strategy Matrix:
- **Static Assets:** \`Cache-First\` for hashed JS, CSS, and fonts.
- **API Payloads:** \`Stale-While-Revalidate\` to provide instant UI rendering while syncing fresh data in background.`,
    tags: ["PWA", "Service Workers", "Caching", "Performance"],
  },
  {
    id: "web-vitals-100-lighthouse",
    title: "The 2026 Web Vitals & 100/100 Lighthouse Performance Blueprint",
    slug: "web-vitals-100-lighthouse",
    category: "Frontend",
    featured: false,
    date: "March 2026",
    readTime: "6 min read",
    excerpt:
      "Step-by-step audit checklist to eliminate render-blocking resources, minimize main-thread work, and maximize Core Web Vitals scores.",
    content: `### Passing Core Web Vitals
Search engines heavily penalize sluggish websites. Achieve full 100 Lighthouse scores by:
1. Eliminating unused third-party scripts.
2. Inlining critical CSS while loading non-critical stylesheets asynchronously.
3. Reserving explicit aspect-ratio space for all media to prevent Cumulative Layout Shift (CLS).`,
    tags: ["SEO", "Performance", "Web Vitals", "Lighthouse"],
  },
];

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ["All", "Architecture", "Frontend", "Backend", "Database", "Mobile"];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  const handleCopyShare = () => {
    playClickSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      id="blog"
      style={{
        backgroundColor: TOKENS.surface,
        paddingTop: "90px",
        paddingBottom: "90px",
        borderBottom: `1px solid ${TOKENS.line}`,
        position: "relative",
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
        <div style={{ marginBottom: "36px" }}>
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
              05 // TECHNICAL INSIGHTS & ENGINEERING BLOG
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
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
              <p style={{ ...TOKENS.type.body, color: TOKENS.muted, maxWidth: "620px" }}>
                12 in-depth architectural guides written for engineers, founders, and technical leaders.
              </p>
            </div>

            {/* Live Search Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 14px",
                backgroundColor: TOKENS.card,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: TOKENS.radius.sm,
                width: "100%",
                maxWidth: "320px",
                boxShadow: TOKENS.shadow.resting,
              }}
            >
              <Search size={16} color={TOKENS.muted} />
              <input
                type="text"
                placeholder="Search articles, keywords, stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "13.5px",
                  color: TOKENS.ink,
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.muted }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "16px",
            marginBottom: "32px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat);
              }}
              style={{
                padding: "7px 16px",
                borderRadius: TOKENS.radius.xs,
                border: `1px solid ${selectedCategory === cat ? TOKENS.accent : TOKENS.line}`,
                backgroundColor: selectedCategory === cat ? TOKENS.accent : TOKENS.card,
                color: selectedCategory === cat ? "#FFFFFF" : TOKENS.muted,
                ...TOKENS.type.micro,
                fontSize: "12px",
                cursor: "pointer",
                transition: TOKENS.transition,
                fontWeight: selectedCategory === cat ? 600 : 500,
                boxShadow: selectedCategory === cat ? "0 4px 12px rgba(2, 132, 199, 0.25)" : TOKENS.shadow.resting,
                whiteSpace: "nowrap",
              }}
            >
              {cat} {cat === "All" && `(${ARTICLES.length})`}
            </button>
          ))}
        </div>

        {/* 1. Featured Big Publication Banner (When viewing All and no search) */}
        {selectedCategory === "All" && !searchQuery && (
          <TiltCard3D intensity={6} glare={true} style={{ marginBottom: "28px" }}>
            <div
              onClick={() => {
                playClickSound();
                setActiveArticle(featuredArticle);
              }}
              style={{
                backgroundColor: "#0B1220",
                color: "#FFFFFF",
                borderRadius: TOKENS.radius.sm,
                padding: "32px 30px",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: "28px",
                alignItems: "center",
                boxShadow: TOKENS.shadow.raised,
                border: `1px solid rgba(255, 255, 255, 0.1)`,
              }}
              className="featured-banner-grid"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "10px",
                      color: "#38BDF8",
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      padding: "3px 8px",
                      borderRadius: TOKENS.radius.xs,
                      fontWeight: 700,
                    }}
                  >
                    ★ FEATURED PUBLICATION
                  </span>
                  <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "11px" }}>·</span>
                  <span style={{ ...TOKENS.type.micro, color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>
                    {featuredArticle.date} · {featuredArticle.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    ...TOKENS.type.title,
                    fontSize: "clamp(20px, 2.5vw, 26px)",
                    color: "#FFFFFF",
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}
                >
                  {featuredArticle.title}
                </h3>

                <p
                  style={{
                    ...TOKENS.type.body,
                    fontSize: "14px",
                    color: "#94A3B8",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {featuredArticle.excerpt}
                </p>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#38BDF8",
                    ...TOKENS.type.data,
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <span>Read Complete Engineering Architecture</span>
                  <ArrowRight size={15} />
                </div>
              </div>

              {/* Banner Right Tech Spec */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: TOKENS.radius.xs,
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div style={{ ...TOKENS.type.micro, fontSize: "11px", color: "#38BDF8" }}>
                  KEY ARCHITECTURAL HIGHLIGHTS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Sub-5ms Local SQLite Reads/Writes", "Vector Clock Conflict Resolution", "Background PWA Sync Dispatcher"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={14} color="#38BDF8" />
                      <span style={{ ...TOKENS.type.data, fontSize: "12.5px", color: "#E2E8F0" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard3D>
        )}

        {/* 2. Article Grid (All Articles) */}
        {filteredArticles.length === 0 ? (
          <div
            style={{
              padding: "48px 20px",
              textAlign: "center",
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.line}`,
              borderRadius: TOKENS.radius.sm,
            }}
          >
            <BookOpen size={32} color={TOKENS.muted} style={{ marginBottom: "12px" }} />
            <div style={{ ...TOKENS.type.title, fontSize: "18px", color: TOKENS.ink, marginBottom: "6px" }}>
              No articles found matching "{searchQuery}"
            </div>
            <p style={{ ...TOKENS.type.body, color: TOKENS.muted, fontSize: "14px" }}>
              Try searching for terms like Next.js, SQLite, Security, Kotlin, or PostgreSQL.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "22px",
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
                    padding: "24px 22px",
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
                          fontSize: "10.5px",
                          color: TOKENS.accent,
                          backgroundColor: TOKENS.accentSubtle,
                          padding: "2px 8px",
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
                        fontSize: "18px",
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
                      {article.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          style={{
                            ...TOKENS.type.micro,
                            fontSize: "10.5px",
                            padding: "2px 7px",
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
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: `1px solid ${TOKENS.line}`,
                      }}
                    >
                      <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11px" }}>
                        {article.date}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          ...TOKENS.type.micro,
                          color: TOKENS.accent,
                          fontWeight: 600,
                          fontSize: "11.5px",
                        }}
                      >
                        <span>Read Article</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard3D>
            ))}
          </div>
        )}

        {/* 3. Publication Full-Screen Interactive Reader Modal */}
        {activeArticle && (
          <div
            onClick={() => setActiveArticle(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(11, 18, 32, 0.8)",
              backdropFilter: "blur(12px)",
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
                maxWidth: "820px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "36px 34px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                position: "relative",
              }}
            >
              {/* Modal Top Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: `1px solid ${TOKENS.line}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      ...TOKENS.type.micro,
                      fontSize: "11px",
                      color: TOKENS.accent,
                      backgroundColor: TOKENS.accentSubtle,
                      padding: "3px 9px",
                      borderRadius: TOKENS.radius.xs,
                      fontWeight: 600,
                    }}
                  >
                    {activeArticle.category}
                  </span>
                  <span style={{ ...TOKENS.type.micro, color: TOKENS.muted, fontSize: "11.5px" }}>
                    {activeArticle.date} · {activeArticle.readTime}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={handleCopyShare}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 12px",
                      borderRadius: TOKENS.radius.xs,
                      border: `1px solid ${TOKENS.line}`,
                      backgroundColor: TOKENS.surface,
                      color: TOKENS.ink,
                      ...TOKENS.type.micro,
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    {copiedLink ? <Check size={13} color={TOKENS.success} /> : <Share2 size={13} />}
                    <span>{copiedLink ? "LINK COPIED" : "SHARE"}</span>
                  </button>

                  <button
                    onClick={() => setActiveArticle(null)}
                    style={{
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
                </div>
              </div>

              {/* Title */}
              <h1
                style={{
                  ...TOKENS.type.title,
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  color: TOKENS.ink,
                  marginBottom: "16px",
                  lineHeight: 1.25,
                }}
              >
                {activeArticle.title}
              </h1>

              {/* Author & Profile Anchor */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "28px",
                  padding: "12px 14px",
                  backgroundColor: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: TOKENS.radius.xs,
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: TOKENS.ink,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  MF
                </div>
                <div>
                  <div style={{ ...TOKENS.type.data, fontSize: "13.5px", fontWeight: 600, color: TOKENS.ink }}>
                    Mansoor Farooq
                  </div>
                  <div style={{ ...TOKENS.type.micro, fontSize: "11px", color: TOKENS.muted }}>
                    Full-Stack Developer & InfoTech Solutions Engineer · Karachi
                  </div>
                </div>
              </div>

              {/* Full Publication Body */}
              <div
                style={{
                  ...TOKENS.type.body,
                  fontSize: "15.5px",
                  color: TOKENS.ink,
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                }}
              >
                {activeArticle.content}
              </div>

              {/* Footer Tags */}
              <div
                style={{
                  marginTop: "36px",
                  paddingTop: "24px",
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
                        padding: "3px 9px",
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

                <a
                  href="#contact"
                  onClick={() => setActiveArticle(null)}
                  style={{
                    ...TOKENS.type.data,
                    fontSize: "13px",
                    color: TOKENS.accent,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Discuss this architecture with Mansoor →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .featured-banner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
