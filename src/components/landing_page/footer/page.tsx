import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-[#0E4D45] px-16 py-16">
      <section className=" grid grid-cols-12 border-b-1 border-white pb-8">
        <section className="flex flex-col col-span-6 space-y-4">
          <div className="min-w-10 md:w-20 flex">
            <img className="lg:w-120" src="img/logo_desa.png" alt="Logo Desa" />
            <div>
              <p className="text-white text-3xl font-semibold">Desa Jatiguwi</p>
              <p className="text-nowrap text-white font-light   ">
                Kecamatan Sumberpucung
              </p>
            </div>
          </div>
          <p className="align-text-top  text-lg text-pretty text-white lg:text-2xl">
            Jl. Raya Jatiguwi, Sumberpucung<br></br> Kota Malang, 65165, Jawa
            Timur, Indonesia.
          </p>
        </section>
        <section className="col-start-8 col-span-2">
          <p className="font-semibold text-2xl text-white pb-2">Halaman</p>
          <ul className="space-y-4 pt-4">
            <li>
              <a className="text-white text-xl font-light" href="">
                Beranda
              </a>
            </li>
            <li>
              <a className=" text-white text-xl font-light" href="">
                Profil
              </a>
            </li>
            <li>
              <a className=" text-white text-xl font-light" href="">
                Selayang Pandang
              </a>
            </li>
            <li>
              <a className=" text-white text-xl font-light" href="">
                Sejarah
              </a>
            </li>
            <li>
              <a className="text-white text-xl font-light " href="">
                Galeri
              </a>
            </li>
          </ul>
        </section>
        <section className="col-start-11 col-span-3 space-y-6">
          <p className="font-semibold text-2xl text-white">Hubungi kami</p>
          <div className="flex gap-4">
            <button>
              <img
                className=" w-6 h-6 invert"
                src="./svg/email.svg"
                alt="email icon"
                color="#FFFFFF"
              />
            </button>
            <button>
              <img
                className=" w- h-8 invert"
                src="./svg/tiktok.svg"
                alt="tiktok icon"
                color="#FFFFFF"
              />
            </button>
            <button>
              <img
                className=" w-6 h-6 invert"
                src="./svg/youtube.svg"
                alt="yt icon"
                color="#FFFFFF"
              />
            </button>
          </div>
          <button className="flex items-center gap-2">
            <img
              className=" w-6 h-6 invert "
              src="./svg/instagram.svg"
              alt="whatsapp icon"
              color="#FFFFFF"
            />
            <p className="text-white font-light text-xl ">pemdesjatiguwi</p>
          </button>
          <button className="flex items-center gap-2">
            <img
              className="w-6 h-6 invert "
              src="./svg/telephone.svg"
              alt="whatsapp icon"
              color="#FFFFFF"
            />
            <p className="text-white font-light text-xl ">(0341) 385389</p>
          </button>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center pt-8">
        <p className="text-white text-lg font-bold  ">
          Dikembangkan oleh Tim MMD Filkom 47 Tahun 2025
        </p>
        <p className="text-white text-lg font-light">
          Program Mahasiswa Membangun Desa,Fakultas Ilmu Komputer, Universitas
          Brawijaya
        </p>
      </section>
    </div>
  );
};

export default Footer;
