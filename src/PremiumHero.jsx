import React, { Suspense, useEffect, useState, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThreeHero = lazy(() => import("./ThreeHero"));

const TH = {
    bg: "#F7F5F0",
    card: "rgba(255,255,255,0.78)",
    card2: "rgba(255,255,255,0.92)",
    text: "#0D1F16",
    textSub: "#3A5044",
    textMuted: "#7A9087",
    accent: "#0C6E4E",
    gold: "#B8873A",
    border: "rgba(16,56,40,0.10)",
    borderMid: "rgba(12,110,78,0.22)",
    shadow: "rgba(16,40,28,0.12)",
    shadowLg: "rgba(16,40,28,0.20)",
};

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const m = window.matchMedia(query);
        const onChange = () => setMatches(m.matches);
        setMatches(m.matches);
        if (m.addEventListener) m.addEventListener("change", onChange);
        else m.addListener(onChange);
        return () => {
            if (m.removeEventListener) m.removeEventListener("change", onChange);
            else m.removeListener(onChange);
        };
    }, [query]);
    return matches;
}

export default function PremiumHero({ photoSrc }) {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    const [enable3D, setEnable3D] = useState(false);
    useEffect(() => {
        if (!isMobile) setEnable3D(true);
        else setEnable3D(false);
    }, [isMobile]);

    const show3D = enable3D && !reduceMotion;

    const fadeUp = {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <section id="home" style={{ minHeight: "100vh", background: TH.bg, overflowX: "hidden" }}>
            {/* Background */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div
                    style={{
                        position: "absolute",
                        top: "-18%",
                        left: "-12%",
                        width: isMobile ? 340 : 820,
                        height: isMobile ? 340 : 820,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(12,110,78,0.16) 0%, transparent 65%)",
                        filter: `blur(${isMobile ? 60 : 105}px)`,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-22%",
                        right: "-14%",
                        width: isMobile ? 420 : 980,
                        height: isMobile ? 420 : 980,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(184,135,58,0.16) 0%, transparent 65%)",
                        filter: `blur(${isMobile ? 70 : 120}px)`,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: isMobile ? 0.28 : 0.35,
                        backgroundImage:
                            "linear-gradient(rgba(12,110,78,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(12,110,78,0.06) 1px, transparent 1px)",
                        backgroundSize: isMobile ? "32px 32px" : "46px 46px",
                    }}
                />
            </div>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    paddingTop: isMobile ? 88 : 110,
                    paddingLeft: isMobile ? 16 : 56,
                    paddingRight: isMobile ? 16 : 56,
                    paddingBottom: isMobile ? 48 : 72,
                    maxWidth: 1240,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
                        gap: isMobile ? 16 : 18,
                        alignItems: "stretch",
                    }}
                >
                    {/* LEFT */}
                    <div>
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6 }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "9px 14px",
                                borderRadius: 999,
                                border: `1px solid ${TH.borderMid}`,
                                background: TH.card,
                                backdropFilter: "blur(14px)",
                                boxShadow: `0 10px 30px ${TH.shadow}`,
                            }}
                        >
                            <span
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#12A066",
                                    boxShadow: "0 0 0 6px rgba(18,160,102,0.18)",
                                }}
                            />
                            <span style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 900, color: TH.textMuted }}>
                                AVAILABLE FOR FREELANCE
                            </span>
                        </motion.div>

                        <motion.h1
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.05 }}
                            style={{
                                marginTop: 18,
                                marginBottom: 14,
                                lineHeight: 1.02,
                                letterSpacing: "-0.04em",
                                fontSize: isMobile ? "clamp(40px, 10.5vw, 58px)" : "clamp(62px, 5.6vw, 90px)",
                                fontWeight: 950,
                                color: TH.text,
                            }}
                        >
                            M. Mansoor
                            <br />
                            <span
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${TH.accent} 0%, #12A066 45%, ${TH.gold} 100%)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Farooq
                            </span>
                        </motion.h1>

                        <motion.p
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.12 }}
                            style={{
                                margin: 0,
                                maxWidth: 580,
                                color: TH.textSub,
                                fontSize: isMobile ? 15.5 : 18,
                                lineHeight: 1.75,
                                fontWeight: 650,
                            }}
                        >
                            Full Stack Developer (React, Next.js, Node.js, PostgreSQL). Premium UI, smooth performance, scalable systems.
                        </motion.p>

                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.18 }}
                            style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}
                        >
                            <button
                                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    background: `linear-gradient(135deg, ${TH.accent}, #12A066)`,
                                    color: "#fff",
                                    padding: "14px 18px",
                                    borderRadius: 14,
                                    fontWeight: 950,
                                    boxShadow: "0 18px 46px rgba(12,110,78,0.22)",
                                }}
                            >
                                View Projects
                            </button>

                            <a
                                href="mailto:mansoorturk757@gmail.com"
                                style={{
                                    textDecoration: "none",
                                    padding: "14px 18px",
                                    borderRadius: 14,
                                    background: "#fff",
                                    border: `1px solid ${TH.borderMid}`,
                                    color: TH.text,
                                    fontWeight: 950,
                                }}
                            >
                                Contact Me
                            </a>

                            {isMobile && (
                                <button
                                    onClick={() => setEnable3D((v) => !v)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "14px 18px",
                                        borderRadius: 14,
                                        background: enable3D ? "#0D1F16" : "rgba(255,255,255,0.85)",
                                        color: enable3D ? "#fff" : TH.text,
                                        border: `1px solid ${TH.borderMid}`,
                                        fontWeight: 950,
                                    }}
                                >
                                    {enable3D ? "Disable 3D" : "Enable 3D"}
                                </button>
                            )}
                        </motion.div>

                        {/* Mini profile */}
                        <div
                            style={{
                                marginTop: 18,
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "12px 12px",
                                borderRadius: 18,
                                background: "rgba(255,255,255,0.86)",
                                border: `1px solid ${TH.borderMid}`,
                                backdropFilter: "blur(14px)",
                                boxShadow: `0 12px 34px ${TH.shadow}`,
                                maxWidth: 520,
                            }}
                        >
                            <div style={{ width: 54, height: 54, borderRadius: 16, overflow: "hidden", border: `1px solid ${TH.border}` }}>
                                <img src={photoSrc} alt="Mansoor" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontWeight: 950, color: TH.text, fontSize: 14 }}>Premium Web UI + Performance</div>
                                <div style={{ color: TH.textMuted, fontWeight: 800, fontSize: 12, marginTop: 2 }}>Karachi · Remote · Freelance</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div
                        style={{
                            position: "relative",
                            borderRadius: 22,
                            border: `1px solid ${TH.borderMid}`,
                            background: isMobile ? "rgba(255,255,255,0.72)" : TH.card2,
                            backdropFilter: "blur(16px)",
                            boxShadow: `0 22px 60px ${TH.shadowLg}`,
                            overflow: "hidden",
                            minHeight: isMobile ? 320 : 520,
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                background: `linear-gradient(90deg, ${TH.accent}, #12A066, ${TH.gold})`,
                            }}
                        />

                        {/* specs overlay */}
                        <div
                            style={{
                                position: "absolute",
                                top: 14,
                                left: 14,
                                right: 14,
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 10,
                                flexWrap: "wrap",
                                zIndex: 3,
                                pointerEvents: "none",
                            }}
                        >
                            {/* {[
                // { k: "UI", v: "A1 Premium" },
                // { k: "Perf", v: "Mobile-first" },
                // { k: "3D", v: show3D ? "Enabled" : "Tap to enable" },
              ].map((x) => (
                <div
                  key={x.k}
                  style={{
                    background: "rgba(255,255,255,0.78)",
                    border: `1px solid ${TH.borderMid}`,
                    borderRadius: 14,
                    padding: "10px 12px",
                    backdropFilter: "blur(14px)",
                    boxShadow: `0 12px 34px ${TH.shadow}`,
                  }} */}
                            {/* > */}
                            {/* <div style={{ fontSize: 10, fontWeight: 950, letterSpacing: "0.18em", color: TH.textMuted }}>{x.k}</div>
                  <div style={{ marginTop: 3, fontSize: 13, fontWeight: 950, color: TH.text }}>{x.v}</div> */}
                            {/* </div> */}
                            {/* ))} */}
                        </div>

                        <AnimatePresence mode="wait">
                            {show3D ? (
                                <motion.div
                                    key="three"
                                    initial={{ opacity: 0, scale: 0.985 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.985 }}
                                    transition={{ duration: 0.35 }}
                                    style={{ height: "100%" }}
                                >
                                    <Suspense
                                        fallback={
                                            <div style={{ height: "100%", display: "grid", placeItems: "center", color: TH.accent, fontWeight: 900 }}>
                                                Loading 3D…
                                            </div>
                                        }
                                    >
                                        <ThreeHero />
                                    </Suspense>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="fallback"
                                    initial={{ opacity: 0, scale: 0.985 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.985 }}
                                    transition={{ duration: 0.35 }}
                                    style={{
                                        height: "100%",
                                        display: "grid",
                                        placeItems: "center",
                                        padding: 18,
                                        textAlign: "center",
                                    }}
                                >
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 950, letterSpacing: "0.18em", color: TH.textMuted }}>PREMIUM MODE</div>
                                        <div style={{ marginTop: 8, fontSize: 20, fontWeight: 950, color: TH.text }}>Ultra smooth experience</div>
                                        <div style={{ marginTop: 8, fontSize: 13.5, fontWeight: 750, color: TH.textSub, maxWidth: 380 }}>
                                            3D is optional for performance. Tap enable when you want the full premium look.
                                        </div>

                                        {isMobile && (
                                            <button
                                                onClick={() => setEnable3D(true)}
                                                style={{
                                                    marginTop: 14,
                                                    padding: "12px 14px",
                                                    borderRadius: 14,
                                                    border: `1px solid ${TH.borderMid}`,
                                                    background: "#fff",
                                                    fontWeight: 950,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Tap to Enable 3D
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}