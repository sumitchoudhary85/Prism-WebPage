import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const orbitNodes = [
    { label: "🧬 DNA", angle: 0, orbit: 130, dur: 14 },
    { label: "⚛️ Atom", angle: 90, orbit: 130, dur: 14 },
    { label: "🌍 Globe", angle: 180, orbit: 130, dur: 14 },
    { label: "🔭 Space", angle: 270, orbit: 130, dur: 14 },
    { label: "🏛️ History", angle: 45, orbit: 190, dur: 20 },
    { label: "⚙️ Engine", angle: 225, orbit: 190, dur: 20 },
];

export default function ARStudioVisual() {
    const { darkMode } = useTheme();

    return (
        <div className="relative w-full h-[580px] flex justify-center items-center overflow-hidden">

            {/* Background glows */}
            <div className="absolute w-80 h-80 bg-blue-500/20 blur-[130px]" />
            <div className="absolute w-52 h-52 bg-purple-500/15 blur-[100px] -translate-x-16" />

            {/* Outer orbit ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-96 h-96 rounded-full"
                style={{
                    border: darkMode ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(59,130,246,0.3)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.08)",
                }}
            >
                {/* Satellite on outer orbit */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-400/50" />
            </motion.div>

            {/* Inner orbit ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                className="absolute w-64 h-64 rounded-full"
                style={{
                    border: darkMode ? "1px solid rgba(168,85,247,0.25)" : "1px solid rgba(168,85,247,0.35)",
                    boxShadow: "0 0 20px rgba(168,85,247,0.08)",
                }}
            >
                {/* Satellite on inner orbit */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg shadow-purple-400/50" />
            </motion.div>

            {/* Floating AR annotation labels */}
            {[
                { label: "🧬 DNA Strand", top: "12%", left: "5%", y: [-6, 6, -6], dur: 4 },
                { label: "⚛️ Atomic Model", top: "15%", right: "4%", y: [6, -6, 6], dur: 5 },
                { label: "🌍 3D Globe", bottom: "18%", left: "4%", y: [-8, 8, -8], dur: 4.5 },
                { label: "⚙️ Simulation", bottom: "12%", right: "5%", y: [8, -8, 8], dur: 5.5 },
            ].map(({ label, top, left, right, bottom, y, dur }) => (
                <motion.div
                    key={label}
                    animate={{ y }}
                    transition={{ duration: dur, repeat: Infinity }}
                    style={{ top, left, right, bottom }}
                    className={`absolute px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-xl
                        ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-700 shadow-md"}`}
                >
                    {label}
                </motion.div>
            ))}

            {/* Phone mockup */}
            <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative z-10"
            >
                {/* Neon glow around phone */}
                <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-[40px] pointer-events-none"
                    style={{ boxShadow: "0 0 32px 6px rgba(59,130,246,0.35), 0 0 70px 10px rgba(168,85,247,0.2)" }}
                />

                <div
                    className="w-52 h-[380px] rounded-[40px] border overflow-hidden flex flex-col"
                    style={{
                        background: darkMode
                            ? "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(59,130,246,0.1))"
                            : "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(219,234,254,0.8))",
                        border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(59,130,246,0.2)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {/* Phone top bar */}
                    <div className="flex items-center justify-between px-4 pt-4 pb-2">
                        <span className={`text-xs font-semibold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>AR Studio</span>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        </div>
                    </div>

                    {/* Scan lines overlay */}
                    <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-[0.04] pointer-events-none"
                            style={{
                                backgroundImage: "repeating-linear-gradient(0deg, rgba(59,130,246,1) 0px, transparent 1px, transparent 6px)",
                            }}
                        />

                        {/* Moving scan line */}
                        <motion.div
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent pointer-events-none"
                        />

                        {/* 3D rotating object */}
                        <div className="relative flex items-center justify-center">
                            <motion.div
                                animate={{ rotateY: 360, rotateX: 15 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                style={{ transformStyle: "preserve-3d" }}
                                className="w-20 h-20"
                            >
                                <div
                                    className="w-20 h-20 rounded-2xl"
                                    style={{
                                        background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                                        boxShadow: "0 0 30px rgba(59,130,246,0.5)",
                                    }}
                                />
                            </motion.div>

                            {/* Corner AR brackets */}
                            {[
                                "top-[-12px] left-[-12px] border-t-2 border-l-2",
                                "top-[-12px] right-[-12px] border-t-2 border-r-2",
                                "bottom-[-12px] left-[-12px] border-b-2 border-l-2",
                                "bottom-[-12px] right-[-12px] border-b-2 border-r-2",
                            ].map((cls, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                    className={`absolute w-4 h-4 border-blue-400 ${cls}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom label */}
                    <div className="px-4 pb-5 pt-2 text-center">
                        <p className={`text-xs font-semibold tracking-widest uppercase ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                            Interactive 3D Model
                        </p>
                        <div className="flex justify-center gap-2 mt-2">
                            {["Rotate", "Scale", "Inspect"].map((a) => (
                                <span
                                    key={a}
                                    className={`text-[10px] px-2 py-0.5 rounded-full border ${darkMode ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-500"}`}
                                >
                                    {a}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
