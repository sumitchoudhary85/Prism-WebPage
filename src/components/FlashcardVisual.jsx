import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const subjects = ["Biology", "Math", "History", "Science"];

const RING_RADIUS = 36;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function FlashcardVisual() {
    const { darkMode } = useTheme();

    return (
        <div className="relative w-full h-[580px] flex items-center justify-center overflow-hidden">

            {/* Background Glows */}
            <div className="absolute w-96 h-96 bg-purple-500/25 blur-[140px]" />
            <div className="absolute w-64 h-64 bg-blue-500/15 blur-[100px] translate-x-20 translate-y-10" />

            {/* Subject Chips */}
            {[
                { label: subjects[0], pos: "top-10 left-10", y: [-10, 10, -10], dur: 4 },
                { label: subjects[1], pos: "top-20 right-10", y: [10, -10, 10], dur: 5 },
                { label: subjects[2], pos: "bottom-24 left-16", y: [-8, 8, -8], dur: 4.5 },
                { label: subjects[3], pos: "bottom-14 right-16", y: [8, -8, 8], dur: 5.5 },
            ].map(({ label, pos, y, dur }) => (
                <motion.div
                    key={label}
                    animate={{ y }}
                    transition={{ duration: dur, repeat: Infinity }}
                    className={`absolute ${pos} px-4 py-2 rounded-full border backdrop-blur-xl text-sm font-medium
                        ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-800 shadow-lg"}`}
                >
                    {label}
                </motion.div>
            ))}

            {/* Back Stack Cards — holographic tint */}
            <motion.div
                animate={{ rotate: [-8, -5, -8], y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute w-80 h-52 rounded-3xl"
                style={{
                    background: darkMode
                        ? "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.15))"
                        : "linear-gradient(135deg, #ede9fe, #dbeafe)",
                    border: "1px solid rgba(168,85,247,0.3)",
                    boxShadow: "0 0 30px rgba(168,85,247,0.15)",
                }}
            />
            <motion.div
                animate={{ rotate: [8, 5, 8], y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute w-80 h-52 rounded-3xl"
                style={{
                    background: darkMode
                        ? "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.15))"
                        : "linear-gradient(135deg, #dbeafe, #ede9fe)",
                    border: "1px solid rgba(59,130,246,0.3)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.15)",
                }}
            />

            {/* Neon Border Glow Ring around card */}
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[340px] h-[228px] rounded-3xl pointer-events-none"
                style={{
                    background: "transparent",
                    boxShadow: "0 0 24px 4px rgba(168,85,247,0.45), 0 0 60px 8px rgba(59,130,246,0.25)",
                    border: "1.5px solid rgba(168,85,247,0.4)",
                }}
            />

            {/* Main Flipping Card */}
            <motion.div
                animate={{ rotateY: [0, 180, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-80 h-52"
            >
                {/* FRONT — Holographic Glass */}
                <div
                    style={{
                        backfaceVisibility: "hidden",
                        background: darkMode
                            ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(168,85,247,0.12), rgba(59,130,246,0.08))"
                            : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(237,233,254,0.8), rgba(219,234,254,0.7))",
                        border: darkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(168,85,247,0.25)",
                        backdropFilter: "blur(20px)",
                        backgroundSize: "200% 200%",
                    }}
                    className="absolute inset-0 rounded-3xl flex flex-col justify-center items-center text-center px-8 overflow-hidden shadow-2xl"
                >
                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    {/* Shimmer sweep */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                        }}
                    />
                    <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-purple-500">
                        Question
                    </span>
                    <motion.div
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-10 h-10 mb-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-lg shadow-lg shadow-purple-500/30"
                    >
                        🌿
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        What is Photosynthesis?
                    </h3>
                    <p className={darkMode ? "text-gray-400 text-sm" : "text-slate-500 text-sm"}>
                        Think before flipping...
                    </p>
                </div>

                {/* BACK — Holographic Glass */}
                <div
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        background: darkMode
                            ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(59,130,246,0.14), rgba(16,185,129,0.08))"
                            : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(209,250,229,0.8), rgba(219,234,254,0.7))",
                        border: darkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(16,185,129,0.3)",
                        backdropFilter: "blur(20px)",
                    }}
                    className="absolute inset-0 rounded-3xl flex flex-col justify-center items-center text-center px-8 overflow-hidden shadow-2xl"
                >
                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    {/* Shimmer sweep */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 4 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                        }}
                    />
                    <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-emerald-500">
                        Answer
                    </span>
                    <div className="w-10 h-10 mb-3 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-lg shadow-lg shadow-emerald-500/30">
                        ✓
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        Plants convert sunlight into energy using chlorophyll.
                    </h3>
                    <p className={darkMode ? "text-gray-400 text-sm" : "text-slate-500 text-sm"}>
                        Active Recall • Long-Term Retention
                    </p>
                </div>
            </motion.div>

            {/* Mastery Ring */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg width="80" height="80" className="-rotate-90">
                        {/* Track */}
                        <circle
                            cx="40" cy="40" r={RING_RADIUS}
                            fill="none"
                            stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
                            strokeWidth="6"
                        />
                        {/* Animated fill */}
                        <motion.circle
                            cx="40" cy="40" r={RING_RADIUS}
                            fill="none"
                            stroke="url(#ringGrad)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={RING_CIRCUMFERENCE}
                            animate={{ strokeDashoffset: [RING_CIRCUMFERENCE, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <defs>
                            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Center label */}
                    <div className="absolute flex flex-col items-center">
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 8, repeat: Infinity, times: [0, 0.95, 1] }}
                            className="text-lg"
                        >
                            ⭐
                        </motion.span>
                    </div>
                    {/* Star burst on complete */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: [0, 0, 1, 0],
                                scale: [0, 0, 1.5, 0],
                                x: [0, 0, Math.cos((angle * Math.PI) / 180) * 28, Math.cos((angle * Math.PI) / 180) * 36],
                                y: [0, 0, Math.sin((angle * Math.PI) / 180) * 28, Math.sin((angle * Math.PI) / 180) * 36],
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeOut", times: [0, 0.9, 0.96, 1] }}
                            className="absolute text-xs"
                        >
                            ✦
                        </motion.div>
                    ))}
                </div>
                <span className={`text-xs font-semibold tracking-widest uppercase ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
                    Mastery
                </span>
            </div>

        </div>
    );
}
