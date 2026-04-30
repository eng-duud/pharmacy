"use client";

import { BRANDS } from "@/constants";
import { ChevronLeft, Filter, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
}

// â”€â”€ Icon mapping for each category â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€âconst CATEGORY_META: Record<string, { emoji: string; bg: string; darkBg: string }> = {
  "ط£ط¬ظ‡ط²ط© ظ‚ظٹط§ط³ ط§ظ„ط¶ط؛ط·":           { emoji: "ًں©؛", bg: "bg-red-50",      darkBg: "dark:bg-red-900/20"      }, // ط³ظ…ط§ط¹ط© ط·ط¨ظٹط©
  "ط£ط¬ظ‡ط²ط© ظ‚ظٹط§ط³ ط§ظ„ط³ظƒط±":           { emoji: "ًں©¸", bg: "bg-rose-50",     darkBg: "dark:bg-rose-900/20"     }, // ط¥ط¨ط±ط© - طھط¹ط¨ظٹط± ط¹ظ† ظ…ط±ط¶ظ‰ ط§ظ„ط³ظƒط±
  "ط¹ظ„ط§ط¬ط§طھ ط§ظ„ط³ظƒط±ظٹ":               { emoji: "ًں’‰", bg: "bg-blue-50",     darkBg: "dark:bg-blue-900/20"     }, // ط­ظ‚ظ†ط© - ط¥ظ†ط³ظˆظ„ظٹظ†
  "ظ…ط³طھظ„ط²ظ…ط§طھ ط§ظ„ط´ط¹ط±":             { emoji: "ًں’‡â€چâ™€ï¸ڈ", bg: "bg-purple-50",   darkBg: "dark:bg-purple-900/20"   }, // ط¨ط±ظˆظ„ط© ط´ط¹ط±
  "ط§ظ„ط£ط­ط²ظ…ط© ط§ظ„ط·ط¨ظٹط©":             { emoji: "ًں©¹", bg: "bg-teal-50",     darkBg: "dark:bg-teal-900/20"     }, // ط¶ظ…ط§ط¯ط© ط·ط¨ظٹط©
  "ظƒط¨ط§ط± ط§ظ„ط³ظ†":                  { emoji: "ًں§“", bg: "bg-amber-50",    darkBg: "dark:bg-amber-900/20"    }, // ط´ط®طµ ظƒط¨ظٹط±
  "ط§ظ„ط£ط·ظپط§ظ„":                    { emoji: "ًں‘¶", bg: "bg-yellow-50",   darkBg: "dark:bg-yellow-900/20"   }, // ط·ظپظ„ ط±ط¶ظٹط¹
  "ط§ظ„ظپظٹطھط§ظ…ظٹظ†ط§طھ":                 { emoji: "ًںچ‹", bg: "bg-green-50",    darkBg: "dark:bg-green-900/20"    }, // ظ„ظٹظ…ظˆظ† - ظپظٹطھط§ظ…ظٹظ† C
  "ط§ظ„ط¹ظ†ط§ظٹط© ط¨ط§ظ„ط¨ط´ط±ط©":             { emoji: "ًں¦·ًںھ§", bg: "bg-pink-50",     darkBg: "dark:bg-pink-900/20"     }, // ط¨ط´ط±ط© + ظƒط±ظٹظ…
  "ط§ظ„ط¹ظ†ط§ظٹط© ط¨ط§ظ„ط­ظˆط§ظ…ظ„":            { emoji: "ًں¤°", bg: "bg-orange-50",   darkBg: "dark:bg-orange-900/20"   }, // ط­ط§ظ…ظ„
  "ط£ط¬ظ‡ط²ط© ط§ظ„طھط¯ظ„ظٹظƒ":               { emoji: "ًں’†", bg: "bg-violet-50",   darkBg: "dark:bg-violet-900/20"   }, // ظ…ط³ط§ط¬
  "ط§ط±ط³ط§ظ„ ظˆطµظپط© ط·ط¨ظٹط© ظˆط§ط³طھط´ط§ط±ط§طھ":  { emoji: "ًں“‹", bg: "bg-sky-50",      darkBg: "dark:bg-sky-900/20"      }, // ظˆط±ظ‚ط© - ظˆطµظپط©
  "ط¹ظ„ط§ط¬ط§طھ ط§ظ„ط¶ط؛ط·":                { emoji: "â‌¤ï¸ڈâ€چًں©¹", bg: "bg-red-50",     darkBg: "dark:bg-red-900/20"     }, // ظ‚ظ„ط¨ + ط¶ظ…ط§ط¯
  "ط¹ظ„ط§ط¬ط§طھ ط§ظ„طھظ†ظپط³":               { emoji: "ًں«پ", bg: "bg-cyan-50",     darkBg: "dark:bg-cyan-900/20"     }, // ط±ط¦طھظٹظ†
  "ط¹ظ„ط§ط¬ط§طھ ط§ظ„ظ‚ظ„ط¨":                { emoji: "ًں«€", bg: "bg-rose-50",     darkBg: "dark:bg-rose-900/20"     }, // ظ‚ظ„ط¨ طھط´ط±ظٹط­ظٹ
  "ط§ظ„ظپظˆط§ط±ط§طھ":                    { emoji: "ًں«§", bg: "bg-lime-50",     darkBg: "dark:bg-lime-900/20"     }, // ط¹ظ„ط¨ط© طھط­طھظˆظٹ ط¹ظ„ظ‰ ظپظˆط§ط±ط©
  "ط§ظ„ظ…ط±ط§ظ‡ظ…":                     { emoji: "ًں¥¾", bg: "bg-orange-50",   darkBg: "dark:bg-orange-900/20"   }, // ظ…ط±ظ‡ظ… ط·ط¨ظٹط¹ظٹ
  "ط§ظ„ط¹ظ†ط§ظٹط© ط¨ط§ظ„ط£ط³ظ†ط§ظ†":            { emoji: "ًں¦·", bg: "bg-slate-50",    darkBg: "dark:bg-slate-800"       }, // ط³ظ†ط©
  "ط£طµظ†ط§ظپ ط´ط±ظƒط© NOW":              { emoji: "ًںچٹ", bg: "bg-orange-50",   darkBg: "dark:bg-orange-900/20"   }, // ط¨ط±طھظ‚ط§ظ„ - ظٹطھظˆط§ظپظ‚ ظ…ط¹ ظ„ظˆظ† NOW
  "ط´ط±ظƒط© ط¨ظٹظˆط¨ظ„ط§ظ†ط³ (BioBalance)":  { emoji: "âڑ–ï¸ڈ", bg: "bg-emerald-50",  darkBg: "dark:bg-emerald-900/20"  }, // ظ…ظٹط²ط§ظ† - طھظˆط§ط²ظ† ط¨ظٹظˆظ„ظˆط¬ظٹ
  "ط´ط±ظƒط© ط¨ظٹظˆط¯ط±ظ…ط§ (Bioderma)":     { emoji: "ًں’§", bg: "bg-sky-50",      darkBg: "dark:bg-sky-900/20"      }, // ظ‚ط·ط±ط© - طھط±ط·ظٹط¨ ط¨ط´ط±ط©
  "ط´ط±ظƒط© ط¯ظٹط±ظ…ط§ (Derma)":          { emoji: "ًںŒ¸", bg: "bg-fuchsia-50",  darkBg: "dark:bg-fuchsia-900/20"  }, // ط²ظ‡ط±ط© - ط¹ظ†ط§ظٹط© ط¨ط´ط±ط©
  "ظ…ظ†طھط¬ط§طھ ط¥ط²ط§ظ„ط© ط§ظ„ط´ط¹ط± ط§ظ„ظ†ط³ط§ط¦ظٹط©":  { emoji: "ًںھ’", bg: "bg-pink-50",     darkBg: "dark:bg-pink-900/20"     }, // ط´ظ…ط¹ط© - ط¥ط²ط§ظ„ط© ط¨ط§ظ„ط´ظ…ط¹
  "ط§ظ„ط¹ظ†ط§ظٹط© ط¨ط§ظ„ط¬ظ‡ط§ط² ط§ظ„ظ‡ط¶ظ…ظٹ":      { emoji: "ًں¦ ", bg: "bg-teal-50",     darkBg: "dark:bg-teal-900/20"     }, // ط¨ظƒطھظٹط±ظٹط§ ظ†ط§ظپط¹ط© - ط¨ط±ظˆط¨ظٹظˆطھظٹظƒ
};
erma)":       { emoji: "ًں’§", bg: "bg-sky-50",      darkBg: "dark:bg-sky-900/20"      },
  "ط´ط±ظƒط© ط¯ظٹط±ظ…ط§ (Derma)":            { emoji: "ًں§¬", bg: "bg-fuchsia-50",  darkBg: "dark:bg-fuchsia-900/20"  },
  "ظ…ظ†طھط¬ط§طھ ط¥ط²ط§ظ„ط© ط§ظ„ط´ط¹ط± ط§ظ„ظ†ط³ط§ط¦ظٹط©":    { emoji: "ًںھ’", bg: "bg-pink-50",     darkBg: "dark:bg-pink-900/20"     },
  "ط§ظ„ط¹ظ†ط§ظٹط© ط¨ط§ظ„ط¬ظ‡ط§ط² ط§ظ„ظ‡ط¶ظ…ظٹ":        { emoji: "ًں¦ ", bg: "bg-teal-50",     darkBg: "dark:bg-teal-900/20"     },
};

const DEFAULT_META = { emoji: "ًں’ٹ", bg: "bg-slate-50", darkBg: "dark:bg-slate-800" };

export default function ProductFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount =
    (selectedCategory !== "ط§ظ„ظƒظ„" ? 1 : 0) +
    (selectedBrand !== "ط§ظ„ظƒظ„" ? 1 : 0);

  // â”€â”€ Desktop sidebar list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const FilterContent = () => (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          ط§ظ„ط£ظ‚ط³ط§ظ… ط§ظ„ط·ط¨ظٹط©
        </h3>
        <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory("ط§ظ„ظƒظ„")}
            className={`w-full text-right px-4 py-3 rounded-xl transition-all text-sm font-medium flex items-center gap-3 ${
              selectedCategory === "ط§ظ„ظƒظ„"
                ? "bg-primary text-white shadow-md font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span className="text-xl">ًں”–</span>
            ط¬ظ…ظٹط¹ ط§ظ„ط£طµظ†ط§ظپ
          </button>
          {categories.map((category) => {
            const meta = CATEGORY_META[category] ?? DEFAULT_META;
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-right px-4 py-3 rounded-xl transition-all flex items-center gap-3 group text-sm ${
                  isActive
                    ? "bg-primary text-white shadow-md font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0 ${
                    isActive ? "bg-white/20" : `${meta.bg} ${meta.darkBg}`
                  }`}
                >
                  {meta.emoji}
                </span>
                <span className="flex-1 text-right">{category}</span>
                <ChevronLeft
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? "rotate-180" : "group-hover:-translate-x-1"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands Filter (Only show if BRANDS has items) */}
      {BRANDS.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-teal rounded-full" />
            ط§ظ„ط´ط±ظƒط§طھ ظˆط§ظ„ظ…ط§ط±ظƒط§طھ
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => setSelectedBrand("ط§ظ„ظƒظ„")}
              className={`w-full text-right px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                selectedBrand === "ط§ظ„ظƒظ„"
                  ? "bg-teal text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              ط¬ظ…ظٹط¹ ط§ظ„ط´ط±ظƒط§طھ
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
      )}
    </div>
  );

  return (
    <>
      {/* â”€â”€ Desktop Sidebar â”€â”€ */}
      <aside className="hidden lg:block w-72 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-fit sticky top-28 transition-colors duration-300">
        <FilterContent />
      </aside>

      {/* â”€â”€ Mobile: filter bar â”€â”€ */}
      <div className="lg:hidden w-full space-y-3" dir="rtl">

        {/* Row 1: Filter button + "ط§ظ„ظƒظ„" */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-2xl font-bold text-sm shadow-sm relative shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            طھطµظپظٹط©
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { setSelectedCategory("ط§ظ„ظƒظ„"); setSelectedBrand("ط§ظ„ظƒظ„"); }}
            className={`flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
              selectedCategory === "ط§ظ„ظƒظ„" && selectedBrand === "ط§ظ„ظƒظ„"
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
          >
            ًں”– ط§ظ„ظƒظ„
          </button>
        </div>

        {/* Row 2: Category circles (horizontal scroll) */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => {
            const meta = CATEGORY_META[category] ?? DEFAULT_META;
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="flex flex-col items-center gap-1.5 shrink-0 group"
              >
                {/* Circle image */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-200 border-2 ${
                    isActive
                      ? "border-primary bg-primary/10 dark:bg-primary/20 scale-105 shadow-lg shadow-primary/20"
                      : `border-transparent ${meta.bg} ${meta.darkBg} group-active:scale-95`
                  }`}
                >
                  {prefixEmoji(category, meta.emoji)}
                </div>
                {/* Label */}
                <span
                  className={`text-[10px] font-bold text-center leading-tight max-w-[60px] transition-colors ${
                    isActive
                      ? "text-primary dark:text-teal-light"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active brand chip */}
        {selectedBrand !== "ط§ظ„ظƒظ„" && (
          <div className="flex gap-2">
            <span className="bg-teal/10 text-teal px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
              {selectedBrand}
              <button onClick={() => setSelectedBrand("ط§ظ„ظƒظ„")}>أ—</button>
            </span>
          </div>
        )}
      </div>

      {/* â”€â”€ Mobile Full Filter Drawer (bottom sheet) â”€â”€ */}
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
            <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100 dark:border-slate-800" dir="rtl">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                طھطµظپظٹط© ط§ظ„ظ…ظ†طھط¬ط§طھ
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
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex gap-3" dir="rtl">
              <button
                onClick={() => { setSelectedCategory("ط§ظ„ظƒظ„"); setSelectedBrand("ط§ظ„ظƒظ„"); }}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3.5 rounded-2xl font-bold text-sm"
              >
                ط¥ط¹ط§ط¯ط© ط¶ط¨ط·
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-[2] bg-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20"
              >
                ط¹ط±ط¶ ط§ظ„ظ†طھط§ط¦ط¬
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function prefixEmoji(category: string, defaultEmoji: string) {
  return defaultEmoji;
}

