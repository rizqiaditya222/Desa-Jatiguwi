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
    <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-[#0E4D45] justify-center items-center py-12">
      <div className="md:flex-row md:justify-between md:items-start md:text-start flex flex-col items-center w-full text-center">
        <p className="font-bold text-[#fafafa] text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-0">
          Profil Desa Jatiguwi
        </p>
        <p className="w-full md:w-2/5 text-sm sm:text-base md:text-end text-[#fafafa]">
          Mengenal lebih dekat Desa Jatiguwi dengan sejarah, visi, dan misi
          dalam berkomitmen untuk melayani masyarakat dengan baik.
        </p>
      </div>
      <div className="my-5 w-full h-[1px] bg-[#fafafa] "></div>
      <div className="md:gap-12 sm:flex-row flex flex-col w-full max-w-screen-xl gap-8">
        <section className="md:col-span-5 sm:px-4 md:px-12 flex flex-col justify-center items-center col-span-1 px-0 space-y-8">
          <img
            src="/img/logo_desa.png"
            alt="Logo Desa Jatiguwi"
            className="size-auto max-w-[200px] sm:flex-1/2max-h-80 mx-auto"
          />
          <PrimaryLinkButton
            text="Lihat Profil Desa"
            href="/profil_desa"
            key={"Button Profil Desa"}
            className="w-full max-w-[300px] md:max-w-none border-2 border-[#fafafa] hover:bg-[#fafafa] hover:text-[#0E4D45] hover:ease-in-out hover:duration-300"
          />
        </section>
        <section className="md:text-start flex flex-col col-span-1 text-center">
          <div className="flex flex-col text-[#fafafa] ">
            <p className="sm:text-3xl md:text-3xl pt-8 pb-4 text-2xl font-semibold">
              Visi & Misi
            </p>
            <p className="text-md sm:text-xl md:text-2xl pb-8">
              Terwujudnya masyarakat Desa Jatiguwi yang:{" "}
              <span className="font-bold">KARTINI</span>
            </p>
          </div>

          {/* Perubahan ada di baris ini */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 bg-[#0E4D45] text-[#fafafa]">
            {kataKata.map((kata) => (
              <div key={kata.id} className="sm:text-lg text-sm">
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
