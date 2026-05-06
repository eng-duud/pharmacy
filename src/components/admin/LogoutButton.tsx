"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed", error);
      window.location.href = "/";
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-all font-bold"
    >
      <LogOut className="w-5 h-5" />
      <span>تسجيل الخروج (العودة للمتجر)</span>
    </button>
  );
}
