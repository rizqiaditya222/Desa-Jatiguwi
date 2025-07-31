"use client";
import React from "react";
import { useAnimatedNumber } from "@/components/AnimatedNumber/useAnimatedNumber";
import { useIsInViewport } from "@/components/AnimatedNumber/useIsInViewport";
import PetaDesa from "@/components/Map/PetaDesa";
import PrimaryLinkButton from "@/components/button/primary_button";

const SelayangPandang = () => {
  const { ref, isIntersecting } = useIsInViewport({
    threshold: 0.2, // Trigger ketika 20% element terlihat
  });

  // Gunakan hook untuk masing-masing nilai
  const dusunCount = useAnimatedNumber(3, 2000, isIntersecting);
  const rwCount = useAnimatedNumber(9, 2000, isIntersecting);
  const rtCount = useAnimatedNumber(40, 2000, isIntersecting);
  const kkCount = useAnimatedNumber(2126, 2000, isIntersecting);

  return (
    <div className="bg-[#0E4D45] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 w-full flex flex-col">
      {/* Header Section */}
      <div className="md:flex-row md:justify-between md:items-start md:gap-8 sm:mb-8 md:mb-12 flex flex-col items-center justify-center gap-4 mb-6">
        <h1 className="sm:text-3xl md:text-4xl lg:text-5xl md:text-left text-2xl font-bold text-center text-white">
          Selayang Pandang
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#fafafa] text-center md:text-right md:w-2/5 lg:w-1/2 xl:w-2/5">
          Kenali Desa Jatiguwi di Selayang Pandang! Temukan sekilas info menarik
          tentang sejarah dan potensi desa kami. Yuk, kenali lebih dekat!
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#fafafa] mb-6 sm:mb-8 md:mb-12"></div>

      {/* Main Content Container */}
      <div className="max-w-7xl sm:gap-8 md:gap-12 flex flex-col w-full gap-6 mx-auto">
        {/* Map and Button Section */}
        <div className="sm:space-y-8 flex flex-col w-full space-y-6">
          <div className="w-full">
            <PetaDesa />
          </div>
          <div className="sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl w-full max-w-md mx-auto">
            <PrimaryLinkButton
              text="Lihat Detail Selayang Pandang"
              href="/selayang-pandang"
              className="w-full border-2 border-[#fafafa] hover:bg-[#fafafa] hover:text-[#0E4D45] transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Kondisi Geografis Section */}
        <div className="sm:space-y-6 flex flex-col space-y-4">
          <h2 className="sm:text-2xl md:text-3xl md:text-left text-xl font-semibold text-center text-white">
            Kondisi Geografis
          </h2>
          <p className="sm:text-base md:text-lg text-sm leading-relaxed text-justify text-white">
            Desa Jatiguwi terletak sekitar &plusmn; 30 km di sebelah selatan
            Kabupaten Malang. Desa Jatiguwi memiliki luas wilayah seluruhnya
            459,763 ha. Dengan luas sawah 260,502 ha, luas Tanah Tegalan 49.293
            ha, Luas Tanah Pemukiman 20,966 ha, Luas Tanah Setengah Teknis
            16,195 ha dan lain-Lain 112,807 ha.
          </p>

          {/* Boundaries List */}
          <div className="sm:space-y-3 space-y-2">
            <div className="sm:flex-row flex flex-col text-sm text-white">
              <span className="md:text-start sm:mb-0 sm:w-36 md:w-44 flex-shrink-0 mb-1 font-semibold text-center">
                Sebelah Utara:
              </span>
              <span className="sm:ml-2 md:text-start sm:text-base text-sm text-center">
                Desa Ngadirejo, Kec. Kromengan
              </span>
            </div>
            <div className="sm:flex-row flex flex-col text-sm text-white">
              <span className="md:text-start sm:mb-0 sm:w-36 md:w-44 flex-shrink-0 mb-1 font-semibold text-center">
                Sebelah Timur:
              </span>
              <span className="sm:ml-2 md:text-start sm:text-base text-sm text-center">
                Desa Sambigede, Kec. Sumberpucung
              </span>
            </div>
            <div className=" sm:flex-row flex flex-col text-sm text-white">
              <span className="md:text-start sm:mb-0 sm:w-36 md:w-44 flex-shrink-0 mb-1 font-semibold text-center">
                Sebelah Selatan:
              </span>
              <span className="sm:ml-2 md:text-start sm:text-base text-sm text-center">
                Desa Kalipare, Kec. Kalipare
              </span>
            </div>
            <div className="sm:flex-row flex flex-col text-sm text-white">
              <span className="md:text-start sm:mb-0 sm:w-36 md:w-44 flex-shrink-0 mb-1 font-semibold text-center">
                Sebelah Barat:
              </span>
              <span className="sm:ml-2 md:text-start sm:text-base text-sm text-center">
                Desa Sumberpucung, Kec. Sumberpucung
              </span>
            </div>
          </div>
        </div>

        {/* Kondisi Topografis Section */}
        <div className="sm:space-y-6 flex flex-col space-y-4">
          <h2 className="sm:text-2xl md:text-3xl md:text-left text-xl font-semibold text-center text-white">
            Kondisi Topografis
          </h2>
          <p className="sm:text-base md:text-lg text-sm leading-relaxed text-justify text-white">
            Desa Jatiguwi dengan ketinggian tanah rata-rata 295 M diatas
            permukaan laut, merupakan daerah dataran rendah, dengan curah hujan
            rata &ndash; rata 22 mm/th. Bentuk permukaan tanah di Desa Jatiguwi
            secara umum adalah datar dengan produktifitas tanah adalah baik /
            sedang dan keadaan wilayah bukan pantai.
          </p>
        </div>

        {/* Kondisi Demografis Section */}
        <div className="sm:space-y-12 flex flex-col space-y-8">
          <h2 className="sm:text-2xl md:text-3xl md:text-left text-xl font-semibold text-center text-white">
            Kondisi Demografis
          </h2>

          {/* Statistics Cards */}
          <div ref={ref} className="sm:pb-32 md:pb-40 relative w-full pb-20">
            {/* Decorative Elements */}
            <img
              className="sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-60 absolute bottom-0 left-0 z-0 w-8 h-8"
              src="img/bulat2.png"
              alt="Decoration"
            />
            <img
              className="sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-60 absolute top-0 right-0 w-8 h-8 rotate-180"
              src="img/bulat2.png"
              alt="Decoration"
            />

            {/* Mobile Layout - 2x2 Grid */}
            <div className="sm:grid-cols-4 sm:gap-4 md:hidden place-items-center sm:max-w-sm max-w-60 grid grid-cols-2 gap-8 mx-auto">
              <div className="rounded-3xl sm:w-24 sm:h-24 flex items-center justify-center w-24 h-24 transform rotate-45 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {dusunCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">Dusun</p>
                </div>
              </div>
              <div className="rounded-3xl sm:w-24 sm:h-24 flex items-center justify-center w-24 h-24 transform rotate-45 translate-y-16 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {rwCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">RW</p>
                </div>
              </div>
              <div className="rounded-3xl sm:w-24 sm:h-24 flex items-center justify-center w-24 h-24 transform rotate-45 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {rtCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">RT</p>
                </div>
              </div>
              <div className="rounded-3xl sm:w-24 sm:h-24 flex items-center justify-center w-24 h-24 transform rotate-45 translate-y-16 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {kkCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">KK</p>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original Staggered Design */}
            <div className="md:grid md:grid-cols-4 lg:gap-6 place-items-center lg:max-w-5xl xl:max-w-6xl hidden max-w-4xl gap-4 mx-auto">
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leadin  g-tight">
                    {dusunCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">
                    Dusun
                  </p>
                </div>
              </div>
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 lg:translate-y-16 xl:translate-y-24 flex items-center justify-center transform rotate-45 translate-y-12 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leading-tight">
                    {rwCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">
                    RW
                  </p>
                </div>
              </div>
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leading-tight">
                    {rtCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">
                    RT
                  </p>
                </div>
              </div>
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 lg:translate-y-16 xl:translate-y-24 flex items-center justify-center transform rotate-45 translate-y-12 bg-white">
                <div className="flex flex-col text-center -rotate-45">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leading-tight">
                    {kkCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">
                    KK
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelayangPandang;
