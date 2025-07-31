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
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl text-center sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center md:text-left">
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
      <div className="max-w-7xl flex flex-col gap-6 sm:gap-8 md:gap-12 mx-auto w-full">
        
        {/* Map and Button Section */}
        <div className="flex flex-col w-full space-y-6 sm:space-y-8">
          <div className="w-full">
            <PetaDesa />
          </div>
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto">
            <PrimaryLinkButton
              text="Lihat Detail Selayang Pandang"
              href="/selayang-pandang"
              className="w-full border-2 border-[#fafafa] hover:bg-[#fafafa] hover:text-[#0E4D45] transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Kondisi Geografis Section */}
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center md:text-left">
            Kondisi Geografis
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed text-justify">
            Desa Jatiguwi terletak sekitar ± 30 km di sebelah selatan Kabupaten
            Malang. Desa Jatiguwi memiliki luas wilayah seluruhnya 459,763 ha.
            Dengan luas sawah 260,502 ha, luas Tanah Tegalan 49.293 ha, Luas
            Tanah Pemukiman 20,966 ha, Luas Tanah Setengah Teknis 16,195 ha dan
            lain-Lain 112,807 ha.
          </p>
          
          {/* Boundaries List */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row text-sm sm:text-base md:text-lg text-white">
              <span className="text-center md:text-start font-semibold mb-1 sm:mb-0 sm:w-36 md:w-44 flex-shrink-0">
                Sebelah Utara
              </span>
              <span className="sm:ml-2 text-center md:text-start">: Desa Ngadirejo, Kec. Kromengan</span>
            </div>
            <div className="flex flex-col sm:flex-row text-sm sm:text-base md:text-lg text-white">
              <span className="text-center md:text-start font-semibold mb-1 sm:mb-0 sm:w-36 md:w-44 flex-shrink-0">
                Sebelah Timur
              </span>
              <span className="sm:ml-2 text-center md:text-start">: Desa Sambigede, Kec. Sumberpucung</span>
            </div>
            <div className=" flex flex-col sm:flex-row text-sm sm:text-base md:text-lg text-white">
              <span className="text-center md:text-start font-semibold mb-1 sm:mb-0 sm:w-36 md:w-44 flex-shrink-0">
                Sebelah Selatan
              </span>
              <span className="sm:ml-2 text-center md:text-start">: Desa Kalipare, Kec. Kalipare</span>
            </div>
            <div className="flex flex-col sm:flex-row text-sm sm:text-base md:text-lg text-white">
              <span className="text-center md:text-start font-semibold mb-1 sm:mb-0 sm:w-36 md:w-44 flex-shrink-0">
                Sebelah Barat
              </span>
              <span className="sm:ml-2 text-center md:text-start">: Desa Sumberpucung, Kec. Sumberpucung</span>
            </div>
          </div>
        </div>

        {/* Kondisi Topografis Section */}
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center md:text-left">
            Kondisi Topografis
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed text-justify">
            Desa Jatiguwi dengan ketinggian tanah rata-rata 295 M diatas
            permukaan laut, merupakan daerah dataran rendah, dengan curah hujan
            rata – rata 22 mm/th. Bentuk permukaan tanah di Desa Jatiguwi
            secara umum adalah datar dengan produktifitas tanah adalah baik /
            sedang dan keadaan wilayah bukan pantai.
          </p>
        </div>

        {/* Kondisi Demografis Section */}
        <div className="flex flex-col space-y-8 sm:space-y-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center md:text-left">
            Kondisi Demografis
          </h2>
          
          {/* Statistics Cards */}
          <div ref={ref} className="relative w-full pb-20 sm:pb-32 md:pb-40">
            {/* Decorative Elements */}
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 absolute bottom-0 left-0 z-0 opacity-60"
              src="img/bulat2.png"
              alt="Decoration"
            />
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 absolute top-0 right-0 rotate-180 opacity-60"
              src="img/bulat2.png"
              alt="Decoration"
            />
            
            {/* Mobile Layout - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden place-items-center max-w-sm mx-auto">
              <div className="rounded-3xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {dusunCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">Dusun</p>
                </div>
              </div>
              <div className="rounded-3xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {rwCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">RW</p>
                </div>
              </div>
              <div className="rounded-3xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {rtCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">RT</p>
                </div>
              </div>
              <div className="rounded-3xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#0E4D45] leading-tight">
                    {kkCount}
                  </p>
                  <p className="text-sm sm:text-base text-[#0E4D45]">KK</p>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original Staggered Design */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 lg:gap-6 place-items-center max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leading-tight">
                    {dusunCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">Dusun</p>
                </div>
              </div>
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center transform rotate-45 translate-y-12 lg:translate-y-16 xl:translate-y-24 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leading-tight">
                    {rwCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">RW</p>
                </div>
              </div>
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leading-tight">
                    {rtCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">RT</p>
                </div>
              </div>
              <div className="rounded-4xl w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center transform rotate-45 translate-y-12 lg:translate-y-16 xl:translate-y-24 bg-white">
                <div className="flex flex-col -rotate-45 text-center">
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E4D45] leading-tight">
                    {kkCount}
                  </p>
                  <p className="text-lg lg:text-xl xl:text-2xl text-[#0E4D45]">KK</p>
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