import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Shield,
  Briefcase,
  Terminal,
  Sparkles,
  ExternalLink,
  Mail,
  MessageSquare,
  Copy,
  Check,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Star,
  Smartphone,
  Globe,
  Database
} from "lucide-react";
import confetti from "canvas-confetti";

import logo from "./image/mansoor_professional.jpg";
import { TH } from "./theme";
import { playClickSound, playHoverSound, playSuccessSound } from "./utils/audio";
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from "./components/Icons";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import ProjectModal from "./components/ProjectModal";
import SpotlightCard from "./components/SpotlightCard";
import Hero from "./components/Hero";
import Spatial3DLab from "./components/Spatial3DLab";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import FeaturedProjects from "./components/FeaturedProjects";
import EngineeringProcess from "./components/EngineeringProcess";
import BlogSection from "./components/BlogSection";
import InteractiveTerminalHUD from "./components/InteractiveTerminalHUD";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";

// ── Skills Database ─────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "React.js", icon: "⚛️", level: 95, color: "#00F59B", cat: "Frontend" },
  { name: "Next.js", icon: "▲", level: 92, color: "#00D2FF", cat: "Frontend" },
  { name: "TypeScript", icon: "TS", level: 86, color: "#3B82F6", cat: "Frontend" },
  { name: "JavaScript (ES6+)", icon: "JS", level: 94, color: "#E5B869", cat: "Frontend" },
  { name: "Node.js", icon: "🟢", level: 90, color: "#00F59B", cat: "Backend" },
  { name: "Express.js", icon: "🚂", level: 88, color: "#A855F7", cat: "Backend" },
  { name: "PostgreSQL", icon: "🐘", level: 85, color: "#3B82F6", cat: "Backend" },
  { name: "ASP.NET Core", icon: "🔷", level: 82, color: "#8B5CF6", cat: "Backend" },
  { name: "C#", icon: "C#", level: 80, color: "#A855F7", cat: "Backend" },
  { name: "Prompt Engineering", icon: "🤖", level: 94, color: "#00F59B", cat: "AI & ML" },
  { name: "Ollama Local LLMs", icon: "🦙", level: 88, color: "#EC4899", cat: "AI & ML" },
  { name: "Grok & Gemini APIs", icon: "✨", level: 89, color: "#E5B869", cat: "AI & ML" },
  { name: "YOLO Computer Vision", icon: "👁️", level: 82, color: "#F43F5E", cat: "AI & ML" },
  { name: "Kotlin (Android)", icon: "🎯", level: 75, color: "#6366F1", cat: "Mobile" },
  { name: "Penetration Testing", icon: "🔓", level: 78, color: "#F43F5E", cat: "Security" },
  { name: "Network Security", icon: "🛡️", level: 74, color: "#E5B869", cat: "Security" },
  { name: "Kali Linux / Nmap", icon: "🐉", level: 76, color: "#64748B", cat: "Security" },
];

// ── Projects Database (Rich Case Studies) ────────────────────────────────────────
const PROJECTS = [
  {
    title: "LLM Backend & Real-Time Analyzer",
    icon: "🤖",
    tag: "AI & ML",
    color: "#00F59B",
    stars: 5,
    desc: "Production AI pipeline orchestrating Ollama local models, Grok, and Gemini APIs with dynamic prompt templates, streaming responses, and sentiment analytics.",
    tech: ["Node.js", "Ollama", "Grok API", "Gemini API", "Express"],
    link: "https://github.com/mansoor-farooq/LLM_Backend_With_Analizer"
  },
  {
    title: "Enterprise Gate Pass Security System",
    icon: "🔐",
    tag: "Enterprise",
    color: "#8B5CF6",
    stars: 5,
    desc: "Mission-critical visitor & asset clearance system with dynamic QR verification, role-based JWT authentication, and real-time audit logging.",
    tech: ["React.js", "JavaScript", "REST API", "PostgreSQL"],
    link: "https://github.com/mansoor-farooq/gate-pass-frontend"
  },
  {
    title: "E-Commerce Mobile Architecture",
    icon: "📱",
    tag: "Mobile",
    color: "#00D2FF",
    stars: 4,
    desc: "Native Android commercial platform featuring real-time catalog filtering, stateful shopping cart, payment integration, and background push notifications.",
    tech: ["Kotlin", "Android SDK", "REST API", "PostgreSQL"],
    link: "https://github.com/mansoor-farooq"
  },
  {
    title: "Distributed Task Manager & Sync Engine",
    icon: "⚡",
    tag: "Full Stack",
    color: "#00F59B",
    stars: 4,
    desc: "High-productivity workflow platform with drag-and-drop kanban boards, priority queuing, and multi-tenant database synchronization.",
    tech: ["React.js", "Node.js", "PostgreSQL", "Tailwind"],
    link: "https://github.com/mansoor-farooq"
  },
  {
    title: "Sales & Asset Management Pipeline",
    icon: "🛒",
    tag: "Full Stack",
    color: "#E5B869",
    stars: 4,
    desc: "High-throughput sales dashboard with multipart image optimization via Multer, analytical charts, and inventory reconciliation.",
    tech: ["Node.js", "Express", "PostgreSQL", "Multer"],
    link: "https://github.com/mansoor-farooq/sd-app-backend-updated"
  },
  {
    title: "Penetration Testing & Recon Toolkit",
    icon: "🔓",
    tag: "Security",
    color: "#F43F5E",
    stars: 5,
    desc: "Custom automated Python security scripts for target reconnaissance, port mapping, vulnerability auditing, and formatted penetration reports.",
    tech: ["Python", "Kali Linux", "Metasploit", "Nmap"],
    link: "https://github.com/mansoor-farooq"
  },
  {
    title: "Production ASP.NET Core Clean API",
    icon: "🔷",
    tag: "Backend",
    color: "#A855F7",
    stars: 4,
    desc: "Enterprise-grade C# REST API engineered with Clean Architecture principles, Entity Framework Core, JWT authorization, and Swagger OpenAPI specs.",
    tech: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server"],
    link: "https://github.com/mansoor-farooq/mansoor_test_app"
  },
  {
    title: "Full-Stack Design Patterns Engine",
    icon: "⚛️",
    tag: "Full Stack",
    color: "#3B82F6",
    stars: 4,
    desc: "Comprehensive reference architecture exploring microservices communication, JWT rotation, optimistic UI updates, and centralized state management.",
    tech: ["React.js", "Next.js", "Node.js", "Express"],
    link: "https://github.com/mansoor-farooq/reactbackend"
  }
];

// ── Experience Database ─────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    company: "Infotech Solution",
    role: "Full Stack Web Developer",
    period: "2025 — Present",
    active: true,
    color: "#00F59B",
    icon: <Briefcase size={22} color="#00F59B" />,
    desc: "Architecting high-scale web platforms utilizing React, Next.js, Node.js & PostgreSQL. Spearheading AI feature integration including local Ollama LLMs and cloud intelligence APIs (Gemini/Grok)."
  },
  {
    company: "Youngs Private Limited",
    role: "Software Developer (MTO Training)",
    period: "2024",
    active: false,
    color: "#8B5CF6",
    icon: <Layers size={22} color="#8B5CF6" />,
    desc: "Underwent intensive corporate engineering training. Developed production-grade internal tools and web services using React, ASP.NET Core, C#, and relational SQL databases."
  },
  {
    company: "Cybersecurity & Recon Specialization",
    role: "Penetration Tester (Hands-On Specialization)",
    period: "2023 — 2024",
    active: false,
    color: "#F43F5E",
    icon: <Shield size={22} color="#F43F5E" />,
    desc: "Executed comprehensive vulnerability assessments, network penetration simulations, and defensive auditing using Kali Linux, Nmap, and Metasploit frameworks."
  }
];

// ── Section Header Component ───────────────────────────────────────────────────
function SectionHeader({ tag, title, sub, accent = TH.accent }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 54 }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: 100,
          background: `${accent}14`,
          border: `1px solid ${accent}30`,
          color: accent,
          fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        <Sparkles size={13} />
        <span>{tag}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(30px, 4.2vw, 48px)",
          fontWeight: 800,
          color: "#FFF",
          letterSpacing: "-0.03em",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {title}
      </motion.h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: TH.textSub,
            fontSize: "clamp(14px, 1.8vw, 16px)",
            maxWidth: 580,
            margin: "12px auto 0",
            lineHeight: 1.7,
          }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

// ── Main Portfolio Component ────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [skillCategory, setSkillCategory] = useState("All");
  const [projectCategory, setProjectCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Section Observer for Active Navigation Highlighting
  useEffect(() => {
    const sectionIds = ["home", "spatial-lab", "about", "skills", "projects", "process", "blog", "terminal", "faq", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter skills
  const skillCategories = ["All", "Frontend", "Backend", "AI & ML", "Security", "Mobile"];
  const filteredSkills = skillCategory === "All"
    ? SKILLS
    : SKILLS.filter((s) => s.cat === skillCategory);

  // Filter projects
  const projectCategories = ["All", "AI & ML", "Enterprise", "Full Stack", "Backend", "Security", "Mobile"];
  const filteredProjects = projectCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tag === projectCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mansoorturk757@gmail.com");
    setEmailCopied(true);
    playSuccessSound();
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#00F59B", "#00D2FF", "#E5B869"],
      });
    } catch (e) {}
    setTimeout(() => setEmailCopied(false), 2600);
  };

  return (
    <SmoothScroll>
      <div style={{ minHeight: "100vh", background: TH.bg, color: TH.text, overflowX: "hidden", position: "relative" }}>
        {/* Global Styles */}
        <style>{`
          ::selection {
            background: #00F59B;
            color: #040906;
          }
          ::-webkit-scrollbar {
            width: 5px;
          }
          ::-webkit-scrollbar-track {
            background: #060709;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(0, 245, 155, 0.25);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 245, 155, 0.5);
          }
          * {
            box-sizing: border-box;
          }
        `}</style>

        {/* Global Atmospheric Ambient Noise Overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: TH.grain,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            pointerEvents: "none",
            zIndex: 90,
            opacity: 0.8,
          }}
        />

        {/* Navigation & Command HUD */}
        <Navbar
          activeSection={activeSection}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelectProject={(p) => setActiveModalProject(p)}
        />

        {/* Case Study Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

        {/* ── HERO SECTION ── */}
        <Hero
          onExploreClick={() => {
            if (window.__lenis) {
              window.__lenis.scrollTo("#projects");
            } else {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          onContactClick={() => {
            if (window.__lenis) {
              window.__lenis.scrollTo("#contact");
            } else {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* ── SPATIAL 3D ARCHITECTURE LAB (Interactive WebGL System Engine) ── */}
        <Spatial3DLab />

        {/* ── ABOUT SECTION (Character, Origins & Portrait Anchor) ── */}
        <AboutSection />

        {/* ── TECHNICAL STACK SECTION ── */}
        <SkillsSection />

        {/* ── FEATURED APPLICATIONS & CASE STUDIES (With Images & Problem/Solution) ── */}
        <FeaturedProjects />

        {/* ── ENGINEERING PROCESS & WORKFLOW PIPELINE ── */}
        <EngineeringProcess />

        {/* ── TECHNICAL INSIGHTS & SEO ENGINEERING BLOG (12+ Articles) ── */}
        <BlogSection />

        {/* ── INTERACTIVE 3D ARCHITECTURE TERMINAL HUD ── */}
        <InteractiveTerminalHUD />

        {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
        <FAQSection />

        {/* ── CONTACT & FOOTER WITH DIRECT EMAIL FORM ── */}
        <Footer />

        {/* ── FLOATING WHATSAPP & CONTACT QUICK ACTION WIDGETS ── */}
        <FloatingWidgets />

        {/* Vercel Analytics */}
        <Analytics />
      </div>
    </SmoothScroll>
  );
}