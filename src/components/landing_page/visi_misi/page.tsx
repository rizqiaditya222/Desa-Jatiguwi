import PrimaryLinkButton from "@/components/button/primary_button";
import React from "react";

const VisiMisi = () => {
  const kataKata = [
    { id: 1, text: "Kreatif" },
    { id: 2, text: "Agamis" },
    { id: 3, text: "Responsif" },
    { id: 4, text: "Tertib" },
    { id: 5, text: "Inspiratif" },
    { id: 6, text: "Ngayomi" },
    { id: 7, text: "Inovatif" },
  ];

  return (
    <div className="flex flex-col px-24 bg-[#0E4D45] justify-center items-center pb-24">
      <div className="flex justify-between w-full ">
        <p className="font-bold text-[#fafafa] text-4xl">
          Profil Desa Jatiguwi
        </p>
        <p className="w-2/5 text-end text-[#fafafa]">
          Mengenal lebih dekat Desa Jatiguwi dengan sejarah, visi, dan misi
          dalam berkomitmen untuk melayani masyarakat dengan baik.
        </p>
      </div>
      <div className="my-5 w-full h-[1px] bg-[#fafafa] "></div>
      <div className="grid w-full grid-cols-12 gap-8">
        <section className="flex flex-col col-span-5 px-12 space-y-8">
          <img
            src="/img/logo_desa.png"
            alt="Logo Desa Jatiguwi"
            className="mx-auto size-auto selection:max-w-80 max-h-80"
          />
          <PrimaryLinkButton
            text="Lihat Profil Desa"
            href="/profil_desa"
            key={"Button Profil Desa"}
            className="w-full border-2 border-[#fafafa] hover:bg-[#fafafa] hover:text-[#0E4D45]"
          />
        </section>
        <section className="flex flex-col col-span-6 col-start-6">
          <div className="flex flex-col text-[#fafafa] ">
            <p className="pt-12 pb-8 text-3xl font-semibold">Visi & Misi</p>
            <p className="pb-8 text-2xl">
              Terwujudnya masyarakat Desa Jatiguwi yang:{" "}
              <span className="font-bold">KARTINI</span>
            </p>
          </div>

          <div className=" grid grid-cols-3 gap-8 bg-[#0E4D45] text-[#fafafa]">
            {kataKata.map((kata) => (
              <div key={kata.id} className="text-lg">
                {kata.id}. {kata.text}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisiMisi;
