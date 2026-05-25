import React, { useState } from "react";
import { BookOpen, Landmark, ChevronDown, ChevronUp, FileText, Globe, Award, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export function FAQInfo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Apa itu HPP (Harga Pokok Penjualan)?",
      answer: (
        <p>
          HPP adalah modal atau biaya langsung yang dikeluarkan untuk membuat atau memproduksi 1 unit barang/jasa. 
          Misalnya untuk kopi susu gula aren: biaya biji kopi, susu, cup sablon, sedotan, gula aren, dan es batu. 
          HPP <strong>tidak termasuk</strong> biaya tetap bulanan seperti sewa ruko atau gaji admin bulanan. Mengetahui HPP adalah kunci agar harga jual tidak di bawah modal produksi!
        </p>
      )
    },
    {
      question: "Bagaimana cara menentukan Margin Harga Jual yang ideal?",
      answer: (
        <p>
          Untuk bisnis kuliner di Indonesia, margin kotor ideal berkisar antara <strong>50% hingga 100%</strong> dari HPP (misal HPP Rp 10.000, dijual Rp 18.000-Rp 20.000). 
          Sedangkan untuk pakaian/fesyen, margin bisa berkisar 60% s.d 150%. 
          Namun pastikan harga tersebut tetap bisa bersaing dengan kompetitor di sekitar Anda agar tidak terlalu mahal untuk daya beli lokal.
        </p>
      )
    },
    {
      question: "Apa itu NIB dan kenapa UMKM sangat wajib memilikinya?",
      answer: (
        <div>
          <p className="mb-2">
            <strong>NIB (Nomor Induk Berusaha)</strong> adalah identitas resmi pelaku usaha/UMKM di Indonesia yang dirilis oleh Pemerintah. NIB memiliki segudang manfaat:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Pendaftaran 100% GRATIS dan bisa diurus online lewat HP di portal resmi <a href="https://oss.go.id" target="_blank" rel="noopener noreferrer" className="text-amber-800 font-bold hover:underline">OSS (oss.go.id)</a>.</li>
            <li>Mempermudah pengajuan KUR (Kredit Usaha Rakyat) bunga rendah dari bank BUMN/BRI/Mandiri.</li>
            <li>Syarat mengajukan Sertifikat Halal Gratis (SEHATI) dari BPJPH dan izin dinkes P-IRT.</li>
            <li>Melindungi usaha agar berjalan legal dan tenang.</li>
          </ul>
        </div>
      )
    },
    {
      question: "Bagaimana cara mendaftarkan kuliner saya ke GoFood, GrabFood, dan ShopeeFood?",
      answer: (
        <p>
          Siapkan dokumen: KTP, NPWP (opsional), Buku Tabungan bank (untuk transfer uang hasil harian), foto produk makanan beresolusi baik, serta NIB. 
          Unduh aplikasi <strong>Gobiz</strong> (untuk GoFood), <strong>GrabMerchant</strong> (untuk GrabFood), atau daftar merchant di aplikasi <strong>Shopee Partner</strong>. 
          Pendaftaran ini gratis, namun ketahui bahwa pihak aplikasi menerapkan biaya komisi bagi hasil sekitar 15-20% per menu laku online, jadi naikkan harga jual versi aplikasi Anda secara khusus!
        </p>
      )
    }
  ];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm overflow-hidden relative" id="edukasi-faq-section">
      <div className="flex items-center gap-3 mb-5">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 ring-2 ring-amber-200/50"
        >
          <BookOpen className="h-5 w-5" />
        </motion.div>
        <div>
          <h3 className="font-extrabold text-stone-900 text-base tracking-tight">Pusat Edukasi Finansial UMKM Indonesia</h3>
          <p className="text-xs text-stone-500 font-medium">Pahami konsep dasar bisnis dan regulasi pendirian usaha lokal agar aman dan berkembang.</p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="rounded-xl border border-stone-250/60 bg-stone-50/50 hover:bg-stone-50/90 overflow-hidden transition-all duration-200"
              id={`faq-item-${idx}`}
            >
              <button
                type="button"
                className="w-full text-left px-4 py-4 flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span>{faq.question}</span>
                <span className="p-1 rounded-full bg-white/80 border border-stone-200/50">
                  {isOpen ? <ChevronUp className="h-4 w-4 text-amber-800" /> : <ChevronDown className="h-4 w-4 text-stone-500" />}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 pt-2 text-xs text-stone-600 leading-relaxed border-t border-stone-200/45 bg-white font-semibold">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Helpful links bar */}
      <div className="mt-5 border-t border-stone-100 pt-4 flex flex-wrap gap-4 items-center justify-between text-[11px] text-stone-500 font-semibold">
        <span className="flex items-center gap-1.5 text-stone-600">
          <Award className="h-4.5 w-4.5 text-amber-800 animate-pulse" />
          Maju Bersama Pengusaha Lokal Indonesia
        </span>
        <div className="flex items-center gap-3">
          <a 
            href="https://oss.go.id" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-amber-800 font-bold hover:underline hover:text-amber-950 flex items-center gap-1"
          >
            <Globe className="h-3.5 w-3.5" />
            Situs OSS.go.id
          </a>
          <span>•</span>
          <a 
            href="https://www.lppommui.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-amber-800 font-bold hover:underline hover:text-amber-950"
          >
            Situs Halal MUI
          </a>
        </div>
      </div>
    </div>
  );
}

