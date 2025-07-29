import React from "react";
import PrimaryCard from "@/components/card/primary_card";
const PengumumanBerita = () => {
  return (
    <div className="grid w-full grid-cols-12 px-24 py-12 bg-white ">
      <section className="w-full col-span-5">
        <h1 className="text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4">
          Pengumuman
        </h1>
        <div className="pt-12 mr-16 space-y-6">
          <PrimaryCard
            Judul="Pengumuman 1"
            date="01 Jan 2024"
            deskripsi="Deskripsi singkat tentang pengumuman 1."
            key={"Pengumuman"}
          />
          <PrimaryCard
            Judul="Pengumuman 2"
            date="02 Jan 2024"
            deskripsi="Deskripsi singkat tentang pengumuman 2."
          />
        </div>
      </section>
      <section className="w-full col-span-7">
        <h1 className="text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4  ">
          Berita
        </h1>
      </section>
    </div>
  );
};

export default PengumumanBerita;
