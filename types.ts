export interface FormInput {
  namaUsaha: string;
  jenisUsaha: string;
  modalTersedia: number | "";
  lokasiUsaha: string;
  skalaUsaha: "Mikro" | "Kecil" | "Menengah" | "Rumahan";
  catatanTambahan: string;
}

export interface ModalAwalItem {
  namaItem: string;
  estimasiBiaya: number;
  kategori: string;
  keterangan: string;
}

export interface BiayaOperasionalItem {
  namaItem: string;
  estimasiBiaya: number;
  keterangan: string;
}

export interface ProdukHargaItem {
  namaProduk: string;
  biayaProduksiSatuan: number;
  rekomendasiHargaJual: number;
  analisisPasaran: string;
}

export interface SimulasiKeuntungan {
  targetPenjualanBulanan: number;
  estimasiOmset: number;
  estimasiBiayaTotal: number;
  estimasiProfitBersih: number;
  estimasiBalikModalBulan: number;
}

export interface AnalisisPasar {
  potensi: string;
  tantangan: string;
  targetKonsumen: string;
}

export interface AnalisisUMKMResult {
  namaUsaha: string;
  jenisUsaha: string;
  ringkasan: string;
  analisisPasar: AnalisisPasar;
  modalAwal: ModalAwalItem[];
  biayaOperasional: BiayaOperasionalItem[];
  produkDanHarga: ProdukHargaItem[];
  simulasiKeuntungan: SimulasiKeuntungan;
  rekomendasiLangkah: string[];
}
