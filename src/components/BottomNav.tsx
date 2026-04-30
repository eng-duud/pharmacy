"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, FileText, Phone, MessageCircle } from "lucide-react";

const navItems = [
  {
    href: "/upload-prescription",
    label: "وصفة طبية",
    icon: FileText,
  },
  {
    href: "/products",
    label: "الأصناف",
    icon: ShoppingBag,
  },
  {
    href: "/",
    label: "الرئيسية",
    icon: Home,
    isCenter: true,
  },
  {
    href: "/contact",
    label: "تواصل معنا",
    icon: Phone,
  },
  {
    href: "https://wa.me/967770709062",
    label: "واتساب",
    icon: MessageCircle,
    isExternal: true,
    isGreen: true,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 safe-area-bottom">
      {/* Blur backdrop */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 shadow-[0_-8px_32px_rgba(0,0,0,0.08)]">
        <div className="flex items-end justify-around px-2 h-16 max-w-lg mx-auto relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !item.isExternal && pathname === item.href;

            if (item.isCenter) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center relative -top-5"
                >
                  {/* Center elevated button */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "medical-gradient shadow-primary/40 scale-105"
                        : "medical-gradient shadow-primary/30"
                    }`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span
                    className={`text-[10px] font-bold mt-1 transition-colors ${
                      isActive
                        ? "text-primary dark:text-teal-light"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            }

            if (item.isExternal) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 py-2 px-2 flex-1 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 bg-green-100 dark:bg-green-900/30 group-active:bg-green-500">
                    <Icon className="w-5 h-5 text-green-600 dark:text-green-400 group-active:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {item.label}
                  </span>
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 py-2 px-2 flex-1 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-primary/10 dark:bg-teal/20"
                      : "bg-transparent group-hover:bg-slate-100 dark:group-hover:bg-slate-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-primary dark:text-teal-light"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold transition-colors ${
                    isActive
                      ? "text-primary dark:text-teal-light"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {item.label}
                </span>
                {/* Active dot indicator */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 bg-primary dark:bg-teal-light rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
        {/* Safe area for iPhone home indicator */}
        <div className="h-safe-bottom bg-transparent" />
      </div>
    </nav>
  );
}
