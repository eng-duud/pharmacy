"use client";

import { useState, useMemo } from "react";
import ProductFilter from "@/components/ProductFilter";
import ProductGrid from "@/components/ProductGrid";
import { MOCK_PRODUCTS } from "@/constants";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedBrand, setSelectedBrand] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const categoryMatch = selectedCategory === "الكل" || product.category === selectedCategory;
      const brandMatch = selectedBrand === "الكل" || product.brand === selectedBrand;
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && brandMatch && searchMatch;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">منتجاتنا</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            استعرض مجموعتنا الواسعة من الأدوية، مستحضرات التجميل، ومنتجات العناية الصحية. نوفر لكم أفضل العلامات التجارية بجودة عالية.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <ProductFilter 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />

          {/* Product Listing */}
          <div className="flex-1 space-y-8">
            {/* Header of listing */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCategory === "الكل" ? "جميع المنتجات" : selectedCategory}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">عرض {filteredProducts.length} صنف متاح حالياً</p>
              </div>
              
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="ابحث في المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-10 shadow-sm focus:ring-2 focus:ring-primary/20 dark:focus:ring-teal/20 outline-none dark:text-white"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              </div>
            </div>

            {/* Active Filters display */}
            {(selectedCategory !== "الكل" || selectedBrand !== "الكل" || searchQuery !== "") && (
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "الكل" && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("الكل")} className="hover:text-primary-dark">×</button>
                  </span>
                )}
                {selectedBrand !== "الكل" && (
                  <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand("الكل")} className="hover:text-teal-dark">×</button>
                  </span>
                )}
                {searchQuery !== "" && (
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                    بحث: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="hover:text-slate-900 dark:hover:text-white">×</button>
                  </span>
                )}
              </div>
            )}

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>
    </main>
  );
}
