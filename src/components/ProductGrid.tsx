"use client";

import { Product } from "@/constants";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface GridProps {
  products: Product[];
}

export default function ProductGrid({ products }: GridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 transition-colors">
          <ShoppingCart className="w-10 h-10 text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">عذراً، لم نجد أي منتجات</h3>
        <p className="text-slate-500 dark:text-slate-400">حاول تغيير خيارات البحث أو التصفية</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 transition-all relative overflow-hidden"
        >
          {/* Discount Badge Example */}
          <div className="absolute top-4 right-4 z-10 bg-teal text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            جديد
          </div>

          {/* Image Container */}
          <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl mb-4 overflow-hidden relative transition-colors">
            <div className="w-full h-full medical-gradient opacity-10 dark:opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center text-primary/20 dark:text-teal-light/10 font-black text-6xl select-none">
              ق
            </div>
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-primary/20 dark:bg-teal/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button className="bg-white dark:bg-slate-800 p-3 rounded-full text-primary dark:text-teal-light hover:bg-primary dark:hover:bg-teal hover:text-white transition-colors shadow-lg">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="bg-white dark:bg-slate-800 p-3 rounded-full text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors shadow-lg">
                <Heart className="w-5 h-5" />
              </button>
              <button className="bg-white dark:bg-slate-800 p-3 rounded-full text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-teal-light transition-colors shadow-lg">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-teal bg-teal/5 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {product.brand || "صيدلية القدس"}
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                {product.category}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-teal-light transition-colors truncate">
              {product.name}
            </h3>
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-xl font-black text-primary dark:text-teal-light">
                  {product.price.toLocaleString()} <span className="text-xs font-bold">ريال</span>
                </span>
              </div>
              <button className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary dark:hover:bg-teal hover:text-white transition-colors">
                أضف للسلة
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
