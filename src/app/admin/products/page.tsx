import prisma from "@/lib/prisma";
import AddProductForm from "@/components/AddProductForm";
import Image from "next/image";
import { deleteProduct } from "@/app/actions/product";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">إدارة المنتجات</h1>
      
      <AddProductForm />

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold dark:text-white">المنتجات الحالية ({products.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="p-4 font-medium">المنتج</th>
                <th className="p-4 font-medium">القسم</th>
                <th className="p-4 font-medium">السعر</th>
                <th className="p-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.map(product => {
                const deleteAction = deleteProduct.bind(null, product.id);
                return (
                  <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <Image src={product.image || "/placeholder.png"} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold dark:text-white">{product.name}</span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{product.category.name}</td>
                    <td className="p-4 font-bold text-teal">{product.price} ريال</td>
                    <td className="p-4">
                      <form action={deleteAction}>
                        <button type="submit" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                          حذف
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">لا يوجد منتجات حالياً. أضف منتجاً جديداً للبدء.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
