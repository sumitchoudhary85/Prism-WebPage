import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef } from "react";

import FlashcardVisual from "./FlashcardVisual";
import ARStudioVisual from "./ARStudioVisual";
import PracticeVisual from "./PracticeVisual";
import MindspaceVisual from "./MindspaceVisual";

/* ── Per-section config ── */
const config = {
  flashcards: {
    label: "Flashcards",
    accentClass: "text-[#7C3AED]",
    accentHex: "#7C3AED",
    gradientFrom: "#7C3AED",
    gradientTo: "#3B82F6",
    dotColor: "#22C55E",
    buttonShadow: "rgba(124,58,237,0.4)",
    stat: { raw: 92, display: "92%", label: "Average Retention Rate" },
    description: "Transform any notes, PDF or concept into intelligent flashcards. Built on Active Recall and Spaced Repetition — the two most evidence-backed methods for long-term memory.",
    // Dark bg: deep indigo-tinted dark | Light bg: soft lavender-white
    darkBg: "linear-gradient(135deg, #0B0F1E 0%, #0F0B1E 50%, #0B1020 100%)",
    lightBg: "linear-gradient(135deg, #F5F3FF 0%, #EEF2FF 60%, #F8FAFC 100%)",
    darkGlow1: "rgba(124,58,237,0.12)",
    darkGlow2: "rgba(59,130,246,0.08)",
    lightGlow1: "rgba(124,58,237,0.08)",
    lightGlow2: "rgba(99,102,241,0.06)",
  },
  ar: {
    label: "AR Studio",
    accentClass: "text-[#3B82F6]",
    accentHex: "#3B82F6",
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4",
    dotColor: "#06B6D4",
    buttonShadow: "rgba(59,130,246,0.4)",
    stat: { raw: 50, display: "50+", label: "Interactive 3D Models" },
    description: "Step inside the subject. Rotate a DNA strand. Dissect an engine. Walk through history. AR Studio turns abstract concepts into spatial experiences you can see and touch.",
    // Dark bg: deep ocean blue-black | Light bg: soft sky-white
    darkBg: "linear-gradient(135deg, #070E1A 0%, #0A0F1E 50%, #080D18 100%)",
    lightBg: "linear-gradient(135deg, #EFF6FF 0%, #F0FAFA 60%, #F8FAFC 100%)",
    darkGlow1: "rgba(59,130,246,0.12)",
    darkGlow2: "rgba(6,182,212,0.08)",
    lightGlow1: "rgba(59,130,246,0.08)",
    lightGlow2: "rgba(6,182,212,0.05)",
  },
  practice: {
    label: "Practice",
    accentClass: "text-[#22C55E]",
    accentHex: "#22C55E",
    gradientFrom: "#22C55E",
    gradientTo: "#3B82F6",
    dotColor: "#22C55E",
    buttonShadow: "rgba(34,197,94,0.4)",
    stat: { raw: 10000, display: "10K+", label: "Questions Across Topics" },
    description: "Mastery comes from doing, not just reading. Practice with topic-wise questions, full mock tests and get intelligent feedback that adapts to exactly where you need to improve.",
    // Dark bg: deep emerald-dark | Light bg: soft mint-white
    darkBg: "linear-gradient(135deg, #071410 0%, #080F0E 50%, #0B1020 100%)",
    lightBg: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 60%, #F8FAFC 100%)",
    darkGlow1: "rgba(34,197,94,0.10)",
    darkGlow2: "rgba(16,185,129,0.07)",
    lightGlow1: "rgba(34,197,94,0.07)",
    lightGlow2: "rgba(16,185,129,0.05)",
  },
  mindspace: {
    label: "MindSpace",
    accentClass: "text-[#EC4899]",
    accentHex: "#EC4899",
    gradientFrom: "#EC4899",
    gradientTo: "#8B5CF6",
    dotColor: "#EC4899",
    buttonShadow: "rgba(236,72,153,0.4)",
    stat: { raw: null, display: "∞", label: "Room to Grow" },
    description: "Success is built on more than knowledge. MindSpace gives you the tools to build focus, consistency and self-awareness — the hidden skills every high achiever runs on.",
    // Dark bg: deep rose-violet dark | Light bg: soft pink-white
    darkBg: "linear-gradient(135deg, #160B14 0%, #110B18 50%, #0D0B12 100%)",
    lightBg: "linear-gradient(135deg, #FDF2F8 0%, #FAF5FF 60%, #F8FAFC 100%)",
    darkGlow1: "rgba(236,72,153,0.10)",
    darkGlow2: "rgba(139,92,246,0.08)",
    lightGlow1: "rgba(236,72,153,0.07)",
    lightGlow2: "rgba(139,92,246,0.05)",
  },
};

/* ── Animated count-up stat ── */
function CountUp({ target, display, accentHex, gradientFrom, gradientTo }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (target === null) return display;
    if (display.includes("K+")) return Math.round(v / 1000) + "K+";
    if (display.includes("%")) return Math.round(v) + "%";
    return Math.round(v) + (display.includes("+") ? "+" : "");
  });

  useEffect(() => {
    if (!inView || target === null) return;
    const ctrl = animate(count, target, { duration: 2, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, target]);

  return (
    <span ref={ref}>
      {target === null ? (
        <span
          className="text-[64px] font-extrabold leading-none"
          style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          {display}
        </span>
      ) : (
        <motion.span
          className="text-[64px] font-extrabold leading-none"
          style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          {rounded}
        </motion.span>
      )}
    </span>
  );
}

/* ── Word-by-word heading ── */
function AnimatedHeading({ text, isGradient, darkMode, gradientFrom, gradientTo }) {
  const words = text.split(" ");
  return (
    <span className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          className={`inline-block mr-[0.25em] ${
            isGradient ? "" : darkMode ? "text-white" : "text-[#111827]"
          }`}
          style={
            isGradient
              ? { background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
              : {}
          }
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Typewriter label ── */
function TypewriterLabel({ text, accentHex }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const chars = text.split("");

  return (
    <span ref={ref} className="inline-flex items-center gap-1">
      {/* Blinking dot */}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: accentHex }}
      />
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.05, delay: i * 0.06 }}
          style={{ color: accentHex }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Main component ── */
export default function PillarSection({ pillar, reverse }) {
  const { darkMode } = useTheme();
  const cfg = config[pillar.type] ?? config.flashcards;

  const bg = darkMode ? cfg.darkBg : cfg.lightBg;
  const glow1 = darkMode ? cfg.darkGlow1 : cfg.lightGlow1;
  const glow2 = darkMode ? cfg.darkGlow2 : cfg.lightGlow2;

  const headingLines = pillar.heading.split("\n");

  const renderVisual = () => {
    switch (pillar.type) {
      case "flashcards": return <FlashcardVisual />;
      case "ar":         return <ARStudioVisual />;
      case "practice":   return <PracticeVisual />;
      case "mindspace":  return <MindspaceVisual />;
      default:           return null;
    }
  };

  return (
    <section
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: bg }}
    >
      {/* Per-section atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: glow1 }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: glow2 }}
        />
        {/* Subtle noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* Section divider top — subtle accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.accentHex}, transparent)` }}
      />

      <div
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10
          ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
      >

        {/* ── TEXT SIDE ── */}
        <div className="flex flex-col">

          {/* Typewriter label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.3em] mb-6 font-[Inter,system-ui]"
          >
            <TypewriterLabel text={cfg.label} accentHex={cfg.accentHex} />
          </motion.div>

          {/* Word-by-word animated heading */}
          <div className="mb-8 leading-[1.08]">
            {headingLines.map((line, i) => (
              <div key={i} className="block text-[44px] md:text-[54px] font-extrabold tracking-tight">
                <AnimatedHeading
                  text={line}
                  isGradient={i === headingLines.length - 1}
                  darkMode={darkMode}
                  gradientFrom={cfg.gradientFrom}
                  gradientTo={cfg.gradientTo}
                />
              </div>
            ))}
          </div>

          {/* Description — line fade-up */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="text-[17px] leading-[1.8] mb-10 max-w-[500px] font-[Inter,system-ui]"
            style={{ color: darkMode ? "#94A3B8" : "#64748B" }}
          >
            {cfg.description}
          </motion.p>

          {/* Count-up stat */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-end gap-4 mb-10"
          >
            <CountUp
              target={cfg.stat.raw}
              display={cfg.stat.display}
              accentHex={cfg.accentHex}
              gradientFrom={cfg.gradientFrom}
              gradientTo={cfg.gradientTo}
            />
            <div className="mb-2 flex flex-col">
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                style={{ color: cfg.accentHex }}
              >
                proven
              </span>
              <span
                className="text-sm leading-snug max-w-[130px]"
                style={{ color: darkMode ? "#94A3B8" : "#64748B" }}
              >
                {cfg.stat.label}
              </span>
            </div>
          </motion.div>

          {/* Feature rows — accent dot, stagger slide-in */}
          <div className="flex flex-col gap-2.5 mb-12">
            {pillar.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.38 + i * 0.09, ease: "easeOut" }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default"
                style={{
                  background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                  border: darkMode ? "1px solid rgba(255,255,255,0.07)" : `1px solid ${cfg.accentHex}18`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Accent dot per section */}
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cfg.dotColor }}
                />
                <span
                  className="text-[15px] font-medium"
                  style={{ color: darkMode ? "#CBD5E1" : "#374151" }}
                >
                  {point}
                </span>
                {/* Arrow that appears on hover */}
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="ml-auto text-xs"
                  style={{ color: cfg.accentHex }}
                >
                  →
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* CTA — per-section accent color */}
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="self-start px-8 py-4 rounded-xl text-white text-[15px] font-semibold tracking-wide transition-shadow duration-300"
            style={{
              background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
              boxShadow: `0 0 28px ${cfg.buttonShadow}`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 50px ${cfg.buttonShadow}`}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 28px ${cfg.buttonShadow}`}
          >
            {pillar.button}
          </motion.button>

        </div>

        {/* ── VISUAL SIDE ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center items-center"
        >
          {renderVisual()}
        </motion.div>

      </div>

      {/* Section divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.accentHex}, transparent)` }}
      />
    </section>
  );
}
