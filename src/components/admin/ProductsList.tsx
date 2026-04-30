"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Edit3, Search } from "lucide-react";
import { deleteProduct } from "@/app/actions/product";
import EditProductModal from "./EditProductModal";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  categoryId: string;
  category: Category;
};

export default function ProductsList({ 
  initialProducts, 
  categories 
}: { 
  initialProducts: Product[]; 
  categories: Category[]; 
}) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState("ALL");

  const filteredProducts = initialProducts.filter(p => filter === "ALL" ? true : p.categoryId === filter);

  return (
    <div className="space-y-6">
      {/* Filter Banner */}
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl overflow-x-auto scrollbar-none border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${
            filter === "ALL"
              ? "bg-white dark:bg-slate-600 text-primary shadow-sm"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          جميع المنتجات
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${
              filter === category.id
                ? "bg-white dark:bg-slate-600 text-teal shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="p-5 font-bold text-sm">المنتج</th>
                <th className="p-5 font-bold text-sm">التصنيف</th>

                <th className="p-5 font-bold text-sm text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.map(product => (
                <tr key={product.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 relative bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                        <Image src={product.image || "/placeholder.png"} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{product.name}</p>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-[200px]">{product.description || "لا يوجد وصف"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-teal/10 text-teal rounded-full text-xs font-bold">
                      {product.category.name}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" 
                        title="تعديل"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <form action={async () => {
                        if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
                          await deleteProduct(product.id);
                        }
                      }}>
                        <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="حذف">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-3 grayscale opacity-50">
                      <Search className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-bold text-lg">لم يتم العثور على منتجات</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingProduct && (
        <EditProductModal 
          product={editingProduct} 
          categories={categories} 
          onClose={() => setEditingProduct(null)} 
        />
      )}
    </div>
  );
}
