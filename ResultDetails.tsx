import React, { useState, useMemo } from "react";
import { AnalisisUMKMResult } from "../types";
import { 
  CheckCircle, 
  Coins, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingCart, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  MessageSquare,
  HelpCircle,
  FileSpreadsheet,
  ArrowRight,
  Sliders,
  DollarSign,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResultDetailsProps {
  result: AnalisisUMKMResult;
}

export function ResultDetails({ result }: ResultDetailsProps) {
  const [activeTab, setActiveTab] = useState<"Ringkasan" | "RAB" | "HPP" | "Simulasi">("Ringkasan");
  
  // States for interactive simulator
  const [customVolume, setCustomVolume] = useState<number>(result.simulasiKeuntungan.targetPenjualanBulanan || 400);

  // Formatting currency safely in Rupiah
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Pre-calculated modal totals
  const totalModalAwal = useMemo(() => {
    return result.modalAwal.reduce((acc, curr) => acc + curr.estimasiBiaya, 0);
  }, [result.modalAwal]);

  const totalBiayaOperasionalBulanan = useMemo(() => {
    return result.biayaOperasional.reduce((acc, curr) => acc + curr.estimasiBiaya, 0);
  }, [result.biayaOperasional]);

  // Pre-calculate weighted average or representative HPP and price for the simulator
  const simRepresentative = useMemo(() => {
    if (result.produkDanHarga.length === 0) {
      return { hpp: 10000, harga: 20000 };
    }
    // Calculate average HPP and selling price from list of products
    const totalHPP = result.produkDanHarga.reduce((acc, curr) => acc + curr.biayaProduksiSatuan, 0);
    const totalHarga = result.produkDanHarga.reduce((acc, curr) => acc + curr.rekomendasiHargaJual, 0);
    return {
      hpp: Math.round(totalHPP / result.produkDanHarga.length),
      harga: Math.round(totalHarga / result.produkDanHarga.length)
    };
  }, [result.produkDanHarga]);

  // Live calculation for profitability simulator based on slider (volume of sales)
  const liveOmset = customVolume * simRepresentative.harga;
  const liveCost = totalBiayaOperasionalBulanan + (customVolume * simRepresentative.hpp);
  const liveProfit = liveOmset - liveCost;
  const liveROI = liveProfit > 0 ? Math.ceil(totalModalAwal / liveProfit) : -1;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6" 
      id="umkm-result-section"
    >
      {/* Overview Card with traditional motif accent */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-md">
        {/* Batik ornament bar */}
        <div className="h-2 batik-border w-full" />
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4 mb-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-50 to-orange-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-200/50 mb-2">
                🇮🇩 Hasil Konsultasi Bisnis
              </span>
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                {result.namaUsaha}
              </h2>
              <p className="text-sm font-semibold text-amber-800 mt-1">
                Kategori: {result.jenisUsaha}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Estimasi Modal Awal</p>
              <motion.p 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-2xl font-black text-emerald-700 font-mono"
              >
                {formatIDR(totalModalAwal)}
              </motion.p>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50/40 p-4 border border-amber-100/60 leading-relaxed text-sm text-stone-700">
            <span className="font-extrabold text-amber-950">Analisis Prospek:</span> {result.ringkasan}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto border-b border-stone-200 gap-1 bg-white p-1 rounded-xl shadow-xs" id="result-tabs-nav">
        {[
          { id: "Ringkasan", label: "Analisis Pasar", icon: TrendingUp },
          { id: "RAB", label: "Rincian Modal Awal", icon: Coins },
          { id: "HPP", label: "Formulasi HPP & Jual", icon: ShoppingCart },
          { id: "Simulasi", label: "Simulasi Laba (Interaktif)", icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all rounded-lg cursor-pointer ${
                isSelected
                  ? "text-amber-900 font-extrabold"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
              }`}
            >
              {isSelected && (
                <motion.div 
                  layoutId="active-tab-highlight"
                  className="absolute inset-0 bg-amber-100/60 rounded-lg -z-10 border border-amber-200/50"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={`h-4.5 w-4.5 ${isSelected ? "text-amber-900" : "text-stone-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTAINER WITH ANIMATION */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* TAB CONTENT: ANALISIS PASAR */}
            {activeTab === "Ringkasan" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="tab-analisis-pasar">
                {/* Target Konsumen */}
                <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100/50 shadow-xs">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 border-b border-stone-100 pb-1.5 text-xs uppercase tracking-wider">
                    Target Konsumen
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                    {result.analisisPasar.targetKonsumen}
                  </p>
                </div>

                {/* Potensi Pasar */}
                <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100/50 shadow-xs">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 border-b border-stone-100 pb-1.5 text-xs uppercase tracking-wider">
                    Peluang & Potensi
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                    {result.analisisPasar.potensi}
                  </p>
                </div>

                {/* Tantangan Utama */}
                <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-2 ring-rose-100/50 shadow-xs">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 border-b border-stone-100 pb-1.5 text-xs uppercase tracking-wider">
                    Tantangan Bisnis
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                    {result.analisisPasar.tantangan}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: RAB & BIAYA OPERASIONAL */}
            {activeTab === "RAB" && (
              <div className="space-y-6" id="tab-rab-investasi">
                {/* Anggaran Modal Awal */}
                <div className="rounded-xl border border-amber-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-amber-50/50 border-b border-amber-200/60 px-5 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-amber-950 text-base">
                        Rencana Anggaran Biaya (RAB) Modal Awal
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5 font-medium">
                        Alokasi dana utama dari modal investasi awal untuk sewa, alat, dan dekorasi awal.
                      </p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-900">
                      <Coins className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-50/60 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                          <th className="px-5 py-3">Nama Kebutuhan</th>
                          <th className="px-5 py-3">Kategori</th>
                          <th className="px-5 py-3 text-right">Estimasi Biaya</th>
                          <th className="px-5 py-3 hidden sm:table-cell">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-xs text-stone-600 font-semibold">
                        {result.modalAwal.map((item, idx) => (
                          <tr key={idx} className="hover:bg-amber-50/15 transition-all">
                            <td className="px-5 py-3.5 font-bold text-stone-900">
                              {item.namaItem}
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-700 uppercase">
                                {item.kategori}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right font-mono font-bold text-stone-900">
                              {formatIDR(item.estimasiBiaya)}
                            </td>
                            <td className="px-5 py-3.5 hidden sm:table-cell text-stone-500 max-w-xs truncate font-normal">
                              {item.keterangan}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-stone-50/80 font-black border-t-2 border-stone-300 text-stone-900">
                          <td className="px-5 py-4 text-sm" colSpan={2}>
                            Total Estimasi Modal Pendirian
                          </td>
                          <td className="px-5 py-4 text-right text-sm font-mono text-emerald-800">
                            {formatIDR(totalModalAwal)}
                          </td>
                          <td className="px-5 py-4 hidden sm:table-cell"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Biaya Operasional Rutin Bulanan */}
                <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-stone-50 border-b border-stone-200 px-5 py-4">
                    <h3 className="font-extrabold text-stone-900 text-base">
                      Biaya Operasional Rutin (Sebulan)
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 font-medium">
                      Rincian biaya bulanan tetap dan variabel (di luar HPP bahan mentah laku).
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-50/60 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                          <th className="px-5 py-3">Pos Pengeluaran Bulanan</th>
                          <th className="px-5 py-3 text-right">Estimasi Biaya</th>
                          <th className="px-5 py-3">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-xs text-stone-600 font-semibold">
                        {result.biayaOperasional.map((item, idx) => (
                          <tr key={idx} className="hover:bg-stone-50/30 transition-all">
                            <td className="px-5 py-3.5 font-bold text-stone-900">
                              {item.namaItem}
                            </td>
                            <td className="px-5 py-3.5 text-right font-mono font-bold text-stone-900">
                              {formatIDR(item.estimasiBiaya)}
                            </td>
                            <td className="px-5 py-3.5 text-stone-500 font-normal">
                              {item.keterangan}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-stone-50/80 font-black border-t-2 border-stone-300 text-stone-900">
                          <td className="px-5 py-4 text-sm">
                            Total Biaya Tetap Bulanan
                          </td>
                          <td className="px-5 py-4 text-right text-sm font-mono text-amber-955">
                            {formatIDR(totalBiayaOperasionalBulanan)}
                          </td>
                          <td className="px-5 py-4"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FORMULASI HPP & HARGA JUAL */}
            {activeTab === "HPP" && (
              <div className="space-y-6" id="tab-hpp-jual">
                <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-stone-50 border-b border-stone-200 px-5 py-4">
                    <h3 className="font-extrabold text-stone-900 text-base">
                      Rasionalisasi Harga Jual & Harga Pokok Penjualan (HPP)
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 font-medium">
                      AI menghitung modal bahan baku per porsi/unit (HPP), merekomendasikan harga jual, dan menganalisis persaingan pasar di Indonesia.
                    </p>
                  </div>

                  <div className="p-5 divide-y divide-dashed divide-stone-200 space-y-6">
                    {result.produkDanHarga.map((item, idx) => {
                      const profitPerUnit = item.rekomendasiHargaJual - item.biayaProduksiSatuan;
                      const marginPercentage = item.rekomendasiHargaJual > 0 
                        ? Math.round((profitPerUnit / item.rekomendasiHargaJual) * 100) 
                        : 0;

                      return (
                        <div key={idx} className="pt-4 first:pt-0 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between group">
                          <div className="space-y-1.5 max-w-md">
                            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-0.5 text-[10px] font-extrabold text-amber-850 border border-amber-200 uppercase tracking-widest">
                              Produk {idx + 1}
                            </span>
                            <h4 className="text-base font-extrabold text-stone-950 group-hover:text-amber-900 transition-all">
                              {item.namaProduk}
                            </h4>
                            <p className="text-xs text-stone-600 leading-relaxed font-medium">
                              <strong>Analisis Pasar:</strong> {item.analisisPasaran}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                            {/* HPP Box */}
                            <div className="bg-stone-50 px-3.5 py-2.5 rounded-xl border border-stone-200 text-center shrink-0 min-w-[110px]">
                              <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider">HPP / Unit</span>
                              <span className="text-xs font-mono font-bold text-stone-700">
                                {formatIDR(item.biayaProduksiSatuan)}
                              </span>
                            </div>

                            {/* Selling price recommended */}
                            <div className="bg-amber-50/80 px-3.5 py-2.5 rounded-xl border border-amber-200 text-center shrink-0 min-w-[124px]">
                              <span className="block text-[9px] uppercase font-bold text-amber-800 tracking-wider">Rekomendasi Jual</span>
                              <span className="text-sm font-mono font-bold text-amber-950">
                                {formatIDR(item.rekomendasiHargaJual)}
                              </span>
                            </div>

                            {/* Margin & Profit Box */}
                            <div className="bg-emerald-50 px-3.5 py-2.5 rounded-xl border border-emerald-250 text-center shrink-0 min-w-[124px]">
                              <span className="block text-[9px] uppercase font-bold text-emerald-800 tracking-wider">Margin Profit</span>
                              <span className="text-xs font-mono font-normal text-emerald-950 block">
                                <strong className="font-bold">+{formatIDR(profitPerUnit)}</strong> ({marginPercentage}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: INTERACTIVE PROFIT SIMULATOR */}
            {activeTab === "Simulasi" && (
              <div className="space-y-6" id="tab-simulator-interaktif">
                <div className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm relative overflow-hidden">
                  <div className="flex items-start gap-4 mb-6 relative z-10">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-850 ring-2 ring-amber-200/50 shadow-sm">
                      <Sliders className="h-5.5 w-5.5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-stone-950 text-base">
                        Simulator Keuangan & Profit Bulanan Mandiri
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5 font-medium leading-relaxed">
                        Geser slider di bawah untuk mensimulasikan peningkatan target penjualan harian/bulanan. Lihat pengaruhnya langsung terhadap laba bersih dan percepatan balik modal!
                      </p>
                    </div>
                  </div>

                  {/* Simulated Values */}
                  <div className="bg-gradient-to-br from-orange-50/60 to-amber-50/30 rounded-2xl p-6 border border-amber-100 flex flex-col md:flex-row items-stretch justify-around gap-6 mb-6 relative z-10">
                    {/* Volume */}
                    <div className="text-center font-semibold p-2">
                      <span className="text-[10px] text-stone-400 font-extrabold uppercase block tracking-wider">Volume Jual per Bulan</span>
                      <motion.span 
                        key={customVolume}
                        initial={{ scale: 1.1, color: "#92400e" }}
                        animate={{ scale: 1, color: "#451a03" }}
                        className="text-2xl font-mono font-black"
                      >
                        {customVolume} Unit
                      </motion.span>
                      <span className="block text-[11px] text-stone-500 font-medium mt-1">
                        (~{Math.round(customVolume / 30)} unit per hari)
                      </span>
                    </div>
                    
                    {/* Est Omset */}
                    <div className="text-center font-semibold p-2 border-t md:border-t-0 md:border-l border-amber-250/40">
                      <span className="text-[10px] text-stone-400 font-extrabold uppercase block tracking-wider">Pendapatan Kotor (Omset)</span>
                      <span className="text-2xl font-mono font-black text-stone-900 block">{formatIDR(liveOmset)}</span>
                      <span className="block text-[11px] text-stone-500 font-normal mt-1">
                        Taksiran rata-rata harga produk {formatIDR(simRepresentative.harga)}
                      </span>
                    </div>

                    {/* Est Profit Bersih */}
                    <div className="text-center font-semibold p-2 border-t md:border-t-0 md:border-l border-amber-250/40">
                      <span className="text-[10px] text-stone-400 font-extrabold uppercase block tracking-wider">Profit Bersih Operasional</span>
                      <span className={`text-2xl font-mono font-black block ${liveProfit >= 0 ? "text-emerald-700" : "text-amber-800"}`}>
                        {formatIDR(liveProfit)}
                      </span>
                      <span className="block text-[11px] text-stone-500 font-normal mt-1">
                        Telah dikurangi biaya operasional tetap {formatIDR(totalBiayaOperasionalBulanan)}
                      </span>
                    </div>

                    {/* Balik Modal ROI */}
                    <div className="text-center font-semibold p-2 border-t md:border-t-0 md:border-l border-amber-250/40">
                      <span className="text-[10px] text-stone-400 font-extrabold uppercase block tracking-wider">Estimasi Balik Modal</span>
                      <span className="text-2xl font-sans font-black text-amber-950 block">
                        {liveROI > 0 ? `${liveROI} Bulan` : "Belum Untung"}
                      </span>
                      <span className="block text-[11px] text-stone-500 font-normal mt-1">
                        Berdasarkan RAB {formatIDR(totalModalAwal)}
                      </span>
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-4 max-w-xl mx-auto rounded-2xl border border-stone-200/50 p-5 bg-stone-50 shadow-inner relative z-10">
                    <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                      <span>Target Minimum</span>
                      <span className="text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 font-mono text-sm font-extrabold">
                        {customVolume} Unit / bulan
                      </span>
                      <span>Maksimum</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={2000}
                      step={10}
                      value={customVolume}
                      onChange={(e) => setCustomVolume(parseInt(e.target.value, 10))}
                      className="w-full h-2.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-800"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-stone-400 font-mono">
                      <span>30 unit (1/hari)</span>
                      <span>1.000 unit (33/hari)</span>
                      <span>2.000 unit (66/hari)</span>
                    </div>
                  </div>

                  <div className="mt-5 text-center text-[11px] text-stone-400 font-medium">
                    💡 <em>Catatan: Simulasi ini dihitung secara dinamis demi memudahkan kalkulasi cepat berdasarkan estimasi biaya HPP dari AI. Proyeksi laba dapat bervariasi bergantung pada fluktuasi harga bahan mentah tak terduga.</em>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* STRATEGIC ROADMAP FOR ACTION LIST */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
        <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2 mb-4">
          <CheckCircle className="h-6 w-6 text-emerald-600 animate-[pulse_2s_infinite]" />
          Langkah & Rekomendasi Taktis Memulai Usaha (Indonesia Context)
        </h3>
        
        <div className="space-y-3.5">
          {result.rekomendasiLangkah.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-3 items-start text-xs sm:text-sm text-stone-700 font-semibold"
            >
              <span className="inline-flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 text-xs font-black text-emerald-800 ring-2 ring-emerald-150 mt-0.5 shadow-xs">
                {idx + 1}
              </span>
              <p className="leading-relaxed pt-0.5 text-stone-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

