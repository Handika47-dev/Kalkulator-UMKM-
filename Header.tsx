import React from "react";
import { Landmark, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function Header() {
  return (
    <header className="relative w-full border-b border-amber-200 bg-white shadow-sm overflow-hidden" id="navigation-header">
      {/* Red and White banner on top, characteristic of Indonesia */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-red-600 bg-[length:200%_auto] animate-[shimmer_5s_linear_infinite]" />
      
      {/* Decorative Traditional Batik bar */}
      <div className="h-1.5 batik-border w-full opacity-90" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 text-amber-800 ring-2 ring-amber-200/60 shadow-sm"
            >
              <Landmark className="h-6 w-6 animate-[bounce_3s_infinite]" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-amber-950 sm:text-2xl">
                  Sajadah UMKM
                </h1>
                <motion.span 
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 ring-1 ring-red-600/15"
                >
                  <Sparkles className="h-3 w-3 text-red-500" />
                  Asisten AI Pintar
                </motion.span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                Kalkulator Modal, Harga Pokok Penjualan (HPP), dan Simulasi Harga Pasar Indonesia
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-right hidden md:block"
            >
              <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest">Aplikasi Publik</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-900 font-extrabold bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1.5 rounded-lg border border-amber-200 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-[ping_1.5s_infinite]" />
                🇮🇩 100% Gratis Tanpa Login
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

