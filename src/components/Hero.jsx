import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
    BookOpen,
    Brain,
    Boxes,
    BarChart3,
    ArrowRight
} from "lucide-react";

export default function Hero() {
    const { darkMode } = useTheme();
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

            {/* Background Glow */}
            <div className="absolute top-20 left-20 w-80 h-80 bg-purple-600/20 blur-[120px]" />

            <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600/20 blur-[120px]" />

            {/* Floating Icons */}
            <motion.div
                animate={{
                    y: [0, -20, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity
                }}
                className="absolute top-32 left-16 hidden lg:flex"
            >
                <div
                    className={`p-5 rounded-3xl border backdrop-blur-xl ${darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-slate-200 shadow-lg"
                        }`}
                >
                    <BookOpen size={35} className="text-purple-400" />
                </div>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 20, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity
                }}
                className="absolute top-40 right-20 hidden lg:flex"
            >
                <div
                    className={`p-5 rounded-3xl border backdrop-blur-xl ${darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-slate-200 shadow-lg"
                        }`}
                >
                    <Boxes size={35} className="text-blue-400" />
                </div>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, -15, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity
                }}
                className="absolute bottom-32 left-24 hidden lg:flex"
            >
                <div
                    className={`p-5 rounded-3xl border backdrop-blur-xl ${darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-slate-200 shadow-lg"
                        }`}
                >
                    <BarChart3 size={35} className="text-green-400" />
                </div>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 15, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity
                }}
                className="absolute bottom-32 right-24 hidden lg:flex"
            >
                <div
                    className={`p-5 rounded-3xl border backdrop-blur-xl ${darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-slate-200 shadow-lg"
                        }`}
                >
                    <Brain size={35} className="text-pink-400" />
                </div>
            </motion.div>

            {/* Center Content */}
            <div className="max-w-6xl mx-auto text-center relative z-10">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 mb-8"
                >
                    ✨ The Future of Learning
                </motion.div>

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 60
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                    className="text-6xl md:text-8xl lg:text-[110px] font-bold leading-none mb-8"
                >
                    <span
                        className={
                            darkMode
                                ? "text-white"
                                : "text-slate-900"
                        }
                    >
                        PRISM
                    </span>

                    <span className="block gradient-text mt-4">
                        Learn Beyond Limits
                    </span>
                </motion.h1>

                <motion.p
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.5,
                        duration: 1
                    }}
                    className={`text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 ${darkMode
                        ? "text-gray-400"
                        : "text-slate-600"
                        }`}
                >
                    Transform learning through
                    <span
                        className={`font-semibold ${darkMode
                            ? "text-white"
                            : "text-slate-900"
                            }`}
                    >
                        {" "}Flashcards
                    </span>,
                    <span
                        className={`font-semibold ${darkMode
                            ? "text-white"
                            : "text-slate-900"
                            }`}
                    >
                        {" "}AR Studio
                    </span>,
                    <span
                        className={`font-semibold ${darkMode
                            ? "text-white"
                            : "text-slate-900"
                            }`}
                    >
                        {" "}Practice
                    </span>
                    , and
                    <span
                        className={`font-semibold ${darkMode
                            ? "text-white"
                            : "text-slate-900"
                            }`}
                    >
                        {" "}MindSpace
                    </span>
                    .
                    <br />
                    One ecosystem. Infinite possibilities.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.7
                    }}
                    className="flex flex-col sm:flex-row justify-center gap-5"
                >
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-105 transition duration-300 flex items-center justify-center gap-2">
                        Start Learning
                        <ArrowRight size={18} />
                    </button>

                    <button
                        className={`px-8 py-4 rounded-xl transition duration-300 ${darkMode
                            ? "border border-white/10 text-white hover:bg-white/5"
                            : "border border-slate-300 text-slate-900 hover:bg-slate-100"
                            }`}
                    >
                        Explore PRISM
                    </button>
                </motion.div>

                {/* Feature Cards */}
                <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-5">

                    <motion.div
                        whileHover={{
                            y: -10
                        }}
                        className={`rounded-3xl p-6 border backdrop-blur-xl ${darkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-slate-200 shadow-xl"
                            }`}
                    >
                        <BookOpen
                            className="text-purple-400 mb-4 mx-auto"
                            size={32}
                        />

                        <h3
                            className={`font-semibold mb-2 ${darkMode
                                ? "text-white"
                                : "text-slate-900"
                                }`}
                        >
                            Flashcards
                        </h3>

                        <p
                            className={`text-sm ${darkMode
                                ? "text-gray-400"
                                : "text-slate-600"
                                }`}
                        >
                            Learn & Revise Faster
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -10
                        }}
                        className={`rounded-3xl p-6 border backdrop-blur-xl ${darkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-slate-200 shadow-xl"
                            }`}
                    >
                        <Boxes
                            className="text-blue-400 mb-4 mx-auto"
                            size={32}
                        />

                        <h3
                            className={`font-semibold mb-2 ${darkMode
                                ? "text-white"
                                : "text-slate-900"
                                }`}
                        >
                            AR Studio
                        </h3>

                        <p
                            className={`text-sm ${darkMode
                                ? "text-gray-400"
                                : "text-slate-600"
                                }`}
                        >
                            Immersive 3D Learning
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -10
                        }}
                        className={`rounded-3xl p-6 border backdrop-blur-xl ${darkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-slate-200 shadow-xl"
                            }`}
                    >
                        <BarChart3
                            className="text-green-400 mb-4 mx-auto"
                            size={32}
                        />

                        <h3
                            className={`font-semibold mb-2 ${darkMode
                                ? "text-white"
                                : "text-slate-900"
                                }`}
                        >
                            Practice
                        </h3>

                        <p
                            className={`text-sm ${darkMode
                                ? "text-gray-400"
                                : "text-slate-600"
                                }`}
                        >
                            Master Through Action
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -10
                        }}
                        className={`rounded-3xl p-6 border backdrop-blur-xl ${darkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-slate-200 shadow-xl"
                            }`}
                    >
                        <Brain
                            className="text-pink-400 mb-4 mx-auto"
                            size={32}
                        />

                        <h3
                            className={`font-semibold mb-2 ${darkMode
                                ? "text-white"
                                : "text-slate-900"
                                }`}
                        >
                            MindSpace
                        </h3>

                        <p
                            className={`text-sm ${darkMode
                                ? "text-gray-400"
                                : "text-slate-600"
                                }`}
                        >
                            Grow Beyond Academics
                        </p>
                    </motion.div>

                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{
                        y: [0, 10, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2
                    }}
                    className="mt-20 flex justify-center"
                >
                    <div
                        className={`w-7 h-12 rounded-full flex justify-center ${darkMode
                            ? "border border-white/20"
                            : "border border-slate-300"
                            }`}
                    >
                        <div
                            className={`w-1 h-3 rounded-full mt-2 ${darkMode
                                ? "bg-white"
                                : "bg-slate-700"
                                }`}
                        ></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}