import Link from "next/link";
import { Package, ShoppingBag, LayoutDashboard, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-sm hidden md:block z-20 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 pb-2 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-black text-primary dark:text-white">لوحة التحكم</h2>
          <p className="text-sm text-slate-500 mt-1">صيدلية القدس</p>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>الرئيسية</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Package className="w-5 h-5" />
            <span>المنتجات</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span>الطلبات</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 w-full">
        {children}
      </main>
    </div>
  );
}
