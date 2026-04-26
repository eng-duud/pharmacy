"use client";

import { CATEGORIES, BRANDS } from "@/constants";
import { ChevronLeft, Filter, X, SlidersHorizontal } from "lucide-react";
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
  setSelectedBrand,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount =
    (selectedCategory !== "الكل" ? 1 : 0) +
    (selectedBrand !== "الكل" ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          الأقسام الطبية
        </h3>
        <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory("الكل")}
            className={`w-full text-right px-4 py-3 rounded-xl transition-all text-sm font-medium ${
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
              className={`w-full text-right px-4 py-3 rounded-xl transition-all flex items-center justify-between group text-sm ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>{category}</span>
              <ChevronLeft
                className={`w-4 h-4 transition-transform shrink-0 ${
                  selectedCategory === category
                    ? "rotate-180"
                    : "group-hover:-translate-x-1"
                }`}
              />
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
        <div className="space-y-1.5">
          <button
            onClick={() => setSelectedBrand("الكل")}
            className={`w-full text-right px-4 py-3 rounded-xl transition-all text-sm font-medium ${
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
              className={`w-full text-right px-4 py-3 rounded-xl transition-all text-sm ${
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
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:block w-72 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-fit sticky top-28 transition-colors duration-300">
        <FilterContent />
      </aside>

      {/* ── Mobile: Inline filter bar ── */}
      <div className="lg:hidden w-full space-y-3">

        {/* Row 1: Filter button + "الكل" pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-2xl font-bold text-sm shadow-sm relative shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            تصفية
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { setSelectedCategory("الكل"); setSelectedBrand("الكل"); }}
            className={`shrink-0 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
              selectedCategory === "الكل" && selectedBrand === "الكل"
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
          >
            الكل
          </button>
        </div>

        {/* Row 2: Category pills (horizontal scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === category
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Active brand chip */}
        {selectedBrand !== "الكل" && (
          <div className="flex gap-2">
            <span className="bg-teal/10 text-teal px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
              {selectedBrand}
              <button onClick={() => setSelectedBrand("الكل")}>×</button>
            </span>
          </div>
        )}
      </div>

      {/* ── Mobile Full Filter Drawer ── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-0 right-0 left-0 max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-[2rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                تصفية المنتجات
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              <FilterContent />
            </div>

            {/* Action buttons */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategory("الكل");
                  setSelectedBrand("الكل");
                }}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3.5 rounded-2xl font-bold text-sm"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-[2] bg-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20"
              >
                عرض النتائج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
