import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, MessageCircle, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />

      {/* ── Quick Actions ── */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {/* Products */}
          <Link
            href="/products"
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                تصفح المنتجات
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                أجهزة طبية، فيتامينات، عناية وأكثر
              </p>
            </div>
            <span className="mt-auto flex items-center gap-1 text-primary dark:text-teal-light font-bold text-sm group-hover:gap-2 transition-all">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>

          {/* Prescription */}
          <Link
            href="/upload-prescription"
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-teal/10 hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-all">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                إرسال وصفة طبية
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                أرسل وصفتك ونجهز طلبك فوراً
              </p>
            </div>
            <span className="mt-auto flex items-center gap-1 text-teal dark:text-teal-light font-bold text-sm group-hover:gap-2 transition-all">
              إرسال الآن <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/967770709062"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                تواصل عبر واتساب
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                فريقنا جاهز للرد على استفساراتكم
              </p>
            </div>
            <span className="mt-auto flex items-center gap-1 text-green-600 font-bold text-sm group-hover:gap-2 transition-all">
              ابدأ المحادثة <ArrowLeft className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary py-14 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6">
            هل تبحث عن علاج محدد؟
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            لا تتردد في مراسلتنا أو إرسال وصفتك الطبية مباشرة. فريقنا
            الصيدلاني المتخصص جاهز لخدمتكم.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
            <Link
              href="/products"
              className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-base md:text-lg hover:shadow-2xl transition-all"
            >
              تصفح المنتجات
            </Link>
            <a
              href="https://wa.me/967770709062"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all"
            >
              تحدث معنا عبر الواتساب
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
