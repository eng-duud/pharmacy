"use client";

import { addProduct } from "@/app/actions/product";
import { useState, useRef } from "react";
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
};

export default function AddProductForm({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await addProduct(formData);
      formRef.current?.reset();
      setPreview(null);
      setShowNewCategory(false);
    } catch (error) {
      alert("فشل في إضافة الدواء");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
          <Plus className="w-6 h-6 text-primary" />
          إضافة دواء جديد
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 dark:text-slate-300">اسم الدواء</label>
            <input type="text" name="name" required placeholder="مثال: فيتامين سي" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary dark:text-white" />
          </div>
          <input type="hidden" name="price" value="0" />
          
          <div>
            <label className="block text-sm font-bold mb-2 dark:text-slate-300">القسم</label>
            {!showNewCategory ? (
              <div className="flex gap-2">
                <select name="categoryId" className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary dark:text-white">
                  <option value="">اختر القسم...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button 
                  type="button" 
                  onClick={() => setShowNewCategory(true)}
                  className="p-3 bg-teal/10 text-teal rounded-2xl hover:bg-teal hover:text-white transition-all"
                  title="إضافة قسم جديد"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="newCategoryName" 
                  placeholder="اسم القسم الجديد" 
                  className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary dark:text-white" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowNewCategory(false)}
                  className="p-3 bg-red-100 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 dark:text-slate-300">صورة الدواء</label>
          <div className="relative group">
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className={`aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${preview ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 group-hover:border-primary group-hover:bg-primary/5'}`}>
              {preview ? (
                <div className="relative w-full h-full p-2">
                  <Image src={preview} alt="Preview" fill className="object-contain rounded-2xl" />
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-500">اختر صورة أو اسحبها هنا</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-bold mb-2 dark:text-slate-300">الوصف</label>
        <textarea name="description" rows={3} placeholder="اكتب تفاصيل الدواء هنا..." className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary dark:text-white"></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <Plus className="w-6 h-6" />
            إضافة الدواء للصيدلية
          </>
        )}
      </button>
    </form>
  );
}

