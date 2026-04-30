import prisma from "@/lib/prisma";
import { Package, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const categoriesCount = await prisma.category.count();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Card */}
        <Link href="/admin/products" className="block group">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md hover:border-teal/30 dark:hover:border-teal/50 transition-all duration-300">
            <div className="w-14 h-14 bg-teal/10 text-teal rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-teal transition-colors">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{productsCount}</p>
            </div>
          </div>
        </Link>

        {/* Orders Card */}
        <Link href="/admin/orders" className="block group">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">الطلبات الكلية</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{ordersCount}</p>
            </div>
          </div>
        </Link>

        {/* Categories Card */}
        <Link href="/admin/categories" className="block group">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md hover:border-orange-500/30 dark:hover:border-orange-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-orange-500 transition-colors">الأقسام</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{categoriesCount}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
