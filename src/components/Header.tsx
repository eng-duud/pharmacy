"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme === "dark" || (!theme && prefersDark)) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDark, mounted]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 medical-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            ق
          </div>
          <span className="text-xl font-black text-primary dark:text-white tracking-tight">
            صيدلية <span className="text-teal dark:text-teal-light">القدس</span>
          </span>
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {!mounted ? (
            <div className="w-5 h-5" />
          ) : isDark ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

      </div>
    </header>
  );
}
