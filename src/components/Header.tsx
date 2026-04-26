"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            ق
          </div>
          <span className="text-2xl font-black text-primary dark:text-white tracking-tight">صيدلية <span className="text-teal dark:text-teal-light">القدس</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-300 font-medium">
          <Link href="/" className="hover:text-primary dark:hover:text-teal-light transition-colors">الرئيسية</Link>
          <Link href="/products" className="hover:text-primary dark:hover:text-teal-light transition-colors">المنتجات</Link>
          <Link href="/upload-prescription" className="hover:text-primary dark:hover:text-teal-light transition-colors">إرسال وصفة</Link>
          <Link href="/contact" className="hover:text-primary dark:hover:text-teal-light transition-colors">تواصل معنا</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              className="bg-slate-100 dark:bg-slate-800 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-primary/20 dark:focus:ring-teal/20 w-64 text-sm dark:text-white"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {!mounted ? (
              <div className="w-6 h-6" />
            ) : isDark ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>

          <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 left-0 bg-teal text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 font-bold">
              0
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              className="bg-slate-100 border-none rounded-lg py-3 px-10 w-full text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
          <nav className="flex flex-col gap-4 text-slate-600 font-medium">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-slate-50">الرئيسية</Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-slate-50">المنتجات</Link>
            <Link href="/upload-prescription" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-slate-50">إرسال وصفة</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="py-2">تواصل معنا</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
