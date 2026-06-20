import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {

    const {
        darkMode,
        setDarkMode,
    } = useTheme();

    return (
        <motion.button
            whileTap={{
                scale: 0.9,
            }}
            whileHover={{
                scale: 1.1,
            }}
            onClick={() =>
                setDarkMode(!darkMode)
            }
            className="
      fixed
      top-6
      right-6
      z-[999]
      p-3
      rounded-full
      backdrop-blur-xl
      border
      shadow-lg
      transition-all
      duration-300
      "
            style={{
                background: darkMode
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.9)",

                borderColor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "#e5e7eb",
            }}
        >
            {darkMode ? (
                <Sun
                    size={20}
                    className="text-yellow-400"
                />
            ) : (
                <Moon
                    size={20}
                    className="text-slate-700"
                />
            )}
        </motion.button>
    );
}