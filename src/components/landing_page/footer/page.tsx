import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-[#0E4D45] px-16 py-8">
      <section className="border-b-1 grid grid-cols-12 pb-8 border-white">
        <section className="flex flex-col col-span-6 space-y-4">
          <div className="min-w-10 md:w-20 flex">
            <img
              className="lg:w-120"
              src="/img/logo_desa.png"
              alt="Logo Desa"
            />
            <div>
              <p className="text-3xl font-semibold text-white">Desa Jatiguwi</p>
              <p className="text-nowrap font-light text-white">
                Kecamatan Sumberpucung
              </p>
            </div>
          </div>
          <p className="text-pretty lg:text-xl text-lg text-white align-text-top">
            Jl. Raya Jatiguwi, Sumberpucung<br></br> Kota Malang, 65165, Jawa
            Timur, Indonesia.
          </p>
        </section>
        <section className="col-span-2 col-start-9">
          <p className="pb-2 text-xl font-semibold text-white">Halaman</p>
          <ul className="text-md pt-2 space-y-2">
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold items-center gap-2 font-light text-white duration-200"
                href="/"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold items-center gap-2 font-light text-white duration-200"
                href="/profil"
              >
                Profil
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold items-center gap-2 font-light text-white duration-200"
                href=""
              >
                Selayang Pandang
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold items-center gap-2 font-light text-white duration-200"
                href=""
              >
                Sejarah
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold items-center gap-2 font-light text-white duration-200"
                href=""
              >
                Berita
              </a>
            </li>
          </ul>
        </section>
        <section className="col-span-3 col-start-11 space-y-6">
          <p className="text-2xl font-semibold text-white">Hubungi kami</p>
          <div className="flex gap-4">
            <button>
              <img
                className="invert hover:ease-in-out hover:scale-110 w-6 h-6 duration-200"
                src="/svg/email.svg"
                alt="email icon"
                color="#FFFFFF"
              />
            </button>
            <button>
              <img
                className="invert hover:ease-in-out hover:scale-110 w-8 h-8 duration-200"
                src="/svg/tiktok.svg"
                alt="tiktok icon"
                color="#FFFFFF"
              />
            </button>
            <button>
              <img
                className="invert hover:ease-in-out hover:scale-110 w-6 h-6 duration-200"
                src="/svg/youtube.svg"
                alt="yt icon"
                color="#FFFFFF"
              />
            </button>
          </div>
          <button className="hover:ease-in-out hover:scale-110 hover:font-bold flex items-center gap-2 font-light duration-200">
            <img
              className="invert w-6 h-6"
              src="/svg/instagram.svg"
              alt="whatsapp icon"
              color="#FFFFFF"
            />
            <p className=" text-xl text-white">pemdesjatiguwi</p>
          </button>
          <button className="hover:ease-in-out hover:scale-110 hover:font-bold flex items-center gap-2 font-light duration-200">
            <img
              className="invert w-6 h-6"
              src="/svg/telephone.svg"
              alt="whatsapp icon"
              color="#FFFFFF"
            />
            <p className=" text-xl text-white">(0341) 385389</p>
          </button>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center pt-8">
        <p className=" text-lg font-bold text-white">
          Dikembangkan oleh Tim MMD Filkom 47 Tahun 2025
        </p>
        <p className="text-lg font-light text-white">
          Program Mahasiswa Membangun Desa,Fakultas Ilmu Komputer, Universitas
          Brawijaya
        </p>
      </section>
    </div>
  );
};

export default Footer;
