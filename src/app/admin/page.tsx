import prisma from "@/lib/prisma";
import { Package, ShoppingBag, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const categoriesCount = await prisma.category.count();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="w-14 h-14 bg-teal/10 text-teal rounded-xl flex items-center justify-center shrink-0">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">إجمالي المنتجات</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{productsCount}</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">الطلبات الكلية</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{ordersCount}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">الأقسام</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{categoriesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
