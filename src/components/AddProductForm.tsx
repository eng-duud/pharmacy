"use client";

import { addProduct } from "@/app/actions/product";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await addProduct(formData);
    e.currentTarget.reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">إضافة منتج جديد</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 dark:text-slate-300">اسم المنتج</label>
          <input type="text" name="name" required className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1 dark:text-slate-300">السعر (ريال)</label>
          <input type="number" name="price" required className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1 dark:text-slate-300">القسم</label>
          <input type="text" name="categoryName" required placeholder="مثال: أدوية، عناية" className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1 dark:text-slate-300">رابط الصورة (اختياري)</label>
          <input type="text" name="image" placeholder="/products/bp-monitor.jpg" className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm mb-1 dark:text-slate-300">الوصف (اختياري)</label>
        <textarea name="description" rows={3} className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white"></textarea>
      </div>

      <button type="submit" disabled={loading} className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50">
        <Plus className="w-5 h-5" />
        {loading ? "جاري الإضافة..." : "إضافة المنتج"}
      </button>
    </form>
  );
}
