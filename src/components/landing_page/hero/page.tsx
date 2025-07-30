import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryLinkButton from "@/components/button/secondary_button";
import React from "react";
import YoutubeVideo from "../video/youtube/page";

const Hero = () => {
  return (
    <div className="relative w-full">
      <img
        src="/img/Brutalist 76.png"
        alt="Dekorasi Kiri"
        className="md:w-32 lg:w-48 absolute bottom-0 left-0 z-0 w-32"
      />

      <img
        src="/img/Brutalist 75.png"
        alt="Dekorasi Kanan"
        className="md:w-32 lg:w-48 absolute top-0 right-0 z-0 w-32"
      />

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center pt-10 text-center">
        <p className="text-xl">Selamat Datang di Website Resmi</p>
        <div className="py-7">
          <p className="pb-5 font-bold text-5xl text-[#0E4D45]">
            Desa Jatiguwi
          </p>
          <p className="font-bold text-4xl text-[#0E4D45]">
            Kecamatan Sumberpucung, Kabupaten Malang
          </p>
        </div>
        <p className="text-balance w-1/2 text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s...
        </p>
      </div>
    </div>
  );
};

export default Hero;
