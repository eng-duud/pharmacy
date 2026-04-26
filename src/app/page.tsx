"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import ProductFilter from "@/components/ProductFilter";
import ProductGrid from "@/components/ProductGrid";
import { MOCK_PRODUCTS } from "@/constants";
import { Search } from "lucide-react";

export default function Home() {
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
      <Hero />

      {/* Main Content Area */}
      <section className="container mx-auto px-4 py-12 md:py-20 flex-grow">
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
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  {selectedCategory === "الكل" ? "جميع المنتجات" : selectedCategory}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">عرض {filteredProducts.length} صنف متاح حالياً</p>
              </div>
              
              <div className="relative w-full md:w-72 lg:hidden">
                <input
                  type="text"
                  placeholder="ابحث في هذا القسم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl py-3 px-10 shadow-sm focus:ring-2 focus:ring-primary/20 dark:focus:ring-teal/20 outline-none dark:text-white"
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

      {/* Call to Action Banner */}
      <section className="bg-primary py-16 mb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">هل تبحث عن علاج محدد؟</h2>
          <p className="text-primary-light text-lg mb-10 max-w-2xl mx-auto">
            لا تتردد في مراسلتنا عبر الواتساب أو إرسال وصفتك الطبية مباشرة. فريقنا الصيدلاني المتخصص جاهز لخدمتكم وتوفير كافة احتياجاتكم الطبية.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://wa.me/967770709062" 
              target="_blank" 
              className="bg-white text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              تحدث معنا عبر الواتساب
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
