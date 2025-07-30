import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryLinkButton from "@/components/button/secondary_button";
import React from "react";
import YoutubeVideo from "../video/youtube/page";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src="/img/Brutalist 76.png"
        alt="Dekorasi Kiri"
        className="absolute bottom-0 left-0 w-32 md:w-48 lg:w-64 z-0"
      />

      <img
        src="/img/Brutalist 75.png"
        alt="Dekorasi Kanan"
        className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 z-0"
      />

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center pt-10 text-center">
        <p className="text-xl">Selamat Datang di Website Resmi</p>
        <div className="py-7">
          <p className="pb-5 font-bold text-5xl text-[#0E4D45]">Desa Jatiguwi</p>
          <p className="font-bold text-4xl text-[#0E4D45]">
            Kecamatan Sumberpucung, Kabupaten Malang
          </p>
        </div>
        <p className="text-balance w-1/2 text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s...
        </p>
        <div className="flex gap-2 py-10">
          <PrimaryLinkButton text="Video Profil Desa" href="/login" />
          <SecondaryLinkButton text="Beranda" href="/login" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
