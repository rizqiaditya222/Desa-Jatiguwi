import React from "react";
import PrimaryCard from "@/components/card/PrimaryCard";
import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryCard from "@/components/card/SecondaryCard";
const PengumumanBerita = () => {
  return (
    <div className="grid w-full grid-cols-12 px-24 py-12 mx-auto bg-white ">
      <section className="w-full col-span-5">
        <h1 className="text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4">
          Pengumuman
        </h1>
        <div className="max-w-xl pt-12 space-y-6">
          <PrimaryCard
            Judul="PANDUAN MAGANG MITRA FAKULTAS ILMU KOMPUTER UNIVERSITAS BRAWIJAYA SEMESTER GANJIL 2025/2026"
            deskripsi=""
            date="01 Jan 2024"
          />
          <PrimaryCard
            Judul="Prosedur Daftar Ulang dan Registrasi Mahasiswa Semester Ganjil TA. 2025/2026 FILKOM UB"
            deskripsi=""
            date="02 Jan 2024"
          />
        </div>
        <PrimaryLinkButton
          href="/pengumuman"
          text="Lihat Semua Pengumuman"
          className="mt-6 "
        />
      </section>
      <section className="w-full col-span-7">
        <h1 className="text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4  ">
          Berita
        </h1>
        <div className="max-w-4xl pt-12 space-y-6">
          <SecondaryCard
            Judul="Kegiatan Sosialisasi Program Desa Mandiri"
            date="01 Jan 2024"
            deskripsi="Desa Jatiguwi mengadakan sosialisasi program desa mandiri untuk meningkatkan partisipasi masyarakat."
          />
          <SecondaryCard
            Judul="Kegiatan Sosialisasi Program Desa Mandiri"
            date="01 Jan 2024"
            deskripsi="Desa Jatiguwi mengadakan sosialisasi program desa mandiri untuk meningkatkan partisipasi masyarakat."
          />
        </div>
        <PrimaryLinkButton
          href="/berita"
          text="Lihat Semua Berita"
          className="mt-6 "
        />
      </section>
    </div>
  );
};

export default PengumumanBerita;
