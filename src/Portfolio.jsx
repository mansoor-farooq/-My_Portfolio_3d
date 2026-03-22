import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react"

import logo from "./image/mansoor_professional.jpg"
// ── Single Premium Light Theme ─────────────────────────────────────────────────
const TH = {
  bg: "#F7F5F0",
  bgAlt: "#FFFFFF",
  card: "#FFFFFF",
  cardBorder: "rgba(16,56,40,0.08)",
  cardShadow: "rgba(16,56,40,0.06)",
  navBg: "rgba(247,245,240,0.94)",
  text: "#0D1F16",
  textSub: "#3A5044",
  textMuted: "#7A9087",
  accent: "#0C6E4E",
  accentLight: "rgba(12,110,78,0.08)",
  accentMid: "rgba(12,110,78,0.18)",
  gold: "#B8873A",
  goldLight: "rgba(184,135,58,0.1)",
  green: "#12A066",
  greenLight: "rgba(18,160,102,0.1)",
  red: "#C0453A",
  border: "rgba(16,56,40,0.1)",
  borderMid: "rgba(12,110,78,0.22)",
  shadow: "rgba(16,40,28,0.07)",
  shadowLg: "rgba(16,40,28,0.13)",
  grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
};

// ── Data ────────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "React.js", icon: "⚛️", level: 95, color: "#0C6E4E", cat: "Frontend" },
  { name: "Next.js", icon: "▲", level: 90, color: "#6366F1", cat: "Frontend" },
  { name: "JavaScript", icon: "JS", level: 93, color: "#B8873A", cat: "Frontend" },
  { name: "TypeScript", icon: "TS", level: 82, color: "#3B82F6", cat: "Frontend" },
  { name: "Node.js", icon: "🟢", level: 88, color: "#12A066", cat: "Backend" },
  { name: "Express.js", icon: "🚂", level: 87, color: "#0C6E4E", cat: "Backend" },
  { name: "PostgreSQL", icon: "🐘", level: 84, color: "#3B82F6", cat: "Backend" },
  { name: "ASP.NET Core", icon: "🔷", level: 80, color: "#7C3AED", cat: "Backend" },
  { name: "C#", icon: "C#", level: 78, color: "#9333EA", cat: "Backend" },
  { name: "Prompt Eng.", icon: "🤖", level: 92, color: "#0C6E4E", cat: "AI" },
  { name: "YOLO / CV", icon: "👁️", level: 80, color: "#C0453A", cat: "AI" },
  { name: "Grok & Gemini", icon: "✨", level: 85, color: "#B8873A", cat: "AI" },
  { name: "Ollama LLMs", icon: "🦙", level: 83, color: "#7C3AED", cat: "AI" },
  { name: "Kotlin", icon: "🎯", level: 72, color: "#6366F1", cat: "Mobile" },
  { name: "Pen. Testing", icon: "🔓", level: 75, color: "#C0453A", cat: "Security" },
  { name: "Network Security", icon: "🛡️", level: 70, color: "#B8873A", cat: "Security" },
  { name: "Kali Linux", icon: "🐉", level: 72, color: "#475569", cat: "Security" },
];

const PROJECTS = [
  { title: "LLM Backend + Analyzer", icon: "🤖", tag: "AI", color: "#0C6E4E", stars: 1, desc: "AI backend integrating Ollama, Grok & Gemini with a real-time analysis engine and prompt engineering pipeline.", tech: ["Node.js", "Ollama", "Grok", "Gemini"], link: "https://github.com/mansoor-farooq/LLM_Backend_With_Analizer" },
  { title: "Gate Pass System", icon: "🔐", tag: "Enterprise", color: "#7C3AED", stars: 1, desc: "Enterprise gate pass management — QR code generation, real-time tracking, and role-based access control.", tech: ["React.js", "JavaScript", "REST API"], link: "https://github.com/mansoor-farooq/gate-pass-frontend" },
  { title: "E-Commerce Mobile App", icon: "📱", tag: "Mobile", color: "#6366F1", stars: 2, desc: "Full-featured Android shopping app — catalog, cart, payments, order tracking, and push notifications.", tech: ["Kotlin", "Android", "REST API", "PostgreSQL"], link: "https://github.com/mansoor-farooq" },
  { title: "Todo & Task Manager", icon: "✅", tag: "Web App", color: "#12A066", stars: 1, desc: "React todo app with drag-and-drop reordering, categories, priorities, due dates, and real-time sync.", tech: ["React.js", "Node.js", "PostgreSQL", "Express"], link: "https://github.com/mansoor-farooq" },
  { title: "Sales & Image Manager", icon: "🛒", tag: "Full Stack", color: "#B8873A", stars: 0, desc: "Full-stack sales management — Multer image uploads, product catalog, inventory dashboard.", tech: ["Node.js", "Express", "PostgreSQL", "Multer"], link: "https://github.com/mansoor-farooq/sd-app-backend-updated" },
  { title: "React Backend Journey", icon: "⚛️", tag: "Learning", color: "#3B82F6", stars: 1, desc: "Real-world full-stack patterns: JWT auth, API design, state management with Context and Redux.", tech: ["React.js", "Node.js", "Express"], link: "https://github.com/mansoor-farooq/reactbackend" },
  { title: "Penetration Testing Toolkit", icon: "🔓", tag: "Security", color: "#C0453A", stars: 1, desc: "Custom scripts for network scanning, vulnerability assessment, and automated security reporting.", tech: ["Python", "Kali Linux", "Metasploit", "Nmap"], link: "https://github.com/mansoor-farooq" },
  { title: "ASP.NET Core API", icon: "🔷", tag: "Backend", color: "#9333EA", stars: 1, desc: "Production-ready C# REST API with Entity Framework, JWT auth, Swagger docs, clean architecture.", tech: ["C#", "ASP.NET Core", ".NET", "SQL"], link: "https://github.com/mansoor-farooq/mansoor_test_app" },
];

const EXPERIENCE = [
  { company: "Infotech Solution", role: "Full Stack Web Developer", period: "2025 — Present", active: true, color: "#0C6E4E", icon: "💼", desc: "Building production web apps with React, Next.js, Node.js & PostgreSQL. Developing AI-powered features with Grok, Gemini & Ollama." },
  { company: "Youngs Private Limited", role: "Software Dev — MTO Training", period: "2024", active: false, color: "#7C3AED", icon: "🎓", desc: "Enterprise training at Youngs Pvt Ltd. Built real-world apps using React, ASP.NET Core, C#, and SQL databases." },
  { company: "Cybersecurity Training", role: "Penetration Tester (Self-Trained)", period: "2023 — 2024", active: false, color: "#C0453A", icon: "🔒", desc: "Hands-on penetration testing — network scanning, vulnerability assessment, Kali Linux, Metasploit, ethical hacking fundamentals." },
];

// ─── MANSOOR CHARACTER ────────────────────────────────────────────────────────
function MansoorChar({ section = "home", mini = false }) {
  const [tick, setTick] = useState(0);
  const [blink, setBlink] = useState(false);
  const [wave, setWave] = useState(false);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 45); return () => clearInterval(id); }, []);
  useEffect(() => { const id = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 130); }, 3800); return () => clearInterval(id); }, []);
  useEffect(() => { if (section === "home" || section === "contact") { setWave(true); setTimeout(() => setWave(false), 2600); } }, [section]);
  const a = tick * 0.038;
  const fy = Math.sin(a) * (mini ? 3 : 6);
  const fx = Math.cos(a * 0.7) * (mini ? 1.2 : 2.2);
  const smiles = { home: "M58 138 Q70 150 82 138", about: "M60 139 Q70 147 80 139", skills: "M57 137 Q70 152 83 137", projects: "M56 136 Q70 153 84 136", contact: "M58 138 Q70 150 82 138" };
  const smile = smiles[section] || smiles.home;
  const W = mini ? 82 : 162; const H = mini ? 102 : 200;
  return (
    <svg viewBox="0 0 162 200" width={W} height={H} style={{ filter: `drop-shadow(0 4px ${mini ? 10 : 24}px rgba(12,110,78,0.22)) drop-shadow(0 2px 8px rgba(0,0,0,0.08))`, display: "block", overflow: "visible" }}>
      <defs>
        <radialGradient id="sk2" cx="44%" cy="34%" r="66%"><stop offset="0%" stopColor="#d89870" /><stop offset="55%" stopColor="#c07848" /><stop offset="100%" stopColor="#a86230" /></radialGradient>
        <radialGradient id="hr2" cx="50%" cy="18%" r="70%"><stop offset="0%" stopColor="#1c0c04" /><stop offset="100%" stopColor="#060200" /></radialGradient>
        <linearGradient id="hd2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0c1c1c" /><stop offset="100%" stopColor="#050e0f" /></linearGradient>
        <radialGradient id="gl2" cx="50%" cy="55%" r="55%"><stop offset="0%" stopColor="#00ee80" stopOpacity="0.1" /><stop offset="100%" stopColor="#00e8c8" stopOpacity="0" /></radialGradient>
      </defs>
      <g transform={`translate(${fx},${fy})`}>
        <ellipse cx="81" cy="118" rx="64" ry="72" fill="url(#gl2)" />
        <path d="M38 150 Q20 158 16 180 Q13 194 17 200 L145 200 Q149 194 146 180 Q142 158 124 150 L110 142 Q81 158 52 142 Z" fill="url(#hd2)" stroke="rgba(12,110,78,0.15)" strokeWidth="1" />
        <path d="M52 144 Q28 155 20 176 Q17 186 22 190" stroke="#c07848" strokeWidth="17" fill="none" strokeLinecap="round" />
        <ellipse cx="20" cy="195" rx="11" ry="7" fill="#d89870" />
        <g style={{ transformOrigin: "110px 144px", animation: wave ? "MWv2 0.46s ease-in-out 4" : "none" }}>
          <path d="M110 144 Q134 155 142 176 Q145 186 140 190" stroke="#c07848" strokeWidth="17" fill="none" strokeLinecap="round" />
          <ellipse cx="142" cy="195" rx="11" ry="7" fill="#d89870" />
        </g>
        <rect x="73" y="116" width="16" height="20" rx="5" fill="#c07848" />
        <ellipse cx="81" cy="72" rx="43" ry="47" fill="url(#sk2)" />
        <ellipse cx="81" cy="33" rx="41" ry="17" fill="url(#hr2)" />
        <path d="M39 57 Q43 30 62 24 Q81 17 101 24 Q119 30 123 57 Q113 36 81 34 Q49 36 39 57" fill="url(#hr2)" />
        <path d="M39 60 Q34 75 39 98" stroke="#0c0602" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M123 60 Q128 75 123 98" stroke="#0c0602" strokeWidth="12" fill="none" strokeLinecap="round" />
        <ellipse cx="38" cy="72" rx="9" ry="12" fill="#c07848" />
        <ellipse cx="124" cy="72" rx="9" ry="12" fill="#c07848" />
        <path d="M54 53 Q65 48 77 51" stroke="#1e0a02" strokeWidth="3.8" fill="none" strokeLinecap="round" />
        <path d="M85 51 Q97 48 108 53" stroke="#1e0a02" strokeWidth="3.8" fill="none" strokeLinecap="round" />
        <ellipse cx="65" cy="67" rx="9.5" ry={blink ? 0.6 : 9} fill="#f4eeea" style={{ transition: "ry 0.05s" }} />
        <ellipse cx="97" cy="67" rx="9.5" ry={blink ? 0.6 : 9} fill="#f4eeea" style={{ transition: "ry 0.05s" }} />
        {!blink && (<><ellipse cx="65" cy="68" rx="5.8" ry="5.8" fill="#3e2008" /><ellipse cx="97" cy="68" rx="5.8" ry="5.8" fill="#3e2008" /><ellipse cx="65" cy="68" rx="3.2" ry="3.2" fill="#0c0604" /><ellipse cx="97" cy="68" rx="3.2" ry="3.2" fill="#0c0604" /><ellipse cx="67" cy="65.5" rx="1.5" ry="1.5" fill="rgba(255,255,255,0.92)" /><ellipse cx="99" cy="65.5" rx="1.5" ry="1.5" fill="rgba(255,255,255,0.92)" /></>)}
        <rect x="51" y="57" width="29" height="21" rx="5.5" fill="rgba(210,240,255,0.08)" stroke="rgba(220,240,255,0.75)" strokeWidth="1.9" />
        <rect x="82" y="57" width="29" height="21" rx="5.5" fill="rgba(210,240,255,0.08)" stroke="rgba(220,240,255,0.75)" strokeWidth="1.9" />
        <line x1="80" y1="67" x2="82" y2="67" stroke="rgba(220,240,255,0.75)" strokeWidth="1.9" />
        <line x1="51" y1="67" x2="38" y2="69" stroke="rgba(220,240,255,0.55)" strokeWidth="1.5" />
        <line x1="111" y1="67" x2="124" y2="69" stroke="rgba(220,240,255,0.55)" strokeWidth="1.5" />
        <path d={smile} stroke="#a05030" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>
      <style>{`@keyframes MWv2{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-24deg)}75%{transform:rotate(12deg)}}`}</style>
    </svg>
  );
}

// ─── SCROLL COMPANION ─────────────────────────────────────────────────────────
function ScrollCompanion({ section }) {
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [msgKey, setMsgKey] = useState(0);
  const [prevSec, setPrevSec] = useState(null);
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setTimeout(() => setShow(true), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 50); return () => clearInterval(id); }, []);
  useEffect(() => { if (prevSec !== section) { setPrevSec(section); setMsgKey(k => k + 1); } }, [section]);
  const msgs = { home: ["Hey! I'm Mansoor 👋", "Full Stack Dev · Karachi 🇵🇰"], about: ["Trained @ Youngs 🎓", "Now @ Infotech Solution 💼"], skills: ["React · AI · Node.js", "Security & more! 🔥"], projects: ["8+ real projects!", "Check GitHub 🐙"], contact: ["Let's build something", "amazing together! 🚀"] };
  const [l1, l2] = msgs[section] || msgs.home;
  const float = Math.sin(tick * 0.055) * 3.5;
  return (
    <div style={{ position: "fixed", right: 20, bottom: 24, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(80px)", transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: "none" }}>
      {!collapsed && (
        <div key={msgKey} style={{ background: "#FFFFFF", border: `1px solid ${TH.borderMid}`, borderRadius: "18px 18px 4px 18px", padding: "12px 16px", maxWidth: 200, boxShadow: `0 8px 32px ${TH.shadowLg}, 0 1px 4px ${TH.shadow}`, animation: "CbPop2 0.45s cubic-bezier(0.34,1.56,0.64,1) both", pointerEvents: "auto" }}>
          <p style={{ color: TH.text, fontSize: 12.5, lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, margin: "0 0 2px" }}>{l1}</p>
          <p style={{ color: TH.textSub, fontSize: 11.5, lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif", fontWeight: 400, margin: 0 }}>{l2}</p>
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            {[0, 1, 2].map(i => (<span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: TH.accent, display: "inline-block", animation: `Cdot2 1.3s ${i * 0.22}s ease-in-out infinite` }} />))}
          </div>
        </div>
      )}
      <div style={{ position: "relative", cursor: "pointer", pointerEvents: "auto", transform: `translateY(${float}px)`, transition: "transform 0.08s ease-out" }} onClick={() => setCollapsed(c => !c)}>
        <div style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", width: 80, height: 14, background: `radial-gradient(ellipse, ${TH.accent}30 0%, transparent 70%)`, filter: "blur(6px)", borderRadius: "50%" }} />
        <div style={{ width: 96, height: 108, borderRadius: "50% 50% 50% 50% / 46% 46% 54% 54%", background: "linear-gradient(160deg,#FAFEFB,#F0F8F4)", border: `1.5px solid ${TH.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", boxShadow: `0 8px 28px ${TH.shadowLg}, 0 0 0 3px ${TH.accentLight}` }}>
          <MansoorChar section={section} mini />
        </div>
        <div style={{ position: "absolute", bottom: 6, right: 5, width: 11, height: 11, borderRadius: "50%", background: TH.green, border: "2.5px solid #F7F5F0", animation: "CsP2 1.9s ease-in-out infinite", boxShadow: `0 0 8px ${TH.green}` }} />
        <div style={{ position: "absolute", top: -2, right: -2, width: 18, height: 18, borderRadius: "50%", background: "#FFFFFF", border: `1px solid ${TH.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: TH.accent, fontWeight: 700 }}>{collapsed ? "+" : "−"}</div>
      </div>
      <style>{`
        @keyframes CsP2{0%,100%{box-shadow:0 0 0 0 rgba(18,160,102,.6)}50%{box-shadow:0 0 0 6px rgba(18,160,102,0)}}
        @keyframes CbPop2{0%{opacity:0;transform:scale(.82) translateY(12px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes Cdot2{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-5px);opacity:1}}
      `}</style>
    </div>
  );
}

// ─── HERO CHARACTER ────────────────────────────────────────────────────────────
function HeroChar() {
  const [tick, setTick] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef();
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 42); return () => clearInterval(id); }, []);
  useEffect(() => {
    const fn = (e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); setMouse({ x: ((e.clientX - r.left - r.width / 2) / r.width) * 2, y: ((e.clientY - r.top - r.height / 2) / r.height) * 2 }); };
    window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn);
  }, []);
  const a = tick * 0.036;
  const fy = Math.sin(a) * 10; const fx = Math.cos(a * 0.6) * 4;
  const badges = [
    { x: "2%", y: "18%", t: "⚛️ React", c: "#0C6E4E", d: "0s" },
    { x: "74%", y: "12%", t: "▲ Next.js", c: "#6366F1", d: "0.5s" },
    { x: "-2%", y: "60%", t: "🤖 AI", c: "#0C6E4E", d: "0.9s" },
    { x: "80%", y: "58%", t: "🦙 LLM", c: "#7C3AED", d: "0.25s" },
    { x: "14%", y: "0%", t: "JS", c: "#B8873A", d: "1.1s" },
    { x: "74%", y: "0%", t: "🔓 Sec", c: "#C0453A", d: "0.65s" },
  ];
  return (
    <div ref={ref} style={{ position: "relative", width: 290, height: 340 }}>
      {[0, 1].map(i => (<div key={i} style={{ position: "absolute", top: i * 22, left: i * 22, right: i * 22, bottom: i * 22, borderRadius: "50%", border: `1px solid ${TH.accent}${["20", "0C"][i]}`, animation: `HOr2_${i} ${10 + i * 5}s linear infinite` }} />))}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle at 50% 60%, ${TH.greenLight} 0%, transparent 65%)`, animation: "HgP2 3.5s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `rotateY(${mouse.x * 12}deg) rotateX(${-mouse.y * 8}deg) translateY(${fy}px) translateX(${fx}px)`, transition: "transform 0.12s ease-out", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MansoorChar section="home" />
      </div>
      <div style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", width: 120, height: 18, background: `radial-gradient(ellipse, ${TH.accent}25 0%, transparent 70%)`, filter: "blur(8px)", borderRadius: "50%" }} />
      {badges.map((b, i) => (<div key={i} style={{ position: "absolute", left: b.x, top: b.y, padding: "4px 12px", background: "#FFFFFF", border: `1px solid ${b.c}28`, borderRadius: 9, color: b.c, fontSize: 10.5, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, animation: `HFl2_${i % 3} ${3.2 + i * 0.4}s ${b.d} ease-in-out infinite`, zIndex: 5, boxShadow: `0 4px 18px ${b.c}14, 0 1px 4px rgba(0,0,0,0.06)` }}>{b.t}</div>))}
      <div style={{ position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 7, padding: "7px 18px", background: "#FFFFFF", border: `1px solid ${TH.borderMid}`, borderRadius: 100, whiteSpace: "nowrap", boxShadow: `0 6px 22px ${TH.shadowLg}` }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: TH.green, animation: "HsP2 1.6s infinite", display: "block", boxShadow: `0 0 6px ${TH.green}` }} />
        <span style={{ color: TH.accent, fontSize: 9.5, fontFamily: "'DM Mono',monospace", fontWeight: 600, letterSpacing: "0.1em" }}>ONLINE · BUILDING</span>
      </div>
      <style>{`
        @keyframes HOr2_0{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes HOr2_1{from{transform:rotate(120deg)}to{transform:rotate(480deg)}}
        @keyframes HFl2_0{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes HFl2_1{0%,100%{transform:translateY(-4px)}50%{transform:translateY(6px)}}
        @keyframes HFl2_2{0%,100%{transform:translateY(3px) rotate(-3deg)}50%{transform:translateY(-6px) rotate(3deg)}}
        @keyframes HgP2{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes HsP2{0%,100%{box-shadow:0 0 0 0 rgba(18,160,102,.65)}50%{box-shadow:0 0 0 6px rgba(18,160,102,0)}}
      `}</style>
    </div>
  );
}

// ─── Typing hook ──────────────────────────────────────────────────────────────
function useTyping(texts, spd = 72) {
  const [d, setD] = useState(""); const [ti, setTi] = useState(0); const [ci, setCi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[ti]; let t;
    if (!del && ci <= cur.length) { t = setTimeout(() => { setD(cur.slice(0, ci)); setCi(c => c + 1); }, spd); }
    else if (!del) { t = setTimeout(() => setDel(true), 2000); }
    else if (del && ci > 0) { t = setTimeout(() => { setD(cur.slice(0, ci - 1)); setCi(c => c - 1); }, spd / 2.2); }
    else { setDel(false); setTi(t => (t + 1) % texts.length); }
    return () => clearTimeout(t);
  }, [ci, del, ti, texts, spd]);
  return d;
}

// ─── Skill Card ──────────────────────────────────────────────────────────────
function SkillCard({ s, delay }) {
  const [on, setOn] = useState(false);
  const ref = useRef();
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.2 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return (
    <div ref={ref} style={{ padding: "18px 20px", background: TH.card, border: `1px solid ${TH.cardBorder}`, borderRadius: 16, animation: `fadeUp 0.5s ${delay}s both`, transition: "all 0.25s ease", boxShadow: `0 2px 8px ${TH.shadow}` }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 14px 36px ${TH.shadowLg}`; e.currentTarget.style.borderColor = s.color + "45"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 2px 8px ${TH.shadow}`; e.currentTarget.style.borderColor = TH.cardBorder; }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
        <span style={{ color: TH.text, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{s.icon} {s.name}</span>
        <span style={{ color: s.color, fontSize: 11.5, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>{s.level}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(0,0,0,0.06)", borderRadius: 100, overflow: "hidden" }}>
        <div style={{ height: "100%", width: on ? `${s.level}%` : "0%", background: `linear-gradient(90deg,${s.color}80,${s.color})`, borderRadius: 100, transition: "width 1.5s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${s.color}40` }} />
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const [sc, setSc] = useState(false);
  useEffect(() => { const fn = () => setSc(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links = ["Home", "About", "Skills", "Projects", "Contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "14px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: sc ? TH.navBg : "transparent", backdropFilter: sc ? "blur(28px)" : "none", borderBottom: sc ? `1px solid ${TH.border}` : "none", transition: "all 0.4s ease" }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: TH.text, letterSpacing: "-0.01em" }}>
        M. <span style={{ color: TH.accent }}>Mansoor</span>
      </div>
      <div style={{ display: "flex", gap: 2, alignItems: "center", background: sc ? "#FFFFFF" : "rgba(255,255,255,0.75)", border: `1px solid ${TH.border}`, borderRadius: 14, padding: "4px 6px", boxShadow: sc ? `0 4px 20px ${TH.shadow}` : "none", backdropFilter: "blur(20px)", transition: "all 0.3s" }}>
        {links.map(l => (
          <button key={l} onClick={() => { setActive(l); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }} style={{ background: active === l ? TH.accent : "transparent", border: "none", color: active === l ? "#FFFFFF" : TH.textMuted, fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 500, padding: "7px 16px", borderRadius: 10, cursor: "pointer", transition: "all 0.22s" }}
            onMouseEnter={e => { if (active !== l) { e.currentTarget.style.background = TH.accentLight; e.currentTarget.style.color = TH.accent; } }}
            onMouseLeave={e => { if (active !== l) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TH.textMuted; } }}>
            {l}
          </button>
        ))}
      </div>
      <a href="https://github.com/mansoor-farooq" target="_blank" rel="noreferrer" style={{ padding: "9px 22px", background: TH.text, color: "#FFFFFF", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, borderRadius: 12, textDecoration: "none", boxShadow: `0 4px 16px ${TH.shadowLg}`, transition: "all 0.22s" }}
        onMouseEnter={e => { e.currentTarget.style.background = TH.accent; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = TH.text; e.currentTarget.style.transform = ""; }}>
        GitHub →
      </a>
    </nav>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHead({ tag, title, sub, accent }) {
  const c = accent || TH.accent;
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <span style={{ display: "inline-block", padding: "5px 16px", marginBottom: 16, background: `${c}10`, border: `1px solid ${c}25`, borderRadius: 100, color: c, fontSize: 10.5, fontFamily: "'DM Mono',monospace", fontWeight: 500, letterSpacing: "0.18em" }}>{tag}</span>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 700, color: TH.text, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{title}</h2>
      {sub && <p style={{ color: TH.textMuted, fontSize: 15, marginTop: 12, lineHeight: 1.7, maxWidth: 520, margin: "12px auto 0" }}>{sub}</p>}
    </div>
  );
}

function Divider() {
  return <div style={{ maxWidth: 1100, margin: "0 auto", height: 1, background: `linear-gradient(90deg,transparent,${TH.border},transparent)` }} />;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [filter, setFilter] = useState("All");
  const [section, setSection] = useState("home");

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { setSection(e.target.id); setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); } }); }, { threshold: 0.3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const typed = useTyping(["Full Stack Web Developer", "React & Next.js Expert", "AI & Prompt Engineer", "YOLO + Gemini + Grok Dev", "Penetration Tester", "Ollama LLM Integrator", "ASP.NET Core Engineer"], 68);
  const cats = ["All", "Frontend", "Backend", "AI", "Mobile", "Security"];
  const filtered = filter === "All" ? SKILLS : SKILLS.filter(s => s.cat === filter);
  const sec = { padding: "110px 48px", position: "relative", zIndex: 1 };

  return (
    <div style={{ minHeight: "100vh", background: TH.bg, color: TH.text, overflowX: "hidden", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:${TH.accentMid};border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes Blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes floatBg{0%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.04)}100%{transform:translateY(0) scale(1)}}
        @keyframes SPulse{0%,100%{box-shadow:0 0 0 0 rgba(18,160,102,.55)}50%{box-shadow:0 0 0 6px rgba(18,160,102,0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
      `}</style>

      {/* ── Background ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -140, left: -100, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${TH.accentLight} 0%, transparent 68%)`, animation: "floatBg 14s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: -120, right: -80, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${TH.goldLight} 0%, transparent 68%)`, animation: "floatBg 17s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", top: "38%", left: "48%", width: 440, height: 340, borderRadius: "50%", background: `radial-gradient(ellipse, ${TH.greenLight} 0%, transparent 68%)`, animation: "floatBg 20s ease-in-out infinite 5s" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(12,110,78,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(12,110,78,0.025) 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: TH.grain, backgroundRepeat: "repeat", backgroundSize: "180px 180px" }} />
      </div>

      <Nav active={active} setActive={setActive} />
      <ScrollCompanion section={section} />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "130px 48px 90px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 64, flexWrap: "wrap" }}>
          {/* Left text */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", marginBottom: 32, background: TH.greenLight, border: `1px solid ${TH.green}28`, borderRadius: 100, animation: "fadeUp 0.6s 0.1s both" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: TH.green, animation: "SPulse 1.6s infinite", display: "inline-block", boxShadow: `0 0 6px ${TH.green}` }} />
              <span style={{ color: TH.green, fontSize: 10, fontFamily: "'DM Mono',monospace", fontWeight: 500, letterSpacing: "0.16em" }}>OPEN TO OPPORTUNITIES</span>
            </div>

            <div style={{ animation: "fadeUp 0.6s 0.22s both" }}>
              <p style={{ color: TH.textMuted, fontSize: 11, fontFamily: "'DM Mono',monospace", letterSpacing: "0.38em", marginBottom: 12 }}>HELLO, I'M</p>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(38px,6vw,74px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.025em", marginBottom: 6 }}>
                <span style={{ background: `linear-gradient(135deg, ${TH.text} 0%, ${TH.accent} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>M. Mansoor</span>
                <span style={{ display: "block", color: TH.text }}>Farooq</span>
              </h1>
            </div>

            <div style={{ animation: "fadeUp 0.6s 0.36s both", minHeight: 36, margin: "18px 0 24px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 30, height: 2.5, background: `linear-gradient(90deg, ${TH.accent}, ${TH.green})`, borderRadius: 2, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "clamp(12px,1.8vw,16px)", color: TH.accent, fontWeight: 500 }}>{typed}</span>
              <span style={{ animation: "Blink 0.85s infinite", color: TH.accent, fontWeight: 300 }}>|</span>
            </div>

            <p style={{ color: TH.textSub, fontSize: 15.5, lineHeight: 1.88, maxWidth: 490, marginBottom: 38, animation: "fadeUp 0.6s 0.48s both" }}>
              Full-Stack Developer at <strong style={{ color: TH.accent }}>Infotech Solution</strong>, Karachi. Building AI-powered apps with React, Next.js & Node.js. Trained at <strong style={{ color: TH.gold }}>Youngs Private Limited</strong>. Also skilled in <strong style={{ color: TH.red }}>Penetration Testing</strong>. 🚀
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.6s 0.58s both" }}>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                style={{ padding: "13px 30px", background: TH.accent, color: "#FFF", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, border: "none", borderRadius: 14, cursor: "pointer", boxShadow: `0 8px 30px ${TH.accent}35`, transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 38px ${TH.accent}48`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 8px 30px ${TH.accent}35`; }}>
                View Projects →
              </button>
              <a href="mailto:mansoorturk757@gmail.com" style={{ padding: "13px 30px", background: "#FFFFFF", color: TH.text, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, border: `1px solid ${TH.border}`, borderRadius: 14, textDecoration: "none", boxShadow: `0 4px 16px ${TH.shadow}`, transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = TH.accent; e.currentTarget.style.boxShadow = `0 8px 28px ${TH.shadowLg}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = TH.border; e.currentTarget.style.boxShadow = `0 4px 16px ${TH.shadow}`; }}>
                📧 Email Me
              </a>
            </div>

            <div style={{ display: "flex", gap: 40, marginTop: 48, flexWrap: "wrap", animation: "fadeUp 0.6s 0.68s both", paddingTop: 32, borderTop: `1px solid ${TH.border}` }}>
              {[["17+", "GitHub Repos"], ["1yr+", "Experience"], ["10+", "Technologies"], ["3", "AI Models"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: TH.accent, letterSpacing: "-0.02em" }}>{n}</div>
                  <div style={{ color: TH.textMuted, fontSize: 11.5, marginTop: 3, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Photo */}
          <div style={{
            width: 120, height: 120,
            borderRadius: "50%",
            overflow: "hidden",
            border: `3px solid ${TH.accent}`,
            boxShadow: `0 8px 28px rgba(12,110,78,0.25)`,
            margin: "0 auto 16px",
          }}>
            <img
              src={logo}
              alt="M. Mansoor Farooq"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>


          {/* Right — hero card */}
          <div style={{ animation: "fadeIn 1.2s 0.5s both", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", background: "linear-gradient(145deg, #EFF9F4 0%, #E7F5EE 60%, #EEF0FC 100%)", border: `1px solid ${TH.borderMid}`, borderRadius: 32, padding: "36px 32px 44px", boxShadow: `0 28px 72px ${TH.shadowLg}, 0 6px 18px ${TH.shadow}` }}>
              {/* Rainbow top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${TH.accent}, ${TH.green}, ${TH.gold}, ${TH.red})`, borderRadius: "32px 32px 0 0" }} />
              <HeroChar />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginTop: 28, maxWidth: 310 }}>
                {["⚛️ React", "▲ Next.js", "🤖 AI", "🦙 Ollama", "🔓 Security", "🐘 PostgreSQL"].map(t => (
                  <span key={t} style={{ padding: "4px 12px", background: "#FFFFFF", border: `1px solid ${TH.border}`, borderRadius: 100, color: TH.textSub, fontSize: 11.5, fontFamily: "'DM Sans',sans-serif", boxShadow: `0 2px 8px ${TH.shadow}` }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="about" style={sec}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead tag="MY JOURNEY" title="Experience & Background" sub="A path built through real-world projects and continuous learning." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 18, marginBottom: 20 }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} style={{ padding: 30, background: TH.card, border: `1px solid ${e.color}18`, borderRadius: 22, position: "relative", overflow: "hidden", animation: `fadeUp 0.6s ${i * 0.14}s both`, transition: "all 0.28s ease", boxShadow: `0 4px 18px ${TH.shadow}` }}
                onMouseEnter={el => { el.currentTarget.style.transform = "translateY(-5px)"; el.currentTarget.style.boxShadow = `0 20px 52px ${TH.shadowLg}`; el.currentTarget.style.borderColor = e.color + "38"; }}
                onMouseLeave={el => { el.currentTarget.style.transform = ""; el.currentTarget.style.boxShadow = `0 4px 18px ${TH.shadow}`; el.currentTarget.style.borderColor = e.color + "18"; }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${e.color}, ${e.color}55)`, borderRadius: "22px 22px 0 0" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 110, height: 110, background: `radial-gradient(circle at top right, ${e.color}09, transparent 68%)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, marginTop: 6 }}>
                  <span style={{ fontSize: 28 }}>{e.icon}</span>
                  <span style={{ padding: "4px 13px", background: e.active ? TH.greenLight : "rgba(0,0,0,0.04)", border: `1px solid ${e.active ? TH.green + "38" : TH.border}`, borderRadius: 100, color: e.active ? TH.green : TH.textMuted, fontSize: 10.5, fontFamily: "'DM Mono',monospace", fontWeight: 500 }}>{e.active ? "● Current" : e.period}</span>
                </div>
                <h3 style={{ color: e.color, fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{e.company}</h3>
                <p style={{ color: TH.text, fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>{e.role}</p>
                <p style={{ color: TH.textMuted, fontSize: 13.5, lineHeight: 1.8 }}>{e.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "26px 32px", background: "linear-gradient(135deg, #EFF9F4 0%, #EAF7F1 100%)", border: `1px solid ${TH.borderMid}`, borderRadius: 22, display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", boxShadow: `0 4px 18px ${TH.shadow}` }}>
            <span style={{ fontSize: 30 }}>🧠</span>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h3 style={{ color: TH.accent, fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", marginBottom: 7 }}>AI · LLM · SECURITY SPECIALIST</h3>
              <p style={{ color: TH.textSub, fontSize: 14, lineHeight: 1.8 }}>YOLO object detection · Grok & Gemini APIs · Ollama local LLMs · Prompt Engineering · Penetration Testing · Kali Linux</p>
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {["YOLO", "Grok", "Gemini", "Ollama", "Kali Linux", "Metasploit"].map(t => (<span key={t} style={{ padding: "6px 14px", background: "#FFFFFF", border: `1px solid ${TH.borderMid}`, borderRadius: 100, color: TH.accent, fontSize: 11.5, fontFamily: "'DM Mono',monospace", fontWeight: 500, boxShadow: `0 2px 8px ${TH.shadow}` }}>{t}</span>))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" style={sec}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead tag="TECH STACK" title="Skills & Tools" sub="Technologies I use every day to build modern, scalable applications." accent={TH.gold} />
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 38, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 20px", background: filter === c ? TH.accent : "#FFFFFF", border: `1px solid ${filter === c ? TH.accent : TH.border}`, borderRadius: 11, color: filter === c ? "#FFFFFF" : TH.textMuted, fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, cursor: "pointer", transition: "all 0.22s", boxShadow: `0 2px 8px ${TH.shadow}` }}
                onMouseEnter={e => { if (filter !== c) { e.currentTarget.style.borderColor = TH.accent; e.currentTarget.style.color = TH.accent; e.currentTarget.style.boxShadow = `0 4px 14px ${TH.shadowLg}`; } }}
                onMouseLeave={e => { if (filter !== c) { e.currentTarget.style.borderColor = TH.border; e.currentTarget.style.color = TH.textMuted; e.currentTarget.style.boxShadow = `0 2px 8px ${TH.shadow}`; } }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: 12 }}>
            {filtered.map((s, i) => <SkillCard key={s.name} s={s} delay={i * 0.045} />)}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" style={sec}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead tag="GITHUB · 17+ REPOS" title="Real Projects" sub="Production-grade applications across web, mobile, AI, and security." accent={TH.red} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
            {PROJECTS.map((p, i) => (
              <a key={p.title} href={p.link} target="_blank" rel="noreferrer" style={{ display: "block", textDecoration: "none", padding: 26, background: TH.card, border: `1px solid ${TH.cardBorder}`, borderRadius: 22, position: "relative", overflow: "hidden", animation: `fadeUp 0.6s ${i * 0.08}s both`, transition: "all 0.28s ease", boxShadow: `0 4px 16px ${TH.shadow}` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 20px 52px ${TH.shadowLg}`; e.currentTarget.style.borderColor = p.color + "42"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 16px ${TH.shadow}`; e.currentTarget.style.borderColor = TH.cardBorder; }}>
                <div style={{ position: "absolute", left: 0, top: 22, bottom: 22, width: 3.5, background: `linear-gradient(180deg, ${p.color}, ${p.color}45)`, borderRadius: "0 4px 4px 0" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${p.color}10, transparent 68%)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ padding: "3px 11px", background: `${p.color}10`, border: `1px solid ${p.color}28`, borderRadius: 100, color: p.color, fontSize: 10, fontFamily: "'DM Mono',monospace", fontWeight: 500 }}>{p.tag}</span>
                    <span style={{ color: TH.gold, fontSize: 12 }}>{"★".repeat(p.stars || 0)}</span>
                  </div>
                </div>
                <h3 style={{ color: TH.text, fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 9, letterSpacing: "-0.01em" }}>{p.title}</h3>
                <p style={{ color: TH.textSub, fontSize: 13.5, lineHeight: 1.78, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                  {p.tech.map(t => (<span key={t} style={{ padding: "3px 10px", background: `${p.color}08`, border: `1px solid ${p.color}26`, borderRadius: 100, color: p.color, fontSize: 10.5, fontFamily: "'DM Mono',monospace", fontWeight: 500 }}>{t}</span>))}
                </div>
                <span style={{ color: p.color, fontSize: 12, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>View on GitHub →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" style={{ ...sec, paddingBottom: 100 }}>
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
          <SectionHead tag="LET'S TALK" title="Get In Touch" sub="Looking for a full-stack developer with AI & security expertise? Available for freelance, full-time, and remote opportunities." />
          <div style={{ background: "linear-gradient(135deg, #EFF9F4 0%, #EBF7F1 50%, #EEF0FC 100%)", border: `1px solid ${TH.borderMid}`, borderRadius: 28, padding: "38px 34px", marginBottom: 20, boxShadow: `0 14px 48px ${TH.shadowLg}` }}>
            {/* Rainbow bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${TH.accent}, ${TH.green}, ${TH.gold})`, borderRadius: 2, marginBottom: 28 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 26 }}>
              {[
                { icon: "📧", label: "Email", val: "mansoorturk757@gmail.com", href: "mailto:mansoorturk757@gmail.com", color: TH.accent },
                { icon: "📱", label: "WhatsApp / Phone", val: "+92 329 259 7331", href: "https://wa.me/923292597331", color: TH.green },
              ].map(item => (
                <a key={item.label} href={item.href} style={{ padding: "22px 16px", background: "#FFFFFF", border: `1px solid ${TH.border}`, borderRadius: 18, textDecoration: "none", textAlign: "center", transition: "all 0.25s", boxShadow: `0 3px 10px ${TH.shadow}` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${TH.shadowLg}`; e.currentTarget.style.borderColor = item.color + "40"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 3px 10px ${TH.shadow}`; e.currentTarget.style.borderColor = TH.border; }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ color: TH.textMuted, fontSize: 9.5, fontFamily: "'DM Mono',monospace", letterSpacing: "0.14em", marginBottom: 5 }}>{item.label}</div>
                  <div style={{ color: item.color, fontSize: 12, fontWeight: 600, wordBreak: "break-all", lineHeight: 1.5 }}>{item.val}</div>
                </a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "📧 Email Me", href: "mailto:mansoorturk757@gmail.com", c: TH.accent },
                { label: "🐙 GitHub", href: "https://github.com/mansoor-farooq", c: TH.text },
                { label: "💼 LinkedIn", href: "https://linkedin.com/in/mansoor-farooq-a757b9365/", c: "#0A66C2" },
                { label: "💬 WhatsApp", href: "https://wa.me/923292597331", c: "#25D366" },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{ padding: "12px 22px", background: "#FFFFFF", border: `1px solid ${TH.border}`, borderRadius: 13, color: item.c, fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 600, textDecoration: "none", transition: "all 0.25s", boxShadow: `0 2px 8px ${TH.shadow}` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = `${item.c}08`; e.currentTarget.style.borderColor = `${item.c}38`; e.currentTarget.style.boxShadow = `0 8px 26px ${TH.shadowLg}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = TH.border; e.currentTarget.style.boxShadow = `0 2px 8px ${TH.shadow}`; }}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", background: "#FFFFFF", border: `1px solid ${TH.border}`, borderRadius: 100, color: TH.textSub, fontSize: 14, boxShadow: `0 2px 10px ${TH.shadow}` }}>
            📍 Karachi, Sindh, Pakistan · Open to Remote 🌍
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ padding: "24px 48px", borderTop: `1px solid ${TH.border}`, textAlign: "center", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)" }}>
        <p style={{ color: TH.textMuted, fontSize: 12.5, fontFamily: "'DM Mono',monospace", letterSpacing: "0.08em", margin: 0 }}>
          © 2025 M. Mansoor Farooq &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; Infotech Solution &nbsp;·&nbsp; Karachi 🇵🇰
        </p>
      </footer>
      <Analytics />
    </div>

  );
}

