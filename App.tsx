import React, { useState, useRef } from "react";
import { Header } from "./components/Header";
import { FormInputUMKM } from "./components/FormInputUMKM";
import { ResultDetails } from "./components/ResultDetails";
import { FAQInfo } from "./components/FAQInfo";
import { FormInput, AnalisisUMKMResult } from "./types";
import { AnimatePresence, motion } from "motion/react";
import { 
  Building, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  Calculator, 
  ChevronRight, 
  AlertCircle, 
  Coins, 
  Compass, 
  ArrowRight,
  RefreshCw,
  Award
} from "lucide-react";

// Presets for users to try instantly
const PRESET_CONTOH = [
  {
    namaUsaha: "Warkop Mulia Jaya",
    jenisUsaha: "Warung Kopi (Warkop) / Cafe Kekinian",
    modalTersedia: 7500000,
    lokasiUsaha: "Jawa Tengah & Yogyakarta (Sleman, Solo, Semarang, dll)",
    skalaUsaha: "Mikro" as const,
    catatanTambahan: "Fokus jualan kopi seduh sachet, mie instant matang, gorengan hangat, dan es teh manis jumbo. Target pembeli mahasiswa dan ojek online."
  },
  {
    namaUsaha: "Laundry Clean & Glow Kiloan",
    jenisUsaha: "Laundry Kiloan & Satuan",
    modalTersedia: 18000000,
    lokasiUsaha: "Jawa Timur (Surabaya, Malang, Sidoarjo, dll)",
    skalaUsaha: "Kecil" as const,
    catatanTambahan: "Menggunakan 2 mesin cuci front-load dan 2 mesin pengering bertingkat. Menyediakan parfum setrika grade A tahan lama."
  },
  {
    namaUsaha: "Tahu Walik Gurih Rempah",
    jenisUsaha: "Warung Makan Bakso / Mie Ayam / Nasi Goreng",
    modalTersedia: 4000000,
    lokasiUsaha: "Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)",
    skalaUsaha: "Rumahan" as const,
    catatanTambahan: "Jualan pakai booth/gerobak di teras minimarket Alfamart/Indomaret terdekat. Menyediakan kemasan paperbox ramah lingkungan bernilai estetika."
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalisisUMKMResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Custom loading message sequence to reassure user
  const [loadingStep, setLoadingStep] = useState(0);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Triggered when client submits the inputs
  const handleAnalyzeBusiness = async (formData: FormInput) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep(0);

    // Dynamic state interval to update loading text representing Indonesian consultant steps
    const stepsInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 1500);

    try {
      const response = await fetch("/api/analisis-umkm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || "Gagal menghubungi AI Konsultan.");
      }

      setResult(data);
      
      // Auto scroll to results smoothly
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan jaringan sewaktu memproses data. Silakan coba sesaat lagi.");
    } finally {
      clearInterval(stepsInterval);
      setIsLoading(false);
    }
  };

  const loadPreset = (preset: typeof PRESET_CONTOH[0]) => {
    if (isLoading) return;
    handleAnalyzeBusiness(formDataFromPreset(preset));
  };

  // Helper mapping 
  const formDataFromPreset = (p: typeof PRESET_CONTOH[0]): FormInput => ({
    namaUsaha: p.namaUsaha,
    jenisUsaha: p.jenisUsaha,
    modalTersedia: p.modalTersedia,
    lokasiUsaha: p.lokasiUsaha,
    skalaUsaha: p.skalaUsaha,
    catatanTambahan: p.catatanTambahan
  });

  const getLoadingMessage = () => {
    switch (loadingStep) {
      case 0: return "Menganalisis jenis komoditas di wilayah target...";
      case 1: return "Merinci Rencana Anggaran Biaya (RAB) modal alat & bahan pokok...";
      case 2: return "Menghitung Harga Pokok Penjualan (HPP) sesuai inflasi pasar Indonesia...";
      case 3: return "Merumuskan simulasi keuntungan bulanan & langkah strategis...";
      default: return "Menghubungkan ke Asisten Kecerdasan Buatan UMKM...";
    }
  };

  return (
    <div className="min-h-screen bg-batik-grid font-sans text-stone-800 flex flex-col selection:bg-amber-800 selection:text-white" id="main-app-container">
      {/* Header section includes Red-White line aesthetic */}
      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden" id="hero-welcome-banner">
          {/* Subtle overlay elements */}
          <div className="absolute right-0 bottom-0 opacity-10 font-bold select-none text-[15rem] leading-none pointer-events-none transform translate-y-12 translate-x-8">
            UMKM
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 ring-1 ring-amber-400/30">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Digitalisasi Usaha Rakyat Indonesia
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Kalkulator Keuangan Pintar & Formulir Harga Pasar Usaha Anda
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
              Mulai usaha impian Anda dengan perhitungan finansial yang matang. Cukup tuliskan jenis usaha dan nama dagang Anda, AI kami akan memetakan taksiran modal awal (RAB), harga pokok (HPP), simulasi keuntungan, hingga aspek regulasi Indonesia secara rill tanpa mendaftar akun.
            </p>
          </div>
        </div>

        {/* Outer Section: Two Column Grid in large screens, Stacked in Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Inputs and Quick Try */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Calculator Form Component */}
            <FormInputUMKM onSubmit={handleAnalyzeBusiness} isLoading={isLoading} />

            {/* Quick Presets / "Klik untuk Coba" */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-3.5" id="preset-suggestions-card">
              <div>
                <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5 tracking-tight">
                  <Compass className="h-4.5 w-4.5 text-amber-800 animate-spin-slow" />
                  Coba Cepat (Autofill Pola Usaha)
                </h3>
                <p className="text-[11px] text-stone-500 font-medium">Pilih salah satu pola usaha yang populer berikut ini untuk melihat langsung kehebatan kalkulasi visual AI:</p>
              </div>

              <div className="space-y-2">
                {PRESET_CONTOH.map((preset, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.015, x: 2 }}
                    whileTap={{ scale: 0.985 }}
                    type="button"
                    disabled={isLoading}
                    onClick={() => loadPreset(preset)}
                    className="w-full text-left p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/40 hover:border-amber-300/60 transition-all flex items-center justify-between group disabled:opacity-50 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="block text-xs font-bold text-stone-850 group-hover:text-amber-950">
                        {preset.namaUsaha}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-400 group-hover:text-amber-850">
                        Modal: Rp {preset.modalTersedia.toLocaleString("id-ID")} • {preset.skalaUsaha}
                      </span>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-stone-400 group-hover:translate-x-1 group-hover:text-amber-850 transition-all" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Loading state, Error state, Welcoming illustration, or actual Result Details */}
          <div className="lg:col-span-7 space-y-6">
            
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-amber-200 bg-amber-50/30 p-12 text-center shadow-sm space-y-4 min-h-[400px] flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-amber-600/10 blur-md animate-pulse" />
                    <RefreshCw className="h-12 w-12 text-amber-800 animate-spin relative" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-stone-900 text-lg">Konsultan AI Sedang Mengkalkulasi...</h3>
                    <p className="text-xs text-amber-950 font-mono font-medium max-w-sm mx-auto h-8 flex items-center justify-center">
                      "{getLoadingMessage()}"
                    </p>
                  </div>
                  <div className="w-full max-w-xs bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-800 h-full w-2/5 animate-[pulse_1.5s_infinite]" style={{ width: `${(loadingStep + 1) * 25}%`, transition: "width 0.4s ease-in-out" }} />
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-red-200 bg-red-50 p-6 flex items-start gap-3.5 shadow-sm"
                >
                  <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs sm:text-sm">
                    <h4 className="font-bold text-red-900">Gagal Mendapatkan Analisis</h4>
                    <p className="text-red-700 leading-relaxed font-medium">{error}</p>
                    <p className="text-[11px] text-red-500">Tip: Periksa sambungan atau pastikan token/API-key aman di Secrets Panel.</p>
                  </div>
                </motion.div>
              )}

              {/* Show the analytical results if loaded */}
              {!isLoading && !error && result && (
                <motion.div
                  ref={resultsRef}
                  key="results-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <ResultDetails result={result} />
                </motion.div>
              )}

              {/* Welcome Illustration & Features Overview when no results loaded yet */}
              {!isLoading && !error && !result && (
                <motion.div
                  key="empty-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm text-center space-y-6"
                >
                  <div className="max-w-sm mx-auto space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                      <Calculator className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-stone-900">Menunggu Input Form Usaha</h3>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Silakan lengkapi formulir di sebelah kiri dengan rencana usaha Anda, atau pilih salah satu <strong>Coba Cepat</strong> di bawah untuk mengeksplor contoh penghitungan modal dan HPP instan.
                      </p>
                    </div>
                  </div>

                  {/* Highlight Benefits of This App */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-stone-100 pt-6">
                    <div className="space-y-1">
                      <span className="block font-bold text-stone-800 text-xs sm:text-sm">1. Modal Akurat</span>
                      <span className="block text-[11px] text-stone-500">Estimasi Rencana Anggaran Biaya (RAB) yang disesuaikan dengan bahan dasar lokal Indonesia.</span>
                    </div>
                    <div className="space-y-1 sm:border-l sm:border-stone-100 sm:pl-4">
                      <span className="block font-bold text-stone-800 text-xs sm:text-sm">2. Formulir HPP</span>
                      <span className="block text-[11px] text-stone-500">Mencegah salah harga jual produk dengan penetapan laba kotor unit/jasa yang aman kompetitif.</span>
                    </div>
                    <div className="space-y-1 sm:border-l sm:border-stone-100 sm:pl-4">
                      <span className="block font-bold text-stone-800 text-xs sm:text-sm">3. Legalitas OSS</span>
                      <span className="block text-[11px] text-stone-500">Menyertakan tautan NIB, Halal, serta regulasi kelayakan kementerian di Indonesia.</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Educational FAQ Panel always visible on the lower-right container to provide premium advisory resources */}
            <FAQInfo />
          </div>

        </div>

      </main>

      {/* Elegant footer with typical Indonesian trademark */}
      <footer className="bg-stone-900 text-stone-400 mt-16 border-t border-amber-950/20 py-8 text-center text-xs">
        <div className="mx-auto max-w-7xl px-4 space-y-2.5">
          <p className="font-bold text-amber-200/80">Kalkulator UMKM Indonesia - Sajadah UMKM</p>
          <p className="text-[11px] text-stone-500 max-w-md mx-auto leading-relaxed">
            Aplikasi konsultan keuangan ini ditenagai teknologi Kecerdasan Buatan (Generative AI) mutakhir gratis tanpa login demi mempercepat pemulihan dan eskalasi ekonomi mikro di Indonesia.
          </p>
          <div className="pt-2 border-t border-stone-800/80 max-w-xs mx-auto flex items-center justify-center gap-1">
            <span className="text-[10px] text-stone-600 font-mono">Platform Bantuan Rakyat Merdeka • 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
