import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const RING_R = 38;
const RING_C = 2 * Math.PI * RING_R;

const topics = [
    { name: "Mathematics", pct: 88, color: "from-purple-500 to-blue-500" },
    { name: "Physics", pct: 74, color: "from-blue-500 to-cyan-400" },
    { name: "Chemistry", pct: 91, color: "from-emerald-500 to-teal-400" },
    { name: "Biology", pct: 66, color: "from-orange-400 to-pink-500" },
];

const options = ["Mitochondria", "Nucleus", "Ribosome", "Golgi Body"];

export default function PracticeVisual() {
    const { darkMode } = useTheme();

    const cardBase = `rounded-2xl border backdrop-blur-xl ${darkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-lg"}`;

    return (
        <div className="relative w-full h-[580px] flex flex-col justify-center gap-4 overflow-hidden px-2">

            {/* Background glow */}
            <div className="absolute w-72 h-72 bg-emerald-500/10 blur-[120px] top-0 right-0 pointer-events-none" />
            <div className="absolute w-56 h-56 bg-purple-500/10 blur-[100px] bottom-0 left-0 pointer-events-none" />

            {/* Top row: Score ring + Live question */}
            <div className="flex gap-4 items-stretch">

                {/* Radial score ring */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className={`${cardBase} p-4 flex flex-col items-center justify-center w-36 shrink-0`}
                >
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg width="80" height="80" className="-rotate-90">
                            <circle cx="40" cy="40" r={RING_R} fill="none"
                                stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}
                                strokeWidth="6" />
                            <motion.circle
                                cx="40" cy="40" r={RING_R} fill="none"
                                stroke="url(#scoreGrad)" strokeWidth="6" strokeLinecap="round"
                                strokeDasharray={RING_C}
                                initial={{ strokeDashoffset: RING_C }}
                                whileInView={{ strokeDashoffset: RING_C * (1 - 0.92) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#a855f7" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">92%</span>
                        </div>
                    </div>
                    <p className={`text-xs font-semibold mt-2 text-center ${darkMode ? "text-gray-400" : "text-slate-500"}`}>Accuracy</p>
                </motion.div>

                {/* Live MCQ question */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className={`${cardBase} p-4 flex-1 relative overflow-hidden`}
                >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 blur-2xl" />
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className={`text-[10px] font-semibold uppercase tracking-wider ${darkMode ? "text-green-400" : "text-green-600"}`}>
                            Live Question
                        </span>
                    </div>
                    <p className={`text-sm font-semibold mb-3 ${darkMode ? "text-white" : "text-slate-800"}`}>
                        Powerhouse of the cell?
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                        {options.map((opt, i) => (
                            <motion.div
                                key={opt}
                                animate={i === 0 ? { backgroundColor: darkMode ? ["rgba(168,85,247,0.1)", "rgba(168,85,247,0.25)", "rgba(168,85,247,0.1)"] : ["rgba(237,233,254,0.5)", "rgba(237,233,254,1)", "rgba(237,233,254,0.5)"] } : {}}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                className={`px-2 py-1.5 rounded-lg border text-xs text-center
                                    ${i === 0
                                        ? darkMode ? "border-purple-500/40 text-purple-300" : "border-purple-300 text-purple-700"
                                        : darkMode ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-600"
                                    }`}
                            >
                                {opt}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Topic progress bars */}
            <motion.div
                whileHover={{ y: -4 }}
                className={`${cardBase} p-5`}
            >
                <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>Topic Progress</span>
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-slate-500"}`}>1250+ solved</span>
                </div>
                <div className="space-y-3">
                    {topics.map(({ name, pct, color }) => (
                        <div key={name}>
                            <div className="flex justify-between mb-1">
                                <span className={`text-xs ${darkMode ? "text-gray-300" : "text-slate-700"}`}>{name}</span>
                                <span className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-slate-500"}`}>{pct}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full ${darkMode ? "bg-white/8" : "bg-slate-100"}`}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${pct}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={`h-full rounded-full bg-gradient-to-r ${color}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom stat chips */}
            <div className="grid grid-cols-3 gap-3">
                {[["🔥", "14", "Day Streak"], ["⚡", "24/7", "Access"], ["🎯", "98%", "Completion"]].map(([icon, val, label]) => (
                    <motion.div
                        key={label}
                        whileHover={{ y: -4, scale: 1.03 }}
                        className={`${cardBase} p-3 text-center`}
                    >
                        <div className="text-lg mb-0.5">{icon}</div>
                        <div className="text-base font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">{val}</div>
                        <div className={`text-[10px] ${darkMode ? "text-gray-400" : "text-slate-500"}`}>{label}</div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
