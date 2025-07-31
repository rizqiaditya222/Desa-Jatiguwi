import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-[#0E4D45] px-4 py-8 md:px-8 lg:px-16">
      {/* Top section: Logo, Address, Pages, Contact */}
      <section className="flex flex-col gap-8 pb-8 border-b border-white md:flex-row md:gap-12 lg:gap-16">

        {/* Logo and Address Section */}
        {/* On small screens, this section will center its items */}
        <div className="flex flex-col items-center text-center space-y-4 md:flex-1 md:pr-8 md:items-start md:text-left">
          <div className="flex items-center gap-4">
            <img
              className="w-16 h-auto md:w-20 lg:w-24 object-contain"
              src="/img/logo_desa.png"
              alt="Logo Desa"
            />
            <div>
              <p className="text-xl font-semibold text-white md:text-2xl lg:text-3xl">Desa Jatiguwi</p>
              <p className="text-sm text-nowrap font-light text-white md:text-base lg:text-lg">
                Kecamatan Sumberpucung
              </p>
            </div>
          </div>
          <p className="text-sm text-pretty text-white md:text-base lg:text-xl">
            Jl. Raya Jatiguwi, Sumberpucung<br /> Kota Malang, 65165, Jawa
            Timur, Indonesia.
          </p>
        </div>

        {/* Pages Section */}
        {/* On small screens, this section will center its items */}
        <div className="flex flex-col items-center md:flex-shrink-0 md:items-start">
          <p className="pb-2 text-lg font-semibold text-white md:text-xl">Halaman</p>
          <ul className="text-center text-sm space-y-2 md:text-base">
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
                href="/selayang-pandang"
              >
                Selayang Pandang
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold items-center gap-2 font-light text-white duration-200"
                href="/sejarah"
              >
                Sejarah
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold items-center gap-2 font-light text-white duration-200"
                href="/content"
              >
                Berita
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        {/* On small screens, this section will center its items */}
        <div className="flex flex-col items-center md:flex-shrink-0 md:items-start">
          <p className="pb-2 text-lg font-semibold text-white md:text-xl">Hubungi kami</p>
          <div className="flex gap-4 pt-2">
            <button className="focus:outline-none">
              <img
                className="invert hover:ease-in-out hover:scale-110 w-6 h-6 duration-200"
                src="/svg/email.svg"
                alt="email icon"
              />
            </button>
            <button className="focus:outline-none">
              <img
                className="invert hover:ease-in-out hover:scale-110 w-8 h-8 duration-200"
                src="/svg/tiktok.svg"
                alt="tiktok icon"
              />
            </button>
            <button className="focus:outline-none">
              <img
                className="invert hover:ease-in-out hover:scale-110 w-6 h-6 duration-200"
                src="/svg/youtube.svg"
                alt="YouTube icon"
              />
            </button>
          </div>
          <button className="hover:ease-in-out hover:scale-110 hover:font-bold flex items-center gap-2 font-light duration-200 pt-4 text-white focus:outline-none">
            <img
              className="invert w-6 h-6"
              src="/svg/instagram.svg"
              alt="Instagram icon"
            />
            <p className="text-base md:text-lg">pemdesjatiguwi</p>
          </button>
          <button className="hover:ease-in-out hover:scale-110 hover:font-bold flex items-center gap-2 font-light duration-200 pt-2 text-white focus:outline-none">
            <img
              className="invert w-6 h-6"
              src="/svg/telephone.svg"
              alt="Telephone icon"
            />
            <p className="text-base md:text-lg">(0341) 385389</p>
          </button>
        </div>
      </section>

      {/* Bottom section: Copyright / Development Info (already centered) */}
      <section className="flex flex-col items-center justify-center pt-8 text-center">
        <p className="text-base font-bold text-white md:text-lg">
          Dikembangkan oleh Tim MMD Filkom 47 Tahun 2025
        </p>
        <p className="text-sm font-light text-white md:text-base">
          Program Mahasiswa Membangun Desa, Fakultas Ilmu Komputer, Universitas
          Brawijaya
        </p>
      </section>
    </div>
  );
};

export default Footer;