import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const traits = [
    { label: "🎯 Focus", angle: 270, r: 140 },
    { label: "💡 Creativity", angle: 330, r: 150 },
    { label: "💪 Confidence", angle: 30, r: 145 },
    { label: "📈 Productivity", angle: 90, r: 140 },
    { label: "🤝 Leadership", angle: 150, r: 150 },
    { label: "🧘 Mindfulness", angle: 210, r: 145 },
];

const goalItems = [
    { label: "Read 20 min daily", done: true },
    { label: "Morning reflection", done: true },
    { label: "Practice deep focus", done: false },
    { label: "Review weekly goals", done: false },
];

function polarToXY(angleDeg, r, cx = 200, cy = 200) {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function MindspaceVisual() {
    const { darkMode } = useTheme();

    return (
        <div className="relative w-full h-[580px] flex items-center justify-center overflow-hidden">

            {/* Background glows */}
            <div className="absolute w-80 h-80 bg-purple-500/20 blur-[130px]" />
            <div className="absolute w-52 h-52 bg-pink-500/10 blur-[100px] translate-x-20 -translate-y-10" />

            {/* SVG neural web */}
            <svg
                className="absolute"
                width="400" height="400"
                viewBox="0 0 400 400"
                style={{ overflow: "visible" }}
            >
                {traits.map(({ angle, r }, i) => {
                    const { x, y } = polarToXY(angle, r);
                    return (
                        <motion.line
                            key={i}
                            x1="200" y1="200"
                            x2={x} y2={y}
                            stroke={darkMode ? "rgba(168,85,247,0.25)" : "rgba(168,85,247,0.2)"}
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            animate={{ strokeDashoffset: [0, -16] }}
                            transition={{
                                pathLength: { duration: 1, delay: i * 0.15 },
                                opacity: { duration: 0.5, delay: i * 0.15 },
                                strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" },
                            }}
                        />
                    );
                })}
                {/* Pulse dots on lines */}
                {traits.map(({ angle, r }, i) => {
                    const { x, y } = polarToXY(angle, r * 0.5);
                    return (
                        <motion.circle
                            key={`dot-${i}`}
                            cx={x} cy={y} r="3"
                            fill={i % 2 === 0 ? "#a855f7" : "#3b82f6"}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                        />
                    );
                })}
            </svg>

            {/* Trait bubbles */}
            {traits.map(({ label, angle, r }, i) => {
                const { x, y } = polarToXY(angle, r);
                return (
                    <motion.div
                        key={label}
                        animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                        style={{
                            position: "absolute",
                            left: `calc(50% + ${x - 200}px)`,
                            top: `calc(50% + ${y - 200}px)`,
                            transform: "translate(-50%, -50%)",
                        }}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-xl whitespace-nowrap
                            ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-700 shadow-md"}`}
                    >
                        {label}
                    </motion.div>
                );
            })}

            {/* Center breathing orb */}
            <div className="relative flex items-center justify-center z-10">
                {/* Outer pulse rings */}
                {[1, 1.4, 1.8].map((scale, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [scale, scale + 0.15, scale], opacity: [0.15, 0.3, 0.15] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                        className="absolute rounded-full"
                        style={{
                            width: 80, height: 80,
                            background: "radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)",
                        }}
                    />
                ))}
                {/* Core orb */}
                <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl z-10"
                    style={{
                        background: "linear-gradient(135deg, #a855f7, #3b82f6, #ec4899)",
                        boxShadow: "0 0 50px rgba(168,85,247,0.6), 0 0 100px rgba(59,130,246,0.3)",
                    }}
                >
                    🧠
                </motion.div>
            </div>

            {/* Goal tracker card — bottom */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-64 rounded-2xl border p-4 backdrop-blur-xl
                    ${darkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-xl"}`}
            >
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                        Today's Goals
                    </span>
                </div>
                <div className="space-y-2">
                    {goalItems.map(({ label, done }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] shrink-0
                                ${done
                                    ? "bg-gradient-to-r from-purple-500 to-blue-500 border-transparent text-white"
                                    : darkMode ? "border-white/20" : "border-slate-300"
                                }`}>
                                {done ? "✓" : ""}
                            </div>
                            <span className={`text-xs ${done
                                ? darkMode ? "text-gray-300 line-through" : "text-slate-500 line-through"
                                : darkMode ? "text-gray-200" : "text-slate-700"}`}>
                                {label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}
