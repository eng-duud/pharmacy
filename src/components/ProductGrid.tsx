"use client";

import { Product } from "@/constants";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface GridProps {
  products: Product[];
}

export default function ProductGrid({ products }: GridProps) {
  const { addToCart } = useCart();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 transition-colors">
          <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
          عذراً، لم نجد أي منتجات
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          حاول تغيير خيارات البحث أو التصفية
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: index * 0.04 }}
          className="group bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 transition-all relative overflow-hidden flex flex-col"
        >
          {/* Badge */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-teal text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-md">
            جديد
          </div>

          {/* Wishlist on mobile - always visible */}
          <button className="absolute top-2 left-2 md:top-4 md:left-4 z-10 w-7 h-7 md:w-8 md:h-8 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
            <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          {/* Image Container */}
          <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl md:rounded-2xl mb-3 md:mb-4 overflow-hidden relative transition-colors">
            <div className="w-full h-full medical-gradient opacity-10 dark:opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center text-primary/20 dark:text-teal-light/10 font-black text-5xl md:text-6xl select-none">
              ق
            </div>

            {/* Quick Add — desktop hover overlay only */}
            <div className="hidden md:flex absolute inset-0 bg-primary/20 dark:bg-teal/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-3">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({ id: product.id.toString(), name: product.name, price: product.price, image: product.image });
                }}
                className="bg-white dark:bg-slate-800 p-3 rounded-full text-primary dark:text-teal-light hover:bg-primary dark:hover:bg-teal hover:text-white transition-colors shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="bg-white dark:bg-slate-800 p-3 rounded-full text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors shadow-lg">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 gap-1.5 md:gap-2">
            {/* Brand + Category */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[9px] md:text-[10px] font-bold text-teal bg-teal/5 px-1.5 py-0.5 rounded-md truncate max-w-[80px] md:max-w-none">
                {product.brand || "القدس"}
              </span>
              <span className="text-[9px] md:text-[10px] font-medium text-slate-400 truncate">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h3 className="font-bold text-xs md:text-sm text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-teal-light transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>

            {/* Price */}
            <div className="font-bold text-teal dark:text-teal-400 text-sm md:text-base">
              {product.price} ريال
            </div>

            {/* CTA Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({ id: product.id.toString(), name: product.name, price: product.price, image: product.image });
              }}
              className="mt-auto pt-2 w-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-teal-light text-center py-2 rounded-xl text-xs md:text-sm font-bold hover:bg-primary hover:text-white dark:hover:bg-teal dark:hover:text-white transition-all active:scale-95 block"
            >
              أضف للسلة
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
