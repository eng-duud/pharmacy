"use client";

import { CATEGORIES, BRANDS } from "@/constants";
import { ChevronLeft, Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
}

export default function ProductFilter({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          الأقسام الطبية
        </h3>
        <div className="space-y-2 max-h-[500px] overflow-y-auto pl-2 custom-scrollbar">
          <button
            onClick={() => setSelectedCategory("الكل")}
            className={`w-full text-right px-4 py-2.5 rounded-xl transition-all ${
              selectedCategory === "الكل" 
                ? "bg-primary text-white shadow-md font-bold" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            جميع الأصناف
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-right px-4 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                selectedCategory === category 
                  ? "bg-primary text-white shadow-md font-bold" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>{category}</span>
              <ChevronLeft className={`w-4 h-4 transition-transform ${selectedCategory === category ? "rotate-180" : "group-hover:-translate-x-1"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-teal rounded-full" />
          الشركات والماركات
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedBrand("الكل")}
            className={`w-full text-right px-4 py-2.5 rounded-xl transition-all ${
              selectedBrand === "الكل" 
                ? "bg-teal text-white shadow-md font-bold" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            جميع الشركات
          </button>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`w-full text-right px-4 py-2.5 rounded-xl transition-all ${
                selectedBrand === brand 
                  ? "bg-teal text-white shadow-md font-bold" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-fit sticky top-28 transition-colors duration-300">
        <FilterContent />
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        >
          <Filter className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Side Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-primary dark:text-teal-light">تصفية المنتجات</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            <FilterContent />
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold mt-8 shadow-lg"
            >
              عرض النتائج
            </button>
          </div>
        </div>
      )}
    </>
  );
}
