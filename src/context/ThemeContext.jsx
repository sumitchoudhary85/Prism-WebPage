import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("prism-theme");
        return saved === "dark";
    });

    useEffect(() => {
        localStorage.setItem(
            "prism-theme",
            darkMode ? "dark" : "light"
        );

        document.documentElement.classList.toggle(
            "dark",
            darkMode
        );
    }, [darkMode]);

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () =>
    useContext(ThemeContext);