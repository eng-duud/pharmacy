"use client";

import { useState } from "react";
import { Lock, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ADCPanLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      
      if (res.ok) {
        window.location.href = "/adcpanforpharmacyquds";
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 font-tajawal" dir="rtl">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-center text-slate-800 dark:text-white mb-2">منطقة محظورة</h1>
        <p className="text-slate-500 text-center mb-8 text-sm font-bold">يرجى إدخال رمز المرور السري للوصول إلى لوحة التحكم</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-red-500 dark:text-white text-center text-xl tracking-widest outline-none transition-all"
              required
              dir="ltr"
            />
          </div>
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center animate-in slide-in-from-top-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-2xl font-bold transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? "جاري التحقق..." : "تأكيد الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
