import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const getInitialTheme = () => {
        //If user already chose a theme before → use it
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme;

        //Otherwise, detect from system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`relative w-16 h-8 flex items-center rounded-full transition-colors duration-500 ${
                theme === "dark" ? "bg-zinc-700" : "bg-gray-300"
            }`}
        >
      <span
          className={`absolute left-1 flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 transform ${
              theme === "dark" ? "translate-x-8 bg-yellow-400" : "translate-x-0"
          }`}
      >
        {theme === "dark" ? (
            <Moon size={14} className="text-gray-800" />
        ) : (
            <Sun size={14} className="text-yellow-500" />
        )}
      </span>
        </button>
    );
}
