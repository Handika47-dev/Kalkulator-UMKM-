import React, { useState } from "react";
import { FormInput } from "../types";
import { ArrowRight, HelpCircle, Landmark, MapPin, Sparkles, Wallet } from "lucide-react";
import { motion } from "motion/react";

interface FormInputUMKMProps {
  onSubmit: (data: FormInput) => void;
  isLoading: boolean;
}

// Preset types of businesses popular in Indonesia
const JENIS_USAHA_PRESETS = [
  "Warung Kopi (Warkop) / Cafe Kekinian",
  "Warung Makan Bakso / Mie Ayam / Nasi Goreng",
  "Laundry Kiloan & Satuan",
  "Toko Kelontong / Agen Sembako",
  "Fesyen / Butik & Toko Pakaian Online",
  "Salon Kecantikan, Spa / Barbershop",
  "Kriya, Souvenir / Kerajinan Tangan",
  "Catering / Snacking Box Rumahan",
  "Cuci Motor & Mobil",
  "Lainnya (Ketik Manual)"
];

const LOKASI_PRESETS = [
  "Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)",
  "Jawa Tengah & Yogyakarta (Sleman, Solo, Semarang, dll)",
  "Jawa Timur (Surabaya, Malang, Sidoarjo, dll)",
  "Jawa Barat (Bandung, Depok, dll)",
  "Sumatera (Medan, Palembang, Padang, Lampung, dll)",
  "Sulawesi (Makassar, Manado, dll)",
  "Kalimantan (Pontianak, Samarinda, dll)",
  "Bali & Nusa Tenggara",
  "Maluku & Papua"
];

export function FormInputUMKM({ onSubmit, isLoading }: FormInputUMKMProps) {
  const [namaUsaha, setNamaUsaha] = useState("");
  const [selectedJenis, setSelectedJenis] = useState(JENIS_USAHA_PRESETS[0]);
  const [customJenis, setCustomJenis] = useState("");
  const [modalTersedia, setModalTersedia] = useState<number | "">("");
  const [selectedLokasi, setSelectedLokasi] = useState(LOKASI_PRESETS[0]);
  const [skalaUsaha, setSkalaUsaha] = useState<"Mikro" | "Kecil" | "Menengah" | "Rumahan">("Rumahan");
  const [catatanTambahan, setCatatanTambahan] = useState("");

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val === "") {
      setModalTersedia("");
    } else {
      setModalTersedia(parseInt(val, 10));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaUsaha.trim()) return;
    
    onSubmit({
      namaUsaha: namaUsaha.trim(),
      jenisUsaha: selectedJenis === "Lainnya (Ketik Manual)" ? customJenis : selectedJenis,
      modalTersedia,
      lokasiUsaha: selectedLokasi,
      skalaUsaha,
      catatanTambahan: catatanTambahan.trim()
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-amber-200 bg-white p-6 shadow-md relative overflow-hidden" 
      id="input-form-container"
    >
      {/* Decorative ambient glowing circles */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-amber-100/30 blur-2xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-red-100/20 blur-2xl pointer-events-none" />

      <div className="mb-6 flex items-start gap-3 relative z-10">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 text-orange-700 ring-2 ring-orange-200/50 shadow-sm"
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
        <div>
          <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">Mulai Analisis Bisnis Baru</h2>
          <p className="text-xs text-stone-500 font-medium">
            Masukkan rincian singkat usaha Anda, AI akan merumuskan RAB, HPP, serta strategi harga pasar Indonesia secara otomatis.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Name of business */}
        <div>
          <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-2" htmlFor="field-nama-usaha">
            Nama Plan Usaha <span className="text-red-500 font-black">*</span>
          </label>
          <input
            id="field-nama-usaha"
            type="text"
            required
            disabled={isLoading}
            placeholder="Contoh: Sangpisang Aren, Laundry Bersih Kilat, Kopi Seduh Selaras"
            value={namaUsaha}
            onChange={(e) => setNamaUsaha(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 shadow-xs placeholder-stone-400 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200/50 transition-all font-medium"
          />
        </div>

        {/* Type / Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-2" htmlFor="field-jenis-usaha">
              Jenis / Kategori Usaha <span className="text-red-500 font-black">*</span>
            </label>
            <div className="relative">
              <select
                id="field-jenis-usaha"
                disabled={isLoading}
                value={selectedJenis}
                onChange={(e) => setSelectedJenis(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-950 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200/50 transition-all font-medium appearance-none cursor-pointer"
              >
                {JENIS_USAHA_PRESETS.map((preset) => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-950 uppercase tracking-wide mb-2" htmlFor="field-lokasi-usaha">
              Lokasi Target Usaha <span className="text-red-500 font-black">*</span>
            </label>
            <div className="relative">
              <select
                id="field-lokasi-usaha"
                disabled={isLoading}
                value={selectedLokasi}
                onChange={(e) => setSelectedLokasi(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-950 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200/50 transition-all font-medium appearance-none cursor-pointer"
              >
                {LOKASI_PRESETS.map((lokasi) => (
                  <option key={lokasi} value={lokasi}>
                    {lokasi}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Custom manual type if selected "Lainnya" */}
        {selectedJenis === "Lainnya (Ketik Manual)" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-xl bg-stone-50 p-4 border border-amber-200"
          >
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5" htmlFor="field-custom-jenis">
              Ketik Sendiri Jenis Usaha Anda <span className="text-red-500">*</span>
            </label>
            <input
              id="field-custom-jenis"
              type="text"
              required
              disabled={isLoading}
              placeholder="Contoh: Jasa penitipan kucing harian, warung indomie digital"
              value={customJenis}
              onChange={(e) => setCustomJenis(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
            />
          </motion.div>
        )}

        {/* Starting Capital & Scale of Business */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5" htmlFor="field-modal-tersedia">
                <Wallet className="h-4 w-4 text-amber-800" />
                Modal yang Dimiliki (Rupiah)
              </label>
              <span className="text-[10px] text-amber-800 font-extrabold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Opsional</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">
                Rp
              </span>
              <input
                id="field-modal-tersedia"
                type="text"
                disabled={isLoading}
                placeholder="Biarkan kosong jika ingin dihitung penuh oleh AI"
                value={modalTersedia === "" ? "" : modalTersedia.toLocaleString("id-ID")}
                onChange={handleModalChange}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-sm text-stone-900 font-mono font-bold focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-950 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Landmark className="h-4 w-4 text-orange-700" />
              Rencana Tempat & Skala Usaha
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { key: "Rumahan", label: "Rumahan / Online" },
                { key: "Mikro", label: "Gerobak / Booth Kios" },
                { key: "Kecil", label: "Ruko Sewaan / Toko" },
                { key: "Menengah", label: "Resto / Skala Menengah" }
              ].map((scale) => (
                <motion.button
                  key={scale.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setSkalaUsaha(scale.key as any)}
                  className={`rounded-xl px-3 py-2.5 text-left border font-bold transition-all cursor-pointer ${
                    skalaUsaha === scale.key
                      ? "border-amber-700 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-200/60 shadow-xs"
                      : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  {scale.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Additional information / owner wishes */}
        <div>
          <label className="block text-xs font-bold text-amber-950 uppercase tracking-wide mb-2" htmlFor="field-catatan-tambahan">
            Catatan / Keinginan Khusus (Spesifik)
          </label>
          <textarea
            id="field-catatan-tambahan"
            rows={3}
            disabled={isLoading}
            placeholder="Tuliskan keinginan Anda, misalnya: 'Saya ingin menggunakan cup plastik ramah lingkungan', 'Fokus penjualan 80% gofood', 'Target bahan baku dari pasar grosir terdekat', dll."
            value={catatanTambahan}
            onChange={(e) => setCatatanTambahan(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200/50 transition-all font-medium resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={(!isLoading && namaUsaha.trim()) ? { scale: 1.02, y: -1 } : {}}
          whileTap={(!isLoading && namaUsaha.trim()) ? { scale: 0.98 } : {}}
          type="submit"
          disabled={isLoading || !namaUsaha.trim()}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 px-4 py-3.5 text-sm font-extrabold text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-200 disabled:opacity-50 transition-all cursor-pointer"
          id="btn-hitung-analisis"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-200" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Merumuskan Anggaran & Analisis Pasar...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 text-amber-200 animate-pulse" />
              <span>Hitung Modal & Analisis dengan AI</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </motion.button>
      </form>
      
      {/* Interactive Helper Hint */}
      <div className="mt-5 rounded-xl bg-amber-50/60 p-4.5 text-[11px] leading-relaxed text-amber-950 border border-amber-100 flex items-start gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-10 w-10 batik-border opacity-5 transform rotate-12" />
        <HelpCircle className="h-5 w-5 text-orange-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-stone-900">Info Harga Pasar Indonesia:</span> Perhitungan modal awal, ongkos bahan pokok pelengkap (HPP), ruko, listrik, dan margin ritel diproses realtime menggunakan data komparasi lokal (DKI Jakarta, Jawa, Sumatera, dll.) agar relevan dengan kondisi ekonomi rill.
        </div>
      </div>
    </motion.div>
  );
}

