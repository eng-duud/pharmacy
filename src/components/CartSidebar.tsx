"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 left-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col transform transition-transform">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
            <ShoppingBag className="w-5 h-5" />
            سلة المشتريات
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
              <p>السلة فارغة حالياً</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-primary font-medium"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-20 h-20 relative bg-white rounded-lg overflow-hidden shrink-0 border border-slate-100">
                  <Image src={item.image || '/placeholder.png'} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm line-clamp-2">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="font-bold text-teal dark:text-teal-400">
                      {item.price} ريال
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span className="text-slate-600 dark:text-slate-400">الإجمالي:</span>
              <span className="text-primary dark:text-primary-light">{cartTotal} ريال</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold flex items-center justify-center transition-colors"
            >
              إتمام الطلب
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
