import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-[#0E4D45] px-4 py-8 md:px-8 lg:px-16">
      {/* Top section: Logo, Address, Pages, Contact */}
      <section className="md:flex-row md:gap-12 lg:gap-16 flex flex-col gap-8 pb-8 border-b border-white">
        {/* Logo and Address Section */}
        {/* On small screens, this section will center its items */}
        <div className="md:flex-1 md:pr-8 md:items-start md:text-left flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-4">
            <img
              className="md:w-20 lg:w-24 object-contain w-16 h-auto"
              src="/img/logo_desa.png"
              alt="Logo Desa"
            />
            <div>
              <p className="md:text-2xl lg:text-3xl text-xl font-semibold text-white">
                Desa Jatiguwi
              </p>
              <p className="text-nowrap md:text-base lg:text-lg text-sm font-light text-white">
                Kecamatan Sumberpucung
              </p>
            </div>
          </div>
          <p className="text-pretty md:text-base lg:text-xl text-sm text-white">
            Jl. Raya Jatiguwi, Sumberpucung
            <br /> Kota Malang, 65165, Jawa Timur, Indonesia.
          </p>
        </div>

        {/* Pages Section */}
        {/* On small screens, this section will center its items */}
        <div className="md:flex-shrink-0 md:items-start flex flex-col items-center">
          <p className="md:text-xl pb-2 text-lg font-semibold text-white">
            Halaman
          </p>
          <ul className="md:text-base md:text-start space-y-2 text-sm text-center">
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold gap-2 font-light text-white duration-200"
                href="/"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold gap-2 font-light text-white duration-200"
                href="/profil"
              >
                Profil
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold gap-2 font-light text-white duration-200"
                href="/selayang-pandang"
              >
                Selayang Pandang
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold gap-2 font-light text-white duration-200"
                href="/sejarah"
              >
                Sejarah
              </a>
            </li>
            <li>
              <a
                className="hover:ease-in-out hover:scale-105 hover:font-bold gap-2 font-light text-white duration-200"
                href="/content"
              >
                Berita
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        {/* On small screens, this section will center its items */}
        <div className="md:flex-shrink-0 md:items-start flex flex-col items-center">
          <p className="md:text-xl pb-2 text-lg font-semibold text-white">
            Hubungi kami
          </p>
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
          <button className="hover:ease-in-out hover:scale-110 hover:font-bold focus:outline-none flex items-center gap-2 pt-4 font-light text-white duration-200">
            <img
              className="invert w-6 h-6"
              src="/svg/instagram.svg"
              alt="Instagram icon"
            />
            <p className="md:text-lg text-base">pemdesjatiguwi</p>
          </button>
          <button className="hover:ease-in-out hover:scale-110 hover:font-bold focus:outline-none flex items-center gap-2 pt-2 font-light text-white duration-200">
            <img
              className="invert w-6 h-6"
              src="/svg/telephone.svg"
              alt="Telephone icon"
            />
            <p className="md:text-lg text-base">(0341) 385389</p>
          </button>
        </div>
      </section>

      {/* Bottom section: Copyright / Development Info (already centered) */}
      <section className="flex flex-col items-center justify-center pt-8 text-center">
        <p className="md:text-lg text-base font-bold text-white">
          Dikembangkan oleh Tim MMD Filkom 47 Tahun 2025
        </p>
        <p className="md:text-base text-sm font-light text-white">
          Program Mahasiswa Membangun Desa, Fakultas Ilmu Komputer, Universitas
          Brawijaya
        </p>
      </section>
    </div>
  );
};

export default Footer;
